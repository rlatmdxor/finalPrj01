import React from 'react';
import Title from '../../util/Title';
import Navi from '../../util/Navi';
import styled from 'styled-components';
import ContentLayout from '../../util/ContentLayout';
import HoneytipBoard from '../../pages/Board/HoneytipBoard';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 500px; // 항목수에 비례해서 주시면 됩니다.
  top: 20px;
  left: 40px;
  grid-template-columns: 5fr 7fr 6fr; // 글자수만큼 fr 주면 됩니다. ex) 유산소 3글자니까 3fr
`;
const AdminBoard = () => {
  return (
    <>
      <Title>꿀팁 게시판</Title>
      <NaviContainer>
        <Navi target="reported/honeytip" tag={'게시글 목록'}></Navi>
        <Navi target="reported/honeytip" tag={'게시글 신고현황'}></Navi>
        <Navi target="reported/honeytip/comment" tag={'댓글 신고현황'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <HoneytipBoard />
      </ContentLayout>
    </>
  );
};

export default AdminBoard;
