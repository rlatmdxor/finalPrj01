import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Title from '../../util/Title';
import Navi from '../../util/Navi';
import ContentLayout from '../../util/ContentLayout';
import Modal from '../../util/Modal';
import { useDispatch } from 'react-redux';
import { close, open } from '../../../redux/modalSlice';
import Btn from '../../util/Btn';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { isTokenExpired, getRoleFromToken } from '../../util/JwtUtil';
import { BASE_URL } from '../../services/config';

const BottomDiv = styled.div`
  margin-top: 25px;
  margin-bottom: 35px;
`;

const TextDiv = styled.div`
  display: flex;
  justify-content: end;
  font-size: 13px;
  margin-left: 0px;
  margin-top: -20px;
  margin-bottom: 10px;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const LayoutInput = styled.input`
  height: 40px;
  border-radius: 10px;
  border: 1.5px solid gray;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-top: 10px;
  margin-bottom: 20px;

  &[type='text'] {
    display: block;
    width: 400px;
  }
  &[type='number'] {
    display: block;
    width: 100px;
    margin-left: 20px;
  }
  &[type='datetime-local'] {
    width: 400px;
  }
  &[name='status'] {
    width: 100px;
    margin-left: 20px;
  }
`;

const ModalTitleDiv = styled.div`
  margin-left: 25px;
`;

const LayoutTextarea = styled.textarea`
  width: 805px;
  margin-top: 10px;
  height: 250px;
  padding: 10px;
  margin-left: 5px;
  border-radius: 10px;
  resize: none; /* 크기 조정 방지 */
`;

const RightDiv = styled.div`
  margin-left: 10px;

  &[id='challneger'] {
    margin-left: 30px;
  }
`;

const ModalDiv = styled.div`
  display: flex;
`;

const Select = styled.select`
  width: 400px;
  height: 40px;
  border-radius: 10px;
  border: 1.5px solid gray;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  margin-left: 25px;
`;

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 400px;
  top: 20px;
  left: 40px;
  margin-bottom: 100px;
  grid-template-columns: 5fr 2fr 5fr;
`;

const TableTag = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const Exp = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  width: 30%;
  background: ${(props) =>
    `linear-gradient(90deg, #00aaff ${(props.value / props.max) * 100}%, #ddd ${(props.value / props.max) * 100}%)`};
  border-radius: 6px;
  transition: 0.3s ease-in-out;
  outline: none;
  cursor: pointer;
  align-self: center;
  margin-top: 20px;
  margin-bottom: 20px;
  &::-webkit-slider-runnable-track {
    background: none;
    height: 12px;
    border-radius: 6px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0px;
    height: 0px;
    background: transparent;
    box-shadow: none;
  }
`;
const RangeBar = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  width: 85%;
  height: 12px;
  background: ${(props) => `linear-gradient(90deg, #00aaff ${props.value}%, #ddd ${props.value}%)`};
  border-radius: 6px;
  transition: 0.3s ease-in-out;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    background: none;
    height: 12px;
    border-radius: 6px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0px;
    height: 0px;
    background: transparent;
    box-shadow: none;
  }
`;

const ContainerDiv = styled.div`
  width: 900px;
  border: 1px solid black;
  margin-bottom: 30px;

  &[id='underLine'] {
    margin-left: 40px;
    width: 830px;
    border: 0.5px solid lightgray;
  }
`;

const ThTag = styled.th`
  background-color: #e8f5e9;
  border: 1px solid #d3d3d3;
  padding: 10px;
  text-align: center;
`;

const TdTag = styled.td`
  border: 1px solid #d3d3d3;
  padding: 10px;
  text-align: center;
`;

const StyledDiv = styled.div`
  display: flex;
  & > button {
    width: 120px;
    height: 35px;
    background-color: #ff7f50;
    color: white;
    border: none;
    border-radius: 15px;
    justify-content: end;
    margin-left: 620px;
    margin-top: -10px;
    font-size: 17px;
    font-weight: bold;
  }

  & > div {
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
  }
`;

const TitleDiv = styled.div`
  font-size: 32px;
  margin-left: -40px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Expdiv = styled.div`
  display: flex;
  width: 1000px;
  gap: 30px;
  font-size: 30px;
  align-content: center;
  align-items: center;
`;

const Challengers = () => {
  const navi = useNavigate();
  const token = localStorage.getItem('token');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!token || isTokenExpired(token) || getRoleFromToken(token) == 'ROLE_ADMIN') {
      window.localStorage.removeItem('token');
      navi('/login');
      Swal.fire({
        icon: 'warning',
        title: '로그인이 필요합니다',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      });
    } else {
      setIsAuthorized(true);
    }
  }, [navi, token]);

  const [num, setNum] = useState(0);
  const [inputData, setInputData] = useState({});
  const [titleData, setTitleData] = useState([]);
  const [exp, setExp] = useState(0);
  const [level, setLevel] = useState(1);
  const [requiredExp, setRequiredExp] = useState('');
  const dispatch = useDispatch();
  const [boardData, setBoardData] = useState([]);
  const [joinList, setJoinList] = useState([]);
  const memberNo = { memberNo: 1 };
  const initialInputData = {
    title: '',
    content: '',
    writer: '1',
    recruitmentStart: '',
    recruitmentEnd: '',
    performanceStart: '',
    performanceEnd: '',
    maxMembers: '',
    memberNo: '',
    countMember: '',
    no: '',
  };
  const reset = () => {
    setInputData(initialInputData);
  };
  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    fetch(`${BASE_URL}/api/challenger/postTitleList`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTitleData(data);
      });
  }, [isAuthorized, token]);

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }
    fetch(`${BASE_URL}/api/challenger/getLevel`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then(({ level, exp, requiredExp }) => {
        setExp(exp);
        setLevel(level);
        setRequiredExp(requiredExp);
      });
  }, [isAuthorized, token, num, level]);

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }
    fetch(`${BASE_URL}/api/challenger/joinList`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(memberNo),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setJoinList(data);
      });

    fetch(`${BASE_URL}/api/challenger/myAddList`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setBoardData(data);
      });
  }, [isAuthorized, token, num]);

  const handleAdd = (e) => {
    if (inputData.no === '' && inputData.content === '' && inputData.title === '') {
      Swal.fire({
        icon: 'warning',
        title: '작성해주세요.',
        confirmButtonText: '확인',
      });

      return;
    }
    if (inputData.title === '') {
      Swal.fire({
        icon: 'warning',
        title: '제목을 입력하세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    if (inputData.no === '') {
      Swal.fire({
        icon: 'warning',
        title: '챌린지를 선택하세요.',
        confirmButtonText: '확인',
      });
      return;
    }
    if (inputData.content === '') {
      Swal.fire({
        icon: 'warning',
        title: '내용을 입력해세요.',
        confirmButtonText: '확인',
      });
      return;
    }
    Swal.fire({
      title: '등록하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '등록',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/api/challenger/postWrite`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(inputData),
        })
          .then((resp) => {
            return resp.text();
          })
          .then((data) => {
            if (data === '1') {
              setNum((num) => num + 1);
              Swal.fire({
                icon: 'success',
                title: '등록되었습니다.',
                confirmButtonText: '확인',
              });
            }
            if (data === '2') {
              setNum((num) => num + 1);
              Swal.fire({
                icon: 'warning',
                title: '이미 등록되었습니다.',
                confirmButtonText: '확인',
              });
            }
            if (data === '3') {
              setNum((num) => num + 1);
              Swal.fire({
                icon: 'warning',
                title: '등록 기간이 아닙니다.',
                confirmButtonText: '확인',
              });
            }
          });

        dispatch(close(e.target.title));
      }
    });
  };

  const handleChange = (e) => {
    if (e.target.name === 'maxMembers' && e.target.value < 1) {
      Swal.fire({
        icon: 'warning',
        title: '1명 이상 필수입니다.',
        confirmButtonText: '확인',
      });

      setInputData((prev) => ({
        ...prev,
        maxMembers: 1,
      }));
      return;
    }
    setInputData((props) => {
      return {
        ...props,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleEdit = (e) => {
    fetch(`${BASE_URL}/api/challenger/edit`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputData),
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data === '0') {
          Swal.fire({
            icon: 'warning',
            title: '수정 실패',
            confirmButtonText: '확인',
          });
          return;
        }

        if (data === '3') {
          Swal.fire({
            icon: 'warning',
            title: '수정 실패',
            title: '모집 종료가 모집 시작보다 이전입니다!',
            confirmButtonText: '확인',
          });
          return;
        }
        if (data === '4') {
          Swal.fire({
            icon: 'warning',
            title: '수정 실패',
            title: '수행 시작이 모집 종료보다 이전입니다!',
            confirmButtonText: '확인',
          });
          return;
        }
        if (data === '2') {
          Swal.fire({
            icon: 'warning',
            title: '수정 실패',
            title: '수행 종료가 수행 시작보다 이전입니다!',
            confirmButtonText: '확인',
          });
          return;
        }
        if (data === '5') {
          Swal.fire({
            icon: 'warning',
            title: '수정 실패',
            title: '신청한 인원이 있습니다!',
            confirmButtonText: '확인',
          });
          return;
        }
        if (data === '1') {
          Swal.fire({
            icon: 'success',
            title: '수정 성공.',
            confirmButtonText: '확인',
          });

          setNum((prev) => prev + 1);
          dispatch(close(e.target.title));
        }
      });
  };

  useEffect(() => {
    if (exp >= requiredExp) {
      handleLevelUp();
    }
  }, [exp, requiredExp]);

  const handleLevelUp = () => {
    if (requiredExp <= exp) {
      fetch(`${BASE_URL}/api/challenger/levelUp`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then(
        setNum(() => {
          return num + 1;
        })
      );
    }
  };

  return (
    <>
      <Title>챌린지</Title>
      <Modal title={'챌린지 수정'} width={'905'} mt={'-25'} ml={'860'}>
        <ModalDiv>
          <div>
            <RightDiv>제목</RightDiv>
            <LayoutInput type="text" value={inputData.title} name="title" title="제목" onChange={handleChange} />
          </div>
          <div>
            <ModalTitleDiv>정원</ModalTitleDiv>
            <LayoutInput
              type="number"
              value={inputData.maxMembers}
              name="maxMembers"
              title="모집 인원"
              onChange={handleChange}
            />
          </div>
          <div>
            <ModalTitleDiv>남은인원</ModalTitleDiv>
            <LayoutInput
              type="number"
              value={inputData.maxMembers - inputData.countMember}
              name="maxMembers"
              title="남은 인원"
              onChange={handleChange}
              readOnly
            />
          </div>
        </ModalDiv>
        <div>
          <RightDiv>모집 기간</RightDiv>
        </div>
        <LayoutInput
          type="datetime-local"
          value={inputData.recruitmentStart}
          id="start"
          name="recruitmentStart"
          onChange={handleChange}
        />
        <label> ~ </label>
        <LayoutInput
          type="datetime-local"
          value={inputData.recruitmentEnd}
          id="end"
          name="recruitmentEnd"
          onChange={handleChange}
        />
        <div>
          <RightDiv>수행 기간</RightDiv>
        </div>
        <LayoutInput
          type="datetime-local"
          value={inputData.performanceStart}
          id="start"
          name="performanceStart"
          onChange={handleChange}
        />
        <label> ~ </label>
        <LayoutInput
          type="datetime-local"
          value={inputData.performanceEnd}
          id="end"
          name="performanceEnd"
          onChange={handleChange}
        />
        <div>
          <RightDiv>내용</RightDiv>
        </div>
        <LayoutTextarea name="content" value={inputData.content} onChange={handleChange} />
        <ModalContainer>
          <Btn
            title={'챌린지 수정'}
            f={handleEdit}
            str={'수정'}
            c={'#FF7F50'}
            fc={'white'}
            ml={'0'}
            mr={'10'}
            mb={'20'}
          ></Btn>
        </ModalContainer>
      </Modal>
      <Modal title={'인증 등록'} width={'905'} mt={'-25'} ml={'860'}>
        <ModalDiv>
          <div>
            <RightDiv>제목</RightDiv>
            <LayoutInput type="text" value={inputData.title} name="title" title="제목" onChange={handleChange} />
          </div>
          <div>
            <RightDiv id="challneger">챌린지</RightDiv>
            <Select value={inputData.no} onChange={handleChange} name="no">
              <option value=""></option>
              {titleData.map((vo) => {
                return (
                  <option key={vo.no} value={vo.no}>
                    {vo.title}
                  </option>
                );
              })}
            </Select>
          </div>
        </ModalDiv>
        <div>
          <RightDiv>내용</RightDiv>
        </div>
        <LayoutTextarea name="content" value={inputData.content} onChange={handleChange} />
        <ModalContainer>
          <Btn
            title={'인증 등록'}
            f={handleAdd}
            str={'등록'}
            c={'#FF7F50'}
            fc={'white'}
            ml={'0'}
            mr={'10'}
            mb={'20'}
          ></Btn>
        </ModalContainer>
      </Modal>
      <NaviContainer>
        <Navi target="challengers" tag={'나의 챌린저'}></Navi>
        <Navi target="challengersList" tag={'목록 '}></Navi>
        <Navi target="challengersBoard" tag={'인증 게시글'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <div style={{ width: '300px', textAlign: 'start', fontSize: '30px' }}>Lv. {level}</div>
        <Expdiv>
          <Exp value={exp} max={Number(requiredExp)} readOnly />
          {exp} / {requiredExp}
        </Expdiv>

        <h2> 내가 신청한 챌린지</h2>
        <ContainerDiv></ContainerDiv>

        {joinList.map((vo, index) => {
          return (
            <>
              <ul>
                <TitleDiv>
                  {index + 1}. {vo.title}
                </TitleDiv>
                <div>
                  {vo.performanceStar} ~ {vo.performanceEn}
                </div>
                <RangeBar value={(vo.completedDays / vo.totalDays) * 100} />
                <StyledDiv>
                  <div>달성률 :{((vo.completedDays / vo.totalDays) * 100).toFixed(2)} / 100(%)</div>
                </StyledDiv>
                <StyledDiv>
                  <div>금일 인증 : {vo.today}</div>
                  <button
                    onClick={() => {
                      reset();
                      dispatch(open({ title: '인증 등록', value: 'block' }));
                    }}
                  >
                    인증 바로가기
                  </button>
                </StyledDiv>
              </ul>
              <ContainerDiv id="underLine"></ContainerDiv>
            </>
          );
        })}

        <div>
          <h2>내가 등록한 챌린지</h2>
          <TextDiv>* 모집기간 전까지 수정 가능합니다.</TextDiv>
          <div>
            <TableWrapper>
              <TableTag>
                <thead>
                  <tr>
                    <ThTag>번호</ThTag>
                    <ThTag>제목</ThTag>
                    <ThTag>내용</ThTag>
                    <ThTag>모집기간</ThTag>
                    <ThTag>수행기간</ThTag>
                  </tr>
                </thead>
                <tbody>
                  {boardData.map((vo, index) => {
                    return (
                      <tr
                        key={vo.no}
                        onClick={() => {
                          reset();
                          setInputData(() => {
                            return {
                              title: vo.title,
                              content: vo.content,
                              writer: '1',
                              recruitmentStart: vo.recruitmentStar,
                              recruitmentEnd: vo.recruitmentEn,
                              performanceStart: vo.performanceStar,
                              performanceEnd: vo.performanceEn,
                              maxMembers: vo.maxMembers,
                              status: vo.status,
                              no: vo.no,
                              memberNo: vo.memberNo,
                              countMember: vo.countMember,
                            };
                          });

                          dispatch(open({ title: '챌린지 수정', value: 'block' }));
                        }}
                      >
                        <TdTag>{index + 1}</TdTag>
                        <TdTag>{vo.title}</TdTag>
                        <TdTag>{vo.content}</TdTag>
                        <TdTag>
                          <span>{vo.recruitmentStar} ~ </span>
                          <div>{vo.recruitmentEn}</div>
                        </TdTag>
                        <TdTag>
                          <span>{vo.performanceStar} ~</span>
                          <div>{vo.performanceEn}</div>
                        </TdTag>
                      </tr>
                    );
                  })}
                </tbody>
              </TableTag>
            </TableWrapper>
          </div>
        </div>
      </ContentLayout>
      <BottomDiv></BottomDiv>
    </>
  );
};

export default Challengers;
