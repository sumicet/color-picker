import { Box } from '@chakra-ui/layout';
import { CSSObject } from '@chakra-ui/system';
import { colord } from 'colord';
import { useEffect, useMemo, useState } from 'react';
import { RgbaStringColorPicker } from 'react-colorful';
import { useDebouncedValue } from 'rooks';

export interface ColorPickerProps {
    color: string;
    onChange: (value: string) => void;
}

const colorPickerStyle: CSSObject = {
    '.react-colorful': {
        width: 'auto',
        height: 'fit-content',
    },
    '.react-colorful__saturation': {
        height: 'colorPickerHeight',
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
};

export function ColorPicker({ color, onChange }: ColorPickerProps) {
    const [value, setValue] = useState<string>(color);

    useEffect(() => {
        setValue(color);
    }, [color]);

    // Support hex, rgb, hsl, etc.
    const rgbaString = useMemo(() => {
        return value.startsWith('rgba') ? value : colord(value).toRgbString();
    }, [value]);

    const [debouncedRgbaString] = useDebouncedValue(value, 50);

    useEffect(() => {
        onChange(debouncedRgbaString || '');
    }, [debouncedRgbaString]);

    return (
        <Box width='100%'>
            <Box sx={colorPickerStyle}>
                <RgbaStringColorPicker color={rgbaString} onChange={setValue} />
            </Box>
        </Box>
    );
}
