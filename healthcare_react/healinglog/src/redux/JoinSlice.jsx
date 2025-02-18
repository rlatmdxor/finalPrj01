import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  pwd: '',
  nick: '',
  name: '',
  address: '',
  email: '',
  emailFront: '',
  emailDomain: '',
  residentNum: '',
  frontResidentNum: '',
  backResidentNum: '',
  height: '',
  weight: '',
  profile: '/img/profile.jpg',
  gender: '',
  phone: '',
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
    setEmailFront: (state, action) => {
      state.emailFront = action.payload;
    },
    setEmailDomain: (state, action) => {
      state.emailDomain = action.payload;
    },
    setResidentNum: (state, action) => {
      state.residentNum = action.payload;
    },
    setFrontResidentNum: (state, action) => {
      state.frontResidentNum = action.payload;
    },
    setBackResidentNum: (state, action) => {
      state.backResidentNum = action.payload;
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
    setPhone: (state, action) => {
      state.phone = action.payload;
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
  setEmailFront,
  setEmailDomain,
  setResidentNum,
  setFrontResidentNum,
  setBackResidentNum,
  setHeight,
  setWeight,
  setProfile,
  setGender,
  setPhone,
} = JoinSlice.actions;

export default JoinSlice.reducer;
