import { StateCreator } from 'zustand';

export interface ColorSlice {
    color: string;
    setColor: (value: string) => void;
}

export const createColorSlice: StateCreator<ColorSlice, [], []> = set => ({
    color: 'rgba(110, 91, 214, 1)',
    setColor: (color: string) => set({ color }),
});
