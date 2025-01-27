import React from 'react';
import Title from '../../../util/Title';
import styled from 'styled-components';

const SubTitle = styled.div`
  font-size: 35px;
  font-weight: 600;
  color: gray;
  margin-top: 30px;
  margin-bottom: 50px;
  margin-left: 50px;
`;

const Highlight = styled.span`
  border-bottom: 6px solid #ff7f50; /* 주황색 밑줄 */
  padding-bottom: 5px;
  color: black;
`;

const CigaretteReport = () => {
  return (
    <div>
      <Title>흡연 관리</Title>
      <SubTitle>
        <Highlight>캘린더</Highlight>&nbsp;&nbsp;리포트
      </SubTitle>
    </div>
  );
};

export default CigaretteReport;
