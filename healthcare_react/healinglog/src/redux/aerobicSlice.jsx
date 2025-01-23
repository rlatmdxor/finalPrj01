import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { no: 1, name: '걷기', bookmark: 'y' },
  { no: 2, name: '달리기', bookmark: 'y' },
  { no: 3, name: '자전거', bookmark: 'y' },
  { no: 4, name: '등산', bookmark: 'n' },
  { no: 5, name: '수영', bookmark: 'n' },
  { no: 6, name: '줄넘기', bookmark: 'n' },
  { no: 7, name: '에어로빅', bookmark: 'n' },
  { no: 8, name: '구기', bookmark: 'n' },
];

const aerobicSlice = createSlice({
  name: 'aerobic',
  initialState,
  reducers: {
    setBookmark: (state, action) => {
      const { no } = action.payload;
      const item = state.find((i) => i.no === no);
      if (item) {
        item.bookmark = item.bookmark === 'y' ? 'n' : 'y';
      }
    },
  },
});

export const { setBookmark } = aerobicSlice.actions;
export default aerobicSlice.reducer;
