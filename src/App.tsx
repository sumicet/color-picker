import { Box, Container, Flex } from '@chakra-ui/layout';
import { Route, Routes } from 'react-router-dom';
import { Explore } from './pages/Explore';
import { Home } from './pages/Home';

function App() {
    return (
        <Container bg='primary.100' centerContent flex={1} padding='space20'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='explore' element={<Explore />} />
            </Routes>
        </Container>
    );
}

export default App;
