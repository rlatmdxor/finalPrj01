import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import selectReducer from './selectSlice';
import modalReducer from './modalSlice';
import selectionReducer from './selectSlice';
// import joinReducer from './joinSlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    select: selectReducer,
    modal: modalReducer,
    selection: selectionReducer,
    // join: joinReducer,
  },
});

export default store;
