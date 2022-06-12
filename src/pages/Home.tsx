import { Container, HStack, Text, VStack } from '@chakra-ui/layout';
import { ColorCard } from '../components/ColorCard';
import { ColorSquare } from '../components/ColorSquare';
import { Accordion } from '../components/Accordion';
import { Slider } from '../components/Slider';
import { ColorPicker } from '../components/ColorPicker';
import { useState } from 'react';
import { RgbaColor } from 'react-colorful';

export function Home() {
    const [color, setColor] = useState<string>('rgba(235, 64, 52, 0.4)');

    return (
        <Container height='100%' width='100%'>
            <VStack
                spacing='space24'
                bg='primary.200'
                flex={1}
                borderRadius='radius14'
                padding='space24'
            >
                <HStack width='100%'>
                    {[...Array(10)].map(index => (
                        <ColorSquare key={`${index + 1}`} bg='rgba(82, 44, 184, 0.5)' />
                    ))}
                </HStack>
                <HStack>
                    <ColorCard color='#FFFFFF' size='80px' name='Custom name' />
                    <ColorCard color='#FFFFFF' size='60px' name='Custom name' />
                </HStack>
                <HStack>
                    <Text textStyle='text40' color='secondary.light'>
                        Text 40
                    </Text>
                    <Text textStyle='text24' color='secondary.light'>
                        Text 24
                    </Text>
                    <Text textStyle='text20' color='secondary.light'>
                        Text 20
                    </Text>
                    <Text textStyle='text18' color='secondary.light'>
                        Text 18
                    </Text>
                    <Text textStyle='text16' color='secondary.light'>
                        Text 16
                    </Text>
                    <Text textStyle='text12' color='secondary.light'>
                        Text 12
                    </Text>
                    <Text textStyle='code16' color='secondary.light'>
                        Code 16
                    </Text>
                </HStack>
                <Slider />
                <Accordion name='My palette'>
                    <HStack width='100%'>
                        {[...Array(10)].map(index => (
                            <ColorSquare key={`${index + 1}`} bg='pink' />
                        ))}
                    </HStack>
                </Accordion>
                <ColorPicker color={color} onChange={setColor} />
            </VStack>
        </Container>
    );
}
