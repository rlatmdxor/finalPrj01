import React from 'react';
import Title from '../../util/Title';
import Navi from '../../util/Navi';
import styled from 'styled-components';
import ContentLayout from '../../util/ContentLayout';
import HoneytipBoard from '../../pages/Board/HoneytipBoard';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 500px;
  top: 20px;
  left: 40px;
  grid-template-columns: 5fr 7fr 6fr;
`;
const LayDiv = styled.div`
  height: 27px;
`;
const AdminBoard = () => {
  return (
    <>
      <Title>꿀팁 게시판</Title>
      <NaviContainer>
        <Navi target="admin/board" tag={'게시글 목록'}></Navi>
        <Navi target="admin/reported/honeytip" tag={'게시글 신고현황'}></Navi>
        <Navi target="admin/reported/honeytip/comment" tag={'댓글 신고현황'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <LayDiv />
        <HoneytipBoard />
      </ContentLayout>
    </>
  );
};

export default AdminBoard;
