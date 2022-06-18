import { StyleConfig } from '@chakra-ui/theme-tools';

export const Tooltip: StyleConfig = {
    baseStyle: {
        px: 'space16',
        py: 'space16',
        color: 'secondary.light',
        fontWeight: 'medium',
        fontSize: 'sm',
        boxShadow: 'md',
        maxW: '320px',
        zIndex: 'tooltip',
        borderRadius: 'radius14',
        minWidth: '60px',
        textAlign: 'center',
    },
};
