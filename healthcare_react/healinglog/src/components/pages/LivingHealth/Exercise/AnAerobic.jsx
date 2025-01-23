import React from 'react';
import Title from '../../../util/Title';
import Navi from '../../../util/Navi';
import styled from 'styled-components';
import AnFavoriteList from './AnFavoriteList';
import LegExList from './LegExList';
import ArmExList from './ArmExList';
import CoreExList from './CoreExList';
import Modal from '../../../util/Modal';

const AnAerobic = () => {
  return (
    <div>
      <Container>
        <Title>운동</Title>
        <NaviContainer>
          <Navi target="aerobic" tag={'유산소'}></Navi>
          <Navi target="anaerobic" tag={'무산소'}></Navi>
          <Navi target="exlist" tag={'내역 관리'}></Navi>
          <Navi target="report" tag={'리포트'}></Navi>
        </NaviContainer>
        <BlankSpace />
        <AnFavoriteList />
        <BlankSpace />
        <ListContainer>
          <ArmExList />
          <LegExList />
          <CoreExList />
        </ListContainer>
        <ListContainer>
          <ArmExList />
          <LegExList />
          <CoreExList />
        </ListContainer>
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

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default AnAerobic;
