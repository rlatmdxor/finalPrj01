import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import selectReducer from './selectSlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    select: selectReducer,
  },
});

export default store;
