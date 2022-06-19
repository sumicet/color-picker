import { colord, Colord } from 'colord';
import { StateCreator } from 'zustand';
import produce from 'immer';
import { Action } from 'history';

interface FilterSettings {
    step?: number; // The value applied to the filter
    lockedTo?: string; // Lock the source color to this color
}

export interface SettingsSlice {
    color: string;
    setColor: (value: string) => void;
    generatedColors: {
        [key: string]: {
            name: string; // The name of the filter
            colors: (string | undefined)[]; // The generated colors
            defaultStep: number;
            filterSettings?: FilterSettings;
        };
    };
    generateColors: (
        value: { type: string; color?: string },
        filterSettings?: FilterSettings,
        options?: { forceColor?: boolean }
    ) => void;
    activateColorLock: (filter: string, color: string) => void;
    disableColorLock: (filter: string) => void;
}

// TODO: Solve naming issues for filter/type/conversionType

export const conversionTypes = ['alpha', 'saturate', 'desaturate', 'lighten', 'darken'] as const;
export type ConversionTypes = typeof conversionTypes[number];
const generatedColorsCount = 10; // For each filter

const defaultStep: { [key: string]: number } = {
    alpha: 0.05,
    darken: 0.07,
    lighten: 0.07,
    saturate: 0.1,
    desaturate: 0.1,
};

export const createSettingsSlice: StateCreator<SettingsSlice, [], []> = (set, get) => ({
    color: 'rgba(110, 91, 214, 1)',
    setColor: (color: string) => set({ color }),
    generatedColors: {},
    generateColors: ({ type, color: customColor }, filterSettings, options) => {
        const dcolor = colord(customColor || get().color);
        const equivalentConversionType = type.replace(/[^a-zA-Z]/g, '') as ConversionTypes;

        // Generate an array of colors for filters that only return 1 color
        const computeColorManipulation = ({
            initialStep = 1,
            startFrom0,
        }: {
            initialStep?: number;
            startFrom0?: boolean;
        }): (string | undefined)[] => {
            if (get().generatedColors[type]?.filterSettings?.lockedTo && !options?.forceColor) {
                return get().generatedColors[type].colors;
            }

            return [...Array(generatedColorsCount - 1)].map((_, index) => {
                const sumStep: number =
                    index * (filterSettings?.step || defaultStep[equivalentConversionType]);
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
                        name: type,
                        defaultStep: defaultStep[equivalentConversionType],
                    };
                })
            );
        } else if (type.includes('darken') || type.includes('lighten')) {
            set(
                produce((state: SettingsSlice) => {
                    state.generatedColors[type] = {
                        ...state.generatedColors[type],
                        colors: computeColorManipulation({
                            startFrom0: true,
                        }),
                        name: type,
                        defaultStep: defaultStep[equivalentConversionType],
                    };
                })
            );
        } else if (type.includes('desaturate') || type.includes('saturate')) {
            set(
                produce((state: SettingsSlice) => {
                    state.generatedColors[type] = {
                        ...state.generatedColors[type],
                        colors: computeColorManipulation({
                            startFrom0: true,
                        }),
                        name: type,
                        defaultStep: defaultStep[equivalentConversionType],
                    };
                })
            );
        }

        // Store filter settings
        if (filterSettings) {
            set(
                produce((state: SettingsSlice) => {
                    state.generatedColors[type].filterSettings = {
                        ...state.generatedColors[type].filterSettings,
                        ...filterSettings,
                    };
                })
            );
        }
    },
    activateColorLock: (filter: string, color: string) => {
        set(
            produce(state => {
                state.generatedColors[filter].filterSettings = {
                    ...state.generatedColors[filter].filterSettings,
                    lockedTo: color,
                };
            })
        );
    },
    disableColorLock: (filter: string) => {
        set(
            produce(state => {
                state.generatedColors[filter].filterSettings = {
                    ...state.generatedColors[filter].filterSettings,
                    lockedTo: undefined,
                };
            })
        );
    },
});
