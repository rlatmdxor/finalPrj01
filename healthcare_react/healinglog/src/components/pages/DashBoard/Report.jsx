import React from 'react';
import Title from '../../util/Title';
import ContentLayout from '../../util/ContentLayout';
import styled from 'styled-components';
import Navi from '../../util/Navi';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 200px;
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 3fr;
`;
const Report = () => {
  return (
    <>
      <Title>나의 건강 현황</Title>
      <NaviContainer>
        <Navi target="dashboard" tag={'대시보드'}></Navi>
        <Navi target="dashboard/report" tag={'리포트'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <h1>rrr</h1>
        <h1>rrr</h1>
        <h1>rrr</h1>
      </ContentLayout>
    </>
  );
};

export default Report;
