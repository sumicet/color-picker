import { MultiStyleConfig } from '@chakra-ui/theme-tools';

export const Checkbox: MultiStyleConfig = {
    baseStyle: {
        container: {
            w: '100%',
            h: '50px',
        },
        control: {
            w: 'checkbox',
            h: 'checkbox',
            bg: 'primary.200',
            transitionProperty: 'box-shadow',
            transitionDuration: 'normal',
            color: 'secondary.light',
            // _checked: {
            //     bg: mode(`${c}.500`, `${c}.200`)(props),
            //     borderColor: mode(`${c}.500`, `${c}.200`)(props),
            //     color: mode('white', 'gray.900')(props),

            //     _hover: {
            //         bg: mode(`${c}.600`, `${c}.300`)(props),
            //         borderColor: mode(`${c}.600`, `${c}.300`)(props),
            //     },

            //     _disabled: {
            //         borderColor: mode('gray.200', 'transparent')(props),
            //         bg: mode('gray.200', 'whiteAlpha.300')(props),
            //         color: mode('gray.500', 'whiteAlpha.500')(props),
            //     },
            // },

            // _indeterminate: {
            //     bg: mode(`${c}.500`, `${c}.200`)(props),
            //     borderColor: mode(`${c}.500`, `${c}.200`)(props),
            //     color: mode('white', 'gray.900')(props),
            // },

            // _disabled: {
            //     bg: mode('gray.100', 'whiteAlpha.100')(props),
            //     borderColor: mode('gray.100', 'transparent')(props),
            // },

            // _focusVisible: {
            //     boxShadow: 'outline',
            // },

            // _invalid: {
            //     borderColor: mode('red.500', 'red.300')(props),
            // },
        },
    },
};
