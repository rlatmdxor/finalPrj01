import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  pwd: '',
  nick: '',
  name: '',
  address: '',
  email: '',
  residentNum: '',
  height: '',
  weight: '',
  profile: '/img/profile.jpg',
  gender: '',
};

const JoinSlice = createSlice({
  name: 'join',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setPwd: (state, action) => {
      state.pwd = action.payload;
    },
    setNick: (state, action) => {
      state.nick = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setResidentNum: (state, action) => {
      state.residentNum = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setWeight: (state, action) => {
      state.weight = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
  },
});

export const {
  setId,
  setPwd,
  setNick,
  setName,
  setAddress,
  setEmail,
  setResidentNum,
  setHeight,
  setWeight,
  setProfile,
  setGender,
} = JoinSlice.actions;

export default JoinSlice.reducer;
