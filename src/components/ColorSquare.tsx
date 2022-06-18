import { useCallback } from 'react';
import { Square, SquareProps } from './Square';
import { useClipboard } from '@chakra-ui/hooks';
import { useToken } from '@chakra-ui/system';
import { Center, Flex, Text } from '@chakra-ui/layout';
import { colord } from 'colord';

export function ColorSquare(props: SquareProps) {
    const { bg } = props;
    const bgValue = useToken('colors', bg?.toString() || '', bg?.toString() || '');
    const { onCopy, hasCopied } = useClipboard(bgValue);

    const dcolor = colord(bgValue);
    const isColorLight = dcolor.isLight();

    return (
        <Square {...props} borderRadius='radius14' cursor='pointer' onClick={onCopy}>
            <Center flex={1}>
                <Text textStyle='code16' color={isColorLight ? 'black' : 'white'}>
                    {hasCopied ? 'Copied' : dcolor.toHex()}
                </Text>
            </Center>
        </Square>
    );
}
