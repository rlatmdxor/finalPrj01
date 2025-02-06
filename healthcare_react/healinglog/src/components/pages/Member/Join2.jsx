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
  setGender,
} from '../../../redux/JoinSlice';
import { useNavigate } from 'react-router-dom';
import ContentLayout from '../../util/ContentLayout';

const Join2 = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const heightOptions = Array.from({ length: 71 }, (_, i) => i + 140); // 140 ~ 210 cm
  const weightOptions = Array.from({ length: 81 }, (_, i) => i + 40); // 40 ~ 120 kg
  const genderOptions = [
    { value: 'male', label: '남성' },
    { value: 'female', label: '여성' },
  ];

  const { id, pwd, nick, name, address, email, residentNum, height, weight, profile, gender } = useSelector(
    (state) => state.join
  );

  const isSubmitEnabled = id && pwd && nick && name && address && email && residentNum;
  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      id,
      pwd,
      nick,
      name,
      address,
      email,
      residentNum,
      height,
      weight,
      profile,
      gender,
    };

    // 필요한 필드가 채워졌는지 확인
    if (!isSubmitEnabled) {
      console.log('실패');
      console.log(formData);
    }
    console.log('성공');
    console.log(formData);

    fetch('https://127.0.0.1:80/api/member/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('네트워크 오류 발생');
        }
        return response.json();
      })
      .then((result) => {
        console.log('성공:', result);
        // navigate('/');
      })
      .catch((error) => {
        console.error('전송 실패:', error);
      });
  };

  return (
    <>
      <Title>회원가입</Title>
      <div></div>
      <ContentLayout>
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

          <BlankSpace />

          <InputTitle>성별 (선택)</InputTitle>
          <SelectInput2 className="gender" value={gender} onChange={(e) => dispatch(setGender(e.target.value))}>
            <option value="">선택하세요</option>
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInput2>

          <div style={{ height: '30px' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <InputTitle>키 (선택)</InputTitle>
              <SelectInput className="height" value={height} onChange={(e) => dispatch(setHeight(e.target.value))}>
                <option value="">선택하세요</option>
                {heightOptions.map((h) => (
                  <option key={h} value={h}>
                    {h} cm
                  </option>
                ))}
              </SelectInput>
            </div>
            <div>
              <InputTitle>몸무게 (선택)</InputTitle>
              <SelectInput className="weight" value={weight} onChange={(e) => dispatch(setWeight(e.target.value))}>
                <option value="">선택하세요</option>
                {weightOptions.map((w) => (
                  <option key={w} value={w}>
                    {w} kg
                  </option>
                ))}
              </SelectInput>
            </div>
          </div>

          <BlankSpace />

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
                mt={'0'}
                mb={'0'}
                ml={'0'}
                mr={'0'}
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
                mt={'0'}
                mb={'0'}
                ml={'0'}
                mr={'0'}
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
            f={handleSubmit}
          />
        </InputContainer>
      </ContentLayout>
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
  grid-template-columns: 270px 1fr 1fr 70px;
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

const SelectInput = styled.select`
  width: 75%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;
  color: #333;

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const SelectInput2 = styled.select`
  width: 191.25px;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;
  color: #333;

  &:focus {
    outline: none;
    border-color: #666;
  }
`;
