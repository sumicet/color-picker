import { FlexProps, Flex } from '@chakra-ui/layout';

export interface SquareProps extends FlexProps {
    size?: string | number;
}

/**
 * Extends Flex
 * @size Accepts percentages too
 */
export function Square({ size = '100%', children, ...props }: SquareProps) {
    // For fixed values: either a number or a value in px/em/rem etc.
    if (typeof size === 'number' || (typeof size === 'string' && !size.includes('%'))) {
        return (
            <Flex {...props} width={size} minWidth={size} height={size}>
                {children}
            </Flex>
        );
    }

    // This code doesn't take the full width/height provided by size if size is a fixed value
    // But it works well for percentages
    // TODO: Test if this works for vh, vw, etc.
    return (
        <Flex
            {...props}
            width={size}
            _before={{ content: "''", display: 'block', paddingTop: '100%' }}
            position='relative'
        >
            <Flex position='absolute' top='0' width='100%' height='100%'>
                {children}
            </Flex>
        </Flex>
    );
}
