import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navi from '../../../util/Navi';
import Title from '../../../util/Title';
import Chart from '../../../util/Chart';
import { useDispatch } from 'react-redux';
import { close } from '../../../../redux/modalSlice';
import ContentLayout from '../../../util/ContentLayout';
import DateBtn from '../../../util/DateBtn';

const ExReport = () => {
  const token = localStorage.getItem('token');
  const dataBtn = ['일', '주', '월'];
  const dispatch = useDispatch();
  // const [caloriesChartData, setCaloriesChartData] = useState(null);
  const [durationChartData, setDurationChartData] = useState(null);
  const [maxWeightChartData, setMaxWeightChartData] = useState(null);
  const [selectedRange, setSelectedRange] = useState('일');
  const [selectedChart, setSelectedChart] = useState('Bar');
  const [caloriesChartData, setCaloriesChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    //운동시간 fetch
    const fetchDurationData = async (range) => {
      try {
        const response = await fetch(`http://127.0.0.1:80/api/exercise/getDuration?rangeType=${range}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('네트워크 응답이 올바르지 않습니다.');
        const data = await response.json();
        console.log(data);

        // 백엔드 데이터 변환 (Chart.js 형식 맞추기)
        const labels = data.map((item) => item.PERIOD);
        const durations = data.map((item) => item.TOTAL_AEROBIC_DURATION);

        setDurationChartData({
          labels: labels,
          datasets: [
            {
              label: '유산소 운동시간 (분)',
              data: durations,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(201, 203, 207, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(201, 203, 207, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('운동시간 데이터 불러오기 실패:', error);
      }
    };

    //월별 칼로리 소모량 fetch
    const fetchCaloriesData = async (range) => {
      try {
        const response = await fetch(`http://127.0.0.1:80/api/exercise/getCalories?rangeType=${range}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('네트워크 응답이 올바르지 않습니다.');

        const data = await response.json();

        const labels = data.map((item) => item.PERIOD);
        const aerobicCalories = data.map((item) => item.TOTAL_AEROBIC_CALORIES);
        const anaerobicCalories = data.map((item) => item.TOTAL_ANAEROBIC_CALORIES);
        const totalCalories = data.map((item) => item.TOTAL_CALORIES);

        setCaloriesChartData({
          labels: labels,
          datasets: [
            {
              label: '무산소',
              data: anaerobicCalories,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
            {
              label: '유산소',
              data: aerobicCalories,
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: '유산소 + 무산소',
              data: totalCalories,
              backgroundColor: 'rgba(255, 159, 64, 0.5)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('칼로리 데이터 불러오기 실패:', error);
      }
    };

    //최대중량 fetch
    const fetchMaxWeightData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:80/api/exercise/getMonthlyMaxWeight', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log('월별 최대 중량 데이터:', data);

        //월 & 운동 이름 리스트 추출
        const uniqueMonths = [...new Set(data.map((item) => item.MONTH))];
        const uniqueExercises = [...new Set(data.map((item) => item.EXERCISE_NAME))];

        //운동별 월별 최대 중량 매핑
        const datasets = uniqueExercises.map((exerciseName) => ({
          label: exerciseName,
          data: uniqueMonths.map((month) => {
            const record = data.find((item) => item.MONTH === month && item.EXERCISE_NAME === exerciseName);
            return record ? record.MAX_WEIGHT : null; // 값이 없으면 null
          }),
          borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, 1)`,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 2,
        }));

        setMaxWeightChartData({
          labels: uniqueMonths,
          datasets: datasets,
        });
      } catch (error) {
        console.error('월별 최대 중량 데이터 불러오기 실패:', error);
      }
    };

    fetchCaloriesData(selectedRange);
    fetchDurationData(selectedRange);
    // fetchDurationData();
    // fetchCaloriesData();
    fetchMaxWeightData();
  }, [selectedRange]);

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dataset = [
    {
      // 차트에서 그래프가 나타내는 이름 표시 ex)수축기 혈압 , 이완기 혈압
      // Bar , Pie , Doughnut에서는 마우스를 해당 부분에 호버하면 이 label의 이름이 표시된다.
      label: 'Sales 2025 (in USD)',

      data: [12000, 15000, 8000, 18000, 22000, 13000, 17000, 11000, 14000, 9000, 16000, 19000], // 데이터
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ], // 배경색 Line 그래프에선 쓸필요없음
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
      <Title>운동</Title>
      <NaviContainer>
        <Navi target="aerobic" tag={'유산소'}></Navi>
        <Navi target="anaerobic" tag={'무산소'}></Navi>
        <Navi target="exhistory" tag={'내역 관리'}></Navi>
        <Navi target="exreport" tag={'리포트'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <BlankSpace />

        <ChartContainer>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
            <TitleTag>칼로리 소모량</TitleTag>
            <DateBtn line={'Line'} dataBtn={dataBtn} onSelect={setSelectedRange} onChange={setSelectedChart} />
          </div>
          <ChartPosition>
            <Chart
              chartType={selectedChart}
              labels={caloriesChartData?.labels || []}
              dataset={caloriesChartData?.datasets || []}
              width={100}
              height={400}
              xAxisColor="rgba(75, 192, 192, 1)" // Bar , Line 에만 사용되고 x축 글씨색상임
              yAxisColor="rgba(255, 99, 132, 1)" // Bar , Line 에만 사용되고 y축 글씨색상임
            />
          </ChartPosition>
        </ChartContainer>

        <ChartContainer>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
            <TitleTag>유산소 운동 시간</TitleTag>
            <DateBtn line={'Line'} dataBtn={dataBtn} onSelect={setSelectedRange} onChange={setSelectedChart} />
          </div>
          <ChartPosition>
            <Chart
              chartType={selectedChart}
              labels={durationChartData?.labels || []}
              dataset={durationChartData?.datasets || []}
              width={100}
              height={400}
              xAxisColor="rgba(54, 162, 235, 1)" // x축 색상
              yAxisColor="rgba(255, 159, 64, 1)" // y축 색상
            />
          </ChartPosition>
        </ChartContainer>

        {/* 전부다 위와 동일한데 dataset에서 배경색을 지정해야함 */}
        <ChartContainer>
          <TitleTag>즐겨찾기 운동 성장 추이</TitleTag>
          <ChartPosition>
            {maxWeightChartData ? (
              <Chart
                chartType="Line"
                labels={maxWeightChartData.labels}
                dataset={maxWeightChartData.datasets}
                width={100}
                height={400}
              />
            ) : (
              <p>데이터 로딩 중...</p>
            )}
          </ChartPosition>
        </ChartContainer>

        <CircleContainer>
          <ChartContainer>
            <TitleTag2>운동 유형별 운동 횟수</TitleTag2>
            <ChartPosition>
              <ChartWithHoverEffect
                chartType="Doughnut"
                labels={labels}
                dataset={dataset}
                initialWidth={90}
                hoverWidth={100}
                height={600}
              />
            </ChartPosition>
          </ChartContainer>

          <ChartContainer>
            <TitleTag2>운동 종류별 운동 횟수</TitleTag2>
            <ChartPosition>
              <ChartWithHoverEffect
                chartType="Doughnut"
                labels={labels}
                dataset={dataset}
                initialWidth={90}
                hoverWidth={100}
                height={600}
              />
            </ChartPosition>
          </ChartContainer>
        </CircleContainer>
        <BlankSpace />
      </ContentLayout>
    </>
  );
};

const ChartWithHoverEffect = ({ chartType, labels, dataset, initialWidth, hoverWidth, height }) => {
  const [width, setWidth] = useState(90);

  return (
    <div
      onMouseEnter={() => setWidth(hoverWidth)}
      onMouseLeave={() => setWidth(initialWidth)}
      style={{
        display: 'grid',
        width: `${width}%`,
        justifyItems: 'center',
        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <Chart chartType={chartType} labels={labels} dataset={dataset} width={width - 10} height={height} />
    </div>
  );
};

const BlankSpace = styled.div`
  height: 100px;
  width: 100%;
`;

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 400px;
  top: 20px;
  left: 40px;
  grid-template-columns: 3fr 3fr 4fr 3fr;
`;

const ChartContainer = styled.div`
  display: grid;
  width: 100%;
  margin-bottom: 50px;
  justify-self: center;
`;

const TitleTag = styled.h1`
  display: grid;
`;

const TitleTag2 = styled.h1`
  display: grid;
  justify-self: center;
`;

const ChartPosition = styled.div`
  display: grid;
  justify-items: center;
`;

const CircleContainer = styled.div`
  display: grid;
  width: 100%;
  justify-self: center;
  grid-template-columns: 1fr 1fr;
`;

export default ExReport;
