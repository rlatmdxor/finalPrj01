import React, { useEffect } from 'react';
import Title from '../../../util/Title';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';
import styled from 'styled-components';

const Bookmark = () => {
  const token = localStorage.getItem('token');
  //페이지 첫렌더링 시 데이터 가져오기
  useEffect(() => {
    fetch('http://127.0.0.1:80/api/exercise/anaerobic/bookmark', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('data : ', data);
      })
      .catch((error) => {
        console.error('fetch 오류:', error);
      });
  }, []);

  // useEffect(() => {
  //   dispatch(close('운동시작'));
  // }, []);

  return (
    <>
      <Title>운동</Title>
      <NaviContainer>
        <Navi target="bookmark" tag={'즐겨찾기'}></Navi>
        <Navi target="aerobic" tag={'유산소'}></Navi>
        <Navi target="anaerobic" tag={'무산소'}></Navi>
        <Navi target="exhistory" tag={'내역 관리'}></Navi>
        <Navi target="exreport" tag={'리포트'}></Navi>
      </NaviContainer>

      <ContentLayout></ContentLayout>
    </>
  );
};

export default Bookmark;

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 500px;
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 3fr 3fr 4fr 3fr;
`;
