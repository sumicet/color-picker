import { Text } from '@chakra-ui/layout';
import {
    SliderProps,
    Slider as ChakraSlider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
} from '@chakra-ui/slider';
import { Tooltip } from '@chakra-ui/tooltip';
import { useState } from 'react';

/**
 *
 * @value
 * @onChange
 */
export function Slider(props: SliderProps) {
    const [showTooltip, setShowTooltip] = useState(false);
    const { value } = props;

    return (
        <ChakraSlider
            {...props}
            defaultValue={0.5}
            onChangeStart={() => setShowTooltip(true)}
            onChangeEnd={() => setShowTooltip(false)}
            min={0}
            max={1}
            step={0.01}
        >
            {/* SliderMark is broken for the value on the right */}
            <Text top='100%' position='absolute' color='secondary.medium' textStyle='text16'>
                0
            </Text>
            <Text
                top='100%'
                right='0'
                position='absolute'
                color='secondary.medium'
                textStyle='text16'
            >
                1
            </Text>
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
    );
}
