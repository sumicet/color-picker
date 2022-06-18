import create from 'zustand';
import { SettingsSlice, createSettingsSlice } from './createSettingsSlide';

// Independent slices pattern: https://github.com/pmndrs/zustand/blob/main/docs/typescript.md#independent-slices-pattern

type Slice = SettingsSlice; // & SomeOtherSlice

export const useStore = create<Slice>()((...a) => ({
    ...createSettingsSlice(...a),
}));
