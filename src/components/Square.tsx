import { Box, BoxProps, Flex } from '@chakra-ui/layout';

export interface SquareProps extends BoxProps {
    size?: string | number;
}

export function Square({ size = '100%', children, ...props }: SquareProps) {
    return (
        <Box
            {...props}
            width={size}
            _before={{ content: "''", display: 'block', paddingTop: '100%' }}
        >
            <Flex position='absolute' flexDirection='column'>
                {children}
            </Flex>
        </Box>
    );
}
