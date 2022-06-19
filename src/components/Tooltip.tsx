import { Tooltip as ChakraTooltip, TooltipProps } from '@chakra-ui/tooltip';

export function Tooltip(props: TooltipProps) {
    return <ChakraTooltip hasArrow placement='top' bg='primary.600' gutter={12} {...props} />;
}
