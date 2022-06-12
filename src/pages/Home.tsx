import { Container, HStack, VStack } from '@chakra-ui/layout';
import { useState } from 'react';
import { EnhancedColorPicker } from '../components/ColorPickerWithInput';

export function Home() {
    const [color, setColor] = useState<string>('#fcba03');

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
                <VStack spacing='space24' flex={1} padding='space24'>
                    hello
                </VStack>
            </HStack>
        </Container>
    );
}
