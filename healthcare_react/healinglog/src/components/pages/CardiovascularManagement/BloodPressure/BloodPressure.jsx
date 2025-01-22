import React from 'react';
import Title from '../../../util/Title';
import Calendar from '../../../util/Calendar';
import Modal from '../../../util/Modal';
import ModalInput from '../../../util/ModalInput';

const BloodPressure = () => {
  return (
    <div>
      <Title>혈압</Title>
      <Calendar />

      <ModalInput title="안녕ㅋㅋ"></ModalInput>
    </div>
  );
};

export default BloodPressure;
