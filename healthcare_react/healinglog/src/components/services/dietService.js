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

export {
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
