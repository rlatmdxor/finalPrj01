import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../util/Title';
import styled, { useTheme } from 'styled-components';
import Btn from '../../util/Btn';
import {
  setId,
  setPwd,
  setNick,
  setName,
  setEmail,
  setEmailFront,
  setEmailDomain,
  setHeight,
  setWeight,
  setProfile,
  setGender,
  setAddress,
  setPhone,
} from '../../../redux/JoinSlice';
import { useNavigate } from 'react-router-dom';
import ContentLayout from '../../util/ContentLayout';
import PostCode from '../../util/PostCode';
import Profile from './Profile';

const Join2 = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const heightOptions = Array.from({ length: 71 }, (_, i) => i + 140); // 140 ~ 210 cm
  const weightOptions = Array.from({ length: 81 }, (_, i) => i + 40); // 40 ~ 120 kg
  const genderOptions = [
    { value: 'male', label: '남성' },
    { value: 'female', label: '여성' },
  ];

  const { id, pwd, nick, name, email, emailFront, emailDomain, gender, height, weight, profile, address, phone } =
    useSelector((state) => state.join);

  const [zoneAddress, setZoneAddress] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const formData = {
    id,
    pwd,
    nick,
    name,
    address,
    email,
    gender,
    height,
    weight,
    profile,
    phone,
  };

  ////////////////////////////중복 및 유효성 검사 시작///////////////////////////////////
  //Id 중복검사를 위한 db데이터와 비교(길이 검사도 같이함)
  const [idCheckMsg, setIdCheckMsg] = useState('');
  useEffect(() => {
    console.log(id.length);
    console.log(idCheckMsg);

    if (id.length === 0 || id.length === 1 || id.length === 2) {
      setIdCheckMsg('');
      return;
    }

    if (id.length < 6) {
      setIdCheckMsg('아이디가 너무 짧습니다.');
      return;
    }

    fetch('http://127.0.0.1:80/api/member/checkId', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((resp) => resp.text())
      .then((fetchedData) => setIdCheckMsg(fetchedData));
  }, [id]);

  //Pwd 길이 검사
  const [pwdCheckMsg, setPwdCheckMsg] = useState('');
  useEffect(() => {
    if (pwd.length >= 8 && pwd.length <= 16) {
      setPwdCheckMsg('사용 가능한 비밀번호 입니다.');
    } else if (pwd.length === 0 || pwd.length === null || pwd.length === undefined) {
      setPwdCheckMsg('');
    } else {
      setPwdCheckMsg('비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.');
    }
  }, [pwd]);

  //닉네임 길이 검사
  const [nickCheckMsg, setNickCheckMsg] = useState('');
  useEffect(() => {
    if (nick.length >= 2 && nick.length <= 8) {
      setNickCheckMsg('사용 가능한 닉네임 입니다.');
    } else if (nick.length === 0 || nick.length === null || nick.length === undefined) {
      setNickCheckMsg('');
    } else {
      setNickCheckMsg('닉네임: 2~8자의 영문 대/소문자, 숫자, 한글을 사용해 주세요.');
    }
  }, [nick]);

  //이름 길이 검사
  const [nameCheckMsg, setNameCheckMsg] = useState('');
  useEffect(() => {
    if (name.length >= 2 && name.length <= 4) {
      setNameCheckMsg('');
    } else if (name.length === 0 || name.length === null || name.length === undefined) {
      setNameCheckMsg('');
    } else {
      setNameCheckMsg('올바른 이름을 입력하세요.');
    }
  }, [name]);

  //이메일 길이 검사 && 유효성 검사
  const [emailCheckMsg, setEmailCheckMsg] = useState('');
  useEffect(() => {
    if (email.length < 12) {
      setEmailCheckMsg('이메일이 너무 짧습니다.');
      return;
    }

    fetch('http://127.0.0.1:80/api/member/checkEmail', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((resp) => resp.text())
      .then((fetchedData) => setEmailCheckMsg(fetchedData));
  }, [email]);

  //전화번호 길이 검사 && 유효성 검사
  const [phoneCheckMsg, setPhoneCheckMsg] = useState('');
  useEffect(() => {
    if (phone.length < 11) {
      return;
    }

    fetch('http://127.0.0.1:80/api/member/checkPhone', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ phone }),
    })
      .then((resp) => resp.text())
      .then((fetchedData) => setPhoneCheckMsg(fetchedData));
  }, [phone]);
  ///////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////중복 및 유효성 검사 끝///////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  //제출 활성화
  const isSubmitEnabled =
    idCheckMsg === '사용 가능한 아이디입니다.' &&
    pwdCheckMsg === '사용 가능한 비밀번호 입니다.' &&
    nickCheckMsg === '사용 가능한 닉네임 입니다.' &&
    name &&
    zoneAddress &&
    roadAddress &&
    detailAddress &&
    emailCheckMsg === '사용 가능한 이메일입니다.' &&
    phoneCheckMsg === '사용 가능한 전화번호입니다.';

  const handleAddressComplete = (data) => {
    setZoneAddress(data.zoneAddress);
    setRoadAddress(data.roadAddress);
    setDetailAddress(data.detailAddress);
  };

  useEffect(() => {
    dispatch(setEmail(emailFront + '@' + emailDomain));
    dispatch(setAddress(zoneAddress + ' ' + roadAddress + ' ' + detailAddress));
    console.log(formData);
    console.log(isSubmitEnabled);
  }, [emailFront, emailDomain, zoneAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isSubmitEnabled) {
      console.log('실패');
      alert('필수 입력 항목을 다시 확인하세요.');
      return;
    }
    console.log('성공');
    console.log(formData);

    const fd = new FormData();
    fd.append('id', id);
    fd.append('pwd', pwd);
    fd.append('name', name);
    fd.append('nick', nick);
    fd.append('address', address);
    fd.append('email', email);
    fd.append('gender', gender);
    fd.append('height', height);
    fd.append('weight', weight);
    fd.append('profile', profile);
    fd.append('phone', phone);
    console.log(fd);

    fetch('http://127.0.0.1:80/api/member/join', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
      },
      body: fd,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('네트워크 오류 발생');
        }
        return response.json();
      })
      .then((result) => {
        console.log('성공:', result);
        navigate('/login');
      })
      .catch((error) => {
        console.error('전송 실패:', error);
      });
  };

  return (
    <>
      <Title>회원가입</Title>
      <div />
      <ContentLayout>
        <InputContainer>
          <InputTitle>아이디</InputTitle>
          <JoinInput
            placeholder="6자 이상, 15자 이하"
            className="id"
            type="text"
            value={id}
            maxLength={15}
            onChange={(e) => dispatch(setId(e.target.value))}
          ></JoinInput>
          <CheckMsg isNoProblem={idCheckMsg === '사용 가능한 아이디입니다.'}>{idCheckMsg}</CheckMsg>

          <InputTitle>비밀번호</InputTitle>
          <JoinInput
            placeholder="8자 이상, 16자 이하"
            className="pwd"
            type="password"
            value={pwd}
            maxLength={16}
            onChange={(e) => dispatch(setPwd(e.target.value))}
          ></JoinInput>
          <CheckMsg isNoProblem={pwdCheckMsg === '사용 가능한 비밀번호 입니다.'}>{pwdCheckMsg}</CheckMsg>

          <InputTitle>닉네임</InputTitle>
          <JoinInput
            placeholder="2자 이상, 8자 이하"
            className="nick"
            type="text"
            value={nick}
            onChange={(e) => dispatch(setNick(e.target.value))}
          ></JoinInput>
          <CheckMsg isNoProblem={nickCheckMsg === '사용 가능한 닉네임 입니다.'}>{nickCheckMsg}</CheckMsg>

          <BlankSpace></BlankSpace>

          <InputTitle>이름</InputTitle>
          <JoinInput
            placeholder="value"
            className="name"
            type="text"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
          ></JoinInput>
          <CheckMsg isNoProblem={nameCheckMsg === ''}>{nameCheckMsg}</CheckMsg>

          <InputTitle>주소</InputTitle>
          <PostCode receiveData={handleAddressComplete} />

          <InputTitle>이메일</InputTitle>
          <EmailContainer>
            <EmailInput
              placeholder="value"
              className="email1"
              type="text"
              maxLength="20"
              value={emailFront}
              onChange={(e) => dispatch(setEmailFront(e.target.value))}
            />
            <Alpha>@</Alpha>
            <EmailInput
              placeholder="value"
              className="email2"
              type="text"
              maxLength="12"
              value={emailDomain}
              onChange={(e) => dispatch(setEmailDomain(e.target.value))}
            />
          </EmailContainer>
          <CheckMsg isNoProblem={emailCheckMsg === '사용 가능한 이메일입니다.'}>{emailCheckMsg}</CheckMsg>

          <InputTitle>전화번호</InputTitle>
          <JoinInput
            placeholder="숫자만 입력하세요"
            className="phone"
            type="text"
            maxLength="11"
            value={phone}
            onChange={(e) => dispatch(setPhone(e.target.value))}
          />
          <CheckMsg isNoProblem={phoneCheckMsg === '사용 가능한 전화번호입니다.'}>{phoneCheckMsg}</CheckMsg>

          <BlankSpace />

          <InputTitle>성별 (선택)</InputTitle>
          <SelectInput2
            className="gender"
            value={gender === 'm' ? '남성' : gender === 'f' ? '여성' : ''}
            onChange={(e) => {
              const selectedValue = e.target.value;
              let mappedValue = '';

              if (selectedValue === '남성') {
                mappedValue = 'm';
              } else if (selectedValue === '여성') {
                mappedValue = 'f';
              }

              dispatch(setGender(mappedValue));
            }}
          >
            <option value="">선택하세요</option>
            {genderOptions.map((option) => (
              <option key={option.value} value={option.label}>
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
            <Profile />
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

const EmailContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 200px 50px 200px;
`;

const EmailInput = styled.input`
  box-sizing: border-box;
  width: 200px;
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

const Alpha = styled.div`
  display: grid;
  box-sizing: border-box;
  width: 50px;
  height: 40px;
  margin-bottom: 10px;
  justify-items: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
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
  grid-template-columns: 250px 187.5px 1fr;
  margin-top: 10px;
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

const CheckMsg = styled.div`
  display: grid;
  color: ${(props) => (props.isNoProblem ? 'green' : 'red')};
  margin-bottom: 10px;
`;
