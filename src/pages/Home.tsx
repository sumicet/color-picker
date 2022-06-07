import { Container, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { useTheme } from '@chakra-ui/system';
import { ColorSquare } from '../components/ColorSquare';
import { theme as defaultTheme } from '@chakra-ui/theme';

export function Home() {
    const theme = useTheme();
    console.log(theme);
    console.log('default', defaultTheme);
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
                        <ColorSquare />
                    ))}
                </HStack>
                <VStack>
                    <Text textStyle='text40'>Text 40</Text>
                    <Text textStyle='text24'>Text 24</Text>
                    <Text textStyle='text20'>Text 20</Text>
                    <Text textStyle='text18'>Text 18</Text>
                    <Text textStyle='text16'>Text 16</Text>
                    <Text textStyle='text12'>Text 12</Text>
                </VStack>
            </VStack>
        </Container>
    );
}
