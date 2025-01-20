import React from 'react';
import Title from '../../util/Title';
import BoardList from '../../common/BoardList';
import styled from 'styled-components';
import Btn from '../../util/Btn';
import Pagination from '../../util/Pagination';

const ContentDiv = styled.div`
  display: flex;
  margin: 20px 50px;
`;

const BottomDiv = styled.div`
  display: flex;
  margin: 30px 50px 50px 50px;
  justify-content: space-between;
  align-items: center;
`;

const Board = () => {
  return (
    <div>
      <Title>꿀팁게시판</Title>
      <ContentDiv>
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
            <tr>
              <td>2</td>
              <td>보험</td>
              <td>제목222222222222222222</td>
              <td>25</td>
              <td>홍길동</td>
              <td>2025-01-18</td>
            </tr>
            <tr>
              <td>1</td>
              <td>생활</td>
              <td>제목333333333333333333</td>
              <td>36</td>
              <td>홍길동</td>
              <td>2025-01-18</td>
            </tr>
            <tr>
              <td>1</td>
              <td>생활</td>
              <td>제목333333333333333333</td>
              <td>36</td>
              <td>홍길동</td>
              <td>2025-01-18</td>
            </tr>
            <tr>
              <td>1</td>
              <td>생활</td>
              <td>제목333333333333333333</td>
              <td>36</td>
              <td>홍길동</td>
              <td>2025-01-18</td>
            </tr>
            <tr>
              <td>1</td>
              <td>생활</td>
              <td>제목333333333333333333</td>
              <td>36</td>
              <td>홍길동</td>
              <td>2025-01-18</td>
            </tr>
            <tr>
              <td>1</td>
              <td>생활</td>
              <td>제목333333333333333333</td>
              <td>36</td>
              <td>홍길동</td>
              <td>2025-01-18</td>
            </tr>
            <tr>
              <td>1</td>
              <td>생활</td>
              <td>제목333333333333333333</td>
              <td>36</td>
              <td>홍길동</td>
              <td>2025-01-18</td>
            </tr>
            <tr>
              <td>1</td>
              <td>생활</td>
              <td>제목333333333333333333</td>
              <td>36</td>
              <td>홍길동</td>
              <td>2025-01-18</td>
            </tr>
            <tr>
              <td>1</td>
              <td>생활</td>
              <td>제목333333333333333333</td>
              <td>36</td>
              <td>홍길동</td>
              <td>2025-01-18</td>
            </tr>
            <tr>
              <td>1</td>
              <td>생활</td>
              <td>제목333333333333333333</td>
              <td>36</td>
              <td>홍길동</td>
              <td>2025-01-18</td>
            </tr>
            <tr>
              <td>1</td>
              <td>생활</td>
              <td>제목333333333333333333</td>
              <td>36</td>
              <td>홍길동</td>
              <td>2025-01-18</td>
            </tr>
          </tbody>
        </BoardList>
      </ContentDiv>
      <BottomDiv>
        <div></div>
        <div>
          <Pagination />
        </div>
        <div>
          <Btn str={'등록'} c={'#FF7F50'} fc={'#ffffff'} />
        </div>
      </BottomDiv>
    </div>
  );
};

export default Board;
