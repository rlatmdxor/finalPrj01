import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import selectReducer from './selectSlice';
import pagingReducer from './pagingSlice';
import modalReducer from './modalSlice';
import selectionReducer from './selectSlice';
import JoinReducer from './JoinSlice';
import aerobicReducer from './aerobicSlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    select: selectReducer,
    paging: pagingReducer,
    modal: modalReducer,
    selection: selectionReducer,
    join: JoinReducer,
    aerobic: aerobicReducer,
  },
});

export default store;
