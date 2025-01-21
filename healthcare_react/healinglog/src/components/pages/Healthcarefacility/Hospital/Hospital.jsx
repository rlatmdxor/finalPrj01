import React from 'react';
import Title from '../../../util/Title';
import SelectedBar from '../../../util/SelectedBar';
import { setSelection } from '../../../../redux/selectSlice';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  /* justify-content: center; 중앙 정렬 */
  gap: 20px; /* 간격 추가 */
  flex-wrap: wrap; /* 줄 바꿈 허용 */
  margin-top: 20px;
  margin-left: 100px;
`;

const Hospital = () => {
  return (
    <>
      <Title>병원</Title>
      <Wrapper>
        <SelectedBar
          label="alcohol"
          options={['서울', '경기', '인천', '어디지']}
          reduxAction={setSelection}
          index={0}
        />
        <SelectedBar
          label="alcohol"
          options={['동작구', '은평구', '아무구', '저리구']}
          reduxAction={setSelection}
          index={1}
        />
        <SelectedBar
          label="alcohol"
          options={['동작구', '은평구', '아무구', '저리구']}
          reduxAction={setSelection}
          index={2}
        />
      </Wrapper>
    </>
  );
};

export default Hospital;
