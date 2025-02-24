import React from 'react';
import Title from '../../util/Title';
import ContentLayout from '../../util/ContentLayout';
import styled from 'styled-components';
import Navi from '../../util/Navi';
import SmallCard from '../../util/SmallCard';
import SettingModal from './SettingModal';
import BigCard from '../../util/BigCard';
import SettingBtn from './SettingBtn';
import useWeekRange from '../../hook/useWeekRange';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 200px;
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 3fr;
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
  margin-bottom: 70px;
`;

const SmallTextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  margin-top: 18px;
  padding: 0px 14px;
  font-size: 16px;
  font-weight: 500;
  color: #3b3b3b;
`;

const BigTextDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 8px;
  font-size: 30px;
`;

const IncDecTextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 9px;
  padding: 0px 14px;
  font-size: 17px;
  font-weight: 500;
  color: #3b3b3b;
`;

const BigCardInnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BigCardInnerTopDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5f5f5f;
`;

const BigCardInnerMidDiv = styled.div`
  font-size: 26px;
  color: #000000;
  margin-top: 3px;
  margin-bottom: 6px;
`;

const DashBoard = () => {
  const { currentMonday, currentSunday, handlePrevWeek, handleNextWeek } = useWeekRange();

  return (
    <>
      <Title>나의 건강 현황</Title>
      <NaviContainer>
        <Navi target="dashboard" tag={'대시보드'}></Navi>
        <Navi target="dashboard/report" tag={'리포트'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <SettingBtn />
        <DateDiv>
          <button onClick={handlePrevWeek}>◀</button>
          <DateTextDiv>
            {currentMonday} (월) ~ {currentSunday} (일)
          </DateTextDiv>
          <button onClick={handleNextWeek}>▶</button>
        </DateDiv>
        <ContentArea>
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
            <SmallTextDiv>이번주 평균 수면시간</SmallTextDiv>
            <BigTextDiv>4시간 48분</BigTextDiv>
            <IncDecTextDiv>(+ 0시간 20분)</IncDecTextDiv>
          </SmallCard>
          <SmallCard>
            <SmallTextDiv>이번주 소모 담배량</SmallTextDiv>
            <BigTextDiv>12.4 갑</BigTextDiv>
            <IncDecTextDiv>(+ 0시간 20분)</IncDecTextDiv>
          </SmallCard>
          <SmallCard>
            <SmallTextDiv>이번주 음주량</SmallTextDiv>
            <BigTextDiv>1852cc (300mL)</BigTextDiv>
            <IncDecTextDiv>(+ 0시간 20분)</IncDecTextDiv>
          </SmallCard>

          <SmallCard>
            <SmallTextDiv>이번주 평균 체중</SmallTextDiv>
            <BigTextDiv>68.3kg</BigTextDiv>
            <IncDecTextDiv>(+ 0시간 20분)</IncDecTextDiv>
          </SmallCard>
          <SmallCard>
            <SmallTextDiv>이번주 평균 칼로리 섭취량</SmallTextDiv>
            <BigTextDiv>1834 Kcal</BigTextDiv>
            <IncDecTextDiv>(+ 0시간 20분)</IncDecTextDiv>
          </SmallCard>
          <SmallCard>
            <SmallTextDiv>이번주 평균 물 섭취량</SmallTextDiv>
            <BigTextDiv>850 ml</BigTextDiv>
            <IncDecTextDiv>(+ 0시간 20분)</IncDecTextDiv>
          </SmallCard>

          <SmallCard>
            <SmallTextDiv>이번주 유산소 운동시간</SmallTextDiv>
            <BigTextDiv>1시간 18분</BigTextDiv>
            <IncDecTextDiv>(+ 0시간 20분)</IncDecTextDiv>
          </SmallCard>
          <SmallCard>
            <SmallTextDiv>이번주 무산소 운동시간</SmallTextDiv>
            <BigTextDiv>1시간 11분</BigTextDiv>
            <IncDecTextDiv>(+ 0시간 20분)</IncDecTextDiv>
          </SmallCard>
          <SmallCard>
            <SmallTextDiv>이번주 총 운동시간</SmallTextDiv>
            <BigTextDiv>2시간 29분</BigTextDiv>
            <IncDecTextDiv>(+ 0시간 20분)</IncDecTextDiv>
          </SmallCard>
        </ContentArea>
        <SettingModal />
      </ContentLayout>
    </>
  );
};

export default DashBoard;
