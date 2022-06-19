import { Container, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { useEffect } from 'react';
import { EnhancedColorPicker } from '../components/ColorPickerWithInput';
import { ColorSquare } from '../components/ColorSquare';
import { useBreakpointValue } from '@chakra-ui/media-query';
import capitalize from 'lodash/capitalize';
import { IoFootsteps } from 'react-icons/io5';
import { Icon } from '@chakra-ui/icon';
import { useStore } from '../store/useStore';
import { Settings } from '../components/Settings';
import { conversionTypes } from '../store/createSettingsSlide';

export function Home() {
    const color = useStore(state => state.color);
    const setColor = useStore(state => state.setColor);
    const generatedColors = useStore(state => state.generatedColors);
    const generateColors = useStore(state => state.generateColors);

    useEffect(() => {
        conversionTypes.forEach(ct => {
            generateColors({ type: ct });
        });
        generateColors({ type: 'alpha #2' });
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
                        <VStack key={`${key}-text`} align='flex-start' width='100%'>
                            <HStack spacing='space12' width='100%'>
                                <Text color='secondary.light' textStyle='text16'>
                                    {capitalize(value.name)}
                                </Text>
                                <HStack spacing='space4'>
                                    <Icon
                                        as={IoFootsteps}
                                        color='secondary.medium'
                                        boxSize='icon.default'
                                    />
                                    <Text color='secondary.light' textStyle='text16'>
                                        {value.filterSettings?.step || value.defaultStep}
                                    </Text>
                                </HStack>
                                <Flex flex={1} justify='flex-end'>
                                    <Settings name={value.name} />
                                </Flex>
                            </HStack>
                            <HStack key={`${key}-colors`} width='100%'>
                                {value.colors.map((currentColor, index) => (
                                    <ColorSquare
                                        key={`${color} ${currentColor} ${index + 1}`}
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
