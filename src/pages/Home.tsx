import { Container, VStack } from '@chakra-ui/layout';

export function Home() {
    return (
        <Container height='100%' width='100%'>
            <VStack
                spacing='space24'
                bg='primary.200'
                flex={1}
                borderRadius='radius14'
                padding='space24'
            >
                hello
            </VStack>
        </Container>
    );
}
