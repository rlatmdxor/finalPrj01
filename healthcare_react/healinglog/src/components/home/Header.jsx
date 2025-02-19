import React, { useEffect } from 'react';
import Navi from './Navi';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getPayload } from '../util/JwtUtil';

const ImgLayout = styled.img`
  width: 140px;
  height: 130px;
`;

const StyledImg = styled.img`
  cursor: pointer;
  border-bottom: 1px solid #7ca96d;
  box-sizing: border-box;
  height: 110px;
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
  cursor: pointer;
`;

const LoginDiv = styled.div`
  display: grid;
  border-radius: 0px 20px 20px 0px;
  border: 1px solid gray;
  border-left: 0px;
  align-items: center;
  width: 100px;
  height: 35px;
  cursor: pointer;
`;

const Header = () => {
  const token = localStorage.getItem('token');
  const nick = getPayload(token, 'nick');
  const navi = useNavigate();

  return (
    <>
      <StyledImg src="/img/logo.png" onClick={() => navi('/')} />
      <Navi />
      <ProfileDiv>
        <div style={{ fontWeight: 'bold' }}>{nick ? nick + '님' : 'GUEST'}</div>
        <MypageContainer>
          <MypageDiv onClick={() => (window.location.href = '/mypage')}>
            <div>마이페이지</div>
          </MypageDiv>
          <LoginDiv onClick={() => (localStorage.setItem('token', ''), (window.location.href = '/login'))}>
            <div>{token ? '로그아웃' : '로그인'}</div>
          </LoginDiv>
        </MypageContainer>
      </ProfileDiv>
    </>
  );
};

export default Header;
