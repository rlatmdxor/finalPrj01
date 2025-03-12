import React, { useState } from 'react';
import Title from '../../util/Title';
import ContentLayout from '../../util/ContentLayout';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../services/config';

const FindIdPage = () => {
  const navi = useNavigate();
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [message, setMessage] = useState('');

  // 제출 함수
  const handleSubmit = async () => {
    const requestData = {
      name: userName,
      phone: userPhone,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/member/findId`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const message = await response.text();

      if (response.ok) {
        setMessage(message);
        setShowResult(true);
      } else {
        const errorData = await response.json();
        console.log(`등록 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.log('fetch 에러', error);
    }
  };

  return (
    <>
      <Title>아이디 찾기</Title>
      <div />
      <ContentLayout>
        <BlankSpace />
        {!showResult ? (
          <FindIdContainer>
            <div
              style={{
                display: 'grid',
                justifySelf: 'center',
                fontSize: '22px',
                marginTop: '50px',
                marginBottom: '0px',
              }}
            >
              휴대폰 본인확인
            </div>
            <InputContainer>
              <LabelTag>이름</LabelTag>
              <InputTag
                type="text"
                placeholder="이름"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </InputContainer>
            <InputContainer>
              <LabelTag>번호</LabelTag>
              <InputTag
                type="text"
                maxLength={'11'}
                placeholder="휴대폰번호를 '-'없이 입력"
                value={userPhone}
                onChange={(e) => {
                  setUserPhone(e.target.value);
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
          </FindIdContainer>
        ) : message === '등록된 정보가 없습니다.' ? (
          <ResultContainer>
            <ResultMessage>{message}</ResultMessage>
            <BtnContainer>
              <BtnTag2 onClick={() => setShowResult(false)}>다시 찾기</BtnTag2>
              <BtnTag2 onClick={() => navi('/join')}>회원가입</BtnTag2>
            </BtnContainer>
          </ResultContainer>
        ) : (
          <ResultContainer>
            <ResultMessage>{message}</ResultMessage>
            <BtnContainer>
              <BtnTag2 onClick={() => navi('/login')}>로그인</BtnTag2>
              <BtnTag2
                onClick={() => {
                  setShowResult(false);
                  navi('/findPwd');
                }}
              >
                비밀번호 찾기
              </BtnTag2>
            </BtnContainer>
          </ResultContainer>
        )}
        <BlankSpace />
      </ContentLayout>
    </>
  );
};

export default FindIdPage;

const BlankSpace = styled.div`
  height: 100px;
`;

const FindIdContainer = styled.div`
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

const ResultContainer = styled.div`
  display: grid;
  box-sizing: border-box;
  border: 1px solid lightgray;
  border-radius: 10px;
  width: 600px;
  height: 250px;
  justify-content: center;
  justify-self: center;
  align-items: center;
  text-align: center;
`;

const ResultMessage = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: black;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const BtnTag2 = styled.button`
  box-sizing: border-box;
  width: 140px;
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
  margin-left: 10px;
  margin-right: 10px;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;
