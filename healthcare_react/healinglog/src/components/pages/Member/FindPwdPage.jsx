import React, { useState } from 'react';
import Title from '../../util/Title';
import ContentLayout from '../../util/ContentLayout';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../services/config';

const FindPwdPage = () => {
  const navi = useNavigate();
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');

  // 제출 함수
  const handleSubmit = async () => {
    const requestData = {
      id: userId,
      email: userEmail,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/member/findPwd`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }

      const data = await response.json();

      setMessage(data.message);

      Swal.fire({
        title: '알림',
        text: data.message,
        icon: 'success',
        confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          // 확인 버튼 클릭 후 화면 전환
          if (data.message === '임시 비밀번호가 이메일로 전송되었습니다.') {
            navi('/login');
          }
        }
      });
    } catch (error) {
      console.error('fetch 에러', error);
    }
  };

  return (
    <>
      <Title>비밀번호 찾기</Title>
      <div />
      <ContentLayout>
        <BlankSpace />
        <FindPwdContainer>
          <div
            style={{
              display: 'grid',
              justifySelf: 'center',
              fontSize: '22px',
              marginTop: '50px',
              marginBottom: '0px',
            }}
          >
            이메일로 찾기
          </div>
          <InputContainer>
            <LabelTag>아이디</LabelTag>
            <InputTag
              type="text"
              placeholder="ID"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            />
          </InputContainer>
          <InputContainer>
            <LabelTag>이메일</LabelTag>
            <InputTag
              type="text"
              placeholder="EMAIL"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
          </InputContainer>
          <BtnContainer>
            <BtnTag onClick={handleSubmit}>찾기</BtnTag>
            <BtnTag
              onClick={() => {
                navi('/login');
              }}
            >
              취소
            </BtnTag>
          </BtnContainer>
        </FindPwdContainer>

        <BlankSpace />
      </ContentLayout>
    </>
  );
};

export default FindPwdPage;

const BlankSpace = styled.div`
  height: 100px;
`;

const FindPwdContainer = styled.div`
  display: grid;
  box-sizing: border-box;
  border: 1px solid lightgray;
  border-radius: 10px;
  width: 600px;
  height: 400px;
  justify-content: center;
  justify-self: center;
  grid-template-rows: 2fr 1fr 1fr 2fr;
`;

const InputContainer = styled.div`
  display: grid;
  height: 35px;
  grid-template-columns: 1.5fr 6fr;
`;

const LabelTag = styled.label`
  display: grid;
  align-self: center;
`;

const InputTag = styled.input`
  box-sizing: border-box;
  width: 200px;
  height: 35px;
  border: 1px solid gray;
  border-radius: 10px;
  align-self: center;
`;

const BtnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  margin-top: 30px;
`;

const BtnTag = styled.button`
  box-sizing: border-box;
  width: 100px;
  height: 40px;
  background-color: black;
  font-family: 'goorm-sans-bold';
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;
