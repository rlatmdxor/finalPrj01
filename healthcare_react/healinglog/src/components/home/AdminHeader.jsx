import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getPayload } from '../util/JwtUtil';
import AdminNavi from './AdminNavi';

const LogoAreaDiv = styled.div`
  border-bottom: 1px solid #7ca96d;
`;

const StyledImg = styled.img`
  cursor: pointer;
  box-sizing: border-box;
  margin-left: 8px;
  height: 115px;
`;

const ProfileDiv = styled.div`
  display: grid;
  height: 110px;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid #7ca96d;
  box-sizing: border-box;
  padding-top: 5px;
`;

const MypageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const LoginDiv = styled.div`
  display: grid;
  border-radius: 20px;
  border: 1px solid gray;
  align-items: center;
  width: 100px;
  height: 35px;
  font-size: 15px;
  cursor: pointer;
`;

const AdminHeader = () => {
  const token = localStorage.getItem('token');
  const nick = getPayload(token, 'nick');
  const navi = useNavigate();

  return (
    <>
      <LogoAreaDiv>
        <StyledImg src="/img/logo.png" onClick={() => navi('/admin/usermanage')} />
      </LogoAreaDiv>
      <AdminNavi />
      <ProfileDiv>
        <div style={{ fontWeight: 'bold' }}>{nick ? nick + '님' : 'GUEST'}</div>
        <MypageContainer>
          <LoginDiv onClick={() => (localStorage.setItem('token', ''), (window.location.href = '/admin/login'))}>
            <div>{token ? '로그아웃' : '로그인'}</div>
          </LoginDiv>
        </MypageContainer>
      </ProfileDiv>
    </>
  );
};

export default AdminHeader;
