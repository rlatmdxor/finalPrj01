import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import selectReducer from './selectSlice';
import pagingReducer from './pagingSlice';
import modalReducer from './modalSlice';
import selectionReducer from './selectSlice';
<<<<<<< Updated upstream
// import joinReducer from './joinSlice';
=======
import JoinReducer from './JoinSlice';
import aerobicReducer from './aerobicSlice';
import anAerobicReducer from './anAerobicSlice';
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

const store = configureStore({
  reducer: {
    menu: menuReducer,
    select: selectReducer,
    paging: pagingReducer,
    modal: modalReducer,
    selection: selectionReducer,
<<<<<<< Updated upstream
    // join: joinReducer,
=======
    join: JoinReducer,
    aerobic: aerobicReducer,
    anAerobic: anAerobicReducer,
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  },
});

export default store;
