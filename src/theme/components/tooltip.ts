import { StyleConfig } from '@chakra-ui/theme-tools';

export const Tooltip: StyleConfig = {
    baseStyle: {
        px: '10px',
        py: '5px',
        color: 'secondary.light',
        fontWeight: 'medium',
        fontSize: 'sm',
        boxShadow: 'md',
        maxW: '320px',
        zIndex: 'tooltip',
        borderRadius: 'radius7',
        minWidth: '60px',
        textAlign: 'center',
        bg: 'primary.600',
    },
};
