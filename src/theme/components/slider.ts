import { MultiStyleConfig, orient, StyleFunctionProps } from '@chakra-ui/theme-tools';

export const Slider: MultiStyleConfig = {
    baseStyle: ({ orientation }: StyleFunctionProps) => ({
        container: {
            ...orient({
                orientation,
                vertical: { width: 'fit-content', height: '100%' },
                horizontal: { width: '100%', height: 'fit-content' },
            }),
        },
        track: {
            background: 'primary.200',
            height: '4px',
        },
        filledTrack: {
            background: 'accent.blue',
            height: '4px',
        },
        thumb: {
            background: 'accent.blue',
            width: '20px',
            height: '20px',
            top: 0,
            borderRadius: '50%',
        },
    }),
};
