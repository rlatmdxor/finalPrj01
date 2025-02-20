import { createSlice } from '@reduxjs/toolkit';

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    no: null,
    id: null,
    nick: 'GUEST',
  },
  reducers: {
    login: (state, action) => {
      console.log('action.payload : ', action.payload);
      state.no = action.payload.no;
      state.id = action.payload.id;
      state.nick = action.payload.nick;
    },
    logout: (state) => {
      state.no = null;
      state.id = null;
      state.nick = 'GUEST';
    },
  },
});

export const { login, logout } = memberSlice.actions;
export default memberSlice.reducer;
