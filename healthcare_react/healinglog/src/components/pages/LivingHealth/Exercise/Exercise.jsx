import React from 'react';
import Title from '../../../util/Title';
import Navi from '../../../util/Navi';
import styled from 'styled-components';
import FavoriteList from './FavoriteList';

const Exercise = () => {
  return (
    <div>
      <Container>
        <Title>운동</Title>
        <NaviContainer>
          <Navi target="exercise" tag={'유산소'}></Navi>
          <Navi target="exercise2" tag={'무산소'}></Navi>
          <Navi target="exlist" tag={'내역 관리'}></Navi>
          <Navi target="report" tag={'리포트'}></Navi>
        </NaviContainer>
        <BlankSpace></BlankSpace>
        <FavoriteList></FavoriteList>
      </Container>
    </div>
  );
};

const Container = styled.div``;

const BlankSpace = styled.div`
  height: 60px;
`;

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 400px;
  top: 20px;
  left: 40px;
  grid-template-columns: 3fr 3fr 4fr 3fr;
`;

export default Exercise;
