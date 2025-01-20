import React from 'react';
import Title from '../../util/Title';
import BoardList from '../../common/BoardList';
import styled from 'styled-components';
import Btn from '../../util/Btn';
import Pagination from '../../util/Pagination';

const ContentDiv = styled.div``;

const BottomDiv = styled.div`
  display: flex;
  margin: 30px 50px 50px 50px;
  justify-content: space-between;
  align-items: center;
`;

const Board = () => {
  const dummyData = [
    { id: 12, category: '병원', title: '제목11111111111111111', votes: 15, author: '홍길동', date: '2025-01-18' },
    { id: 11, category: '보험', title: '제목222222222222222222', votes: 25, author: '홍길동', date: '2025-01-18' },
    { id: 10, category: '생활', title: '제목333333333333333333', votes: 36, author: '홍길동', date: '2025-01-18' },
    { id: 9, category: '생활', title: '제목333333333333333333', votes: 36, author: '홍길동', date: '2025-01-18' },
    { id: 8, category: '병원', title: '제목11111111111111111', votes: 15, author: '홍길동', date: '2025-01-18' },
    { id: 7, category: '보험', title: '제목222222222222222222', votes: 25, author: '홍길동', date: '2025-01-18' },
    { id: 6, category: '생활', title: '제목333333333333333333', votes: 36, author: '홍길동', date: '2025-01-18' },
    { id: 5, category: '생활', title: '제목333333333333333333', votes: 36, author: '홍길동', date: '2025-01-18' },
    { id: 4, category: '생활', title: '제목333333333333333333', votes: 36, author: '홍길동', date: '2025-01-18' },
    { id: 3, category: '생활', title: '제목333333333333333333', votes: 36, author: '홍길동', date: '2025-01-18' },
    { id: 2, category: '생활', title: '제목333333333333333333', votes: 36, author: '홍길동', date: '2025-01-18' },
    { id: 1, category: '생활', title: '제목333333333333333333', votes: 36, author: '홍길동', date: '2025-01-18' },
  ];

  return (
    <div>
      <Title>꿀팁게시판</Title>
      <BoardList>
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
          <tr>
            <td>3</td>
            <td>병원</td>
            <td>제목11111111111111111</td>
            <td>15</td>
            <td>홍길동</td>
            <td>2025-01-18</td>
          </tr>
        </tbody>
      </BoardList>
      <BottomDiv>
        <div></div>
        <div>
          <Pagination />
        </div>
        <div>
          <Btn str={'등록'} c={'#FF7F50'} fc={'#ffffff'} h={'40'} />
        </div>
      </BottomDiv>
    </div>
  );
};

export default Board;
