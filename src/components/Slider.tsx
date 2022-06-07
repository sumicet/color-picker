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

export function Slider(props: SliderProps) {
    const [value, setValue] = useState<number>(50);
    return (
        <ChakraSlider value={value} defaultValue={50} onChange={v => setValue(v)}>
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
                100
            </Text>
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <Tooltip hasArrow label={`${value}`} isOpen={true} bg='primary.400'>
                <SliderThumb />
            </Tooltip>
        </ChakraSlider>
    );
}
