import React, { useEffect, useState } from 'react';
import Title from '../../../util/Title';
import styled from 'styled-components';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';
import Chart from '../../../util/Chart';
import DateBtn from '../../../util/DateBtn';
import { getDayData, getWeekData, getMonthData } from '../../../services/dietService';
import { useNavigate } from 'react-router-dom';
import { getRoleFromToken, isTokenExpired } from '../../../util/JwtUtil';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 300px;
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 3fr 3fr;
`;

const ChartAreaDiv = styled.div`
  margin-top: 80px;
  margin-bottom: 100px;
`;

const DateChangeBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0px 5px;
  cursor: pointer;
  font-size: 34px;
  font-weight: bold;
`;

const DateAreaDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  font-weight: bold;
  gap: 30px;
  height: 0px;
  margin-bottom: 20px;
`;

const DietReport = () => {
  const navi = useNavigate();
  const Swal = require('sweetalert2');

  const token = localStorage.getItem('token');
  const [isAuthorized, setIsAuthorized] = useState(false); // 로그인 여부 체크

  useEffect(() => {
    if (!token || isTokenExpired(token) || getRoleFromToken(token) == 'ROLE_ADMIN') {
      window.localStorage.removeItem('token'); // 토큰 삭제
      navi('/login'); // 로그인 페이지로 이동
      Swal.fire({
        icon: 'warning',
        title: '로그인이 필요합니다',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      });
    } else {
      setIsAuthorized(true); // 로그인 성공 시 데이터 요청 가능
    }
  }, [navi, token]);

  const [kcalLabel, setkcalLabel] = useState([]);
  const [kcalData, setKcalData] = useState([]);
  const [waterLabel, setWaterLabel] = useState([]);
  const [waterData, setWaterData] = useState([]);
  const [weightLabel, setWeightLabel] = useState([]);
  const [weightData, setWeightData] = useState([]);

  const dataBtn = ['일', '주', '월'];
  const [selectedRange, setSelectedRange] = useState('일');
  const [selectChart, setSelectChart] = useState('Line');

  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
  const currentYearMonth = currentYear + '-' + currentMonth;
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentYearMonth);

  const handleMonthIncrease = () => {
    const [currentYear, currentMonth] = month.split('-').map(Number);
    let newYear = currentYear;
    let newMonth = currentMonth + 1;

    if (newMonth > 12) {
      newYear += 1;
      newMonth = 1;
    }

    setMonth(`${newYear}-${String(newMonth).padStart(2, '0')}`);
  };

  const handleMonthDecrease = () => {
    const [currentYear, currentMonth] = month.split('-').map(Number);
    let newYear = currentYear;
    let newMonth = currentMonth - 1;

    if (newMonth < 1) {
      newYear -= 1;
      newMonth = 12;
    }

    setMonth(`${newYear}-${String(newMonth).padStart(2, '0')}`);
  };

  const handleYearIncrease = () => {
    setYear(year + 1);
  };

  const handleYearDecrease = () => {
    setYear(year - 1);
  };

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    const fetchData = async () => {
      try {
        let reportData;

        switch (selectedRange) {
          case '일':
            reportData = await getDayData(month, token);

            setkcalLabel(
              reportData.kcal.map((item) => String(Number(item.dietDay.split(' ')[0].split('-')[2]) + '일'))
            );
            setWaterLabel(
              reportData.water.map((item) => String(Number(item.enrollDate.split(' ')[0].split('-')[2]) + '일'))
            );
            setWeightLabel(
              reportData.weight.map((item) => String(Number(item.enrollDate.split(' ')[0].split('-')[2]) + '일'))
            );

            break;

          case '주':
            reportData = await getWeekData(year, token);
            console.log(reportData);
            setkcalLabel(reportData.kcal.map((item) => `${Number(item.dietDay.split(' ')[0])}주`));
            setWaterLabel(reportData.water.map((item) => `${Number(item.enrollDate.split(' ')[0])}주`));
            setWeightLabel(reportData.weight.map((item) => `${Number(item.enrollDate.split(' ')[0])}주`));

            break;

          case '월':
            reportData = await getMonthData(year, token);

            setkcalLabel(reportData.kcal.map((item) => `${Number(item.dietDay.split('-')[1])}월`));
            setWaterLabel(reportData.water.map((item) => `${Number(item.enrollDate.split('-')[1])}월`));
            setWeightLabel(reportData.weight.map((item) => `${Number(item.enrollDate.split('-')[1])}월`));

            break;

          default:
            return;
        }

        setKcalData(reportData.kcal.map((item) => item.totalKcal));
        setWaterData(reportData.water.map((item) => item.amount));
        setWeightData(reportData.weight.map((item) => item.amount));
      } catch (error) {
        console.error('[ERROR] GET REPORT DATA FAIL', error);
      }
    };
    fetchData();
  }, [isAuthorized, token, selectedRange, year, month]);

  const kcalDataset = [
    {
      label: '섭취량(Kcal)',
      data: kcalData,
      backgroundColor: ['rgba(134, 245, 134, 0.2)'], // 배경색 Line 그래프에선 쓸필요없음
      borderColor: ['#318b57'], // 테두리 색상
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
      borderColor: ['rgba(255, 99, 132, 1)'], // 테두리 색상
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
          {selectedRange === '일' ? (
            <DateAreaDiv>
              <DateChangeBtn onClick={handleMonthDecrease}>{'<'}</DateChangeBtn>
              {month}
              <DateChangeBtn onClick={handleMonthIncrease}>{'>'}</DateChangeBtn>
            </DateAreaDiv>
          ) : (
            <DateAreaDiv>
              <DateChangeBtn onClick={handleYearDecrease}>{'<'}</DateChangeBtn>
              {year}
              <DateChangeBtn onClick={handleYearIncrease}>{'>'}</DateChangeBtn>
            </DateAreaDiv>
          )}
          <DateBtn dataBtn={dataBtn} onSelect={setSelectedRange} onChange={setSelectChart}></DateBtn>
          {selectedRange === '일' ? (
            <h2>일별 칼로리 섭취량</h2>
          ) : selectedRange === '주' ? (
            <h2>주평균 칼로리 섭취량</h2>
          ) : (
            <h2>월평균 칼로리 섭취량</h2>
          )}
          <Chart
            chartType={selectChart} // 차트 타입지정
            labels={kcalLabel} // 위랑 동일
            dataset={kcalDataset} // 위랑 동일
            width={100} // 위랑 동일
            yMin={0} // y축 최소값
            yMax={Math.max(2900, ...kcalData) + 100}
            xAxisColor="rgba(54, 162, 235, 1)" // x축 색상
            yAxisColor="rgba(255, 159, 64, 1)" // y축 색상
          />
          <br />
          <br />
          {selectedRange === '일' ? (
            <h2>일별 물 섭취량</h2>
          ) : selectedRange === '주' ? (
            <h2>주평균 물 섭취량</h2>
          ) : (
            <h2>월평균 물 섭취량</h2>
          )}
          <Chart
            chartType={selectChart} // 차트 타입지정
            labels={waterLabel} // 위랑 동일
            dataset={waterDataset} // 위랑 동일
            width={100} // 위랑 동일
            yMin={0} // y축 최소값
            yMax={Math.max(1900, ...waterData) + 100}
            xAxisColor="rgba(54, 162, 235, 1)" // x축 색상
            yAxisColor="rgba(255, 159, 64, 1)" // y축 색상
          />
          <br />
          <br />
          {selectedRange === '일' ? (
            <h2>일별 체중</h2>
          ) : selectedRange === '주' ? (
            <h2>주평균 체중</h2>
          ) : (
            <h2>월평균 체중</h2>
          )}
          <Chart
            chartType={selectChart} // 차트 타입지정
            labels={weightLabel} // 위랑 동일
            dataset={weightDataset} // 위랑 동일
            width={100} // 위랑 동일
            yMin={30} // y축 최소값
            yMax={Math.max(90, ...weightData) + 10}
            xAxisColor="rgba(54, 162, 235, 1)" // x축 색상
            yAxisColor="rgba(255, 159, 64, 1)" // y축 색상
          />
        </ChartAreaDiv>
      </ContentLayout>
    </>
  );
};

export default DietReport;
