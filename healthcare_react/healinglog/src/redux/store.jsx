import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import selectReducer from './selectSlice';
import pagingReducer from './pagingSlice';
import modalReducer from './modalSlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    select: selectReducer,
    paging: pagingReducer,
    modal: modalReducer,
  },
});

export default store;
