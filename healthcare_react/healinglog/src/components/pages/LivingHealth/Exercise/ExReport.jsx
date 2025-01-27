import React from 'react';
import styled from 'styled-components';
import Navi from '../../../util/Navi';
import Title from '../../../util/Title';
import Chart from '../../../util/Chart';

const ExReport = () => {
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
    <div>
      <Title>운동</Title>
      <NaviContainer>
        <Navi target="aerobic" tag={'유산소'}></Navi>
        <Navi target="anaerobic" tag={'무산소'}></Navi>
        <Navi target="exhistory" tag={'내역 관리'}></Navi>
        <Navi target="exreport" tag={'리포트'}></Navi>
      </NaviContainer>
      <Container>
        <BlankSpace />

        <ChartContainer>
          <TitleTag>월별 칼로리 소모량</TitleTag>
          <ChartPosition>
            <Chart
              chartType="Bar" // 차트 타입지정 Bar , Line , Pie , Doughnut 중 택1
              labels={labels} // 위에서 작성한 x축의 데이터
              dataset={dataset} // 위에서 작성한 차트의 데이터
              width={1100} // 차트 가로 사이즈임
              height={400} // 차트 세로 사이즈임
              xAxisColor="rgba(75, 192, 192, 1)" // Bar , Line 에만 사용되고 x축 글씨색상임
              yAxisColor="rgba(255, 99, 132, 1)" // Bar , Line 에만 사용되고 y축 글씨색상임
            />
          </ChartPosition>
        </ChartContainer>

        <ChartContainer>
          <TitleTag>월별 운동 시간</TitleTag>
          <ChartPosition>
            <Chart
              chartType="Bar" // 차트 타입지정
              labels={labels} // 위랑 동일
              dataset={dataset} // 위랑 동일
              width={1100} // 위랑 동일
              height={400} // 위랑 동일
              xAxisColor="rgba(54, 162, 235, 1)" // x축 색상
              yAxisColor="rgba(255, 159, 64, 1)" // y축 색상
              // yMin={}     // y축 최소값 음수가 필요한거 아니면 주석 유지하면됨
              yMax={''} // y축 최댓값 설정안하면 자동 스케일링됨
              // yUnit={}       // y축에 표시될 수치의 단위를 입력할 수 있음 안쓰면 자동으로 공백처리
            />
          </ChartPosition>
        </ChartContainer>

        {/* 전부다 위와 동일한데 dataset에서 배경색을 지정해야함 */}
        <ChartContainer>
          <TitleTag>즐겨찾기 운동 성장 추이</TitleTag>
          <ChartPosition>
            <Chart chartType="Line" labels={labels} dataset={dataset} width={1100} height={500} />
          </ChartPosition>
        </ChartContainer>

        <CircleContainer>
          <ChartContainer>
            <TitleTag>운동 유형별 운동 시간</TitleTag>
            <ChartPosition>
              <Chart chartType="Pie" labels={labels} dataset={dataset} width={450} height={450} />
            </ChartPosition>
          </ChartContainer>

          <ChartContainer>
            <TitleTag>운동 종류별 운동 시간</TitleTag>
            <ChartPosition>
              <Chart chartType="Doughnut" labels={labels} dataset={dataset} width={450} height={450} />
            </ChartPosition>
          </ChartContainer>
        </CircleContainer>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: grid;
`;

const BlankSpace = styled.div`
  height: 100px;
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
  margin-bottom: 50px;
  justify-self: center;
`;

const TitleTag = styled.h1`
  display: grid;
  position: relative;
`;

const ChartPosition = styled.div`
  display: grid;
`;

const CircleContainer = styled.div`
  display: grid;
  width: 1100px;
  justify-self: center;
  grid-template-columns: 1fr 1fr;
`;

export default ExReport;
