import { createSlice } from '@reduxjs/toolkit';

// 초기 상태: 모달 열림 상태와 선택된 날짜 관리
const initialState = {
  modals: {}, // 모달 열림 상태 저장
  selectedDate: null, // 선택된 날짜 저장
};

// modalSlice 생성
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // 일반 모달 열기
    open: (state, action) => {
      const { title, value } = action.payload; // payload: title과 display 상태
      state.modals[title] = value;
    },
    // 일반 모달 닫기
    close: (state, action) => {
      const title = action.payload; // payload: title만 필요
      if (state.modals[title]) {
        state.modals[title] = 'none'; // 모달 닫기
      }
    },
    // 캘린더 모달 열기 및 선택된 날짜 저장
    openCalModal: (state, action) => {
      const { title, value, date } = action.payload; // payload: title, display 상태, 날짜
      state.modals[title] = value; // 모달 열림 상태 설정
      state.selectedDate = date; // 선택된 날짜 저장
    },
  },
});

export default modalSlice.reducer;
export const { open, close, openCalModal } = modalSlice.actions;
