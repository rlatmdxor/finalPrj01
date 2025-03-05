import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import selectReducer from './selectSlice';
import pagingReducer from './pagingSlice';
import modalReducer from './modalSlice';
import selectionReducer from './selectSlice';
import JoinReducer from './JoinSlice';
import aerobicReducer from './aerobicSlice';
import anAerobicReducer from './anAerobicSlice';
import MemberReducer from './MemberSlice';
import dietReducer from './dietSlice';
import adminReducer from './AdminSlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    select: selectReducer,
    paging: pagingReducer,
    modal: modalReducer,
    selection: selectionReducer,
    join: JoinReducer,
    member: MemberReducer,
    aerobic: aerobicReducer,
    anAerobic: anAerobicReducer,
    diet: dietReducer,
    admin: adminReducer,
  },
});

export default store;
