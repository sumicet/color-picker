import { Box, HStack, StackProps, Text } from '@chakra-ui/layout';
import {
    SliderProps as ChakraSliderProps,
    Slider as ChakraSlider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
} from '@chakra-ui/slider';
import { Tooltip } from '@chakra-ui/tooltip';
import { ReactNode, useState } from 'react';
import { Square } from './Square';

interface SliderProps extends Omit<StackProps, 'onChange'> {
    value: ChakraSliderProps['value'];
    onChange: ChakraSliderProps['onChange'];
    min?: ChakraSliderProps['min'];
    max?: ChakraSliderProps['max'];
}

function MinMaxWrapper({ children }: { children: ReactNode }) {
    return (
        <Square size={30} align='center' justify='center' bg='primary.200' borderRadius='radius7'>
            <Text top='100%' color='secondary.medium' textStyle='text16'>
                {children}
            </Text>
        </Square>
    );
}

export function Slider({ value, onChange, ...props }: SliderProps) {
    const [showTooltip, setShowTooltip] = useState(false);
    const { min, max } = props;

    return (
        <HStack flex={1} spacing='space16' {...props} width='100%'>
            <MinMaxWrapper>{min || 0}</MinMaxWrapper>
            <ChakraSlider
                min={0}
                max={1}
                step={0.01}
                defaultValue={0.5}
                onChangeStart={() => setShowTooltip(true)}
                onChangeEnd={() => setShowTooltip(false)}
                value={value}
                onChange={onChange}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <Tooltip
                    hasArrow
                    label={`${value}`}
                    isOpen={showTooltip}
                    bg='primary.200'
                    placement='top'
                >
                    <SliderThumb cursor='pointer' />
                </Tooltip>
            </ChakraSlider>
            <MinMaxWrapper>{max || 1}</MinMaxWrapper>
        </HStack>
    );
}
