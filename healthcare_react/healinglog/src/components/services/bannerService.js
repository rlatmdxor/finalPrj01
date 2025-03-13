import { BASE_URL } from './config';

const getBannerList = async (showYn, searchValue, token) => {
  const resp = await fetch(`${BASE_URL}/api/banner?showYn=${showYn}&searchValue=${searchValue}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const bannerList = resp.json();
  return bannerList;
};

const enrollBanner = async (formData, token) => {
  const resp = await fetch(`${BASE_URL}/api/banner/enroll`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const result = resp.status;
  return result;
};

const editBanner = async (formData, token) => {
  const resp = await fetch(`${BASE_URL}/api/banner/edit`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const result = resp.status;
  return result;
};

const deleteBanner = async (no, token) => {
  const resp = await fetch(`${BASE_URL}/api/banner/delete?no=${no}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const result = resp.status;
  return result;
};

const multiDeleteBanner = async (noList, token) => {
  const resp = await fetch(`${BASE_URL}/api/banner/delete`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(noList),
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const result = resp.status;
  return result;
};

export { getBannerList, enrollBanner, editBanner, deleteBanner, multiDeleteBanner };
