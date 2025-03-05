import React, { useEffect, useState } from 'react';
import Title from '../../../util/Title';
import styled from 'styled-components';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';
import Chart from '../../../util/Chart';
import DateBtn from '../../../util/DateBtn';
import {
  getDayKcal,
  getDayWater,
  getDayWeight,
  getMonthAvgKcal,
  getMonthAvgWater,
  getMonthAvgWeight,
  getYearAvgKcal,
  getYearAvgWater,
  getYearAvgWeight,
} from '../../../services/dietService';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 300px;
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 3fr 3fr;
`;

const ChartAreaDiv = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
`;

const SearchArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 9px;
  margin-top: 10px;
`;

const Input = styled.input`
  box-sizing: border-box;
  font-family: '맑은 고딕';
  height: 30px;
  padding: 0px 4px;
`;

const YearDiv = styled.div`
  display: flex;
  height: 30px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(118, 118, 118);
`;

const YearBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0px 12px;
  cursor: pointer;
  font-size: 16px;
`;

const DietReport = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const [memberNo, setMemberNo] = useState(0);

  useEffect(() => {
    if (!token) {
      alert('로그인 정보가 없습니다.');
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setMemberNo(decodedToken.no);
      } catch {
        navigate('/login');
      }
    }
  }, [token]);

  const [kcalLabel, setkcalLabel] = useState([]);
  const [kcalData, setKcalData] = useState([]);
  const [waterLabel, setWaterLabel] = useState([]);
  const [waterData, setWaterData] = useState([]);
  const [weightLabel, setWeightLabel] = useState([]);
  const [weightData, setWeightData] = useState([]);

  const dataBtn = ['일', '월', '년'];
  const [selectedRange, setSelectedRange] = useState('일');
  const [selectChart, setSelectChart] = useState('Line');

  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
  const currentYearMonth = currentYear + '-' + currentMonth;
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentYearMonth);

  const handleIncrease = () => {
    setYear(year + 1);
  };

  const handleDecrease = () => {
    setYear(year - 1);
  };

  const handleDateChange = (e) => {
    const newMonth = e.target.value;
    setMonth(newMonth);
  };

  useEffect(() => {
    if (memberNo > 0) {
      const fetchData = async () => {
        try {
          let kcalData;
          let waterData;
          let weightData;

          switch (selectedRange) {
            case '일':
              kcalData = await getDayKcal(memberNo, month, token);
              waterData = await getDayWater(memberNo, month, token);
              weightData = await getDayWeight(memberNo, month, token);
              break;
            case '월':
              kcalData = await getMonthAvgKcal(memberNo, year, token);
              waterData = await getMonthAvgWater(memberNo, year, token);
              weightData = await getMonthAvgWeight(memberNo, year, token);
              break;
            case '년':
              kcalData = await getYearAvgKcal(memberNo, token);
              waterData = await getYearAvgWater(memberNo, token);
              weightData = await getYearAvgWeight(memberNo, token);
              break;
            default:
              return;
          }

          setkcalLabel(kcalData.map((item) => item.dietDay.split(' ')[0]));
          setKcalData(kcalData.map((item) => item.totalKcal));
          setWaterLabel(waterData.map((item) => item.enrollDate.split(' ')[0]));
          setWaterData(waterData.map((item) => item.amount));
          setWeightLabel(weightData.map((item) => item.enrollDate.split(' ')[0]));
          setWeightData(weightData.map((item) => item.amount));
        } catch (error) {
          alert('GET KCAL DATA FAIL ...');
          console.error('[ERROR] GET DATA', error);
        }
      };
      fetchData();
    }
  }, [selectedRange, year, month, memberNo]);

  const kcalDataset = [
    {
      label: '섭취량(Kcal)',
      data: kcalData,
      backgroundColor: ['rgba(255, 99, 132, 0.2)'], // 배경색 Line 그래프에선 쓸필요없음
      borderColor: ['rgba(255, 99, 132, 1)'], // 테두리 색상
      borderWidth: 1, // 테두리 두께
    },
  ];
  const waterDataset = [
    {
      label: '섭취량(ml)',
      data: waterData,
      backgroundColor: ['rgba(54, 162, 235, 0.2)'], // 배경색 Line 그래프에선 쓸필요없음
      borderColor: ['rgba(54, 162, 235, 1)'], // 테두리 색상
      borderWidth: 1, // 테두리 두께
    },
  ];
  const weightDataset = [
    {
      label: '체중(kg)',
      data: weightData,
      backgroundColor: ['rgba(255, 159, 64, 0.2)'], // 배경색 Line 그래프에선 쓸필요없음
      borderColor: ['rgba(255, 159, 64, 1)'], // 테두리 색상
      borderWidth: 1, // 테두리 두께
    },
  ];

  return (
    <>
      <Title>식단</Title>
      <NaviContainer>
        <Navi target="diet" tag={'식단기록'}></Navi>
        <Navi target="diet/calendar" tag={'캘린더'}></Navi>
        <Navi target="diet/report" tag={'리포트'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <ChartAreaDiv>
          <SearchArea>
            {selectedRange === '일' ? (
              <Input type="month" name="month" defaultValue={month} onChange={handleDateChange} />
            ) : selectedRange === '월' ? (
              <YearDiv>
                <YearBtn onClick={handleDecrease}>{'<'}</YearBtn>
                <span>{year}</span>
                <YearBtn onClick={handleIncrease}>{'>'}</YearBtn>
              </YearDiv>
            ) : (
              ''
            )}
            <DateBtn dataBtn={dataBtn} onSelect={setSelectedRange} onChange={setSelectChart}></DateBtn>
          </SearchArea>
          {selectedRange === '일' ? (
            <h2>일별 칼로리 섭취량</h2>
          ) : selectedRange === '월' ? (
            <h2>월평균 칼로리 섭취량</h2>
          ) : (
            <h2>연평균 칼로리 섭취량</h2>
          )}
          <Chart
            chartType={selectChart} // 차트 타입지정
            labels={kcalLabel} // 위랑 동일
            dataset={kcalDataset} // 위랑 동일
            width={100} // 위랑 동일
            xAxisColor="rgba(54, 162, 235, 1)" // x축 색상
            yAxisColor="rgba(255, 159, 64, 1)" // y축 색상
          />
          <br />
          {selectedRange === '일' ? (
            <h2>일별 물 섭취량</h2>
          ) : selectedRange === '월' ? (
            <h2>월평균 물 섭취량</h2>
          ) : (
            <h2>연평균 물 섭취량</h2>
          )}
          <Chart
            chartType={selectChart} // 차트 타입지정
            labels={waterLabel} // 위랑 동일
            dataset={waterDataset} // 위랑 동일
            width={100} // 위랑 동일
            xAxisColor="rgba(54, 162, 235, 1)" // x축 색상
            yAxisColor="rgba(255, 159, 64, 1)" // y축 색상
          />
          <br />
          {selectedRange === '일' ? (
            <h2>일별 체중</h2>
          ) : selectedRange === '월' ? (
            <h2>월평균 체중</h2>
          ) : (
            <h2>연평균 체중</h2>
          )}
          <Chart
            chartType={selectChart} // 차트 타입지정
            labels={weightLabel} // 위랑 동일
            dataset={weightDataset} // 위랑 동일
            width={100} // 위랑 동일
            xAxisColor="rgba(54, 162, 235, 1)" // x축 색상
            yAxisColor="rgba(255, 159, 64, 1)" // y축 색상
          />
        </ChartAreaDiv>
      </ContentLayout>
    </>
  );
};

export default DietReport;
