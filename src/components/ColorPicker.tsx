import { Box } from '@chakra-ui/layout';
import { colord } from 'colord';
import { useMemo } from 'react';
import { RgbaStringColorPicker } from 'react-colorful';

interface ColorPickerProps {
    color: string;
    onChange: (value: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
    const rgbaString = useMemo(() => {
        return color.startsWith('rgba') ? color : colord(color).toRgbString();
    }, [color]);

    return (
        <Box width='100%'>
            <Box
                sx={{
                    '.react-colorful': {
                        width: 'auto',
                        height: 'fit-content',
                    },
                    '.react-colorful__saturation': {
                        height: '228px',
                        borderRadius: 'radius14',
                    },
                    '.react-colorful__hue, .react-colorful__alpha': {
                        height: 8,
                        borderRadius: 'radius14',
                        marginTop: 'space20',
                    },
                    '.react-colorful__pointer': {
                        height: 20,
                        width: 20,
                    },
                }}
            >
                <RgbaStringColorPicker color={rgbaString} onChange={onChange} />
            </Box>
        </Box>
    );
}
