import create from 'zustand';
import { ColorSlice, createColorSlice } from './createColorSlide';

// Independent slices pattern: https://github.com/pmndrs/zustand/blob/main/docs/typescript.md#independent-slices-pattern

type Slice = ColorSlice; // & SomeOtherSlice

export const useStore = create<Slice>()((...a) => ({
    ...createColorSlice(...a),
}));
