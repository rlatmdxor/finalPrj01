import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import selectReducer from './selectSlice';
import modalReducer from './modalSlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    select: selectReducer,
    modal: modalReducer,
  },
});

export default store;
