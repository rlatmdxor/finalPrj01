import { BASE_URL } from './config';

const getMemberInfo = async (token) => {
  const resp = await fetch(`${BASE_URL}/api/member/mypage`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }

  const data = resp.json();
  return data;
};

const getTodayWater = async (day, token) => {
  const resp = await fetch(`${BASE_URL}/api/water`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      enrollDate: day,
    }),
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }

  const data = resp.json();
  return data;
};

const enrollTodayWater = async (day, inputData, token) => {
  const resp = await fetch(`${BASE_URL}/api/water/enroll`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      enrollDate: day,
      amount: inputData.amount,
    }),
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const result = resp.status;
  return result;
};

const getTodayWeight = async (day, token) => {
  const resp = await fetch(`${BASE_URL}/api/weight`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      enrollDate: day,
    }),
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const data = resp.json();
  return data;
};

const enrollTodayWeight = async (day, inputData, token) => {
  const resp = await fetch(`${BASE_URL}/api/weight/enroll`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      enrollDate: day,
      amount: inputData.amount,
    }),
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const result = resp.status;
  return result;
};

const getMealData = async (day, token) => {
  const resp = await fetch(`${BASE_URL}/api/diet`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      dietDay: day,
    }),
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const data = resp.json();
  return data;
};

const getDayData = async (month, token) => {
  const resp = await fetch(`${BASE_URL}/api/diet/report/day?month=${month}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const reportData = resp.json();
  return reportData;
};

const getWeekData = async (year, token) => {
  const resp = await fetch(`${BASE_URL}/api/diet/report/week?year=${year}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const reportData = resp.json();
  return reportData;
};

const getMonthData = async (year, token) => {
  const resp = await fetch(`${BASE_URL}/api/diet/report/month?year=${year}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const reportData = resp.json();
  return reportData;
};

export {
  getMemberInfo,
  getTodayWater,
  enrollTodayWater,
  getTodayWeight,
  enrollTodayWeight,
  getMealData,
  getDayData,
  getWeekData,
  getMonthData,
};
