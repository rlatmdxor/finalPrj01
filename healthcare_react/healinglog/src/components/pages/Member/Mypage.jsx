import React from 'react';
import Title from '../../util/Title';
import Btn from '../../util/Btn';
import styled, { useTheme } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
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
import Profile from '../../util/Profile';

const Mypage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { id, pwd, nick, name, address, email, phone, height, weight, profile } = useSelector((state) => state.join);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://127.0.0.1:80/api/member/mypage', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('data : ', data);

        dispatch(setId(data.id));
        dispatch(setPwd(data.pwd));
        dispatch(setNick(data.nick));
        dispatch(setName(data.name));
        dispatch(setAddress(data.address));
        dispatch(setEmail(data.email));
        dispatch(setPhone(data.phone));
        dispatch(setHeight(data.height));
        dispatch(setWeight(data.weight));
        dispatch(setProfile(data.profile));
      })
      .catch((error) => {
        console.error('fetch 오류:', error);
      });
  }, []);

  return (
    <>
      <Title>마이페이지</Title>
      <div />
      <Container>
        <InputContainer>
          <InputTitle>프로필 (선택)</InputTitle>

          <ProfileContainer>
            <Profile />
          </ProfileContainer>

          <BlankSpace></BlankSpace>

          <InputTitle>아이디</InputTitle>
          <JoinInput placeholder="value" className="id" type="text" value={'user01'} readOnly></JoinInput>
          <InputTitle>비밀번호</InputTitle>
          <JoinInput placeholder="value" className="pwd" type="password" value={pwd} readOnly></JoinInput>
          <InputTitle>닉네임</InputTitle>
          <JoinInput placeholder="value" className="nick" type="text" value={'구승용짱'} readOnly></JoinInput>
          <GreenBtnContainer>
            <Btn
              w={'150'}
              h={'40'}
              c={theme.green}
              str="계정정보 수정"
              fc={'white'}
              fs={'18'}
              f={(e) => dispatch(setPwd('123456789'))}
            />
          </GreenBtnContainer>

          <BlankSpace></BlankSpace>

          <InputTitle>이름</InputTitle>
          <JoinInput placeholder="value" className="name" type="text" value={'구승용'} readOnly></JoinInput>
          <InputTitle>주소</InputTitle>
          <JoinInput placeholder="value" className="address" type="text" value={address} readOnly></JoinInput>
          <InputTitle>이메일</InputTitle>
          <JoinInput
            placeholder="value"
            className="email"
            type="email"
            value={'kooseungyong@naver.com'}
            readOnly
          ></JoinInput>
          <InputTitle>주민등록번호</InputTitle>
          <JoinInput
            placeholder="value"
            className="residentNum"
            type="text"
            value={'900101-*******'}
            readOnly
          ></JoinInput>
          <GreenBtnContainer>
            <Btn
              w={'150'}
              h={'40'}
              c={theme.green}
              str="개인정보 수정"
              fc={'white'}
              fs={'18'}
              f={(e) => dispatch(setAddress('호산빌딩 362'))}
            />
          </GreenBtnContainer>

          <BlankSpace></BlankSpace>

          <InputTitle>키 (선택)</InputTitle>
          <JoinInput placeholder="value" className="height" type="number" value={'180'} readOnly></JoinInput>
          <InputTitle>몸무게 (선택)</InputTitle>
          <JoinInput placeholder="value" className="weight" type="number" value={weight} readOnly></JoinInput>
          <GreenBtnContainer>
            <Btn
              w={'150'}
              h={'40'}
              c={theme.green}
              str="신체정보 수정"
              fc={'white'}
              fs={'18'}
              f={(e) => dispatch(setWeight('80'))}
            />
          </GreenBtnContainer>
          <GreenBtnContainer>
            <Btn w={'150'} h={'40'} c={theme.green} str="푸시알람 설정" fc={'white'} fs={'18'} f={() => {}} />
          </GreenBtnContainer>
          <GrayBtnContainer>
            <Btn w={'150'} h={'40'} c={theme.gray} str="회원 탈퇴" fs={'18'} f={() => {}} />
          </GrayBtnContainer>
        </InputContainer>
      </Container>
    </>
  );
};

export default Mypage;

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

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 270px 1fr;
  margin-top: 10px;
  width: 450px;
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

const GreenBtnContainer = styled.div`
  display: grid;
  justify-content: end;
  align-content: end;
  margin-top: 20px;
`;

const GrayBtnContainer = styled.div`
  display: grid;
  justify-content: end;
  align-content: end;
  margin-top: 50px;
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
