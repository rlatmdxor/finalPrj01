import { createSlice } from '@reduxjs/toolkit';

const selectSlice = createSlice({
  name: 'select',
  initialState: {
    alcohol: ['', '', ''], // 음주
    smoking: ['', '', ''], // 흡연
    /*기본값이 이거긴한데 여기서 칸수를 직접 설정하실필요없고 
     본인 페이지에서 선택바 칼럼 추가하면 그대로 늘어납니다.*/
  },
  reducers: {
    setSelection: (state, action) => {
      const { category, index, value } = action.payload;
      if (!state.hasOwnProperty(category)) {
        state[category] = []; // 상태가 없으면 배열 초기화
      }
      state[category][index] = value;
    },
  },
});

export const { setSelection } = selectSlice.actions;
export default selectSlice.reducer;
