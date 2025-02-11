import React from 'react';
import styled from 'styled-components';
import { ContentAreaDiv, BigTextDiv, SmallCard, SmallTextDiv } from './Diet';
import Btn from '../../../util/Btn';
import { useDispatch } from 'react-redux';
import { close, open } from '../../../../redux/modalSlice';

const TodayDietitian = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const TodayDiet = () => {
  const dispatch = useDispatch();

  const handleOpenDietEnrollModal = () => {
    dispatch(open({ title: '식단 등록', value: 'block' }));
  };

  return (
    <>
      <TodayDietitian>
        <div>오늘의 식단</div>
        <Btn
          str={'등록'}
          w={'60'}
          h={'34'}
          mt={'0'}
          mb={'0'}
          ml={'0'}
          mr={'0'}
          fs={'15'}
          c={'#ff8a60'}
          fc={'#ffffff'}
          f={handleOpenDietEnrollModal}
        />
      </TodayDietitian>
      <ContentAreaDiv>
        <SmallCard>
          <SmallTextDiv>
            <div>아침</div>
            <Btn str={'상세'} w={'50'} h={'25'} mt={'0'} mb={'0'} ml={'0'} mr={'0'} fs={'13'} />
          </SmallTextDiv>
          <BigTextDiv>2500 Kcal</BigTextDiv>
        </SmallCard>
        <SmallCard>
          <SmallTextDiv>
            <div>오전간식</div>
            <Btn str={'상세'} w={'50'} h={'25'} mt={'0'} mb={'0'} ml={'0'} mr={'0'} fs={'13'} />
          </SmallTextDiv>
          <div>등록된 식단이 없습니다.</div>
        </SmallCard>
        <SmallCard>
          <SmallTextDiv>
            <div>점심</div>
            <Btn str={'상세'} w={'50'} h={'25'} mt={'0'} mb={'0'} ml={'0'} mr={'0'} fs={'13'} />
          </SmallTextDiv>
          <BigTextDiv>2500 Kcal</BigTextDiv>
        </SmallCard>
      </ContentAreaDiv>
      <ContentAreaDiv>
        <SmallCard>
          <SmallTextDiv>
            <div>오후간식</div>
            <Btn str={'상세'} w={'50'} h={'25'} mt={'0'} mb={'0'} ml={'0'} mr={'0'} fs={'13'} />
          </SmallTextDiv>
          <div>등록된 식단이 없습니다.</div>
        </SmallCard>
        <SmallCard>
          <SmallTextDiv>
            <div>저녁</div>
            <Btn str={'상세'} w={'50'} h={'25'} mt={'0'} mb={'0'} ml={'0'} mr={'0'} fs={'13'} />
          </SmallTextDiv>
          <div>등록된 식단이 없습니다.</div>
        </SmallCard>
        <SmallCard>
          <SmallTextDiv>
            <div>야식</div>
            <Btn str={'상세'} w={'50'} h={'25'} mt={'0'} mb={'0'} ml={'0'} mr={'0'} fs={'13'} />
          </SmallTextDiv>
          <div>등록된 식단이 없습니다.</div>
        </SmallCard>
      </ContentAreaDiv>
    </>
  );
};

export default TodayDiet;
