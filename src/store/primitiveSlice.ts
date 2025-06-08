import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PrimitiveItem } from '../types/PrimitiveItem';

interface PrimitiveState {
  items: PrimitiveItem[];
  boxCount: number;
  pyramidCount: number;
}

const initialState: PrimitiveState = {
  items: [],
  boxCount: 0,
  pyramidCount: 0
};

const primitiveSlice = createSlice({
  name: 'primitives',
  initialState,
  reducers: {
    addPrimitive: (state, action: PayloadAction<PrimitiveItem>) => {
      state.items.push(action.payload);
      
      if (action.payload.type === 'Box') {
        state.boxCount++;
      } else if (action.payload.type === 'Pyramid') {
        state.pyramidCount++;
      }
    },
    clearSceneState: () => initialState
  }
});

export const { addPrimitive, clearSceneState } = primitiveSlice.actions;
export default primitiveSlice.reducer;
