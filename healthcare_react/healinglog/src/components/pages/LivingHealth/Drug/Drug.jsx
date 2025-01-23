import React from 'react';
import Title from '../../../util/Title';
import Modal from '../../../util/Modal';
import styled from 'styled-components';
import Btn from '../../../util/Btn';
import { useDispatch } from 'react-redux';
import { open } from '../../../../redux/modalSlice';
import DateBtn from '../../../util/DateBtn';

const BtnDiv = styled.div`
  margin-left: 910px;
`;
const Drug = () => {
  const dispatch = useDispatch();

  const data = ['일', '주', '월'];

  return (
    <div>
      <Title> 복용약</Title>
      <Modal title={'복용약'}></Modal>
      <BtnDiv
        onClick={() => {
          dispatch(open({ title: '복용약', value: 'block' }));
        }}
      >
        <Btn onClick={console.log('zz')} str={'등록'} c={'#FF7F50'} fc={'white'}></Btn>
      </BtnDiv>

      <DateBtn data={data}></DateBtn>
    </div>
  );
};

export default Drug;
