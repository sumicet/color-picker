import { colord, Colord } from 'colord';
import { StateCreator } from 'zustand';
import produce from 'immer';

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
    generateColors: (
        value: { type: string; step?: number; color?: string },
        options?: { forceColor?: boolean }
    ) => void;
    activateColorLock: (filter: string, color: string) => void;
    disableColorLock: (filter: string) => void;
}

// TODO: Solve naming issues for filter/type/conversionType

export const conversionTypes = ['alpha', 'saturate', 'desaturate', 'lighten', 'darken'] as const;
export type ConversionTypes = typeof conversionTypes[number];
const generatedColorsCount = 10; // For each filter

export const createSettingsSlice: StateCreator<SettingsSlice, [], []> = (set, get) => ({
    color: 'rgba(110, 91, 214, 1)',
    setColor: (color: string) => set({ color }),
    generatedColors: {},
    generateColors: ({ type, step, color: customColor }, options) => {
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
            if (get().generatedColors[type]?.lockedTo && !options?.forceColor) {
                return get().generatedColors[type].colors;
            }

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
            set(
                produce((state: SettingsSlice) => {
                    // Immer doesn't shine here, but it works
                    // If I write state.generatedColors[type].colors it gives me an error saying
                    // state.generatedColors[type] is undefined
                    state.generatedColors[type] = {
                        ...state.generatedColors[type],
                        colors: computeColorManipulation({
                            initialStep: dcolor.rgba.a,
                        }),
                        step: step || 0.05,
                        name: type,
                    };
                })
            );
            return;
        }

        if (type.includes('darken') || type.includes('lighten')) {
            const defaultLuminosityStep = 0.07;
            set(
                produce((state: SettingsSlice) => {
                    state.generatedColors[type] = {
                        ...state.generatedColors[type],
                        colors: computeColorManipulation({
                            startFrom0: true,
                            defaultStep: defaultLuminosityStep,
                        }),
                        step: step || defaultLuminosityStep,
                        name: type,
                    };
                })
            );
            return;
        }

        if (type.includes('desaturate') || type.includes('saturate')) {
            const defaultSaturateStep = 0.1;
            set(
                produce((state: SettingsSlice) => {
                    state.generatedColors[type] = {
                        ...state.generatedColors[type],
                        colors: computeColorManipulation({
                            startFrom0: true,
                            defaultStep: defaultSaturateStep,
                        }),
                        step: step || defaultSaturateStep,
                        name: type,
                    };
                })
            );
            return;
        }
    },
    activateColorLock: (filter: string, color: string) => {
        set(
            produce(state => {
                state.generatedColors[filter].lockedTo = color;
            })
        );
    },
    disableColorLock: (filter: string) => {
        set(
            produce(state => {
                state.generatedColors[filter].lockedTo = undefined;
            })
        );
    },
});
