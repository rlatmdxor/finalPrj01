import React from 'react';

import Title from '../../../util/Title';

import styled from 'styled-components';

import Navi from '../../../util/Navi';
import MedisonTable from '../../../util/MedisonTable';

const TextDiv = styled.div`
  display: flex;
  position: absolute;
  font-size: 13px;
  margin-left: 975px;
  margin-top: 30px;
`;

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 400px;
  top: 20px;
  left: 40px;
  margin-bottom: 100px;
  grid-template-columns: 3fr 7fr;
`;

const MediSonData = [
  {
    image: '/img/logo.png',
    name: '타이레놀',
    effect: '해열 및 감기에 의한 통증(두통, 치통, 근육통, 생리통, 관절통)의 완화',
    dosage: '1회 1정 / 1일 3회',
  },
  {
    image: '/img/logo.png',
    name: '타이레놀',
    effect: '해열 및 감기에 의한 통증(두통, 치통, 근육통, 생리통, 관절통)의 완화',
    dosage: '1회 1정 / 1일 3회',
  },
];

const Drug1 = () => {
  return (
    <div>
      <Title> 과거 복용 약</Title>
      <NaviContainer>
        <Navi target="drug" tag={'복용중'}></Navi>
        <Navi target="drug1" tag={'과거 복용 약'}></Navi>
      </NaviContainer>

      <TextDiv>* 최근 1년 간 등록된 약만 표시됩니다.</TextDiv>
      <MedisonTable title="구승용 님의 과거 복용약" MediSonData={MediSonData} />
    </div>
  );
};

export default Drug1;
