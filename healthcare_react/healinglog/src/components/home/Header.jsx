import React, { useContext, useEffect, useState } from 'react';
import Navi from './Navi';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getPayload } from '../util/JwtUtil';
import { useDispatch } from 'react-redux';
import { open, close } from '../../redux/modalSlice';
import NotificationModal from '../util/NotificationModal';
import { NotificationContext } from '../pages/Notification/NotificationProvider';
import { BASE_URL } from '../services/config';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Header = () => {
  const token = localStorage.getItem('token');
  const nick = getPayload(token, 'nick');
  const navi = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState();
  const [pushData, setPushData] = useState([]);
  const [boardNo, setBoardNo] = useState();
  const [num, setNum] = useState(0);

  // NotificationProvider에서 전달한 메시지 배열을 사용
  const { messages } = useContext(NotificationContext);

  // 새로운 알림이 있으면 아이콘 변경
  useEffect(() => {
    if (!token || token === 'null' || token === 'undefined' || token.trim() === '') {
      return;
    }
    getPushList();
    if (messages.length > 0) {
      setHasNewNotification(true);
    } else {
      setHasNewNotification(false);
    }
  }, [messages]);

  // 푸시 리스트 리렌더링
  useEffect(() => {
    if (!token || token === 'null' || token === 'undefined' || token.trim() === '') {
      return;
    }
    getPushList();
  }, [num]);

  //푸시 리스트 받아오기 함수
  const getPushList = async () => {
    if (!token || token === 'null' || token === 'undefined' || token.trim() === '') {
      return;
    }

    const response = await fetch(`${BASE_URL}/api/notification/getPushList`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('서버 응답 오류');
    }
    const data = await response.json();
    setPushData(data);
  };

  //푸시 확인처리 함수
  const checkPushCard = async (pushNo) => {
    const requestData = {
      no: pushNo,
    };
    const response = await fetch(`${BASE_URL}/api/notification/checkPushCard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      throw new Error('서버 응답 오류');
    }
    setNum(num + 1);
  };

  //푸시 삭제 함수
  const deletePushCard = async (pushNo) => {
    const requestData = {
      no: pushNo,
    };
    const response = await fetch(`${BASE_URL}/api/notification/deletePushCard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      throw new Error('서버 응답 오류');
    }

    toast.success('알림이 삭제되었습니다!', {
      position: 'bottom-right',
      autoClose: 2000, // 2초 뒤 닫힘
      hideProgressBar: false, // 진행 표시줄 표시
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });

    setNum(num + 1);
  };

  //푸시 전부 읽음 처리
  const checkPushAll = async () => {
    const response = await fetch(`${BASE_URL}/api/notification/checkPushAll`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('서버 응답 오류');
    }

    setNum(num + 1);
  };

  //푸시 전부 삭제 처리
  const deletePushAll = () => {
    Swal.fire({
      title: '전부 삭제하시겠습니까?', // 제목
      icon: 'question', // 아이콘 유형 (warning, success, error 등)
      showCancelButton: true, // 취소 버튼 표시
      confirmButtonColor: '#3085d6', // 등록 버튼 색상
      cancelButtonColor: '#d33', // 취소 버튼 색상
      confirmButtonText: '삭제', // 등록 버튼 텍스트
      cancelButtonText: '취소', // 취소 버튼 텍스트
    }).then(async (result) => {
      if (result.isConfirmed) {
        //패치 넣기
        const response = await fetch(`${BASE_URL}/api/notification/deletePushAll`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error('서버 응답 오류');
        }
        toast.success('알림이 전부 삭제되었습니다!', {
          position: 'bottom-right',
          autoClose: 2000, // 2초 뒤 닫힘
          hideProgressBar: false, // 진행 표시줄 표시
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
        setNum(num + 1);
      }
    });
  };

  //게시판 번호 받아오기 함수
  const getBoardNo = async (enrollDate) => {
    const response = await fetch(
      `${BASE_URL}/api/notification/getBoardNo?enrollDate=${encodeURIComponent(enrollDate)}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) {
      throw new Error('서버 응답 오류');
    }
    const data = await response.json();
    setBoardNo(data.boardNo);
  };

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
              src={
                hasNewNotification
                  ? '/img/notification_reddot.png' // 새 알림 있을 때 다른 이미지
                  : '/img/notification.png'
              }
              onClick={async () => {
                if (!isOpen) {
                  dispatch(open({ title: '알림 내역', value: 'block' }));
                  setIsOpen(true);
                  setHasNewNotification(false);
                  getPushList();
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
        <ControlDiv>
          <ReadAllDiv
            onClick={() => {
              checkPushAll();
            }}
          >
            전부 읽음 처리
          </ReadAllDiv>
          <DeleteAllDiv
            onClick={() => {
              deletePushAll();
            }}
          >
            전부 삭제
          </DeleteAllDiv>
        </ControlDiv>
        {pushData && pushData.length > 0 ? (
          pushData.map((push, index) => {
            // 마침표 후에 줄바꿈문자 넣음
            const replacedContent = push.content.replace(/\./g, '.\n');
            const dateObj = new Date(push.enrollDate);
            const month = dateObj.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
            const day = dateObj.getDate();
            return (
              <PushCard
                key={push.id || index}
                checkPush={push.checkYn}
                onClick={async () => {
                  if (replacedContent.includes('식단')) {
                    navi('/diet');
                    checkPushCard(push.no);
                  } else if (replacedContent.includes('물')) {
                    navi('/diet');
                    checkPushCard(push.no);
                  } else if (replacedContent.includes('운동')) {
                    navi('/aerobic');
                    checkPushCard(push.no);
                  } else if (replacedContent.includes('혈압')) {
                    navi('/bloodpressure');
                    checkPushCard(push.no);
                  } else if (replacedContent.includes('혈당')) {
                    navi('/bloodsugar');
                    checkPushCard(push.no);
                  } else if (replacedContent.includes('인슐린')) {
                    navi('/insulin');
                    checkPushCard(push.no);
                  } else if (replacedContent.includes('댓글')) {
                    checkPushCard(push.no);
                    getBoardNo(push.enrollDate);
                    navi(`/board/detail?bno=${boardNo}`);
                  }
                }}
              >
                <DayDiv>
                  <div>
                    {month}월 {day}일
                  </div>
                  <CloseBtn
                    src="/img/closeBtn2.png"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePushCard(push.no);
                    }}
                  />
                </DayDiv>
                <ContentDiv>{replacedContent}</ContentDiv>
              </PushCard>
            );
          })
        ) : (
          <div style={{ paddingTop: '20px' }}>알림이 없습니다</div>
        )}
        <ToastContainer />
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

const PushCard = styled.div`
  background-color: white;
  width: auto;
  height: auto;
  border-radius: 20px;
  margin-bottom: 16px;
  cursor: pointer;
  opacity: ${(props) => (props.checkPush === 'Y' ? 0.5 : 1)};
`;

const DayDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 14px;
  color: gray;
  padding: 10px;
`;

const ContentDiv = styled.div`
  font-size: 15px;
  white-space: pre-line;
  padding: 10px;

  max-height: 800px;
  overflow-y: auto;
`;

const CloseBtn = styled.img`
  width: 16px;
  display: grid;
  justify-self: end;
`;

const ControlDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 30px;
`;

const ReadAllDiv = styled.div`
  display: grid;
  font-size: 14px;
  cursor: pointer;
`;

const DeleteAllDiv = styled.div`
  display: grid;
  font-size: 14px;
  justify-self: end;
  cursor: pointer;
`;
