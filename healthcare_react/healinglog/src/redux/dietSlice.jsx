import { createSlice } from '@reduxjs/toolkit';

const todayDate = new Date().toISOString().split('T')[0];

const dietSlice = createSlice({
  name: 'diet',
  initialState: {
    day: todayDate,
  },
  reducers: {
    setDay: (state, action) => {
      state.day = action.payload;
    },
    updateDay: (state, action) => {
      const newDate = new Date(state.day);
      newDate.setDate(newDate.getDate() + action.payload); // +1 or -1 값으로 업데이트
      state.day = newDate.toISOString().split('T')[0];
    },
  },
});

export default dietSlice.reducer;
export const { setDay, updateDay } = dietSlice.actions;
