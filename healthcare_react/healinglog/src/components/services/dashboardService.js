import { BASE_URL } from './config';

const getDashboardData = async (currentMonday, currentSunday, token) => {
  const resp = await fetch(`${BASE_URL}/api/dashboard?currentMonday=${currentMonday}&currentSunday=${currentSunday}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const dashboardData = resp.json();
  return dashboardData;
};

const getDashboardSetting = async (token) => {
  const resp = await fetch(`${BASE_URL}/api/dashboard/setting`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const settingData = resp.json();
  return settingData;
};

const editDashboardSetting = async (settings, token) => {
  const resp = await fetch(`${BASE_URL}/api/dashboard/setting`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(settings),
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const result = resp.status;
  return result;
};

export { getDashboardData, getDashboardSetting, editDashboardSetting };
