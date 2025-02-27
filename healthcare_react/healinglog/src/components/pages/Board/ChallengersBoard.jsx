import React, { useState } from 'react';
import styled from 'styled-components';
import Title from '../../util/Title';
import Navi from '../../util/Navi';
import ContentLayout from '../../util/ContentLayout';

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

const ChallengersBoard = () => {
  const [value, setValue] = useState([null, null]);

  return (
    <>
      <Title>챌린저스</Title>
      <NaviContainer>
        <Navi target="challengers" tag={'나의 챌린저'}></Navi>
        <Navi target="challengersList" tag={'목록'}></Navi>
        <Navi target="challengersBoard" tag={'인증 게시글'}></Navi>
      </NaviContainer>

      <ContentLayout>
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
              <tr>
                <TdTag>1</TdTag>
                <TdTag>오늘도 완료함 ㅎㅎㅎ</TdTag>
                <TdTag>코코넨네</TdTag>
                <TdTag>2025-02-27</TdTag>
              </tr>
            </tbody>
          </TableTag>
        </TableWrapper>
      </ContentLayout>
    </>
  );
};

export default ChallengersBoard;
