import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../util/Title';
import styled, { useTheme } from 'styled-components';
import Btn from '../../util/Btn';
import {
  setId,
  setPwd,
  setNick,
  setName,
  setAddress,
  setEmail,
  setResidentNum,
  setHeight,
  setWeight,
  setProfile,
} from '../../../redux/JoinSlice';
import { useNavigate } from 'react-router-dom';

const Join2 = () => {
  const dispatch = useDispatch();
  const { id, pwd, nick, name, address, email, residentNum, height, weight, profile } = useSelector(
    (state) => state.join
  );
  const theme = useTheme();
  const isSubmitEnabled = id && pwd && nick && name && address && email && residentNum;
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Title>회원가입</Title>
        <InputContainer>
          <InputTitle>아이디</InputTitle>
          <JoinInput
            placeholder="value"
            className="id"
            type="text"
            value={id}
            onChange={(e) => dispatch(setId(e.target.value))}
          ></JoinInput>
          <InputTitle>비밀번호</InputTitle>
          <JoinInput
            placeholder="value"
            className="pwd"
            type="password"
            value={pwd}
            onChange={(e) => dispatch(setPwd(e.target.value))}
          ></JoinInput>
          <InputTitle>닉네임</InputTitle>
          <JoinInput
            placeholder="value"
            className="nick"
            type="text"
            value={nick}
            onChange={(e) => dispatch(setNick(e.target.value))}
          ></JoinInput>

          <BlankSpace></BlankSpace>

          <InputTitle>이름</InputTitle>
          <JoinInput
            placeholder="value"
            className="name"
            type="text"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
          ></JoinInput>
          <InputTitle>주소</InputTitle>
          <JoinInput
            placeholder="value"
            className="address"
            type="text"
            value={address}
            onChange={(e) => dispatch(setAddress(e.target.value))}
          ></JoinInput>
          <InputTitle>이메일</InputTitle>
          <JoinInput
            placeholder="value"
            className="email"
            type="email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          ></JoinInput>
          <InputTitle>주민등록번호</InputTitle>
          <JoinInput
            placeholder="value"
            className="residentNum"
            type="text"
            value={residentNum}
            onChange={(e) => dispatch(setResidentNum(e.target.value))}
          ></JoinInput>

          <BlankSpace></BlankSpace>

          <InputTitle>키 (선택)</InputTitle>
          <JoinInput
            placeholder="value"
            className="height"
            type="number"
            value={height}
            onChange={(e) => dispatch(setHeight(e.target.value))}
          ></JoinInput>
          <InputTitle>몸무게 (선택)</InputTitle>
          <JoinInput
            placeholder="value"
            className="weight"
            type="number"
            value={weight}
            onChange={(e) => dispatch(setWeight(e.target.value))}
          ></JoinInput>
          <InputTitle>프로필 (선택)</InputTitle>
          <ProfileContainer>
            <ProfileImg src={profile}></ProfileImg>
            <BtnContainer>
              <Btn
                w={'70'}
                h={'40'}
                c={theme.orange}
                str="등록"
                fc={'white'}
                f={(e) => dispatch(setProfile('/img/profile.jpg'))}
              />
            </BtnContainer>
            <BtnContainer>
              <Btn
                w={'70'}
                h={'40'}
                c={theme.gray}
                str="삭제"
                fs={'18'}
                fc={'black'}
                f={(e) => dispatch(setProfile(''))}
              />
            </BtnContainer>
          </ProfileContainer>
          <BlankSpace />
          <Btn
            type="submit"
            w={'450'}
            h={'50'}
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
            f={() => {
              if (isSubmitEnabled) {
                navigate('/');
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
  height: 50px;
`;

const JoinInput = styled.input`
  box-sizing: border-box;
  width: 450px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid gray;
  padding-left: 20px;
  margin-bottom: 10px;
  &::placeholder {
    color: #888;
    font-size: 16px;
  }
`;

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 270px 1fr 1fr;
  margin-top: 10px;
`;

const ProfileImg = styled.img`
  width: 125px;
  height: 125px;
`;

const BtnContainer = styled.div`
  display: grid;
  justify-content: end;
  align-content: end;
  margin-bottom: 10px;
`;
