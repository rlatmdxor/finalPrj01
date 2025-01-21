import React, { useState } from 'react';
import Title from '../../util/Title';
import styled, { useTheme } from 'styled-components';
import Btn from '../../util/Btn';

const Join2 = () => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const theme = useTheme();
  const isSubmitEnabled = 1;
  return (
    <>
      <Container>
        <Title>회원가입</Title>
        <InputContainer>
          <InputTitle>아이디</InputTitle>
          <JoinInput placeholder="value" className="id" value={inputValue} onChange={handleInputChange}></JoinInput>
          <InputTitle>비밀번호</InputTitle>
          <JoinInput placeholder="value" value={''}></JoinInput>
          <InputTitle>닉네임</InputTitle>
          <JoinInput placeholder="value" value={''}></JoinInput>

          <BlankSpace></BlankSpace>

          <InputTitle>이름</InputTitle>
          <JoinInput placeholder="value" value={''}></JoinInput>
          <InputTitle>주소</InputTitle>
          <JoinInput placeholder="value" value={''}></JoinInput>
          <InputTitle>이메일</InputTitle>
          <JoinInput placeholder="value" value={''}></JoinInput>
          <InputTitle>주민등록번호</InputTitle>
          <JoinInput placeholder="value" value={''}></JoinInput>

          <BlankSpace></BlankSpace>

          <InputTitle>키 (선택)</InputTitle>
          <JoinInput placeholder="value" value={''}></JoinInput>
          <InputTitle>몸무게 (선택)</InputTitle>
          <JoinInput placeholder="value" value={''}></JoinInput>
          <InputTitle>프로필 (선택)</InputTitle>
          <ProfileContainer>
            <ProfileImg src="/img/profile.jpg"></ProfileImg>
            <BtnContainer>
              <Btn w={'100'} h={'50'} c={theme.orange} str="등록" fc={'white'} />
            </BtnContainer>
            <BtnContainer>
              <Btn w={'100'} h={'50'} c={theme.gray} str="삭제" />
            </BtnContainer>
          </ProfileContainer>
          <BlankSpace />
          <Btn
            type="submit"
            w={'450'}
            h={'60'}
            fs={'20'}
            str="회원가입"
            fc={'white'}
            c={() => {
              if (isSubmitEnabled) {
                return theme.green;
              } else {
                return theme.gray;
              }
            }}
          />
        </InputContainer>
      </Container>
    </>
  );
};

export default Join2;

const Container = styled.div`
  margin-bottom: 20px;
`;

const InputContainer = styled.form`
  display: grid;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const InputTitle = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const BlankSpace = styled.div`
  height: 100px;
`;

const JoinInput = styled.input`
  box-sizing: border-box;
  width: 450px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid gray;
  padding-left: 20px;
  margin-bottom: 20px;
  &::placeholder {
    color: #888;
    font-size: 16px;
  }
`;

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  margin-top: 10px;
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
`;

const BtnContainer = styled.div`
  display: grid;
  justify-content: end;
  align-content: end;
`;

const SubmitBtn = styled.input``;
