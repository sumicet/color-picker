import { MultiStyleConfig } from '@chakra-ui/theme-tools';

export const Input: MultiStyleConfig = {
    baseStyle: {
        field: {
            background: 'primary.300',
            borderRadius: 'radius7',
            textStyle: 'text16',
            padding: 'space8',
            _focusVisible: {
                outline: '1px solid',
                outlineColor: 'primary.400',
                outlineOffset: -1,
                background: 'transparent',
            },
        },
    },
};
