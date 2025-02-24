import React from 'react';
import ContentLayout from '../util/ContentLayout';

const Main = () => {
  return (
    <>
      <h1>메인 배너</h1>
      <ContentLayout>
        <h1>공지사항</h1>
        <h1>이번주 꿀팁</h1>
        <h1>최근 병원 리뷰</h1>
      </ContentLayout>
    </>
  );
};

export default Main;
