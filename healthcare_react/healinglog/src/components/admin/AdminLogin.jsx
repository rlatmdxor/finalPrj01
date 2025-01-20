import React from 'react';
import styled from 'styled-components';
import Input from '../util/Input';
import Btn from '../util/Btn';

const StyledMain = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template: 1fr / 1fr 500px 1fr;
`;
const StyledMiddle = styled.div`
  display: grid;
  grid-template: 1fr 1fr / 1fr;
`;
const ImgLayout = styled.img`
  width: 100%;
  height: 100%;
`;
const StyledDiv = styled.div`
  width: 100%;
  height: 20px;
  font-size: 16px;
  font-weight: bold;
`;

const AdminLogin = () => {
  return (
    <>
      <StyledMain>
        <div></div>
        <StyledMiddle>
          <div>
            <ImgLayout src="/img/logo.png"></ImgLayout>
          </div>
          <div>
            <StyledDiv>관리자</StyledDiv>
            <Input type="text" size="size1" mt="50" placeholder="아이디"></Input>
            <Input type="password" size="size1" mt="25" placeholder="비밀번호"></Input>
            <Btn></Btn>
          </div>
        </StyledMiddle>
        <div></div>
      </StyledMain>
    </>
  );
};

export default AdminLogin;
