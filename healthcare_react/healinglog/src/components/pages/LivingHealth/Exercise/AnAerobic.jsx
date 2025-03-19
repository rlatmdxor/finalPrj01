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

const AnAerobic = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [fetchTry, setFetchTry] = useState(0);
  const [anaerobic, setAnaerobic] = useState([]);
  const [bookmarkedAnaerobic, setBookmarkedAnaerobic] = useState([]);
  const initialInputData = { exName: '', exDate: '', weight: '', reps: '' };
  const [inputData, setInputData] = useState(initialInputData);
  const [exDate, setExDate] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  // 인풋 데이터 초기화
  const reset = () => {
    setInputData(initialInputData);
    setExDate('');
    setWeight('');
    setReps('');
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
    fetch(`${BASE_URL}/api/anaerobic/getList`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setAnaerobic(data);
      })
      .catch((error) => {
        console.error('fetch 오류:', error);
      });

    //북마크 리스트
    fetch(`${BASE_URL}/api/anaerobic/getBookmarkList`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setBookmarkedAnaerobic(data);
      })
      .catch((error) => {
        console.error('fetch 오류:', error);
      });
  }, [fetchTry]);

  //북마크 해제
  const unmark = (no) => {
    fetch(`${BASE_URL}/api/anaerobic/unmark`, {
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
    fetch(`${BASE_URL}/api/anaerobic/mark`, {
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
        alert('요청 에러:', error);
        console.error('POST 요청 에러:', error);
      });
  };

  //모달 제출
  const handleSubmit = async () => {
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
      exName: inputData.exName,
      exDate,
      weight,
      reps,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/anaerobic/record`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const message = await response.text();
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

  // 운동 부위별 필터링
  const armExercises = anaerobic.filter((ex) => ex.exPart === '팔');
  const legExercises = anaerobic.filter((ex) => ex.exPart === '다리');
  const shoulderExercises = anaerobic.filter((ex) => ex.exPart === '어깨');
  const chestExercises = anaerobic.filter((ex) => ex.exPart === '가슴');
  const coreExercises = anaerobic.filter((ex) => ex.exPart === '코어');
  const etcExercises = anaerobic.filter((ex) => ex.exPart === '기타');

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
          {bookmarkedAnaerobic.length > 0 && (
            <BookmarkList>
              <h2>즐겨찾기</h2>
              {bookmarkedAnaerobic.map((anaerobic) => (
                <Line key={anaerobic.no}>
                  <Star>
                    <FaStar
                      key={anaerobic.no}
                      style={{ color: 'black', fontSize: '30px', cursor: 'pointer' }}
                      onClick={() => unmark(anaerobic.no)}
                    />
                  </Star>
                  <Content>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setInputData({
                          exName: anaerobic.name,
                          exDate: '',
                          weight: '',
                          reps: '',
                        });
                        dispatch(open({ title: '운동 기록', value: 'block' }));
                      }}
                    >
                      {anaerobic.name}
                    </div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navi(`/anaerobic/${anaerobic.name}`);
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

          {armExercises.length > 0 && (
            <ExList>
              <h2>팔</h2>
              {armExercises.map((anaerobic) => (
                <Line key={anaerobic.no}>
                  <Star>
                    <FaStar
                      key={anaerobic.no}
                      style={{ color: 'grey', fontSize: '30px', cursor: 'pointer' }}
                      onClick={() => mark(anaerobic.no)}
                    />
                  </Star>
                  <Content>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setInputData({
                          exName: anaerobic.name,
                          exDate: '',
                          weight: '',
                          reps: '',
                        });
                        dispatch(open({ title: '운동 기록', value: 'block' }));
                      }}
                    >
                      {anaerobic.name}
                    </div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navi(`/anaerobic/${anaerobic.name}`);
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

          {legExercises.length > 0 && (
            <ExList>
              <h2>다리</h2>
              {legExercises.map((anaerobic) => (
                <Line key={anaerobic.no}>
                  <Star>
                    <FaStar
                      key={anaerobic.no}
                      style={{ color: 'grey', fontSize: '30px', cursor: 'pointer' }}
                      onClick={() => mark(anaerobic.no)}
                    />
                  </Star>
                  <Content>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setInputData({
                          exName: anaerobic.name,
                          exDate: '',
                          weight: '',
                          reps: '',
                        });
                        dispatch(open({ title: '운동 기록', value: 'block' }));
                      }}
                    >
                      {anaerobic.name}
                    </div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navi(`/anaerobic/${anaerobic.name}`);
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

          {shoulderExercises.length > 0 && (
            <ExList>
              <h2>어깨</h2>
              {shoulderExercises.map((anaerobic) => (
                <Line key={anaerobic.no}>
                  <Star>
                    <FaStar
                      key={anaerobic.no}
                      style={{ color: 'grey', fontSize: '30px', cursor: 'pointer' }}
                      onClick={() => mark(anaerobic.no)}
                    />
                  </Star>
                  <Content>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setInputData({
                          exName: anaerobic.name,
                          exDate: '',
                          weight: '',
                          reps: '',
                        });
                        dispatch(open({ title: '운동 기록', value: 'block' }));
                      }}
                    >
                      {anaerobic.name}
                    </div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navi(`/anaerobic/${anaerobic.name}`);
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

          {chestExercises.length > 0 && (
            <ExList>
              <h2>가슴</h2>
              {chestExercises.map((anaerobic) => (
                <Line key={anaerobic.no}>
                  <Star>
                    <FaStar
                      key={anaerobic.no}
                      style={{ color: 'grey', fontSize: '30px', cursor: 'pointer' }}
                      onClick={() => mark(anaerobic.no)}
                    />
                  </Star>
                  <Content>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setInputData({
                          exName: anaerobic.name,
                          exDate: '',
                          weight: '',
                          reps: '',
                        });
                        dispatch(open({ title: '운동 기록', value: 'block' }));
                      }}
                    >
                      {anaerobic.name}
                    </div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navi(`/anaerobic/${anaerobic.name}`);
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

          {coreExercises.length > 0 && (
            <ExList>
              <h2>코어</h2>
              {coreExercises.map((anaerobic) => (
                <Line key={anaerobic.no}>
                  <Star>
                    <FaStar
                      key={anaerobic.no}
                      style={{ color: 'grey', fontSize: '30px', cursor: 'pointer' }}
                      onClick={() => mark(anaerobic.no)}
                    />
                  </Star>
                  <Content>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setInputData({
                          exName: anaerobic.name,
                          exDate: '',
                          weight: '',
                          reps: '',
                        });
                        dispatch(open({ title: '운동 기록', value: 'block' }));
                      }}
                    >
                      {anaerobic.name}
                    </div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navi(`/anaerobic/${anaerobic.name}`);
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

          {etcExercises.length > 0 && (
            <ExList>
              <h2>기타</h2>
              {etcExercises.map((anaerobic) => (
                <Line key={anaerobic.no}>
                  <Star>
                    <FaStar
                      key={anaerobic.no}
                      style={{ color: 'grey', fontSize: '30px', cursor: 'pointer' }}
                      onClick={() => mark(anaerobic.no)}
                    />
                  </Star>
                  <Content>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setInputData({
                          exName: anaerobic.name,
                          exDate: '',
                          weight: '',
                          reps: '',
                        });
                        dispatch(open({ title: '운동 기록', value: 'block' }));
                      }}
                    >
                      {anaerobic.name}
                    </div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navi(`/anaerobic/${anaerobic.name}`);
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
              <div>중량(생략가능)</div>
              <CustomInput2
                type="number"
                placeholder={'kg'}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div>
              <div>횟수</div>
              <CustomInput2 type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
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
  grid-template-columns: 1fr 1fr;
`;

const Line = styled.div`
  display: grid;
  grid-template-columns: 75px 350px;
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
  grid-column: span 2;
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
  width: 125px;
  border-radius: 10px;
  border: 1.5px solid gray;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 5px;
  margin-bottom: 10px;
  height: 30px;
`;

export default AnAerobic;
