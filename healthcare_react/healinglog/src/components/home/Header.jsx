import React, { useState } from 'react';
import Navi from './Navi';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getPayload } from '../util/JwtUtil';
import Modal2 from '../util/Modal2';
import { useDispatch } from 'react-redux';
import { open, close } from '../../redux/modalSlice';
import NotificationModal from '../util/NotificationModal';

const Header = () => {
  const token = localStorage.getItem('token');
  const nick = getPayload(token, 'nick');
  const navi = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <LogoAreaDiv>
        <StyledImg src="/img/logo.png" onClick={() => navi('/')} />
      </LogoAreaDiv>
      <Navi />
      <ProfileDiv>
        {token ? (
          <AlarmDiv>
            <div style={{ fontWeight: 'bold', justifySelf: 'end', marginRight: '15px' }}>
              {nick ? nick + ' 님' : 'GUEST'}
            </div>
            <NoticeIcon
              src="/img/notification.png"
              onClick={() => {
                if (!isOpen) {
                  dispatch(open({ title: '알림 내역', value: 'block' }));
                  setIsOpen(true);
                } else {
                  dispatch(close('알림 내역'));
                  setIsOpen(false);
                }
              }}
            />
          </AlarmDiv>
        ) : (
          <>
            <div style={{ fontWeight: 'bold' }}>{nick ? nick + '님' : 'GUEST'}</div>
          </>
        )}

        <MypageContainer>
          <MypageDiv onClick={() => (window.location.href = '/mypage')}>
            <div>마이페이지</div>
          </MypageDiv>
          <LoginDiv onClick={() => (localStorage.removeItem('token'), (window.location.href = '/login'))}>
            <div>{token ? '로그아웃' : '로그인'}</div>
          </LoginDiv>
        </MypageContainer>
      </ProfileDiv>

      <NotificationModal title="알림 내역">
        <p>ㅋㅋ</p>
        <p>zz2</p>
      </NotificationModal>
    </>
  );
};

export default Header;

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

const MypageDiv = styled.div`
  display: grid;
  box-sizing: border-box;
  border-radius: 20px 0px 0px 20px;
  border: 1px solid gray;
  align-items: center;
  font-size: 15px;
  width: 100px;
  height: 35px;
  cursor: pointer;
`;

const LoginDiv = styled.div`
  display: grid;
  box-sizing: border-box;
  border-radius: 0px 20px 20px 0px;
  border: 1px solid gray;
  border-left: 0px;
  align-items: center;
  width: 100px;
  height: 35px;
  font-size: 15px;
  cursor: pointer;
`;

const AlarmDiv = styled.div`
  display: grid;
  box-sizing: border-box;
  width: 200px;
  justify-self: center;
  align-items: center;
  grid-template-columns: 2.5fr 1fr;
`;

const NoticeIcon = styled.img`
  width: 25px;
  cursor: pointer;
`;
