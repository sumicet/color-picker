import { colord, Colord } from 'colord';
import { StateCreator } from 'zustand';

export interface SettingsSlice {
    color: string;
    setColor: (value: string) => void;
    generatedColors: {
        [key: string]: {
            name: string; // The name of the filter
            step: number; // The value applied to the filter
            colors: (string | undefined)[]; // The generated colors
            lockedTo?: string; // Lock the source color to this color
        };
    };
    generateColors: (value: { type: string; step?: number; color?: string }) => void;
    activateColorLock: (filter: string, color: string) => void;
    disableColorLock: (filter: string) => void;
}

export const conversionTypes = ['alpha', 'saturate', 'desaturate', 'lighten', 'darken'] as const;
export type ConversionTypes = typeof conversionTypes[number];
const generatedColorsCount = 10; // For each filter

export const createSettingsSlice: StateCreator<SettingsSlice, [], []> = (set, get) => ({
    color: 'rgba(110, 91, 214, 1)',
    setColor: (color: string) => set({ color }),
    generatedColors: {},
    generateColors: ({ type, step, color: customColor }) => {
        const dcolor = colord(customColor || get().color);
        const equivalentConversionType = type.replace(/[^a-zA-Z]/g, '') as ConversionTypes;

        // Generate an array of colors for filters that only return 1 color
        const computeColorManipulation = ({
            initialStep = 1,
            startFrom0,
            defaultStep = 0.05,
        }: {
            initialStep?: number;
            startFrom0?: boolean;
            defaultStep?: number;
        }): (string | undefined)[] => {
            return [...Array(generatedColorsCount - 1)].map((_, index) => {
                const sumStep: number = index * (step || defaultStep);
                const setting: number = startFrom0 ? sumStep : initialStep - sumStep;

                if (sumStep < 0 || sumStep > 1) {
                    return;
                }

                return (dcolor[equivalentConversionType](setting) as Colord).toRgbString();
            });
        };

        if (type.includes('alpha')) {
            set(state => ({
                generatedColors: {
                    ...state.generatedColors,
                    [type]: {
                        colors: computeColorManipulation({ initialStep: dcolor.rgba.a }),
                        step: step || 0.05,
                        name: type,
                    },
                },
            }));
            return;
        }

        if (type.includes('darken') || type.includes('lighten')) {
            const defaultLuminosityStep = 0.07;
            set(state => ({
                generatedColors: {
                    ...state.generatedColors,
                    [type]: {
                        colors: computeColorManipulation({
                            startFrom0: true,
                            defaultStep: defaultLuminosityStep,
                        }),
                        step: step || defaultLuminosityStep,
                        name: type,
                    },
                },
            }));
            return;
        }

        if (type.includes('desaturate') || type.includes('saturate')) {
            const defaultSaturateStep = 0.1;
            set(state => ({
                generatedColors: {
                    ...state.generatedColors,
                    [type]: {
                        colors: computeColorManipulation({
                            startFrom0: true,
                            defaultStep: defaultSaturateStep,
                        }),
                        step: step || defaultSaturateStep,
                        name: type,
                    },
                },
            }));
            return;
        }
    },
    activateColorLock: (filter: string, color: string) => {
        set(state => ({
            generatedColors: {
                ...state.generatedColors,
                [filter]: {
                    ...state.generatedColors[filter],
                    lockedTo: color,
                },
            },
        }));
    },
    disableColorLock: (filter: string) => {
        set(state => ({
            generatedColors: {
                ...state.generatedColors,
                [filter]: {
                    ...state.generatedColors[filter],
                    lockedTo: undefined,
                },
            },
        }));
    },
});
