import React, { useState } from 'react';
import { ModalContainer } from './Diet';
import Modal from '../../../util/Modal';
import Input from '../../../util/Input';
import Btn from '../../../util/Btn';

const WeightEnroll = () => {
  const initialInputData = { weight: '' };
  const [inputData, setInputData] = useState(initialInputData);

  const reset = () => {
    setInputData(initialInputData);
  };

  return (
    <>
      <Modal title="체중 등록">
        <Input
          type="number"
          placeholder="숫자만 입력해주세요"
          title="체중 (kg)"
          size={'size2'}
          mb={'10'}
          mt={'9'}
          min={0}
        />
        <ModalContainer>
          <Btn str={'등록'} mt={'17'} mb={'30'} mr={'0'} c={'#ff8a60'} fc={'white'}></Btn>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default WeightEnroll;
