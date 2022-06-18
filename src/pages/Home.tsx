import { Container, HStack, Text, VStack } from '@chakra-ui/layout';
import { Colord, colord } from 'colord';
import { useEffect, useReducer, useState } from 'react';
import { EnhancedColorPicker } from '../components/ColorPickerWithInput';
import { ColorSquare } from '../components/ColorSquare';
import { useBreakpointValue } from '@chakra-ui/media-query';
import capitalize from 'lodash/capitalize';
import { IoFootsteps } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';
import { Icon } from '@chakra-ui/icon';
import { useStore } from '../store/useStore';

const conversionTypes = ['alpha', 'saturate', 'desaturate', 'lighten', 'darken'] as const;
type ConversionTypes = typeof conversionTypes[number];

type State = {
    [key in ConversionTypes]?: {
        name: ConversionTypes; // The name of the filter
        step: number; // The value applied to the filter
        colors: (string | undefined)[]; // The generated colors
    };
};

const generatedColorsCount = 10; // For each filter

export function Home() {
    const { color, setColor } = useStore(state => ({
        color: state.color,
        setColor: state.setColor,
    }));

    function reducer(state: State, action: { type: ConversionTypes; step?: number }): State {
        const dcolor = colord(color);

        // Generate an array of colors for filters that only return 1 color
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
                const sumStep = index * (action.step || defaultStep);
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
                        step: action.step || 0.05,
                        name: action.type,
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
                        step: action.step || defaultDarkenStep,
                        name: action.type,
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
                        step: action.step || defaultSaturateStep,
                        name: action.type,
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

    const ResponsiveStack = useBreakpointValue({ base: VStack, '2xl': HStack }) || VStack;

    return (
        <Container height='100%' width='100%'>
            <ResponsiveStack>
                <VStack
                    spacing='space24'
                    bg='primary.200'
                    flex={1}
                    borderRadius='radius14'
                    padding='space24'
                    width='100%'
                >
                    <EnhancedColorPicker color={color} onChange={setColor} />
                </VStack>
                <VStack spacing='space20' flex={1} padding='space24' width='100%'>
                    {Object.entries(generatedColors).map(([key, value]) => (
                        <VStack align='flex-start' width='100%'>
                            <HStack spacing='space12'>
                                <Text color='secondary.light' textStyle='text16'>
                                    {capitalize(key)}
                                </Text>
                                <HStack spacing='space4'>
                                    <Icon
                                        as={IoFootsteps}
                                        color='secondary.medium'
                                        boxSize='icon.default'
                                    />
                                    <Text color='secondary.light' textStyle='text16'>
                                        {value.step}
                                    </Text>
                                </HStack>
                                <Icon
                                    as={IoMdSettings}
                                    color='secondary.medium'
                                    boxSize='icon.default'
                                />
                            </HStack>
                            <HStack width='100%' key={key}>
                                {value.colors.map((currentColor, index) => (
                                    <ColorSquare
                                        key={`${color} ${currentColor} ${value.step} ${index + 1}`}
                                        bg={currentColor}
                                    />
                                ))}
                            </HStack>
                        </VStack>
                    ))}
                </VStack>
            </ResponsiveStack>
        </Container>
    );
}
