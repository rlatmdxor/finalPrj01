import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import selectReducer from './selectSlice';
import pagingReducer from './pagingSlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    select: selectReducer,
    paging: pagingReducer,
  },
});

export default store;
