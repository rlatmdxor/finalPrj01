import React from 'react';
import Navi from './Navi';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ImgLayout = styled.img`
  width: 140px;
  height: 130px;
`;

const StyledLink = styled(Link)`
  border-bottom: 1px solid #7ca96d;
  box-sizing: border-box;
  height: 110px;
`;

const ProfileLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const ProfileDiv = styled.div`
  display: grid;
  height: 110px;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid #7ca96d;
  box-sizing: border-box;
`;

const MypageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MypageDiv = styled.div`
  display: grid;
  border-radius: 20px 0px 0px 20px;
  border: 1px solid gray;
  align-items: center;
  width: 100px;
  height: 35px;
`;

const LoginDiv = styled.div`
  display: grid;
  border-radius: 0px 20px 20px 0px;
  border: 1px solid gray;
  border-left: 0px;
  align-items: center;
  width: 100px;
  height: 35px;
`;

const Header = () => {
  return (
    <>
      <StyledLink to={'/'}>
        <ImgLayout src="/img/logo.png"></ImgLayout>
      </StyledLink>
      <Navi></Navi>
      <ProfileDiv>
        <div>구승용짱</div>
        <MypageContainer>
          <MypageDiv>
            <ProfileLink to={'mypage'}>
              <div>마이페이지</div>
            </ProfileLink>
          </MypageDiv>
          <LoginDiv>
            <ProfileLink to={'login'}>로그아웃</ProfileLink>
          </LoginDiv>
        </MypageContainer>
      </ProfileDiv>
    </>
  );
};

export default Header;
