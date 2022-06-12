import { Input } from '@chakra-ui/input';
import { Flex, HStack, VStack } from '@chakra-ui/layout';
import { useToken } from '@chakra-ui/system';
import { colord } from 'colord';
import { useCallback, useEffect, useState } from 'react';
import { ColorPicker, ColorPickerProps } from './ColorPicker';
import { ColorSquare } from './ColorSquare';

export function EnhancedColorPicker({ color, onChange }: ColorPickerProps) {
    const [input, setInput] = useState<string>(color);

    const colorPickerHeight = useToken('sizes', 'colorPickerHeight');
    const space24 = useToken('space', 'space24');

    useEffect(() => {
        setInput(color);
    }, [color]);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInput(value);
        if (colord(value).isValid()) {
            onChange(value);
        }
    }, []);

    return (
        <HStack width='100%' spacing='space20'>
            <Flex width={`calc(100% - ${colorPickerHeight} - ${space24})`} height='fit-content'>
                <ColorPicker color={color} onChange={onChange} />
            </Flex>
            <VStack spacing='space20'>
                <ColorSquare size='colorPickerHeight' bg={color} />
                <Input value={input} onChange={handleInputChange} />
            </VStack>
        </HStack>
    );
}
