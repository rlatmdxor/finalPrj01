import React, { useEffect, useState } from 'react';
import Modal from '../../../util/Modal';
import Input from '../../../util/Input';
import Title from '../../../util/Title';
import Navi from '../../../util/Navi';
import styled, { useTheme } from 'styled-components';
import { useDispatch } from 'react-redux';
import { close, open, openCalModal } from '../../../../redux/modalSlice';
import ContentLayout from '../../../util/ContentLayout';
import ExCalendar from '../../../util/ExCalendar';
import Btn from '../../../util/Btn';
import Swal from 'sweetalert2';
import { isTokenExpired, getRoleFromToken } from '../../../util/JwtUtil';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../services/config';

const ExHistory = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [events, setEvents] = useState({});
  const [exerciseType, setExerciseType] = useState('aerobic');
  const [selectedDate, setSelectedDate] = useState(null);
  const [exDate, setExDate] = useState('');
  const [exercise, setExercise] = useState('');
  const [extraInfo1, setExtraInfo1] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

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

  useEffect(() => {
    fetchEvents();
  }, [exerciseType]);

  useEffect(() => {
    dispatch(close('운동 기록'));
    if (!isAuthorized) {
      return;
    }
  }, [isAuthorized, token]);

  //시간을 분으로 변환
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  //유산소 업데이트 함수
  const handleAerobicSubmit = async () => {
    // 시작 시간과 종료 시간을 분 단위로 변환
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const exDuration = endMinutes - startMinutes;

    //입력 여부 체크
    if (!exDate || !startTime || !endTime) {
      Swal.fire({
        icon: 'error',
        title: '모든 값을 입력해주세요.',
        confirmButtonText: '확인',
      });

      return;
    }
    //시간 비교
    if (startTime >= endTime) {
      Swal.fire({
        icon: 'error',
        title: '시작 시간은 종료 시간보다 앞서야 합니다.',
        confirmButtonText: '확인',
      });

      return;
    }
    const requestData = {
      no: extraInfo1,
      exName: exercise,
      exDate,
      startTime,
      endTime,
      exDuration,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/aerobic/updateAerobic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      const message = await response.text();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: message,
          confirmButtonText: '확인',
        });

        dispatch(close('유산소 운동 내역 수정'));
        fetchEvents();
      } else {
        const errorData = await response.json();
        alert(`등록 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error fetching aerobic update:', error);
    }
  };

  // 무산소 업데이트 함수
  const handleAnAerobicSubmit = async () => {
    //입력 여부 체크
    if (!exDate || !reps) {
      Swal.fire({
        icon: 'error',
        title: '올바른 값을 입력해주세요.',
        confirmButtonText: '확인',
      });

      return;
    }

    const requestData = {
      no: extraInfo1,
      exName: exercise,
      exDate,
      weight,
      reps,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/anaerobic/updateAnAerobic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      const message = await response.text();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: message,
          confirmButtonText: '확인',
        });

        dispatch(close('무산소 운동 내역 수정'));
        fetchEvents();
      } else {
        const errorData = await response.json();
        alert(`등록 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error fetching aerobic update:', error);
    }
  };

  //유산소 삭제
  const handleAerobicDelete = async (historyNo) => {
    const requestData = {
      no: historyNo,
    };
    try {
      const response = await fetch(`${BASE_URL}/api/aerobic/deleteAerobic`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      const message = await response.text();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: message,
          confirmButtonText: '확인',
        });

        dispatch(close('운동 내역'));
        fetchEvents();
      } else {
        const errorData = await response.json();
        alert(`등록 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error fetching aerobic update:', error);
    }
  };

  const handleAnAerobicDelete = async (historyNo) => {
    const requestData = {
      no: historyNo,
    };
    try {
      const response = await fetch(`${BASE_URL}/api/anaerobic/deleteAnAerobic`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      const message = await response.text();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: message,
          confirmButtonText: '확인',
        });

        dispatch(close('운동 내역'));
        fetchEvents();
      } else {
        const errorData = await response.json();
        alert(`등록 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error fetching aerobic update:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/exercise/getHistory?type=${exerciseType}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();

      setEvents(data);
    } catch (error) {
      console.error('Error fetching exercise history:', error);
    }
  };

  return (
    <>
      <Title>운동</Title>
      <NaviContainer>
        <Navi target="aerobic" tag={'유산소'}></Navi>
        <Navi target="anaerobic" tag={'무산소'}></Navi>
        <Navi target="exhistory" tag={'내역 관리'}></Navi>
        <Navi target="exreport" tag={'리포트'}></Navi>
      </NaviContainer>

      <ContentLayout>
        <BlankSpace />

        <ButtonContainer>
          <ToggleButton onClick={() => setExerciseType('aerobic')} active={exerciseType === 'aerobic'}>
            유산소
          </ToggleButton>
          <ToggleButton onClick={() => setExerciseType('anaerobic')} active={exerciseType === 'anaerobic'}>
            무산소
          </ToggleButton>
        </ButtonContainer>

        <ExCalendar
          modalTitle="운동 내역"
          vo={[]}
          events={events}
          width={800}
          height={100}
          setSelectedDate={setSelectedDate}
        />

        <BlankSpace />

        <Modal title="운동 내역" value="block">
          <div>
            <h3>{`${selectedDate}`}</h3>
            <div>
              {events[selectedDate] ? (
                events[selectedDate].map((item, index) => (
                  <HistoryDiv>
                    <div key={index} style={{ display: 'none' }}>{`${item[0]}`}</div>
                    <div key={index}>{`${item[2]}`}</div>
                    <div key={index}>{`${item[1]}`}</div>
                    <Btn
                      c={theme.green}
                      str={'수정'}
                      fc={'white'}
                      f={() => {
                        dispatch(close('운동 내역'));
                        dispatch(
                          open({
                            title: exerciseType === 'aerobic' ? '유산소 운동 내역 수정' : '무산소 운동 내역 수정',
                            value: 'block',
                          })
                        );
                        setExDate(selectedDate);
                        setExercise(item[2]);
                        setExtraInfo1(item[0]);

                        if (exerciseType === 'anaerobic') {
                          const [weight, reps] = item[1].split(' ');
                          setWeight(weight.replace('kg', ''));
                          setReps(reps.replace('회', ''));
                        }
                      }}
                      mt={'0'}
                      mb={'0'}
                      mr={'10'}
                    ></Btn>
                    <Btn
                      c={theme.orange}
                      str={'삭제'}
                      fc={'white'}
                      f={() => {
                        Swal.fire({
                          title: '삭제하시겠습니까?', // 제목
                          icon: 'question', // 아이콘 유형 (warning, success, error 등)
                          showCancelButton: true, // 취소 버튼 표시
                          confirmButtonColor: '#3085d6', // 등록 버튼 색상
                          cancelButtonColor: '#d33', // 취소 버튼 색상
                          confirmButtonText: '삭제', // 등록 버튼 텍스트
                          cancelButtonText: '취소', // 취소 버튼 텍스트
                        }).then((result) => {
                          if (result.isConfirmed) {
                            //패치 넣기
                            if (exerciseType === 'aerobic') {
                              handleAerobicDelete(item[0]);
                            } else {
                              handleAnAerobicDelete(item[0]);
                            }
                          }
                        });
                      }}
                      mt={'0'}
                      mb={'0'}
                      mr={'10'}
                    ></Btn>
                  </HistoryDiv>
                ))
              ) : (
                <p>운동 내역이 없습니다.</p>
              )}
            </div>
          </div>
          <div style={{ height: '30px' }} />
        </Modal>

        {/* ---------------------------------------------------------------------------
        -------------------------------------------------------------------------------
        ------------------------------------------------------------------------------- */}
        <Modal title="유산소 운동 내역 수정">
          <div style={{ fontSize: '18px' }}>{exercise}</div>
          <br />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 5fr', alignItems: 'center' }}>
            <div>운동 일자 </div>
            <CustomInput
              type="date"
              value={exDate}
              onChange={(e) => {
                setExDate(e.target.value);
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
            <TimeContainer style={{ display: 'grid', gridTemplateColumns: '2fr 4fr', alignItems: 'center' }}>
              <div>시작 시간</div>
              <CustomInput type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </TimeContainer>
            <TimeContainer style={{ display: 'grid', gridTemplateColumns: '2fr 4fr', alignItems: 'center' }}>
              <div>종료 시간</div>
              <CustomInput type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </TimeContainer>
          </div>

          <br />
          <div style={{ display: 'none' }}>{extraInfo1}</div>
          <BlankSpace2 style={{ justifyItems: 'end', alignContent: 'end' }}>
            <Btn c={theme.green} str={'수정'} fc={'white'} f={handleAerobicSubmit} mt={'0'} mb={'20'} mr={'10'}></Btn>
          </BlankSpace2>
        </Modal>

        <Modal title="무산소 운동 내역 수정">
          <div style={{ fontSize: '18px' }}>{exercise}</div>
          <br />
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 5fr', alignItems: 'center' }}>
            <div>운동 일자 </div>
            <CustomInput
              type="date"
              value={exDate}
              onChange={(e) => {
                setExDate(e.target.value);
              }}
            />
          </div>

          <div style={{ display: 'grid', alignItems: 'center' }}>
            <TimeContainer style={{ display: 'grid', gridTemplateColumns: '1.5fr 5fr', alignItems: 'center' }}>
              <div>중량(선택)</div>
              <CustomInput type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </TimeContainer>
            <TimeContainer style={{ display: 'grid', gridTemplateColumns: '1.5fr 5fr', alignItems: 'center' }}>
              <div>운동 횟수</div>
              <CustomInput type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
            </TimeContainer>
          </div>

          <br />
          <div style={{ display: 'none' }}>{extraInfo1}</div>
          <BlankSpace2 style={{ justifyItems: 'end', alignContent: 'end' }}>
            <Btn c={theme.green} str={'수정'} fc={'white'} f={handleAnAerobicSubmit} mt={'0'} mb={'20'} mr={'10'}></Btn>
          </BlankSpace2>
        </Modal>
      </ContentLayout>
    </>
  );
};

const BlankSpace = styled.div`
  height: 100px;
`;

const BlankSpace2 = styled.div`
  height: 50px;
`;

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 400px;
  top: 20px;
  left: 40px;
  grid-template-columns: 3fr 3fr 4fr 3fr;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 800px;
  justify-self: center;
  justify-content: end;
  margin-bottom: 20px;
`;

const ToggleButton = styled.button`
  background-color: ${(props) => (props.active ? '#4CAF50' : '#ddd')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  border: none;
  width: 95px;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 10px;
  font-size: 17px;
  font-weight: bold;
  font-family: 'goorm-sans-bold';
  align-items: center;

  &:hover {
    background-color: ${(props) => (props.active ? '#45a049' : '#bbb')};
  }
`;

const HistoryDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalContentLayout = styled.div`
  display: grid;
  grid-template-columns: 175px 175px;
`;

const CustomInput = styled.input`
  display: flex;
  width: fit-content;
  border-radius: 10px;
  border: 1.5px solid gray;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 5px;
  margin-bottom: 10px;
  height: 30px;
`;

const TimeContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr;
  align-items: center;
`;

export default ExHistory;
