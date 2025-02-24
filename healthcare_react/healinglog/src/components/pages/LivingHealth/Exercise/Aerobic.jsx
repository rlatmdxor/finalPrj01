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

const Aerobic = () => {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [fetchTry, setFetchTry] = useState(0);
  const [aerobic, setAerobic] = useState([]);
  const [bookmarkedAerobic, setBookmarkedAerobic] = useState([]);
  const [modalTitle, setModalTitle] = useState('');

  //페이지 렌더링(데이터 가져오기)
  useEffect(() => {
    //일반 리스트
    fetch('http://127.0.0.1:80/api/aerobic/getList', {
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
    fetch('http://127.0.0.1:80/api/aerobic/getBookmarkList', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        setBookmarkedAerobic(data);
      })
      .catch((error) => {
        console.error('fetch 오류:', error);
      });
  }, [fetchTry]);

  //북마크 해제
  const unmark = (no) => {
    fetch('http://127.0.0.1:80/api/aerobic/unmark', {
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
    fetch('http://127.0.0.1:80/api/aerobic/mark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: no,
    })
      .then((resp) => resp.text())
      .then((data) => {
        console.log(data);

        if (data == '즐겨찾기는 3개까지만 등록가능합니다.') {
          alert(data);
        }
        setFetchTry(fetchTry + 1);
      })
      .catch((error) => {
        alert();
        console.error('POST 요청 에러:', error);
      });
  };

  // const handleRegister = () => {
  //   navigate(`/exercising/${modalTitle}`, {
  //     state: {
  //       title: modalTitle,
  //       hours,
  //       minutes,
  //     },
  //   });
  // };

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
          {bookmarkedAerobic.length > 0 && (
            <BookmarkList>
              <h2>즐겨찾기</h2>
              {bookmarkedAerobic.map((aerobic) => (
                <Line key={aerobic.no}>
                  <Star>
                    <StarIcon src="/img/Star.webp" onClick={() => unmark(aerobic.no)} />
                  </Star>
                  <Content>
                    <div style={{ cursor: 'pointer' }}>{aerobic.name}</div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navigate(`/aerobic/${aerobic.name}`);
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
                    <StarIcon src="/img/EmptyStar.webp" onClick={() => mark(aerobic.no)} />
                  </Star>
                  <Content>
                    <div style={{ cursor: 'pointer' }}>{aerobic.name}</div>
                    <div style={{ marginRight: '20px' }}>
                      <Btn
                        str={'상세조회'}
                        c={theme.gray}
                        fs={'14'}
                        f={() => {
                          navigate(`/aerobic/${aerobic.name}`);
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
          placeholder="VALUE"
          title="시간"
          size={'size3'}
          mb={'10'}
          mt={'5'}
          f={(e) => {
            let inputValue = Number(e.target.value);

            if (inputValue < 0) {
              inputValue = 0;
            }

            if (inputValue > 11) {
              inputValue = 11;
            }

            setHours(inputValue);

            if (inputValue === 0 && minutes < 1) {
              setMinutes(1);
            }
          }}
          value={hours}
          disabled={false}
        />
        <Input
          type="number"
          placeholder="VALUE"
          title="분"
          size={'size3'}
          mb={'10'}
          mt={'5'}
          f={(e) => {
            let inputValue = Number(e.target.value);

            if (inputValue < 0) {
              inputValue = 0;
            }

            if (inputValue > 59) {
              inputValue = 59;
            }

            if (hours === 0 && inputValue < 1) {
              inputValue = 1;
            }

            setMinutes(inputValue);
          }}
          value={minutes}
          disabled={false}
        />
      </Modal> */}
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
  /* grid-column: span 2; */
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

export default Aerobic;
