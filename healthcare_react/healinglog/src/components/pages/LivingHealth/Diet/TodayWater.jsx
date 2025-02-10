import React from 'react';
import { BigTextDiv, SmallCard, SmallTextDiv } from './Diet';
import Btn from '../../../util/Btn';
import { useDispatch } from 'react-redux';
import { open } from '../../../../redux/modalSlice';

const TodayWater = () => {
  const dispatch = useDispatch();

  const handelOpenWaterModal = () => {
    dispatch(open({ title: '물 등록', value: 'block' }));
  };

  return (
    <>
      <SmallCard>
        <SmallTextDiv>
          <div>오늘 마신 물</div>
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
            f={handelOpenWaterModal}
          />
        </SmallTextDiv>
        <BigTextDiv>1600 ml</BigTextDiv>
      </SmallCard>
    </>
  );
};

export default TodayWater;
