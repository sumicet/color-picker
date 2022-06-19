import { HStack, Text, StackProps, VStack } from '@chakra-ui/layout';
import { colord } from 'colord';
import { ColorSquare } from './ColorSquare';
import { SquareProps } from './Square';

interface ColorCardProps extends Omit<StackProps, 'color' | 'size'> {
    color: string;
    size: SquareProps['size'];
    name?: string;
}

export function ColorCard({ size, color, name, ...props }: ColorCardProps) {
    const dcolor = colord(color);

    return (
        <HStack {...props} spacing='space12'>
            <ColorSquare size={size} bg={color} />
            <VStack spacing='space4' align='flex-start'>
                {/* TODO: Add copy to clipboard */}
                <Text textStyle='code16' color='secondary.light'>
                    {dcolor.toRgbString()}
                </Text>
                <Text textStyle='code16' color='secondary.light'>
                    {dcolor.toHslString()}
                </Text>
            </VStack>
        </HStack>
    );
}
