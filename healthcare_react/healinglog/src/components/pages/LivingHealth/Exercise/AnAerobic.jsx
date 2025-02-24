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

const AnAerobic = () => {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [fetchTry, setFetchTry] = useState(0);
  const [anaerobic, setAnaerobic] = useState([]);
  const [bookmarkedAnaerobic, setBookmarkedAnaerobic] = useState([]);
  const [modalTitle, setModalTitle] = useState('');

  //페이지 렌더링(데이터 가져오기)
  useEffect(() => {
    //일반 리스트
    fetch('http://127.0.0.1:80/api/anaerobic/getList', {
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
    fetch('http://127.0.0.1:80/api/anaerobic/getBookmarkList', {
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
    fetch('http://127.0.0.1:80/api/anaerobic/unmark', {
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
    fetch('http://127.0.0.1:80/api/anaerobic/mark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: no,
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data == '즐겨찾기는 5개까지만 등록가능합니다.') {
          alert(data);
        }
        setFetchTry(fetchTry + 1);
      })
      .catch((error) => {
        alert();
        console.error('POST 요청 에러:', error);
      });
  };

  // 운동 부위별 필터링
  const armExercises = anaerobic.filter((ex) => ex.exPart === '팔');
  const legExercises = anaerobic.filter((ex) => ex.exPart === '다리');
  const shoulderExercises = anaerobic.filter((ex) => ex.exPart === '어깨');
  const chestExercises = anaerobic.filter((ex) => ex.exPart === '가슴');
  const coreExercises = anaerobic.filter((ex) => ex.exPart === '코어');
  const etcExercises = anaerobic.filter((ex) => ex.exPart === '기타');

  useEffect(() => {
    dispatch(close('운동시작'));
  }, []);

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
                    <StarIcon src="/img/Star.webp" onClick={() => unmark(anaerobic.no)} />
                  </Star>
                  <Content>
                    <div style={{ cursor: 'pointer' }}>{anaerobic.name}</div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navigate(`/anaerobic/${anaerobic.name}`);
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
                    <StarIcon src="/img/EmptyStar.webp" onClick={() => mark(anaerobic.no)} />
                  </Star>
                  <Content>
                    <div style={{ cursor: 'pointer' }}>{anaerobic.name}</div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navigate(`/anaerobic/${anaerobic.name}`);
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
                    <StarIcon src="/img/EmptyStar.webp" onClick={() => mark(anaerobic.no)} />
                  </Star>
                  <Content>
                    <div style={{ cursor: 'pointer' }}>{anaerobic.name}</div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navigate(`/anaerobic/${anaerobic.name}`);
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
                    <StarIcon src="/img/EmptyStar.webp" onClick={() => mark(anaerobic.no)} />
                  </Star>
                  <Content>
                    <div style={{ cursor: 'pointer' }}>{anaerobic.name}</div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navigate(`/anaerobic/${anaerobic.name}`);
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
                    <StarIcon src="/img/EmptyStar.webp" onClick={() => mark(anaerobic.no)} />
                  </Star>
                  <Content>
                    <div style={{ cursor: 'pointer' }}>{anaerobic.name}</div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navigate(`/anaerobic/${anaerobic.name}`);
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
                    <StarIcon src="/img/EmptyStar.webp" onClick={() => mark(anaerobic.no)} />
                  </Star>
                  <Content>
                    <div style={{ cursor: 'pointer' }}>{anaerobic.name}</div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navigate(`/anaerobic/${anaerobic.name}`);
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
                    <StarIcon src="/img/EmptyStar.webp" onClick={() => mark(anaerobic.no)} />
                  </Star>
                  <Content>
                    <div style={{ cursor: 'pointer' }}>{anaerobic.name}</div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navigate(`/anaerobic/${anaerobic.name}`);
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
      </ContentLayout>
      {/* <Modal title="운동시작" type={'exercise'} f={handleRegister}>
        <Input
          type="text"
          plcaeholder="value"
          title="운동명"
          size={'size3'}
          mb={'10'}
          mt={'5'}
          value={modalTitle}
          disabled={true}
        ></Input>
        <Input
          type="number"
          plcaeholder="VALUE"
          title="세트 수"
          size={'size3'}
          mb={'10'}
          mt={'5'}
          f={(e) => {
            let inputValue = Number(e.target.value);

            if (inputValue < 1) {
              inputValue = 1;
            }

            if (inputValue > 20) {
              inputValue = 20;
            }

            setSets(inputValue);
          }}
          value={sets}
          disabled={false}
        ></Input>
        <Input
          type="number"
          plcaeholder="VALUE"
          title="반복 횟수"
          size={'size3'}
          mb={'10'}
          mt={'5'}
          f={(e) => {
            let inputValue = Number(e.target.value);

            if (inputValue < 10) {
              inputValue = 10;
            }

            if (inputValue > 100) {
              inputValue = 100;
            }

            setRepeats(inputValue);
          }}
          value={repeats}
          disabled={false}
        ></Input>
        <div style={{ marginTop: '20px' }}>인터벌</div>
        <Input
          type="range"
          plcaeholder="VALUE"
          style={{ marginTop: '10px', marginRight: '10px' }}
          disabled={false}
          min="0"
          max="300"
          step="30"
          f={(e) => setRangeValue(Number(e.target.value))}
          value={rangeValue}
        ></Input>
        <span>{rangeValue}</span>초
      </Modal> */}
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

export default AnAerobic;
