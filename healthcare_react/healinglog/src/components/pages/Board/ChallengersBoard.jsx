import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Title from '../../util/Title';
import Navi from '../../util/Navi';
import ContentLayout from '../../util/ContentLayout';
import { useDispatch, useSelector } from 'react-redux';
import { resetPaging, setTotalCount } from '../../../redux/pagingSlice';
import Modal from '../../util/Modal';
import { close, open } from '../../../redux/modalSlice';
import Btn from '../../util/Btn';
import Pagination from '../../util/Pagination';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired, getRoleFromToken } from '../../util/JwtUtil';
import { BASE_URL } from '../../services/config';

const BottomDiv = styled.div`
  margin-top: 10px;
  margin-bottom: 35px;
`;

const BtnContainer = styled.div`
  display: flex;
  position: absolute;
  margin-left: 910px;
  margin-top: -80px;
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
  &[name='writer'] {
    width: 80px;
    text-align: center;
  }
  &[name='no'] {
    margin-left: 25px;
  }
`;

const LayoutTextarea = styled.textarea`
  width: 805px;
  margin-top: 10px;
  height: 250px;
  padding: 10px;
  margin-left: 5px;
  border-radius: 10px;
  margin-bottom: 20px;
  resize: none; /* 크기 조정 방지 */
`;

const RightDiv = styled.div`
  margin-left: 10px;

  &[id='challneger'] {
    margin-left: 30px;
  }
  &[id='writer'] {
    display: flex;
  }
`;

const ModalDiv = styled.div`
  display: flex;
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
  margin-bottom: 30px;
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

const WriterDiv = styled.div`
  display: flex;
`;

const ChallengersBoard = () => {
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
  const [titleData, setTitleData] = useState([]);
  const boardType = 'challengerBoardList';
  const initialInputData = {
    title: '',
    content: '',
    writer: '1',
    challengerNo: '',
    challengerName: '',
    no: '',
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

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    fetch(`${BASE_URL}/api/challenger/postList`)
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

    fetch(`${BASE_URL}/api/challenger/postTitleList`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTitleData(data);
      });
  }, [isAuthorized, token, currentPage, boardLimit, num]);

  const handleChange = (e) => {
    setInputData((props) => {
      return {
        ...props,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleAdd = (e) => {
    if (inputData.no === '' && inputData.content === '' && inputData.title === '') {
      Swal.fire({
        icon: 'warning',
        title: '작성해주세요',
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
              Swal.fire({
                icon: 'success',
                title: '등록되었습니다.',
                confirmButtonText: '확인',
              });
              return;
            }
            if (data === '2') {
              Swal.fire({
                icon: 'warning',
                title: '이미 등록했습니다.',
                confirmButtonText: '확인',
              });
              return;
            }
            if (data === '3') {
              Swal.fire({
                icon: 'warning',
                title: '등록 기간이 아닙니다.',
                confirmButtonText: '확인',
              });
              return;
            }
          })
          .then(() => {
            return setNum(num + 1);
          });

        dispatch(close(e.target.title));
      }
    });
  };

  return (
    <>
      <Title>챌린지</Title>
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
      <Modal title={'챌린지 상세보기'} width={'905'} mt={'-25'} ml={'860'}>
        <div>
          <RightDiv id="writer">작성자</RightDiv>
          <LayoutInput type="text" value={inputData.writer} name="writer" title="작성자" readOnly />
        </div>
        <ModalDiv>
          <div>
            <RightDiv>제목</RightDiv>
            <LayoutInput type="text" value={inputData.title} name="title" title="제목" readOnly />
          </div>
          <div>
            <RightDiv id="challneger">챌린지</RightDiv>
            <LayoutInput type="text" value={inputData.challengerName} name="no" title="챌린지" readOnly />
          </div>
        </ModalDiv>
        <div>
          <RightDiv>내용</RightDiv>
        </div>
        <LayoutTextarea name="content" value={inputData.content} readOnly />
      </Modal>
      <NaviContainer>
        <Navi target="challengers" tag={'나의 챌린저'}></Navi>
        <Navi target="challengersList" tag={'목록'}></Navi>
        <Navi target="challengersBoard" tag={'인증 게시글'}></Navi>
      </NaviContainer>

      <ContentLayout>
        <BtnContainer>
          <div
            onClick={() => {
              reset();
              dispatch(open({ title: '인증 등록', value: 'block' }));
            }}
          >
            <Btn str={'등록'} c={'#FF7F50'} fc={'white'} ml={'30'} mr={'30'} title={'인증 등록'}></Btn>
          </div>
        </BtnContainer>
        <TableWrapper>
          <TableTag>
            <thead>
              <tr>
                <ThTag>번호</ThTag>
                <ThTag>제목</ThTag>
                <ThTag>작성자</ThTag>
                <ThTag>등록일자</ThTag>
              </tr>
            </thead>
            <tbody>
              {challengerData.map((vo, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => {
                      reset();
                      setInputData(() => {
                        return {
                          title: vo.title,
                          content: vo.content,
                          writer: vo.nick,
                          no: vo.no,
                          challengerNo: vo.challengerNo,
                          challengerName: vo.challengerName,
                        };
                      });

                      dispatch(open({ title: '챌린지 상세보기', value: 'block' }));
                    }}
                  >
                    <TdTag>{vo.no}</TdTag>
                    <TdTag>{vo.title}</TdTag>
                    <TdTag>{vo.nick}</TdTag>
                    <TdTag>{vo.enrollDate}</TdTag>
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

export default ChallengersBoard;
