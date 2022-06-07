import { Container, HStack, Text, VStack } from '@chakra-ui/layout';
import { useTheme } from '@chakra-ui/system';
import { ColorCard } from '../components/ColorCard';
import { ColorSquare } from '../components/ColorSquare';
import { Slider } from '../components/Slider';

export function Home() {
    const theme = useTheme();
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
                    {[...Array(10)].map(() => (
                        <ColorSquare bg='accent.blue' />
                    ))}
                </HStack>
                <HStack>
                    <ColorCard color='#FFFFFF' size='80px' name='Custom name' />
                    <ColorCard color='#FFFFFF' size='60px' name='Custom name' />
                </HStack>
                <HStack>
                    <Text textStyle='text40'>Text 40</Text>
                    <Text textStyle='text24'>Text 24</Text>
                    <Text textStyle='text20'>Text 20</Text>
                    <Text textStyle='text18'>Text 18</Text>
                    <Text textStyle='text16'>Text 16</Text>
                    <Text textStyle='text12'>Text 12</Text>
                    <Text textStyle='code16'>Code 16</Text>
                </HStack>
                <Slider />
            </VStack>
        </Container>
    );
}
