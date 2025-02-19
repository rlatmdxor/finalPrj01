import React, { useEffect, useState } from 'react';
import Title from '../../../util/Title';
import styled from 'styled-components';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';
import Chart from '../../../util/Chart';

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
  margin-bottom: 80px;
`;

const DietReport = () => {
  const token = localStorage.getItem('token');

  const [kcalLabel, setkcalLabel] = useState([]);
  const [kcalData, setKcalData] = useState([]);
  const [waterData, setWaterData] = useState([]);
  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:80/api/dietcal', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        memberNo: '1',
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        const fetchKcalLabel = data.map((item) => item.dietDay.split(' ')[0]);
        setkcalLabel(fetchKcalLabel);

        const fetchKcalData = data.map((item) => item.sumKcal);
        setKcalData(fetchKcalData);

        const fetchWaterData = data.map((item) => item.waterAmount);
        setWaterData(fetchWaterData);

        const fetchWeightData = data.map((item) => item.weightAmount);
        setWeightData(fetchWeightData);
      });
  }, []);

  const kcalDataset = [
    {
      label: '섭취량(Kcal)',
      data: kcalData, // 데이터

      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(201, 203, 207, 1)',
      ], // 테두리 색상
      borderWidth: 1, // 테두리 두께
    },
  ];
  const waterDataset = [
    {
      label: '섭취량(ml)',
      data: waterData,

      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(201, 203, 207, 1)',
      ], // 테두리 색상
      borderWidth: 1, // 테두리 두께
    },
  ];
  const weightDataset = [
    {
      label: '체중(kg)',
      data: weightData,

      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(201, 203, 207, 1)',
      ], // 테두리 색상
      borderWidth: 1, // 테두리 두께
    },
  ];

  return (
    <>
      <Title>식단</Title>
      <NaviContainer>
        <Navi target="diet" tag={'식단기록'}></Navi>
        <Navi target="dietcalendar" tag={'캘린더'}></Navi>
        <Navi target="dietreport" tag={'리포트'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <ChartAreaDiv>
          <h2>칼로리 섭취량</h2>
          <Chart
            chartType="Line" // 차트 타입지정
            labels={kcalLabel} // 위랑 동일
            dataset={kcalDataset} // 위랑 동일
            xAxisColor="rgba(54, 162, 235, 1)" // x축 색상
            yAxisColor="rgba(255, 159, 64, 1)" // y축 색상
            //yUnit={'Kcal'} // y축에 표시될 수치의 단위를 입력할 수 있음 안쓰면 자동으로 공백처리
          />
          <br />
          <h2>물 섭취량</h2>
          <Chart
            chartType="Line" // 차트 타입지정
            labels={kcalLabel} // 위랑 동일
            dataset={waterDataset} // 위랑 동일
            xAxisColor="rgba(54, 162, 235, 1)" // x축 색상
            yAxisColor="rgba(255, 159, 64, 1)" // y축 색상
            //yUnit={'ml'} // y축에 표시될 수치의 단위를 입력할 수 있음 안쓰면 자동으로 공백처리
          />
          <br />
          <h2>체중</h2>
          <Chart
            chartType="Line" // 차트 타입지정
            labels={kcalLabel} // 위랑 동일
            dataset={weightDataset} // 위랑 동일
            xAxisColor="rgba(54, 162, 235, 1)" // x축 색상
            yAxisColor="rgba(255, 159, 64, 1)" // y축 색상
            //yUnit={'kg'} // y축에 표시될 수치의 단위를 입력할 수 있음 안쓰면 자동으로 공백처리
          />
        </ChartAreaDiv>
      </ContentLayout>
    </>
  );
};

export default DietReport;
