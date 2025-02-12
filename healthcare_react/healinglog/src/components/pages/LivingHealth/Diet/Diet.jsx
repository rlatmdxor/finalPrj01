import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { open } from '../../../../redux/modalSlice';
import Title from '../../../util/Title';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';
import TodayWater from './TodayWater';
import TodayWeight from './TodayWeight';
import TodayKcal from './TodayKcal';
import MyBmi from './MyBmi';
import DietEnroll from './DietEnroll';
import TodayDiet from './TodayDiet';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 300px;
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 3fr 3fr;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 60px;
  margin-bottom: 60px;
`;

const DayDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #78be78;
  box-sizing: border-box;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  margin-bottom: 30px;

  & input {
    background: none;
    border: none;
    font-family: Arial, sans-serif;
    font-size: 19px;
    cursor: pointer;
    color: white;
  }

  & button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: white;
  }
`;

export const ContentAreaDiv = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 25px;
  margin-bottom: 25px;
`;

export const SmallCard = styled.div`
  width: 100%;
  height: 150px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 48px auto;
  border: 1px solid #c5cbd1;
  border-radius: 6px;
  text-align: center;

  &:hover {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  }
`;

export const SmallTextDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 14px;
  font-size: 16px;
  font-weight: 500;
  color: #3b3b3b;
`;

export const BigTextDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 11px;
  font-size: 38px;
`;

export const BigCard = styled.div`
  width: 100%;
  height: 130px;
  grid-column: span 3;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #c5cbd1;
  border-radius: 6px;
`;

export const TodayDietitian = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const ModalContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const Diet = () => {
  console.log('화면 렌더링~~');

  const todayDate = new Date().toISOString().split('T')[0];
  const [day, setDay] = useState(todayDate);

  const dispatch = useDispatch();

  const handleOpenDietEnrollModal = () => {
    dispatch(open({ title: '식단 등록', value: 'block' }));
  };

  return (
    <>
      <Title>식단</Title>
      <NaviContainer>
        <Navi target="diet" tag={'식단기록'}></Navi>
        <Navi target="dietcalendar" tag={'캘린더'}></Navi>
        <Navi target="dietreport" tag={'리포트'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <ContentDiv>
          <DayDiv>
            <button>◀</button>
            <input type="date" value={day} />
            <button>▶</button>
          </DayDiv>
          <ContentAreaDiv>
            <TodayKcal />
            <TodayWater day={day} />
            <TodayWeight day={day} />
          </ContentAreaDiv>
          <ContentAreaDiv>
            <MyBmi />
          </ContentAreaDiv>
          <TodayDiet />
        </ContentDiv>
        <DietEnroll />
        <h1>여기에 광고를 넣어서 돈을 벌자</h1>
      </ContentLayout>
    </>
  );
};

export default Diet;
