import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    value: 'block',
  },
  reducers: {
    open: (state, action) => {
      state.value = 'block';
    },
    close: (state, action) => {
      state.value = 'none';
    },
  },
});

export default modalSlice.reducer;
export const { open, close } = modalSlice.actions;
