import { BASE_URL } from './config';

const getBannerList = async (token) => {
  const resp = await fetch(`${BASE_URL}/api/main/banner`, {
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

const getNoticeList = async (token) => {
  const resp = await fetch(`${BASE_URL}/api/main/notice`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const noticeList = resp.json();
  return noticeList;
};

const getBoardList = async (token) => {
  const resp = await fetch(`${BASE_URL}/api/main/board`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const boardList = resp.json();
  return boardList;
};

const getReviewList = async (token) => {
  const resp = await fetch(`${BASE_URL}/api/main/review`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error(`HTTP ERROR !!! ${resp.status}`);
  }
  const boardList = resp.json();
  return boardList;
};

export { getNoticeList, getBoardList, getReviewList, getBannerList };
