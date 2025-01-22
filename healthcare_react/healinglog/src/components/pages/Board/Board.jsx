import React, { useEffect } from 'react';
import Title from '../../util/Title';
import styled from 'styled-components';
import Btn from '../../util/Btn';
import Pagination from '../../util/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setTotalCount, resetPaging } from '../../../redux/pagingSlice';
import SearchBar from '../../util/SearchBar';
import SelectedBar from '../../util/SelectedBar';
import Table from '../../util/Table';

const SearchDiv = styled.div`
  display: flex;
  gap: 10px;
  justify-content: end;
  align-items: center;
  margin: 5px 50px;
`;

const BottomDiv = styled.div`
  display: flex;
  margin: 30px 50px 50px 50px;
  justify-content: space-between;
  align-items: center;
`;

const Board = () => {
  const boardType = 'honeyTip';

  const dataVoList = [
    { no: 69, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 68, category: '병원', title: '제목11111111111111111', votes: 15, writer: '홍길동', date: '2025-01-18' },
    { no: 67, category: '보험', title: '제목222222222222222222', votes: 25, writer: '홍길동', date: '2025-01-18' },
    { no: 66, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 65, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 64, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 63, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 62, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 61, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 60, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 59, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 58, category: '병원', title: '제목11111111111111111', votes: 15, writer: '홍길동', date: '2025-01-18' },
    { no: 57, category: '보험', title: '제목222222222222222222', votes: 25, writer: '홍길동', date: '2025-01-18' },
    { no: 56, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 55, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 54, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 53, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 52, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 51, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 50, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 49, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 48, category: '병원', title: '제목11111111111111111', votes: 15, writer: '홍길동', date: '2025-01-18' },
    { no: 47, category: '보험', title: '제목222222222222222222', votes: 25, writer: '홍길동', date: '2025-01-18' },
    { no: 46, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 45, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 44, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 43, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 42, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 41, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 40, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 39, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 38, category: '병원', title: '제목11111111111111111', votes: 15, writer: '홍길동', date: '2025-01-18' },
    { no: 37, category: '보험', title: '제목222222222222222222', votes: 25, writer: '홍길동', date: '2025-01-18' },
    { no: 36, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 35, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 34, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 33, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 32, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 31, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 30, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 29, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 28, category: '병원', title: '제목11111111111111111', votes: 15, writer: '홍길동', date: '2025-01-18' },
    { no: 27, category: '보험', title: '제목222222222222222222', votes: 25, writer: '홍길동', date: '2025-01-18' },
    { no: 26, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 25, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 24, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 23, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 22, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 21, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 20, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 19, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 18, category: '병원', title: '제목11111111111111111', votes: 15, writer: '홍길동', date: '2025-01-18' },
    { no: 17, category: '보험', title: '제목222222222222222222', votes: 25, writer: '홍길동', date: '2025-01-18' },
    { no: 16, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 15, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 14, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 13, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 12, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 11, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 10, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 9, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 8, category: '병원', title: '제목11111111111111111', votes: 15, writer: '홍길동', date: '2025-01-18' },
    { no: 7, category: '보험', title: '제목222222222222222222', votes: 25, writer: '홍길동', date: '2025-01-18' },
    { no: 6, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 5, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 4, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 3, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 2, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 1, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
  ];

  const dispatch = useDispatch();

  const { currentPage, boardLimit } = useSelector((state) => state.paging[boardType] || {});

  useEffect(() => {
    dispatch(setTotalCount({ boardType, totalCount: dataVoList.length }));
    dispatch(resetPaging({ boardType }));
  }, [dataVoList.length, dispatch]);

  const offset = (currentPage - 1) * boardLimit;
  const data = dataVoList.slice(offset, offset + boardLimit);

  const order = {
    label: '정렬',
    options: ['최신순', '추천수많은순'],
  };

  return (
    <div>
      <Title>꿀팁게시판</Title>
      <SearchDiv>
        <SelectedBar label={order.label} options={order.options} />
        <SearchBar />
      </SearchDiv>
      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>추천수</th>
            <th>작성자</th>
            <th>등록일자</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vo) => {
            return (
              <tr
                key={vo.no}
                onClick={() => {
                  window.location.href = `/board?bno=${vo.no}`;
                }}
              >
                <td>{vo.no}</td>
                <td>{vo.category}</td>
                <td>{vo.title}</td>
                <td>{vo.votes}</td>
                <td>{vo.writer}</td>
                <td>{vo.date}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <BottomDiv>
        <div></div>
        <div>
          <Pagination boardType={boardType} />
        </div>
        <div>
          <Btn str={'등록'} c={'#FF7F50'} fc={'#ffffff'} h={'40'} />
        </div>
      </BottomDiv>
    </div>
  );
};

export default Board;
