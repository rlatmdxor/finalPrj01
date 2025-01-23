import React, { useEffect } from 'react';
import Title from '../../util/Title';
import styled from 'styled-components';
import Btn from '../../util/Btn';
import Pagination from '../../util/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setTotalCount, resetPaging } from '../../../redux/pagingSlice';
import Table from '../../util/Table';
import SearchBar from '../../util/SearchBar';

const SearchDiv = styled.div`
  display: flex;
  justify-content: end;
  gap: 5px;
  align-items: center;
  margin: 5px 50px;
`;

const SelectBox = styled.select`
  width: ${(props) => props.width || '100px'};
  height: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0px 3px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const BottomDiv = styled.div`
  display: flex;
  margin: 30px 50px 50px 50px;
  justify-content: space-between;
  align-items: center;
`;

const HospitalReview = () => {
  const boardType = 'hospitalReview';

  const dummyDataVo = [
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
    dispatch(setTotalCount({ boardType, totalCount: dummyDataVo.length }));
    dispatch(resetPaging({ boardType }));
  }, [dummyDataVo.length, dispatch]);

  const offset = (currentPage - 1) * boardLimit;
  const data = dummyDataVo.slice(offset, offset + boardLimit);

  const searchFilter = {
    order: ['최신순', '오래된순', '조회순', '별점순'],
    searchType: ['병원명', '제목', '내용', '제목+내용'],
  };

  return (
    <div>
      <Title>병원리뷰게시판</Title>
      <SearchDiv>
        <SelectBox>
          {searchFilter.order.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </SelectBox>
        <SelectBox>
          {searchFilter.searchType.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </SelectBox>
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

export default HospitalReview;
