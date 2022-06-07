import { Box, Container, Flex } from '@chakra-ui/layout';
import { Home } from './pages/Home';

function App() {
    return (
        <Container bg='primary.100' centerContent flex={1} padding='space20'>
            <Home />
        </Container>
    );
}

export default App;
