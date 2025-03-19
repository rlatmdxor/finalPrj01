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
import { isTokenExpired, getRoleFromToken } from '../../util/JwtUtil';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../services/config';

const Mypage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id, pwd, nick, name, address, email, phone, height, weight, profile } = useSelector((state) => state.join);
  const [newNick, setNewNick] = useState('');
  const heightOptions = Array.from({ length: 71 }, (_, i) => i + 140); // 140 ~ 210 cm
  const weightOptions = Array.from({ length: 81 }, (_, i) => i + 40); // 40 ~ 120 kg
  const [settings, setSettings] = useState({
    allPush: true,
    dietPush: true,
    waterPush: true,
    exercisePush: true,
    commentPush: true,
    bloodPressurePush: true,
    bloodSugarPush: true,
    insulinPush: true,
  });

  const token = localStorage.getItem('token');
  const navi = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false); // 로그인 여부 체크

  useEffect(() => {
    if (!token || isTokenExpired(token) || getRoleFromToken(token) == 'ROLE_ADMIN') {
      window.localStorage.removeItem('token'); // 토큰 삭제
      navi('/login'); // 로그인 페이지로 이동
      Swal.fire({
        icon: 'warning',
        title: '로그인이 필요합니다',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      });
    } else {
      setIsAuthorized(true); // 로그인 성공 시 데이터 요청 가능
    }
  }, [navi, token]);

  const handleToggle = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };

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

    fetch(`${BASE_URL}/api/member/checkPhoneForModal`, {
      method: 'POST',
      headers: {},
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
    fetch(`${BASE_URL}/api/member/mypage`, {
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
  const reset = () => {};

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
              str="주소 변경"
              fc={'white'}
              fs={'18'}
              f={(e) => {
                reset();
                dispatch(open({ title: '주소 변경', value: 'block' }));
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
              f={async () => {
                reset();
                const response = await fetch(`${BASE_URL}/api/notification/getPushSettings`, {
                  method: 'GET',
                  headers: { Authorization: `Bearer ${token}` },
                });
                if (!response.ok) {
                  throw new Error('서버 응답 오류');
                }
                const data = await response.json();
                //가져온 데이터로 푸시알림설정 세팅
                setSettings((prevSettings) => ({
                  ...prevSettings,
                  allPush: data.allPush === 'Y' ? true : false,
                  dietPush: data.dietPush === 'Y' ? true : false,
                  waterPush: data.waterPush === 'Y' ? true : false,
                  exercisePush: data.exercisePush === 'Y' ? true : false,
                  commentPush: data.commentPush === 'Y' ? true : false,
                  bloodPressurePush: data.bloodPressurePush === 'Y' ? true : false,
                  bloodSugarPush: data.bloodSugarPush === 'Y' ? true : false,
                  insulinPush: data.insulinPush === 'Y' ? true : false,
                }));

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
                Swal.fire({
                  title: '정말 탈퇴하시겠습니까?', // 제목
                  icon: 'question', // 아이콘 유형 (warning, success, error 등)
                  showCancelButton: true, // 취소 버튼 표시
                  confirmButtonColor: '#3085d6', // 등록 버튼 색상
                  cancelButtonColor: '#d33', // 취소 버튼 색상
                  confirmButtonText: '탈퇴', // 등록 버튼 텍스트
                  cancelButtonText: '취소', // 취소 버튼 텍스트
                }).then((result) => {
                  if (result.isConfirmed) {
                    //패치 넣기
                    fetch(`${BASE_URL}/api/member/withdrawal`, {
                      method: 'POST',
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                      .then((resp) => resp.text())
                      .then((data) => localStorage.removeItem('token'), (window.location.href = '/login'));
                    Swal.fire({
                      icon: 'success',
                      title: '탈퇴 처리 되었습니다.',
                      confirmButtonText: '확인',
                    });
                  }
                });
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
                Swal.fire({
                  title: '변경하시겠습니까?', // 제목
                  icon: 'question', // 아이콘 유형 (warning, success, error 등)
                  showCancelButton: true, // 취소 버튼 표시
                  confirmButtonColor: '#3085d6', // 등록 버튼 색상
                  cancelButtonColor: '#d33', // 취소 버튼 색상
                  confirmButtonText: '변경', // 등록 버튼 텍스트
                  cancelButtonText: '취소', // 취소 버튼 텍스트
                }).then((result) => {
                  if (result.isConfirmed) {
                    //패치 넣기
                    const formData = new FormData();
                    formData.append('currentPwd', currentPwd);
                    formData.append('newPwd', newPwd);

                    fetch(`${BASE_URL}/api/member/changePwd`, {
                      method: 'POST',
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                      body: formData,
                    })
                      .then((resp) => resp.text())
                      .then((data) => {
                        Swal.fire({
                          icon: 'success',
                          title: data,
                          confirmButtonText: '확인',
                        });
                      });
                    dispatch(close(e.target.title));
                  }
                });
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
                Swal.fire({
                  title: '변경하시겠습니까?', // 제목
                  icon: 'question', // 아이콘 유형 (warning, success, error 등)
                  showCancelButton: true, // 취소 버튼 표시
                  confirmButtonColor: '#3085d6', // 등록 버튼 색상
                  cancelButtonColor: '#d33', // 취소 버튼 색상
                  confirmButtonText: '변경', // 등록 버튼 텍스트
                  cancelButtonText: '취소', // 취소 버튼 텍스트
                }).then((result) => {
                  if (result.isConfirmed) {
                    //패치 넣기
                    const formData = new FormData();
                    formData.append('nick', newNick);

                    fetch(`${BASE_URL}/api/member/changeNick`, {
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
                        Swal.fire({
                          icon: 'success',
                          title: '닉네임 변경 성공!',
                          confirmButtonText: '확인',
                        });
                      });
                    dispatch(close(e.target.title));
                  }
                });
              }}
            ></Btn>
          </ModalContainer>
        </Modal>

        {/* 주소 모달 */}
        <Modal title="주소 변경">
          <Postcode receiveData={handleAddressComplete} />
          <ModalContainer>
            <Btn
              title={'주소 변경'}
              mt={'10'}
              mb={'20'}
              mr={'-10'}
              c={'#FF7F50'}
              fc={'white'}
              str={'변경'}
              f={(e) => {
                Swal.fire({
                  title: '변경하시겠습니까?', // 제목
                  icon: 'question', // 아이콘 유형 (warning, success, error 등)
                  showCancelButton: true, // 취소 버튼 표시
                  confirmButtonColor: '#3085d6', // 등록 버튼 색상
                  cancelButtonColor: '#d33', // 취소 버튼 색상
                  confirmButtonText: '변경', // 등록 버튼 텍스트
                  cancelButtonText: '취소', // 취소 버튼 텍스트
                }).then((result) => {
                  if (result.isConfirmed) {
                    //패치 넣기
                    const formData = new FormData();
                    formData.append('address', newAddress);

                    fetch(`${BASE_URL}/api/member/changeAddress`, {
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
                        Swal.fire({
                          icon: 'success',
                          title: '주소 변경 완료!',
                          confirmButtonText: '확인',
                        });
                      });
                    dispatch(close(e.target.title));
                  }
                });
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
                Swal.fire({
                  title: '변경하시겠습니까?', // 제목
                  icon: 'question', // 아이콘 유형 (warning, success, error 등)
                  showCancelButton: true, // 취소 버튼 표시
                  confirmButtonColor: '#3085d6', // 등록 버튼 색상
                  cancelButtonColor: '#d33', // 취소 버튼 색상
                  confirmButtonText: '변경', // 등록 버튼 텍스트
                  cancelButtonText: '취소', // 취소 버튼 텍스트
                }).then((result) => {
                  if (result.isConfirmed) {
                    //패치 넣기
                    const formData = new FormData();
                    formData.append('phone', newPhone);

                    fetch(`${BASE_URL}/api/member/changePhone`, {
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
                        Swal.fire({
                          icon: 'success',
                          title: '전화번호 변경 완료!',
                          confirmButtonText: '확인',
                        });
                      });
                    dispatch(close(e.target.title));
                  }
                });
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
                Swal.fire({
                  title: '변경하시겠습니까?', // 제목
                  icon: 'question', // 아이콘 유형 (warning, success, error 등)
                  showCancelButton: true, // 취소 버튼 표시
                  confirmButtonColor: '#3085d6', // 등록 버튼 색상
                  cancelButtonColor: '#d33', // 취소 버튼 색상
                  confirmButtonText: '변경', // 등록 버튼 텍스트
                  cancelButtonText: '취소', // 취소 버튼 텍스트
                }).then((result) => {
                  if (result.isConfirmed) {
                    //패치 넣기
                    const formData = new FormData();
                    formData.append('height', newHeight);
                    formData.append('weight', newWeight);

                    fetch(`${BASE_URL}/api/member/changePhysical`, {
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
                        Swal.fire({
                          icon: 'success',
                          title: '신체정보 수정 완료!',
                          confirmButtonText: '확인',
                        });
                      });
                    dispatch(close(e.target.title));
                  }
                });
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
                checked={settings['allPush']}
                onChange={() => handleToggle('allPush')}
                name={'allPush'}
                color="primary"
              />
            </SwitchContainer>
          </ItemContainer>
          <br />

          <ItemContainer>
            <PushLabel>식단 푸시</PushLabel>
            <SwitchContainer>
              <Switch
                checked={settings['dietPush']}
                onChange={() => handleToggle('dietPush')}
                name={'dietPush'}
                color="primary"
              />
            </SwitchContainer>
          </ItemContainer>
          <ItemContainer>
            <PushLabel>물 섭취 푸시</PushLabel>
            <SwitchContainer>
              <Switch
                checked={settings['waterPush']}
                onChange={() => handleToggle('waterPush')}
                name={'waterPush'}
                color="primary"
              />
            </SwitchContainer>
          </ItemContainer>
          <ItemContainer>
            <PushLabel>운동 푸시</PushLabel>
            <SwitchContainer>
              <Switch
                checked={settings['exercisePush']}
                onChange={() => handleToggle('exercisePush')}
                name={'exercisePush'}
                color="primary"
              />
            </SwitchContainer>
          </ItemContainer>
          <ItemContainer>
            <PushLabel>댓글 푸시</PushLabel>
            <SwitchContainer>
              <Switch
                checked={settings['commentPush']}
                onChange={() => handleToggle('commentPush')}
                name={'commentPush'}
                color="primary"
              />
            </SwitchContainer>
          </ItemContainer>
          <ItemContainer>
            <PushLabel>혈압 푸시</PushLabel>
            <SwitchContainer>
              <Switch
                checked={settings['bloodPressurePush']}
                onChange={() => handleToggle('bloodPressurePush')}
                name={'bloodPressurePush'}
                color="primary"
              />
            </SwitchContainer>
          </ItemContainer>
          <ItemContainer>
            <PushLabel>혈당 푸시</PushLabel>
            <SwitchContainer>
              <Switch
                checked={settings['bloodSugarPush']}
                onChange={() => handleToggle('bloodSugarPush')}
                name={'bloodSugarPush'}
                color="primary"
              />
            </SwitchContainer>
          </ItemContainer>
          <ItemContainer>
            <PushLabel>인슐린 투약 푸시</PushLabel>
            <SwitchContainer>
              <Switch
                checked={settings['insulinPush']}
                onChange={() => handleToggle('insulinPush')}
                name={'insulinPush'}
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
                Swal.fire({
                  title: '변경하시겠습니까?', // 제목
                  icon: 'question', // 아이콘 유형 (warning, success, error 등)
                  showCancelButton: true, // 취소 버튼 표시
                  confirmButtonColor: '#3085d6', // 등록 버튼 색상
                  cancelButtonColor: '#d33', // 취소 버튼 색상
                  confirmButtonText: '변경', // 등록 버튼 텍스트
                  cancelButtonText: '취소', // 취소 버튼 텍스트
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    //패치 넣기
                    const settingData = {
                      allPush: settings.allPush ? 'Y' : 'N',
                      dietPush: settings.dietPush ? 'Y' : 'N',
                      waterPush: settings.waterPush ? 'Y' : 'N',
                      exercisePush: settings.exercisePush ? 'Y' : 'N',
                      commentPush: settings.commentPush ? 'Y' : 'N',
                      bloodPressurePush: settings.bloodPressurePush ? 'Y' : 'N',
                      bloodSugarPush: settings.bloodSugarPush ? 'Y' : 'N',
                      insulinPush: settings.insulinPush ? 'Y' : 'N',
                    };

                    const response = await fetch(`${BASE_URL}/api/notification/setPushSettings`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify(settingData),
                    });
                    if (!response.ok) {
                      throw new Error('서버 응답 오류');
                    }
                    Swal.fire({
                      title: '변경 완료!',
                      icon: 'success',
                      confirmButtonText: '확인',
                    });
                    dispatch(close(e.target.title));
                  }
                });
              }}
            ></Btn>
            <Btn
              title={'푸시알람 설정'}
              mt={'10'}
              mb={'20'}
              ml={'20'}
              mr={'10'}
              c={theme.gray}
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
