import React, { useState } from 'react';
import Title from '../../../util/Title';
import Navi from '../../../util/Navi';
import styled from 'styled-components';
import AnFavoriteList from './AnFavoriteList';
import LegExList from './LegExList';
import ArmExList from './ArmExList';
import CoreExList from './CoreExList';
import Modal from '../../../util/Modal';
import Input from '../../../util/Input';
import { useDispatch } from 'react-redux';
import { open } from '../../../../redux/modalSlice';

const AnAerobic = () => {
  const dispatch = useDispatch();
  const [modalTitle, setModalTitle] = useState('');

  return (
    <div>
      <Container>
        <Modal title="운동시작" type={'exercise'}>
          <Input
            type="text"
            plcaeholder="value"
            title="운동명"
            size={'size3'}
            mb={'10'}
            mt={'5'}
            value={modalTitle}
            disabled={true}
          ></Input>
          <Input
            type="time"
            plcaeholder="value"
            title="운동 시간"
            size={'size3'}
            mb={'10'}
            mt={'5'}
            disabled={false}
          ></Input>
          <Input
            type="number"
            plcaeholder="value"
            title="운동 시간"
            size={'size3'}
            mb={'10'}
            mt={'5'}
            disabled={false}
          ></Input>
        </Modal>

        <Title>운동</Title>
        <NaviContainer>
          <Navi target="aerobic" tag={'유산소'}></Navi>
          <Navi target="anaerobic" tag={'무산소'}></Navi>
          <Navi target="exlist" tag={'내역 관리'}></Navi>
          <Navi target="report" tag={'리포트'}></Navi>
        </NaviContainer>

        <BlankSpace />

        <AnFavoriteList
          f={(name) => {
            setModalTitle(name);
            dispatch(open({ title: '운동시작', value: 'block' }));
          }}
        />

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
