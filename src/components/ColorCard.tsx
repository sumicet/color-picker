import { HStack, Text, StackProps, VStack } from '@chakra-ui/layout';
import { ColorSquare } from './ColorSquare';
import { SquareProps } from './Square';

interface ColorCardProps extends Omit<StackProps, 'color' | 'size'> {
    color: string;
    size: SquareProps['size'];
    name?: string;
}

export function ColorCard({ size, color, name, ...props }: ColorCardProps) {
    return (
        <HStack {...props} spacing='space12'>
            <ColorSquare size={size} bg={color} />
            <VStack spacing='space4' align='flex-start'>
                <Text noOfLines={1} textStyle='text16' color='secondary.light'>
                    {name || color}
                </Text>
                <Text textStyle='code16' color='secondary.light'>
                    {color}
                </Text>
            </VStack>
        </HStack>
    );
}
