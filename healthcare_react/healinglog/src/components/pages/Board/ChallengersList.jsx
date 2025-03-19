import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Title from '../../util/Title';
import Navi from '../../util/Navi';
import ContentLayout from '../../util/ContentLayout';
import Btn from '../../util/Btn';
import Modal from '../../util/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { close, open } from '../../../redux/modalSlice';
import { resetPaging, setTotalCount } from '../../../redux/pagingSlice';
import Pagination from '../../util/Pagination';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { isTokenExpired, getRoleFromToken } from '../../util/JwtUtil';
import { BASE_URL } from '../../services/config';

const BottomDiv = styled.div`
  margin-top: 25px;
  margin-bottom: 35px;
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
const TableWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const TableTag = styled.table`
  width: 100%;
  border-collapse: collapse;
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
const BtnContainer = styled.div`
  display: flex;
  position: absolute;
  margin-left: 1090px;
  margin-top: 160px;
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

const LayoutTextarea = styled.textarea`
  width: 805px;
  margin-top: 10px;
  height: 250px;
  padding: 10px;
  margin-left: 5px;
  border-radius: 10px;
  resize: none; /* 크기 조정 방지 */
`;

const TitleDiv = styled.div`
  margin-left: 25px;
`;
const RightDiv = styled.div`
  margin-left: 6px;
`;

const ModalDiv = styled.div`
  display: flex;
`;

const ChallengersList = () => {
  const token = localStorage.getItem('token');
  const navi = useNavigate();
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

  const dispatch = useDispatch();
  const [challengerData, setChallengerData] = useState([]);
  const [inputData, setInputData] = useState({});
  const boardType = 'challengerList';
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
  };

  const currentPage = useSelector((state) => state.paging[boardType]?.currentPage || 1);
  const boardLimit = useSelector((state) => state.paging[boardType]?.boardLimit || 12);
  const offset = (currentPage - 1) * boardLimit;

  useEffect(() => {
    dispatch(resetPaging({ boardType }));
  }, []);

  const [num, setNum] = useState(0);
  const reset = () => {
    setInputData(initialInputData);
  };
  const handleAdd = (e) => {
    if (inputData.title === '') {
      Swal.fire({
        icon: 'warning',
        title: '제목을 입력하세요.',
        confirmButtonText: '확인',
      });
      return;
    }
    if (inputData.recruitmentStart === '') {
      Swal.fire({
        icon: 'warning',
        title: '모집 시작일을 입력하세요.',
        confirmButtonText: '확인',
      });
      return;
    }
    if (inputData.recruitmentEnd === '') {
      Swal.fire({
        icon: 'warning',
        title: '모집 종료일을 입력하세요.',
        confirmButtonText: '확인',
      });
      return;
    }
    if (inputData.performanceStart === '') {
      Swal.fire({
        icon: 'warning',
        title: '수행 시작일을 입력하세요.',
        confirmButtonText: '확인',
      });
      return;
    }
    if (inputData.performanceEnd === '') {
      Swal.fire({
        icon: 'warning',
        title: '수행 종료일을 입력하세요.',
        confirmButtonText: '확인',
      });
      return;
    }
    if (inputData.content === '') {
      Swal.fire({
        icon: 'warning',
        title: '내용을 입력하세요.',
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
        fetch(`${BASE_URL}/api/challenger/write`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(inputData),
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data === 0) {
              Swal.fire({
                icon: 'warning',
                title: '작성 실패',
                confirmButtonText: '확인',
              });
              return;
            }

            if (data === 2) {
              Swal.fire({
                icon: 'warning',
                title: '작성 실패',
                text: '모집 시작이 현재 시간보다 이전입니다!',
                confirmButtonText: '확인',
              });
              return;
            }
            if (data === 3) {
              Swal.fire({
                icon: 'warning',
                title: '작성 실패',
                title: '모집 종료가 모집 시작보다 이전입니다!',
                confirmButtonText: '확인',
              });
              return;
            }
            if (data === 4) {
              Swal.fire({
                icon: 'warning',
                title: '작성 실패',
                title: '수행 시작이 모집 종료보다 이전입니다!',
                confirmButtonText: '확인',
              });
              return;
            }
            if (data === 5) {
              Swal.fire({
                icon: 'warning',
                title: '작성 실패',
                title: '수행 종료가 수행 시작보다 이전입니다!',
                confirmButtonText: '확인',
              });
              return;
            }

            Swal.fire({
              icon: 'success',
              title: '작성 완료.',
              confirmButtonText: '확인',
            });
            setNum(num + 1);
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

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    fetch(`${BASE_URL}/api/challenger/list`)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length > 0) {
          dispatch(setTotalCount({ boardType, totalCount: data.length }));
          const pagedData = data.slice(offset, offset + boardLimit);
          setChallengerData(pagedData);
        } else {
          dispatch(resetPaging({ boardType }));
          setChallengerData([]);
        }
      });
  }, [isAuthorized, token, currentPage, boardLimit, num]);

  const handleJoin = (e) => {
    const memberNo = '1';

    if (inputData.maxMembers - inputData.countMember === 0) {
      Swal.fire({
        icon: 'warning',
        title: '정원이 꽉 찼습니다.',
        confirmButtonText: '확인',
      });

      dispatch(close(e.target.title));
      return;
    }
    if (inputData.status === '대기') {
      Swal.fire({
        icon: 'warning',
        title: '대기중입니다.',
        confirmButtonText: '확인',
      });

      dispatch(close(e.target.title));
      return;
    }

    if (inputData.status === '완료') {
      Swal.fire({
        icon: 'warning',
        title: '마감됐습니다.',
        confirmButtonText: '확인',
      });

      dispatch(close(e.target.title));
      return;
    }

    if (inputData.status === '진행중') {
      Swal.fire({
        title: '신청하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '등록',
        cancelButtonText: '취소',
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`${BASE_URL}/api/challenger/join`, {
            method: 'post',
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              no: inputData.no,
              memberNo: memberNo,
            }),
          })
            .then((resp) => resp.text())
            .then((data) => {
              if (data === '2') {
                dispatch(close(e.target.title));
                Swal.fire({
                  icon: 'warning',
                  title: '참여중인 챌린지입니다.',
                  confirmButtonText: '확인',
                });
              } else {
                setNum(num + 1);

                dispatch(close(e.target.title));
                Swal.fire({
                  icon: 'success',
                  title: '신청됐습니다.',
                  confirmButtonText: '확인',
                });
              }
            });
        }
      });
    }
  };

  return (
    <>
      <Title>챌린지</Title>

      <Modal title={'챌린지 등록'} width={'905'} mt={'-25'} ml={'860'}>
        <ModalDiv>
          <div>
            <RightDiv>제목</RightDiv>
            <LayoutInput type="text" value={inputData.title} name="title" title="제목" onChange={handleChange} />
          </div>
          <div>
            <TitleDiv>정원</TitleDiv>
            <LayoutInput
              type="number"
              value={`${inputData.maxMembers}` ? `${inputData.maxMembers}` : 1}
              name="maxMembers"
              title="모집 인원"
              onChange={handleChange}
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
            title={'챌린지 등록'}
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
      <Modal title={'챌린지 신청'} width={'905'} mt={'-25'} ml={'860'}>
        <ModalDiv>
          <div>
            <RightDiv>제목</RightDiv>
            <LayoutInput
              type="text"
              value={inputData.title}
              name="title"
              title="제목"
              onChange={handleChange}
              readOnly
            />
          </div>
          <div>
            <TitleDiv>정원</TitleDiv>
            <LayoutInput
              type="number"
              value={inputData.maxMembers}
              name="maxMembers"
              title="모집 인원"
              onChange={handleChange}
              readOnly
            />
          </div>
          <div>
            <TitleDiv>남은인원</TitleDiv>
            <LayoutInput
              type="number"
              value={inputData.maxMembers - inputData.countMember}
              name="maxMembers"
              title="남은 인원"
              onChange={handleChange}
              readOnly
            />
          </div>
          <div>
            <TitleDiv> 모집</TitleDiv>
            <LayoutInput name="status" type="text" value={inputData.status} readOnly />
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
          readOnly
        />
        <label> ~ </label>
        <LayoutInput
          type="datetime-local"
          value={inputData.recruitmentEnd}
          id="end"
          name="recruitmentEnd"
          onChange={handleChange}
          readOnly
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
          readOnly
        />
        <label> ~ </label>
        <LayoutInput
          type="datetime-local"
          value={inputData.performanceEnd}
          id="end"
          name="performanceEnd"
          onChange={handleChange}
          readOnly
        />
        <div>
          <RightDiv>내용</RightDiv>
        </div>
        <LayoutTextarea name="content" value={inputData.content} onChange={handleChange} readOnly />
        <ModalContainer>
          <Btn
            title={'챌린지 신청'}
            f={handleJoin}
            str={'신청'}
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
        <Navi target="challengersList" tag={'목록'}></Navi>
        <Navi target="challengersBoard" tag={'인증 게시글'}></Navi>
      </NaviContainer>
      <BtnContainer>
        <div
          onClick={() => {
            reset();
            dispatch(open({ title: '챌린지 등록', value: 'block' }));
          }}
        >
          <Btn str={'등록'} c={'#FF7F50'} fc={'white'} ml={'30'} mr={'30'} title={'챌린지 등록'}></Btn>
        </div>
      </BtnContainer>
      <ContentLayout>
        <TableWrapper>
          <TableTag>
            <thead>
              <tr>
                <ThTag>번호</ThTag>
                <ThTag>제목</ThTag>
                <ThTag>내용</ThTag>
                <ThTag>모집기간</ThTag>
                <ThTag>수행기간</ThTag>
                <ThTag>모집</ThTag>
              </tr>
            </thead>
            <tbody>
              {challengerData.map((vo) => {
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

                      dispatch(open({ title: '챌린지 신청', value: 'block' }));
                    }}
                  >
                    <TdTag>{vo.no}</TdTag>
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
                    <TdTag width={'60px'}>{vo.status}</TdTag>
                  </tr>
                );
              })}
            </tbody>
          </TableTag>
        </TableWrapper>
      </ContentLayout>
      <BottomDiv>
        <Pagination boardType={boardType}></Pagination>
      </BottomDiv>
    </>
  );
};

export default ChallengersList;
