import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { no: 1, name: '암 익스텐션', bookmark: 'n', part: 'arm' },
  { no: 2, name: '암 컬', bookmark: 'n', part: 'arm' },
  { no: 3, name: '바벨 컬', bookmark: 'y', part: 'arm' },
  { no: 4, name: '런지', bookmark: 'n', part: 'leg' },
  { no: 5, name: '레그 익스텐션', bookmark: 'n', part: 'leg' },
  { no: 6, name: '레그 프레스', bookmark: 'n', part: 'leg' },
  { no: 7, name: '레그 레이즈', bookmark: 'n', part: 'core' },
  { no: 8, name: '윗몸 일으키기', bookmark: 'y', part: 'core' },
  { no: 9, name: '크런치', bookmark: 'n', part: 'core' },
  { no: 10, name: '플랭크', bookmark: 'n', part: 'core' },
];

const anAerobicSlice = createSlice({
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

export const { setBookmark } = anAerobicSlice.actions;
export default anAerobicSlice.reducer;
