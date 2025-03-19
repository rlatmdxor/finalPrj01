import React from 'react';
import Title from '../../util/Title';
import Navi from '../../util/Navi';
import styled from 'styled-components';
import ContentLayout from '../../util/ContentLayout';
import HoneytipBoard from '../../pages/Board/HoneytipBoard';
import HospitalReview from '../../pages/Board/review/HospitalReview';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 500px;
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 6fr 6fr;
`;
const LayDiv = styled.div`
  height: 27px;
`;
const AdminReview = () => {
  return (
    <>
      <Title>병원 리뷰</Title>
      <NaviContainer>
        <Navi target="admin/review" tag={'리뷰 목록'}></Navi>
        <Navi target="admin/reported/review" tag={'리뷰 신고현황'}></Navi>
        <Navi target="admin/reported/review/comment" tag={'댓글 신고현황'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <LayDiv />
        <HospitalReview />
      </ContentLayout>
    </>
  );
};

export default AdminReview;
