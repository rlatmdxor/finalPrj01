import React from 'react';
import Title from '../../../util/Title';
import Modal from '../../../util/Modal';
import styled from 'styled-components';
import Btn from '../../../util/Btn';
import { useDispatch } from 'react-redux';
import { open } from '../../../../redux/modalSlice';
import InputTag from '../../../util/Input';
import MedisonTable from '../../../util/MedisonTable';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';

const BtnContainer = styled.div`
  display: flex;
  position: absolute;
  margin-left: 820px;
  margin-top: -15px;
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
  {
    image: '/img/logo.png',
    name: '타이레놀',
    effect: '해열 및 감기에 의한 통증(두통, 치통, 근육통, 생리통, 관절통)의 완화',
    dosage: '1회 1정 / 1일 3회',
  },
];

const Drug = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Title> 복용약</Title>
      <NaviContainer>
        <Navi target="drug" tag={'복용중'}></Navi>
        <Navi target="drug1" tag={'과거 먹은 약'}></Navi>
      </NaviContainer>

      <ContentLayout>
        <Modal title={'복용약 등록'} type={'add'}>
          <InputTag name="submit" type="select" title="모양으로 등록" size={'size3'} mb={'10'} mt={'5'}></InputTag>
          <InputTag type="select" title="모양" size={'size3'} mb={'10'} mt={'5'}></InputTag>
          <InputTag type="select" title="이니셜" size={'size3'} mb={'10'} mt={'5'}></InputTag>
          <InputTag type="select" title="색" size={'size3'} mb={'10'} mt={'5'}></InputTag>
          <InputTag type="select" title="투약 횟수" size={'size3'} mb={'10'} mt={'5'}></InputTag>
          <InputTag type="time" title="복용 시간" size={'size3'} mb={'10'} mt={'5'}></InputTag>
        </Modal>
        <Modal title={'복용약 수정'} type={'edit'}>
          <InputTag name="submit" type="select" title="모양으로 등록" size={'size3'} mb={'10'} mt={'5'}></InputTag>
          <InputTag type="select" title="모양" size={'size3'} mb={'10'} mt={'5'}></InputTag>
          <InputTag type="select" title="이니셜" size={'size3'} mb={'10'} mt={'5'}></InputTag>
          <InputTag type="select" title="색" size={'size3'} mb={'10'} mt={'5'}></InputTag>
          <InputTag type="select" title="투약 횟수" size={'size3'} mb={'10'} mt={'5'}></InputTag>
          <InputTag type="time" title="복용 시간" size={'size3'} mb={'10'} mt={'5'}></InputTag>
        </Modal>

        <BtnContainer>
          <div
            onClick={() => {
              dispatch(open({ title: '복용약 등록', value: 'block' }));
            }}
          >
            <Btn str={'등록'} c={'#FF7F50'} fc={'white'}></Btn>
          </div>

          <Btn str={'삭제'} c={'lightgray'} fc={'black'}></Btn>
        </BtnContainer>

        <MedisonTable title="구승용 님의 현재 복용약" MediSonData={MediSonData} />
      </ContentLayout>
    </>
  );
};

export default Drug;
