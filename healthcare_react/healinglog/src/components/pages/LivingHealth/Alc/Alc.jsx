import React from 'react';
import Title from '../../../util/Title';
import { setSelection } from '../../../../redux/selectSlice';
import SelectedBar from '../../../util/SelectedBar';

const Alc = () => {
  return (
    <div>
      <Title>음주</Title>
      <h1>음주 선택</h1>

      <SelectedBar label="alcohol" options={['소주', '맥주', '막걸리', '와인']} reduxAction={setSelection} index={0} />
      <SelectedBar label="alcohol" options={['주 1회', '주 2~3회', '매일']} reduxAction={setSelection} index={1} />
    </div>
  );
};

export default Alc;
