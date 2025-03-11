import { createSlice } from '@reduxjs/toolkit';

const today = new Date();
const todayDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
  today.getDate()
).padStart(2, '0')}`;

const dietSlice = createSlice({
  name: 'diet',
  initialState: {
    height: 0,
    gender: '',
    day: todayDate,
    water: 0,
    weight: 0,
    totalKcal: 0,
    mealDetailList: [],
    mealKcalSum: {},
  },
  reducers: {
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setDay: (state, action) => {
      state.day = action.payload;
    },
    updateDay: (state, action) => {
      const newDate = new Date(state.day);
      newDate.setDate(newDate.getDate() + action.payload); // +1 or -1 값으로 업데이트
      state.day = newDate.toISOString().split('T')[0];
    },
    setWaterAmount: (state, action) => {
      state.water = action.payload;
    },
    setWeightAmount: (state, action) => {
      state.weight = action.payload;
    },
    setTotalKcal: (state, action) => {
      state.totalKcal = action.payload;
    },
    setMealDetailList: (state, action) => {
      state.mealDetailList = action.payload;
    },
    setMealKcalSum: (state, action) => {
      state.mealKcalSum = action.payload;
    },
  },
});

export default dietSlice.reducer;
export const {
  setDay,
  updateDay,
  setWaterAmount,
  setWeightAmount,
  setTotalKcal,
  setHeight,
  setGender,
  setMealDetailList,
  setMealKcalSum,
} = dietSlice.actions;
