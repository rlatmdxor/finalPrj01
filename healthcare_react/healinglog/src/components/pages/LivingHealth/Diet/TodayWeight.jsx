import React, { useState } from 'react';
import { BigTextDiv, SmallCard, SmallTextDiv } from './Diet';
import Btn from '../../../util/Btn';
import { useDispatch } from 'react-redux';
import { open } from '../../../../redux/modalSlice';

const TodayWeight = () => {
  const dispatch = useDispatch();

  const handleOpenWeightModal = () => {
    dispatch(open({ title: '체중 등록', value: 'block' }));
  };

  return (
    <>
      <SmallCard>
        <SmallTextDiv>
          <div>오늘의 체중</div>
          <Btn
            str={'등록'}
            w={'50'}
            h={'25'}
            mt={'0'}
            mb={'0'}
            ml={'0'}
            mr={'0'}
            fs={'13'}
            c={'#ff8a60'}
            fc={'#ffffff'}
            f={handleOpenWeightModal}
          />
        </SmallTextDiv>
        <BigTextDiv>60 Kg</BigTextDiv>
      </SmallCard>
    </>
  );
};

export default TodayWeight;
