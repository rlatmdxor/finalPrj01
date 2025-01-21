import React from 'react';
import Title from '../../util/Title';
import styled from 'styled-components';
import Btn from '../../util/Btn';

const Join2 = () => {
  return (
    <>
      <Container>
        <Title>회원가입</Title>
        <InputContainer>
          <InputTitle>아이디</InputTitle>
          <JoinInput placeholder="value" value={''}></JoinInput>
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
            <Btn></Btn>
            <Btn></Btn>
          </ProfileContainer>
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
  grid-template-columns: 250px 1fr 1fr;
`;

const ProfileImg = styled.img`
  width: 125px;
  height: 125px;
`;
