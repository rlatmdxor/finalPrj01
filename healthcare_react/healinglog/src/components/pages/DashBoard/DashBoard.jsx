import React, { useState } from 'react';
import Title from '../../util/Title';
import ContentLayout from '../../util/ContentLayout';
import styled from 'styled-components';
import Navi from '../../util/Navi';
import { BigCard, BigTextDiv, SmallCard, SmallTextDiv } from '../LivingHealth/Diet/Diet';
import { BigCardInnerDiv, BigCardInnerMidDiv, BigCardInnerTopDiv } from '../LivingHealth/Diet/MyBmi';
import Btn from '../../util/Btn';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 200px;
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 3fr;
`;

const SettingBtnDiv = styled.div`
  display: flex;
  height: 25px;
  justify-content: flex-end;
  margin-top: 30px;
  margin-bottom: 15px;
`;

const DateDiv = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #78be78;
  box-sizing: border-box;
  border-radius: 5px;
  color: white;
  font-weight: bold;

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

const DateTextDiv = styled.div`
  font-size: 17px;
`;

const ContentArea = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  row-gap: 28px;
  width: 100%;
  max-width: 1020px;
  min-height: 400px;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 60px;
`;

const DashBoard = () => {
  const getWeekRange = (date) => {
    const dayOfWeek = date.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
    const monday = new Date(date);
    monday.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // 월요일 찾기

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6); // 일요일 찾기

    return {
      monday: monday.toISOString().split('T')[0],
      sunday: sunday.toISOString().split('T')[0],
    };
  };

  const initialDate = new Date();
  const initialRange = getWeekRange(initialDate);

  const [currentMonday, setCurrentMonday] = useState(initialRange.monday);
  const [currentSunday, setCurrentSunday] = useState(initialRange.sunday);

  const handlePrevWeek = () => {
    let newDate = new Date(currentMonday);
    newDate.setDate(newDate.getDate() - 7);
    const newRange = getWeekRange(newDate);

    setCurrentMonday(newRange.monday);
    setCurrentSunday(newRange.sunday);
  };

  const handleNextWeek = () => {
    let newDate = new Date(currentMonday);
    newDate.setDate(newDate.getDate() + 7);
    const newRange = getWeekRange(newDate);

    setCurrentMonday(newRange.monday);
    setCurrentSunday(newRange.sunday);
  };

  const handleSettingModal = () => {};

  return (
    <>
      <Title>나의 건강 현황</Title>
      <NaviContainer>
        <Navi target="dashboard" tag={'대시보드'}></Navi>
        <Navi target="dashboard/report" tag={'리포트'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <SettingBtnDiv>
          <Btn
            str={'대시보드 설정'}
            w={'110'}
            h={'29'}
            mt={'0'}
            mb={'0'}
            ml={'0'}
            mr={'0'}
            fs={'13'}
            f={handleSettingModal}
          />
        </SettingBtnDiv>
        <DateDiv>
          <button onClick={handlePrevWeek}>◀</button>
          <DateTextDiv>
            {currentMonday} (월) ~ {currentSunday} (일)
          </DateTextDiv>
          <button onClick={handleNextWeek}>▶</button>
        </DateDiv>
        <ContentArea>
          <SmallCard>
            <SmallTextDiv>이번주 평균 수면시간</SmallTextDiv>
            <BigTextDiv>4시간 48분</BigTextDiv>
            <div>(+ 0시간 20분)</div>
          </SmallCard>
          <SmallCard>
            <SmallTextDiv>이번주 소모 담배량</SmallTextDiv>
            <BigTextDiv>12.4 갑</BigTextDiv>
          </SmallCard>
          <SmallCard>
            <SmallTextDiv>이번주 음주량</SmallTextDiv>
            <BigTextDiv>1852cc (300mL)</BigTextDiv>
          </SmallCard>
          <BigCard>
            <BigCardInnerDiv>
              <BigCardInnerTopDiv>
                <div>이번주 최고 혈압</div>
              </BigCardInnerTopDiv>
              <BigCardInnerMidDiv>210 mmHg</BigCardInnerMidDiv>
            </BigCardInnerDiv>
            <BigCardInnerDiv>
              <BigCardInnerTopDiv>
                <div>이번주 최저 혈압</div>
              </BigCardInnerTopDiv>
              <BigCardInnerMidDiv>90 mmHg</BigCardInnerMidDiv>
            </BigCardInnerDiv>
            <BigCardInnerDiv>
              <BigCardInnerTopDiv>
                <div>이번주 최고 혈당</div>
              </BigCardInnerTopDiv>
              <BigCardInnerMidDiv>316 mg/dL</BigCardInnerMidDiv>
            </BigCardInnerDiv>
            <BigCardInnerDiv>
              <BigCardInnerTopDiv>
                <div>이번주 최저 혈당</div>
              </BigCardInnerTopDiv>
              <BigCardInnerMidDiv>85 mg/dL</BigCardInnerMidDiv>
            </BigCardInnerDiv>
          </BigCard>

          <SmallCard>
            <SmallTextDiv>이번주 평균 체중</SmallTextDiv>
            <BigTextDiv>68.3kg</BigTextDiv>
          </SmallCard>
          <SmallCard>
            <SmallTextDiv>이번주 평균 칼로리 섭취량</SmallTextDiv>
            <BigTextDiv>1834 Kcal</BigTextDiv>
          </SmallCard>
          <SmallCard>
            <SmallTextDiv>이번주 평균 물 섭취량</SmallTextDiv>
            <BigTextDiv>850 ml</BigTextDiv>
          </SmallCard>

          <SmallCard>
            <SmallTextDiv>이번주 유산소 운동시간</SmallTextDiv>
            <BigTextDiv>1시간 18분</BigTextDiv>
          </SmallCard>
          <SmallCard>
            <SmallTextDiv>이번주 무산소 운동시간</SmallTextDiv>
            <BigTextDiv>1시간 11분</BigTextDiv>
          </SmallCard>
          <SmallCard>
            <SmallTextDiv>이번주 총 운동시간</SmallTextDiv>
            <BigTextDiv>2시간 29분</BigTextDiv>
          </SmallCard>
        </ContentArea>
      </ContentLayout>
    </>
  );
};

export default DashBoard;
