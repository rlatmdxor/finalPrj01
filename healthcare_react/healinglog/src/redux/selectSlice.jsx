import { createSlice } from '@reduxjs/toolkit';

const selectSlice = createSlice({
  name: 'selection',
  initialState: {
    city: null,
    district: null,
    dong: null,
  },
  reducers: {
    setSelection: (state, action) => {
      return {
        ...state,
        [action.payload.label]: action.payload.value, // ✅ immer가 정상적으로 처리할 수 있는 방식
      };
    },
  },
});

export const { setSelection } = selectSlice.actions;
export default selectSlice.reducer;
