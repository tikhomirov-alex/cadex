import { configureStore } from '@reduxjs/toolkit';
import primitiveReducer from './primitiveSlice';

const store = configureStore({
  reducer: {
    primitives: primitiveReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
