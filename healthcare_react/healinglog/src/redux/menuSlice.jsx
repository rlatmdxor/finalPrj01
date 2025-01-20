import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    value: 'none',
  },
  reducers: {
    open: (state, action) => {
      state.value = 'flex';
    },
    close: (state, action) => {
      state.value = 'none';
    },
  },
});

export default menuSlice.reducer;
export const { open, close } = menuSlice.actions;
