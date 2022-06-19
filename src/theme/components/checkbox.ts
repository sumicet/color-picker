import { MultiStyleConfig } from '@chakra-ui/theme-tools';

// TODO: Add more styles to this config
export const Checkbox: MultiStyleConfig = {
    baseStyle: {
        container: {
            w: '100%',
            h: 'fit-content',
        },
        control: {
            w: 'checkbox',
            h: 'checkbox',
            bg: 'primary.200',
            transitionProperty: 'box-shadow',
            transitionDuration: 'normal',
            color: 'secondary.light',
        },
    },
};
