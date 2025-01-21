import { createSlice } from '@reduxjs/toolkit';

const selectSlice = createSlice({
  name: 'select',
  initialState: {
    alcohol: '', // 음주
    smoking: '', // 흡연 << 아래에 추가해서 가져다 쓰기
  },
  reducers: {
    setSelection: (state, action) => {
      const { category, index, value } = action.payload;
      if (!state[category]) {
        state[category] = []; // 상태가 없으면 배열 초기화
      }
      state[category][index] = value;
    },
  },
});

export const { setSelection } = selectSlice.actions;
export default selectSlice.reducer;
