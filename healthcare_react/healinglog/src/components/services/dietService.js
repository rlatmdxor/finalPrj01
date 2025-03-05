const getDayKcal = async (memberNo, month, token) => {
  const resp = await fetch(`http://127.0.0.1:80/api/diet/report/day?memberNo=${memberNo}&month=${month}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const kcalData = resp.json();
  return kcalData;
};

const getDayWater = async (memberNo, month, token) => {
  const resp = await fetch(`http://127.0.0.1:80/api/water/report/day?memberNo=${memberNo}&month=${month}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const waterData = resp.json();
  return waterData;
};

const getDayWeight = async (memberNo, month, token) => {
  const resp = await fetch(`http://127.0.0.1:80/api/weight/report/day?memberNo=${memberNo}&month=${month}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const weightData = resp.json();
  return weightData;
};

const getMonthAvgKcal = async (memberNo, year, token) => {
  const resp = await fetch(`http://127.0.0.1:80/api/diet/report/month?memberNo=${memberNo}&year=${year}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const kcalData = resp.json();
  return kcalData;
};

const getMonthAvgWater = async (memberNo, year, token) => {
  const resp = await fetch(`http://127.0.0.1:80/api/water/report/month?memberNo=${memberNo}&year=${year}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const waterData = resp.json();
  return waterData;
};

const getMonthAvgWeight = async (memberNo, year, token) => {
  const resp = await fetch(`http://127.0.0.1:80/api/weight/report/month?memberNo=${memberNo}&year=${year}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const weightData = resp.json();
  return weightData;
};

const getYearAvgKcal = async (memberNo, token) => {
  const resp = await fetch(`http://127.0.0.1:80/api/diet/report/year?memberNo=${memberNo}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const weightData = resp.json();
  return weightData;
};

const getYearAvgWater = async (memberNo, token) => {
  const resp = await fetch(`http://127.0.0.1:80/api/water/report/year?memberNo=${memberNo}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const weightData = resp.json();
  return weightData;
};

const getYearAvgWeight = async (memberNo, token) => {
  const resp = await fetch(`http://127.0.0.1:80/api/weight/report/year?memberNo=${memberNo}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const weightData = resp.json();
  return weightData;
};

const getMemberHeight = async (token) => {
  const resp = await fetch(`http://127.0.0.1:80/api/member/mypage`, {
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

const getTodayWater = async (memberNo, day, token) => {
  const resp = await fetch(`http://127.0.0.1:80/api/water`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      memberNo: memberNo,
      enrollDate: day,
    }),
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }

  const data = resp.json();
  return data;
};

const enrollTodayWater = async (memberNo, day, inputData, token) => {
  const resp = await fetch(`http://127.0.0.1:80/api/water/enroll`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      memberNo: memberNo,
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

const getTodayWeight = async (memberNo, day, token) => {
  const resp = await fetch(`http://127.0.0.1:80/api/weight`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      memberNo: memberNo,
      enrollDate: day,
    }),
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const data = resp.json();
  return data;
};

const enrollTodayWeight = async (memberNo, day, inputData, token) => {
  const resp = await fetch(`http://127.0.0.1:80/api/weight/enroll`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      memberNo: memberNo,
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

const getTotalKcal = async (memberNo, day, token) => {
  const resp = await fetch(`http://127.0.0.1:80/api/diet`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      memberNo: memberNo,
      dietDay: day,
    }),
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const data = resp.json();
  return data;
};

const getMealData = async (memberNo, day, token) => {
  const resp = await fetch(`http://127.0.0.1:80/api/diet`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      memberNo: memberNo,
      dietDay: day,
    }),
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const data = resp.json();
  return data;
};

export {
  getMemberHeight,
  getTodayWater,
  enrollTodayWater,
  getTodayWeight,
  enrollTodayWeight,
  getMealData,
  getDayKcal,
  getDayWater,
  getDayWeight,
  getMonthAvgKcal,
  getMonthAvgWater,
  getMonthAvgWeight,
  getYearAvgKcal,
  getYearAvgWater,
  getYearAvgWeight,
};
