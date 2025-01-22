import { createSlice } from '@reduxjs/toolkit';

const pagingSlice = createSlice({
  name: 'paging',
  initialState: {
    totalCount: 0,
    pageLimit: 5,
    boardLimit: 12,
    currentPage: 1,
    startPage: 1,
    endPage: 5,
  },
  reducers: {
    setTotalCount: (state, action) => {
      const { boardType, totalCount } = action.payload;
      if (!state[boardType]) {
        state[boardType] = {
          totalCount: 0,
          pageLimit: 5,
          boardLimit: 12,
          currentPage: 1,
          startPage: 1,
          endPage: 5,
        };
      }
      const boardState = state[boardType];
      boardState.totalCount = totalCount;
      boardState.endPage = Math.min(
        boardState.startPage + boardState.pageLimit - 1,
        Math.ceil(state.totalCount / state.boardLimit)
      );
    },

    pageChange: (state, action) => {
      const { boardType, page } = action.payload;
      if (!state[boardType]) {
        state[boardType] = {
          totalCount: 0,
          pageLimit: 5,
          boardLimit: 12,
          currentPage: 1,
          startPage: 1,
          endPage: 5,
        };
      }
      const boardState = state[boardType];
      boardState.currentPage = page;
      boardState.startPage = Math.floor((page - 1) / boardState.pageLimit) * boardState.pageLimit + 1;
      boardState.endPage = Math.min(boardState.startPage + boardState.pageLimit - 1, boardState.maxPage);
    },

    prevPage: (state, action) => {
      const { boardType } = action.payload;
      if (!state[boardType]) {
        state[boardType] = {
          totalCount: 0,
          pageLimit: 5,
          boardLimit: 12,
          currentPage: 1,
          startPage: 1,
          endPage: 5,
        };
      }
      const boardState = state[boardType];
      if (boardState.startPage > 1) {
        boardState.startPage -= boardState.pageLimit;
        boardState.endPage = Math.min(boardState.startPage + boardState.pageLimit - 1, boardState.maxPage);
      }
    },

    nextPage: (state, action) => {
      const { boardType } = action.payload;
      if (!state[boardType]) {
        state[boardType] = {
          totalCount: 0,
          pageLimit: 5,
          boardLimit: 12,
          currentPage: 1,
          startPage: 1,
          endPage: 5,
        };
      }
      const boardState = state[boardType];
      if (boardState.endPage < boardState.maxPage) {
        boardState.startPage += boardState.pageLimit;
        boardState.endPage = Math.min(boardState.startPage + boardState.pageLimit - 1, boardState.maxPage);
      }
    },

    resetPaging: (state, action) => {
      const { boardType } = action.payload;
      if (!state[boardType]) {
        state[boardType] = {
          totalCount: 0,
          pageLimit: 5,
          boardLimit: 12,
          currentPage: 1,
          startPage: 1,
          endPage: 5,
        };
      }
      const boardState = state[boardType];
      boardState.currentPage = 1;
      boardState.startPage = 1;
      boardState.endPage = boardState.pageLimit;
    },
  },
});

export default pagingSlice.reducer;
export const { setTotalCount, pageChange, prevPage, nextPage, resetPaging } = pagingSlice.actions;
