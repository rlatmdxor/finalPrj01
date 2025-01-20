import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  order: '최신순', // 기본 정렬 기준
  options: ['최신순', '오래된순', '추천순', '별점순', '조회순'], // 정렬 옵션 리스트
};

const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    setOrder(state, action) {
      state.order = action.payload; // 선택된 정렬 기준 업데이트
    },
  },
});

export const { setOrder } = selectSlice.actions;
export default selectSlice.reducer;
