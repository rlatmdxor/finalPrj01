import React, { useEffect, useState } from 'react';
import Title from '../../../util/Title';
import Navi from '../../../util/Navi';
import styled, { useTheme } from 'styled-components';
import Modal from '../../../util/Modal';
import Input from '../../../util/Input';
import { useDispatch } from 'react-redux';
import { close, open } from '../../../../redux/modalSlice';
import { useNavigate } from 'react-router-dom';
import ContentLayout from '../../../util/ContentLayout';
import Btn from '../../../util/Btn';
import Swal from 'sweetalert2';
import { isTokenExpired, getRoleFromToken } from '../../../util/JwtUtil';
import { BASE_URL } from '../../../services/config';
import { FaStar } from 'react-icons/fa';

const Aerobic = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [fetchTry, setFetchTry] = useState(0);
  const [aerobic, setAerobic] = useState([]);
  const [bookmarkedAerobic, setBookmarkedAerobic] = useState([]);
  const initialInputData = { exName: '', exDate: '', startTime: '', endTime: '' };
  const [inputData, setInputData] = useState(initialInputData);
  const [exDate, setExDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  // 인풋 데이터 초기화
  const reset = () => {
    setInputData(initialInputData);
    setExDate('');
    setStartTime('');
    setEndTime('');
  };

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

  //페이지 렌더링(데이터 가져오기)
  useEffect(() => {
    //일반 리스트
    fetch(`${BASE_URL}/api/aerobic/getList`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setAerobic(data);
      })
      .catch((error) => {
        console.error('fetch 오류:', error);
      });

    //북마크 리스트
    fetch(`${BASE_URL}/api/aerobic/getBookmarkList`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setBookmarkedAerobic(data);
      })
      .catch((error) => {
        console.error('fetch 오류:', error);
      });
  }, [fetchTry]);

  //북마크 해제
  const unmark = (no) => {
    fetch(`${BASE_URL}/api/aerobic/unmark`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: no,
    })
      .then((resp) => resp.text())
      .then((data) => {
        setFetchTry(fetchTry + 1);
      })
      .catch((error) => {
        console.error('POST 요청 에러:', error);
      });
  };

  //북마크 등록
  const mark = (no) => {
    fetch(`${BASE_URL}/api/aerobic/mark`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: no,
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data == '즐겨찾기는 3개까지만 등록가능합니다.') {
          Swal.fire({
            icon: 'warning',
            title: data,
            confirmButtonText: '확인',
          });
        }
        setFetchTry(fetchTry + 1);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: '요청 에러:' + error,
          confirmButtonText: '확인',
        });
        console.error('POST 요청 에러:', error);
      });
  };

  //시간을 분으로 변환
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  //모달 제출
  const handleSubmit = async () => {
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
      exName: inputData.exName,
      exDate,
      startTime,
      endTime,
      exDuration,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/aerobic/record`, {
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

        reset();
        dispatch(close('운동 기록'));
      } else {
        const errorData = await response.json();
        alert(`등록 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error('등록 중 오류 발생:', error);
      alert('서버 오류가 발생했습니다.' + error);
    }
  };

  useEffect(() => {
    dispatch(close('운동 기록'));
    if (!isAuthorized) {
      return;
    }
  }, [isAuthorized, token]);

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

        <Container>
          {bookmarkedAerobic.length > 0 && (
            <BookmarkList>
              <h2>즐겨찾기</h2>
              {bookmarkedAerobic.map((aerobic) => (
                <Line key={aerobic.no}>
                  <Star>
                    <FaStar
                      key={aerobic.no}
                      style={{ color: 'black', fontSize: '30px', cursor: 'pointer' }}
                      onClick={() => unmark(aerobic.no)}
                    />
                  </Star>
                  <Content>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setInputData({
                          exName: aerobic.name,
                          exDate: '',
                          startTime: '',
                          endTime: '',
                        });
                        dispatch(open({ title: '운동 기록', value: 'block' }));
                      }}
                    >
                      {aerobic.name}
                    </div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navi(`/aerobic/${aerobic.name}`);
                        }}
                        mt={'0'}
                        mb={'0'}
                        mr={'0'}
                        ml={'0'}
                      />
                    </div>
                  </Content>
                </Line>
              ))}
            </BookmarkList>
          )}

          {aerobic.length > 0 && (
            <ExList>
              <h2>유산소</h2>
              {aerobic.map((aerobic) => (
                <Line key={aerobic.no}>
                  <Star>
                    <FaStar
                      key={aerobic.no}
                      style={{ color: 'grey', fontSize: '30px', cursor: 'pointer' }}
                      onClick={() => mark(aerobic.no)}
                    />
                  </Star>
                  <Content>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setInputData({
                          exName: aerobic.name,
                          exDate: '',
                          startTime: '',
                          endTime: '',
                        });
                        dispatch(open({ title: '운동 기록', value: 'block' }));
                      }}
                    >
                      {aerobic.name}
                    </div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navi(`/aerobic/${aerobic.name}`);
                        }}
                        mt={'0'}
                        mb={'0'}
                        mr={'0'}
                        ml={'0'}
                      />
                    </div>
                  </Content>
                </Line>
              ))}
            </ExList>
          )}
        </Container>

        <BlankSpace />

        <Modal title="운동 기록">
          <Input
            type="text"
            plcaeholder="value"
            title="운동명"
            size={'size3'}
            mb={'10'}
            mt={'5'}
            value={inputData.exName}
            disabled={true}
          />
          <div>운동 일자</div>
          <CustomInput
            type="date"
            value={exDate}
            onChange={(e) => {
              setExDate(e.target.value);
            }}
          />
          <ModalContentLayout>
            <div>
              <div>시작 시간</div>
              <CustomInput2 type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
            <div>
              <div>종료 시간</div>
              <CustomInput2 type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </ModalContentLayout>

          <ModalContainer>
            <Btn f={handleSubmit} mt={'10'} mb={'20'} mr={'-10'} c={theme.orange} fc={'white'} str={'등록'}></Btn>
          </ModalContainer>
        </Modal>
      </ContentLayout>
    </>
  );
};

const BlankSpace = styled.div`
  display: grid;
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

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const Line = styled.div`
  display: grid;
  grid-template-columns: 75px 700px;
  justify-items: center;
`;

const Star = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: rgba(169, 205, 147, 0.4);
  width: 100%;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 10fr 1fr;
  justify-items: center;
  align-items: center;
  background-color: rgba(169, 205, 147, 0.2);
  width: 100%;
  font-size: 18px;
  font-weight: bold;
`;

const StarIcon = styled.img`
  width: 40px;
  height: 40px;
  background-color: unset;
  cursor: pointer;
`;

const BookmarkList = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-rows: 50px;
  justify-self: center;
  align-self: center;
  margin-bottom: 50px;
  row-gap: 3px;
`;

const ExList = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-rows: 50px;
  justify-self: center;
  align-self: center;
  margin-bottom: 50px;
  row-gap: 3px;
`;

//모달 안의 버튼 컨테이너
const ModalContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const ModalContentLayout = styled.div`
  display: grid;
  grid-template-columns: 175px 175px;
`;

const CustomInput = styled.input`
  display: flex;
  width: 300px;
  border-radius: 10px;
  border: 1.5px solid gray;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 5px;
  margin-bottom: 10px;
  height: 30px;
`;

const CustomInput2 = styled.input`
  display: flex;
  border-radius: 10px;
  border: 1.5px solid gray;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 5px;
  margin-bottom: 10px;
  height: 30px;
`;

export default Aerobic;
