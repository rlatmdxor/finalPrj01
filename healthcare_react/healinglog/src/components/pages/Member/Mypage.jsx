import React, { useEffect, useState } from 'react';
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
  setPhone,
  setHeight,
  setWeight,
  setProfile,
} from '../../../redux/JoinSlice';
import { open, close } from '../../../redux/modalSlice';
import MyProfile from './MyProfile';
import Modal from '../../util/Modal';
import Input from '../../util/Input';
import ContentLayout from '../../util/ContentLayout';
import Postcode from '../../util/PostCode';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';
import Modal2 from '../../util/Modal2';

const Mypage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navi = useNavigate();
  const { id, pwd, nick, name, address, email, phone, height, weight, profile } = useSelector((state) => state.join);
  const [newNick, setNewNick] = useState('');
  const heightOptions = Array.from({ length: 71 }, (_, i) => i + 140); // 140 ~ 210 cm
  const weightOptions = Array.from({ length: 81 }, (_, i) => i + 40); // 40 ~ 120 kg
  const [settings, setSettings] = useState({
    전체푸시: true,
    식단푸시: false,
    물섭취푸시: true,
    운동푸시: true,
    댓글푸시: false,
    혈압푸시: true,
    혈당푸시: false,
    인슐린투약푸시: false,
  });

  const handleToggle = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };
  const token = localStorage.getItem('token');

  if (!token) {
    alert('로그인 정보가 없습니다.');
    window.location.href = '/login';
  }

  ///////////////// 주소 관련 데이터////////////////
  const [zoneAddress, setZoneAddress] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [newAddress, setNewAddress] = useState('');

  const handleAddressComplete = (data) => {
    setZoneAddress(data.zoneAddress);
    setRoadAddress(data.roadAddress);
    setDetailAddress(data.detailAddress);
  };

  useEffect(() => {
    setNewAddress(zoneAddress + ' ' + roadAddress + ' ' + detailAddress);
  }, [zoneAddress, roadAddress, detailAddress]);
  ////////////////////////////////////////////////////
  ///////////////// 전화번호 관련 데이터 //////////////
  //전화번호 길이 검사 && 유효성 검사
  const [newPhone, setNewPhone] = useState('');
  const [phoneCheckMsg, setPhoneCheckMsg] = useState('');
  useEffect(() => {
    if (newPhone.length < 11) {
      return;
    }
    const formDataForCheck = new FormData();
    formDataForCheck.append('phone', newPhone);

    fetch('http://127.0.0.1:80/api/member/checkPhoneForModal', {
      method: 'POST',
      headers: {
        // 'content-type': 'application/json',
      },
      body: formDataForCheck,
    })
      .then((resp) => resp.text())
      .then((fetchedData) => setPhoneCheckMsg(fetchedData));
  }, [newPhone]);
  //////////////////////////////////////////////////////
  /////////////////// 비밀번호 관련 데이터 ///////////////
  const [pwdCheckMsg, setPwdCheckMsg] = useState('');
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  useEffect(() => {
    if (newPwd.length >= 8 && newPwd.length <= 16) {
      setPwdCheckMsg('사용 가능한 비밀번호 입니다.');
    } else if (newPwd.length === 0 || newPwd.length === null || newPwd.length === undefined) {
      setPwdCheckMsg('');
    } else {
      setPwdCheckMsg('비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.');
    }
  }, [newPwd]);
  //////////////////////////////////////////////////////
  /////////////////신체 정보 관련 데이터 ////////////////
  const [newHeight, setNewHeight] = useState('');
  const [newWeight, setNewWeight] = useState('');
  //////////////////////////////////////////////////////

  //페이지 첫렌더링 시 데이터 가져오기
  useEffect(() => {
    fetch('http://127.0.0.1:80/api/member/mypage', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
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

  //모달 리셋함수
  const reset = () => {
    // setNick(nick);
  };

  return (
    <>
      <Title>마이페이지</Title>
      <div />
      <ContentLayout>
        <InputContainer>
          <InputTitle>프로필 (선택)</InputTitle>
          <ProfileContainer>
            <MyProfile />
          </ProfileContainer>

          <BlankSpace></BlankSpace>

          <InputTitle>아이디</InputTitle>
          <JoinInput placeholder="value" className="id" type="text" value={id} readOnly></JoinInput>
          <InputTitle>비밀번호</InputTitle>
          <JoinInput placeholder="value" className="pwd" type="password" value={pwd} readOnly></JoinInput>
          <InputTitle>닉네임</InputTitle>
          <JoinInput placeholder="value" className="nick" type="text" value={nick} readOnly></JoinInput>
          <GreenBtnContainer2>
            <div />
            <Btn
              w={'150'}
              h={'40'}
              c={theme.green}
              str="비밀번호 변경"
              fc={'white'}
              fs={'18'}
              f={(e) => {
                reset();
                dispatch(open({ title: '비밀번호 변경', value: 'block' }));
              }}
              mt={'0'}
              mb={'0'}
              ml={'0'}
              mr={'0'}
            />

            <Btn
              w={'150'}
              h={'40'}
              c={theme.green}
              str="닉네임 변경"
              fc={'white'}
              fs={'18'}
              f={(e) => {
                reset();
                dispatch(open({ title: '닉네임 변경', value: 'block' }));
              }}
              mt={'0'}
              mb={'0'}
              ml={'0'}
              mr={'0'}
            />
          </GreenBtnContainer2>

          <BlankSpace></BlankSpace>

          <InputTitle>이름</InputTitle>
          <JoinInput placeholder="value" className="name" type="text" value={name} readOnly></JoinInput>
          <InputTitle>주소</InputTitle>
          <JoinInput placeholder="value" className="address" type="text" value={address} readOnly></JoinInput>
          <InputTitle>이메일</InputTitle>
          <JoinInput placeholder="value" className="email" type="email" value={email} readOnly></JoinInput>
          <InputTitle>전화번호</InputTitle>
          <JoinInput placeholder="value" className="phone" type="text" value={phone} readOnly></JoinInput>
          <GreenBtnContainer2>
            <div />
            <Btn
              w={'150'}
              h={'40'}
              c={theme.green}
              str="주소 수정"
              fc={'white'}
              fs={'18'}
              f={(e) => {
                reset();
                dispatch(open({ title: '주소 수정', value: 'block' }));
              }}
              mt={'0'}
              mb={'0'}
              ml={'0'}
              mr={'0'}
            />
            <Btn
              w={'150'}
              h={'40'}
              c={theme.green}
              str="전화번호 변경"
              fc={'white'}
              fs={'18'}
              f={(e) => {
                reset();
                dispatch(open({ title: '전화번호 변경', value: 'block' }));
              }}
              mt={'0'}
              mb={'0'}
              ml={'0'}
              mr={'0'}
            />
          </GreenBtnContainer2>

          <BlankSpace></BlankSpace>

          <InputTitle>키</InputTitle>
          <JoinInput placeholder="value" className="height" type="number" value={height} readOnly></JoinInput>
          <InputTitle>몸무게</InputTitle>
          <JoinInput placeholder="value" className="weight" type="number" value={weight} readOnly></JoinInput>
          <GreenBtnContainer2>
            <div />
            <Btn
              w={'150'}
              h={'40'}
              c={theme.green}
              str="신체정보 수정"
              fc={'white'}
              fs={'18'}
              f={(e) => {
                reset();
                dispatch(open({ title: '신체정보 변경', value: 'block' }));
              }}
              mt={'0'}
              mb={'0'}
              ml={'0'}
              mr={'0'}
            />
            <Btn
              w={'150'}
              h={'40'}
              c={theme.green}
              str="푸시알람 설정"
              fc={'white'}
              fs={'18'}
              f={() => {
                reset();
                dispatch(open({ title: '푸시알람 설정', value: 'block' }));
              }}
              mt={'0'}
              mb={'0'}
              ml={'0'}
              mr={'0'}
            />
          </GreenBtnContainer2>
          <GrayBtnContainer>
            <Btn
              w={'150'}
              h={'40'}
              c={theme.gray}
              str="회원 탈퇴"
              fs={'18'}
              f={(e) => {
                if (window.confirm('정말 탈퇴하시겠습니까?')) {
                  fetch('http://127.0.0.1:80/api/member/withdrawal', {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                    .then((resp) => resp.text())
                    .then((data) => localStorage.removeItem('token'), (window.location.href = '/login'));
                  alert('탈퇴 처리 되었습니다.');
                }
              }}
              mt={'0'}
              mb={'0'}
              ml={'0'}
              mr={'0'}
            />
          </GrayBtnContainer>
        </InputContainer>

        {/* 여기부터 모달 */}
        {/* 비밀번호 모달 */}
        <Modal title="비밀번호 변경">
          <Input
            type="text"
            name="currentPwd"
            title="현재 비밀번호"
            placeholder="현재 비밀번호를 입력해주세요."
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={(e) => {
              setCurrentPwd(e.target.value);
            }}
          />
          <Input
            type="text"
            name="newPwd"
            title="변경 후 비밀번호"
            placeholder={'8자 이상, 16자 이하'}
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={(e) => {
              setNewPwd(e.target.value);
            }}
          />
          <CheckMsg isNoProblem={pwdCheckMsg === '사용 가능한 비밀번호 입니다.'}>{pwdCheckMsg}</CheckMsg>

          <ModalContainer>
            <Btn
              title={'비밀번호 변경'}
              mt={'10'}
              mb={'20'}
              mr={'-10'}
              c={'#FF7F50'}
              fc={'white'}
              str={'변경'}
              f={(e) => {
                if (window.confirm('변경하시겠습니까?')) {
                  const formData = new FormData();
                  formData.append('currentPwd', currentPwd);
                  formData.append('newPwd', newPwd);

                  fetch('http://127.0.0.1:80/api/member/changePwd', {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                  })
                    .then((resp) => resp.text())
                    .then((data) => {
                      alert(data);
                    });
                  dispatch(close(e.target.title));
                }
              }}
            ></Btn>
          </ModalContainer>
        </Modal>
        {/* 닉네임 모달 */}
        <Modal title="닉네임 변경">
          <div>현재 닉네임</div>
          <InputReadOnly type="text" name="nick" value={nick} readOnly></InputReadOnly>
          <Input
            type="text"
            name="changeNick"
            title="변경 할 닉네임"
            placeholder={'2자 이상, 8자 이하'}
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={(e) => {
              setNewNick(e.target.value);
            }}
          ></Input>

          <ModalContainer>
            <Btn
              title={'닉네임 변경'}
              mt={'10'}
              mb={'20'}
              mr={'-10'}
              c={'#FF7F50'}
              fc={'white'}
              str={'변경'}
              f={(e) => {
                if (window.confirm('변경하시겠습니까?')) {
                  const formData = new FormData();
                  formData.append('nick', newNick);

                  fetch('http://127.0.0.1:80/api/member/changeNick', {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                  })
                    .then((resp) => {
                      resp.text();
                    })
                    .then((data) => {
                      dispatch(setNick(newNick));
                      alert('닉네임 변경 성공!');
                    });
                  dispatch(close(e.target.title));
                }
              }}
            ></Btn>
          </ModalContainer>
        </Modal>

        {/* 주소 모달 */}
        <Modal title="주소 수정">
          <Postcode receiveData={handleAddressComplete} />
          <ModalContainer>
            <Btn
              title={'주소 수정'}
              mt={'10'}
              mb={'20'}
              mr={'-10'}
              c={'#FF7F50'}
              fc={'white'}
              str={'수정'}
              f={(e) => {
                if (window.confirm('수정하시겠습니까?')) {
                  const formData = new FormData();
                  formData.append('address', newAddress);

                  fetch('http://127.0.0.1:80/api/member/changeAddress', {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                  })
                    .then((resp) => {
                      resp.text();
                    })
                    .then((data) => {
                      dispatch(setAddress(newAddress));
                      alert('주소 수정 완료!');
                    });
                  dispatch(close(e.target.title));
                }
              }}
            />
          </ModalContainer>
        </Modal>

        {/* 전화번호 모달 */}

        <Modal title="전화번호 변경">
          <JoinInput
            placeholder="숫자만 입력하세요"
            className="phone"
            type="text"
            maxLength="11"
            // value={phone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
          <CheckMsg isNoProblem={phoneCheckMsg === '사용 가능한 전화번호입니다.'}>{phoneCheckMsg}</CheckMsg>
          <ModalContainer>
            <Btn
              title={'전화번호 변경'}
              mt={'10'}
              mb={'20'}
              mr={'-10'}
              c={'#FF7F50'}
              fc={'white'}
              str={'변경'}
              f={(e) => {
                if (window.confirm('변경하시겠습니까?')) {
                  const formData = new FormData();
                  formData.append('phone', newPhone);

                  fetch('http://127.0.0.1:80/api/member/changePhone', {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                  })
                    .then((resp) => {
                      resp.text();
                    })
                    .then((data) => {
                      dispatch(setPhone(newPhone));
                      setPhoneCheckMsg('');
                      alert('전화번호 변경 완료!');
                    });
                  dispatch(close(e.target.title));
                }
              }}
            />
          </ModalContainer>
        </Modal>

        {/* 신체정보 모달 */}
        <Modal title="신체정보 변경">
          <InputTitle>키</InputTitle>
          <SelectInput className="height" value={newHeight} onChange={(e) => setNewHeight(e.target.value)}>
            <option value="">선택하세요</option>
            {heightOptions.map((h) => (
              <option key={h} value={h}>
                {h} cm
              </option>
            ))}
          </SelectInput>
          <br />
          <br />

          <InputTitle>몸무게</InputTitle>
          <SelectInput className="weight" value={newWeight} onChange={(e) => setNewWeight(e.target.value)}>
            <option value="">선택하세요</option>
            {weightOptions.map((w) => (
              <option key={w} value={w}>
                {w} kg
              </option>
            ))}
          </SelectInput>

          <ModalContainer>
            <Btn
              title={'신체정보 변경'}
              mt={'10'}
              mb={'20'}
              mr={'-10'}
              c={'#FF7F50'}
              fc={'white'}
              str={'변경'}
              f={(e) => {
                if (window.confirm('변경하시겠습니까?')) {
                  const formData = new FormData();
                  formData.append('height', newHeight);
                  formData.append('weight', newWeight);

                  fetch('http://127.0.0.1:80/api/member/changePhysical', {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                  })
                    .then((resp) => {
                      resp.text();
                    })
                    .then((data) => {
                      dispatch(setHeight(newHeight));
                      dispatch(setWeight(newWeight));
                      alert('신체정보 수정 완료!');
                    });
                  dispatch(close(e.target.title));
                }
              }}
            ></Btn>
          </ModalContainer>
        </Modal>

        {/* 푸시알람 설정 모달 */}
        <Modal2 title="푸시알람 설정" width={'350'}>
          <ItemContainer>
            <PushLabel>전체 푸시</PushLabel>
            <SwitchContainer>
              <Switch
                checked={settings['전체푸시']}
                onChange={() => handleToggle('전체푸시')}
                name={'전체푸시'}
                color="primary"
              />
            </SwitchContainer>
          </ItemContainer>
          <br />

          <ItemContainer>
            <PushLabel>식단 푸시</PushLabel>
            <SwitchContainer>
              <Switch
                checked={settings['식단푸시']}
                onChange={() => handleToggle('식단푸시')}
                name={'식단푸시'}
                color="primary"
              />
            </SwitchContainer>
          </ItemContainer>
          <ItemContainer>
            <PushLabel>물 섭취 푸시</PushLabel>
            <SwitchContainer>
              <Switch
                checked={settings['물섭취푸시']}
                onChange={() => handleToggle('물섭취푸시')}
                name={'물섭취푸시'}
                color="primary"
              />
            </SwitchContainer>
          </ItemContainer>
          <ItemContainer>
            <PushLabel>운동 푸시</PushLabel>
            <SwitchContainer>
              <Switch
                checked={settings['운동푸시']}
                onChange={() => handleToggle('운동푸시')}
                name={'운동푸시'}
                color="primary"
              />
            </SwitchContainer>
          </ItemContainer>
          <ItemContainer>
            <PushLabel>댓글 푸시</PushLabel>
            <SwitchContainer>
              <Switch
                checked={settings['댓글푸시']}
                onChange={() => handleToggle('댓글푸시')}
                name={'댓글푸시'}
                color="primary"
              />
            </SwitchContainer>
          </ItemContainer>
          <ItemContainer>
            <PushLabel>혈압 푸시</PushLabel>
            <SwitchContainer>
              <Switch
                checked={settings['혈압푸시']}
                onChange={() => handleToggle('혈압푸시')}
                name={'혈압푸시'}
                color="primary"
              />
            </SwitchContainer>
          </ItemContainer>
          <ItemContainer>
            <PushLabel>혈당 푸시</PushLabel>
            <SwitchContainer>
              <Switch
                checked={settings['혈당푸시']}
                onChange={() => handleToggle('혈당푸시')}
                name={'혈당푸시'}
                color="primary"
              />
            </SwitchContainer>
          </ItemContainer>
          <ItemContainer>
            <PushLabel>인슐린 투약 푸시</PushLabel>
            <SwitchContainer>
              <Switch
                checked={settings['인슐린투약푸시']}
                onChange={() => handleToggle('인슐린투약푸시')}
                name={'인슐린투약푸시'}
                color="primary"
              />
            </SwitchContainer>
          </ItemContainer>
          <br />
          <ModalContainer>
            <Btn
              title={'푸시알람 설정'}
              mt={'10'}
              mb={'20'}
              mr={'-10'}
              c={theme.green}
              fc={'white'}
              str={'저장'}
              f={(e) => {
                if (window.confirm('변경하시겠습니까?')) {
                  const formData = new FormData();
                  formData.append('height', newHeight);
                  formData.append('weight', newWeight);

                  fetch('http://127.0.0.1:80/api/notification/setNotification', {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                  })
                    .then((resp) => {
                      resp.text();
                    })
                    .then((data) => {
                      dispatch(setHeight(newHeight));
                      dispatch(setWeight(newWeight));
                      alert('신체정보 수정 완료!');
                    });
                  dispatch(close(e.target.title));
                }
              }}
            ></Btn>
            <Btn
              title={'푸시알람 설정'}
              mt={'10'}
              mb={'20'}
              ml={'20'}
              mr={'10'}
              c={theme.gray}
              fc={'black'}
              str={'취소'}
              f={(e) => {
                dispatch(close(e.target.title));
              }}
            />
          </ModalContainer>
        </Modal2>
      </ContentLayout>
    </>
  );
};

export default Mypage;

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

const GreenBtnContainer2 = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr 1fr;
  justify-content: end;
  align-content: end;
  margin-top: 20px;
  grid-column-gap: 20px;
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
  /* background-color: rgba(225, 227, 225, 1); */
  &::placeholder {
    color: #888;
    font-size: 16px;
  }
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const CheckMsg = styled.div`
  display: grid;
  color: ${(props) => (props.isNoProblem ? 'green' : 'red')};
  margin-bottom: 10px;
`;

const InputReadOnly = styled.input`
  display: flex;
  width: 300px;
  height: 30px;
  margin-bottom: 10px;
  margin-top: 5px;
  margin-left: 0px;
  margin-right: 0px;
  border-radius: 10px;
  border: 1.5px solid gray;
  padding: 10px;
  box-sizing: border-box;
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

const PushLabel = styled.label``;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  color: #757575;
`;

const SwitchContainer = styled.div`
  justify-self: end;
`;
