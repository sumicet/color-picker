import { Container, HStack, VStack } from '@chakra-ui/layout';
import { Colord, colord } from 'colord';
import { useEffect, useReducer, useState } from 'react';
import { EnhancedColorPicker } from '../components/ColorPickerWithInput';
import { ColorSquare } from '../components/ColorSquare';

const defaultColor = '#fcba03';

const conversionTypes = ['alpha', 'saturate', 'desaturate', 'lighten', 'darken'] as const;
type ConversionTypes = typeof conversionTypes[number];

type State = {
    [key in ConversionTypes]?: {
        colors: (string | undefined)[];
        value: number;
    };
};

const generatedColorsCount = 10;

export function Home() {
    const [color, setColor] = useState<string>(defaultColor);

    function reducer(state: State, action: { type: ConversionTypes; value?: number }): State {
        const dcolor = colord(color);

        const computeColorManipulation = ({
            initialStep = 1,
            startFrom0,
            defaultStep = 0.05,
        }: {
            initialStep?: number;
            startFrom0?: boolean;
            defaultStep?: number;
        }): (string | undefined)[] => {
            if (!conversionTypes.includes(action.type)) {
                return [];
            }

            return [...Array(generatedColorsCount - 1)].map((_, index) => {
                const sumStep = index * (action.value || defaultStep);
                const setting = startFrom0 ? sumStep : initialStep - sumStep;

                if (sumStep < 0 || sumStep > 1) {
                    return;
                }

                return (dcolor[action.type](setting) as Colord).toRgbString();
            });
        };

        switch (action.type) {
            case 'alpha':
                return {
                    ...state,
                    alpha: {
                        colors: computeColorManipulation({ initialStep: dcolor.rgba.a }),
                        value: action.value || 0.05,
                    },
                };
            case 'darken':
                const defaultDarkenStep = 0.07;
                return {
                    ...state,
                    darken: {
                        colors: computeColorManipulation({
                            startFrom0: true,
                            defaultStep: defaultDarkenStep,
                        }),
                        value: action.value || defaultDarkenStep,
                    },
                };
            case 'desaturate':
            case 'saturate':
                const defaultSaturateStep = 0.1;
                return {
                    ...state,
                    [action.type]: {
                        colors: computeColorManipulation({
                            startFrom0: true,
                            defaultStep: defaultSaturateStep,
                        }),
                        value: action.value || defaultSaturateStep,
                    },
                };
            default:
                return {};
        }
    }

    const [generatedColors, dispatch] = useReducer(reducer, {});

    useEffect(() => {
        dispatch({ type: 'alpha' });
        dispatch({ type: 'saturate' });
        dispatch({ type: 'desaturate' });
        dispatch({ type: 'darken' });
    }, [color]);

    return (
        <Container height='100%' width='100%'>
            <HStack>
                <VStack
                    spacing='space24'
                    bg='primary.200'
                    flex={1}
                    borderRadius='radius14'
                    padding='space24'
                >
                    <EnhancedColorPicker color={color} onChange={setColor} />
                </VStack>
                <VStack spacing='space20' flex={1} padding='space24'>
                    {Object.entries(generatedColors).map(([key, value]) => (
                        <HStack width='100%' key={key}>
                            {value.colors.map((currentColor, index) => (
                                <ColorSquare
                                    key={`${color} ${currentColor} ${value.value} ${index + 1}`}
                                    bg={currentColor}
                                />
                            ))}
                        </HStack>
                    ))}
                </VStack>
            </HStack>
        </Container>
    );
}
