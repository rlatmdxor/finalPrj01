import React, { useEffect, useState } from 'react';
import Title from '../../../util/Title';
import Navi from '../../../util/Navi';
import styled from 'styled-components';
import FavoriteList from './List/FavoriteList';
import AerobicList from './List/AerobicList';
import Modal from '../../../util/Modal';
import Input from '../../../util/Input';
import { useDispatch } from 'react-redux';
import { close, open } from '../../../../redux/modalSlice';
import { useNavigate } from 'react-router-dom';

const Aerobic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalTitle, setModalTitle] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(1);

  const handleRegister = () => {
    navigate(`/exercising/${modalTitle}`, {
      state: {
        title: modalTitle,
        hours,
        minutes,
      },
    });
  };

  useEffect(() => {
    dispatch(close('운동시작'));
  });

  return (
    <div>
      <Container>
        <Modal title="운동시작" type={'exercise'} f={handleRegister}>
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
            type="number"
            placeholder="VALUE"
            title="시간"
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={(e) => {
              let inputValue = Number(e.target.value);

              if (inputValue < 0) {
                inputValue = 0;
              }

              if (inputValue > 11) {
                inputValue = 11;
              }

              setHours(inputValue);

              if (inputValue === 0 && minutes < 1) {
                setMinutes(1);
              }
            }}
            value={hours}
            disabled={false}
          />
          <Input
            type="number"
            placeholder="VALUE"
            title="분"
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={(e) => {
              let inputValue = Number(e.target.value);

              if (inputValue < 0) {
                inputValue = 0;
              }

              if (inputValue > 59) {
                inputValue = 59;
              }

              if (hours === 0 && inputValue < 1) {
                inputValue = 1;
              }

              setMinutes(inputValue);
            }}
            value={minutes}
            disabled={false}
          />
        </Modal>

        <Title>운동</Title>
        <NaviContainer>
          <Navi target="aerobic" tag={'유산소'}></Navi>
          <Navi target="anaerobic" tag={'무산소'}></Navi>
          <Navi target="exhistory" tag={'내역 관리'}></Navi>
          <Navi target="exreport" tag={'리포트'}></Navi>
        </NaviContainer>
        <BlankSpace />
        <FavoriteList
          f={(name) => {
            setModalTitle(name);
            dispatch(open({ title: '운동시작', value: 'block' }));
          }}
        />
        <BlankSpace />
        <AerobicList
          f={(name) => {
            setModalTitle(name);
            dispatch(open({ title: '운동시작', value: 'block' }));
          }}
        />
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

export default Aerobic;
