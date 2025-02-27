const getDashboardData = async (currentMonday, currentSunday, memberNo, token) => {
  const resp = await fetch(
    `http://127.0.0.1:80/api/dashboard?currentMonday=${currentMonday}&currentSunday=${currentSunday}&memberNo=${memberNo}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const dashboardData = resp.json();
  return dashboardData;
};

const getDashboardSetting = async (memberNo, token) => {
  const resp = await fetch(`http://127.0.0.1:80/api/dashboard/setting?memberNo=${memberNo}`, {
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
  const resp = await fetch(`http://127.0.0.1:80/api/dashboard/setting`, {
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
  const result = resp.text();
  return result;
};

export { getDashboardData, getDashboardSetting, editDashboardSetting };
