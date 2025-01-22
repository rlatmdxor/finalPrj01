import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modals: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, action) => {
      const { title, value } = action.payload;
      state.modals[title] = value;
    },
    close: (state, action) => {
      const title = action.payload;
      if (state.modals[title]) {
        state.modals[title] = 'none';
      }
    },
  },
});

export default modalSlice.reducer;
export const { open, close } = modalSlice.actions;
