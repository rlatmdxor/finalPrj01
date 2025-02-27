import React from 'react';
import Title from '../../util/Title';
import ContentLayout from '../../util/ContentLayout';
import styled from 'styled-components';
import Navi from '../../util/Navi';
import useWeekRange from '../../hook/useWeekRange';
import Chart from '../../util/Chart';

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
  width: 100%;
  max-width: 1020px;
  min-height: 400px;
`;

const Report = () => {
  const { currentMonday, currentSunday, handlePrevWeek, handleNextWeek } = useWeekRange();

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const dataset = [
    {
      // 차트에서 그래프가 나타내는 이름 표시 ex)수축기 혈압 , 이완기 혈압
      // Bar , Pie , Doughnut에서는 마우스를 해당 부분에 호버하면 이 label의 이름이 표시된다.
      label: 'Sales 2025 (in USD)',

      data: [12000, 15000, 8000, 18000, 22000, 13000, 17000], // 데이터
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
      <Title>나의 건강 현황</Title>
      <NaviContainer>
        <Navi target="dashboard" tag={'대시보드'}></Navi>
        <Navi target="dashboard/report" tag={'리포트'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <DateDiv>
          <button onClick={handlePrevWeek}>◀</button>
          <DateTextDiv>
            {currentMonday} (월) ~ {currentSunday} (일)
          </DateTextDiv>
          <button onClick={handleNextWeek}>▶</button>
        </DateDiv>
        <ContentArea>
          <h1>차트 예시</h1>
          <Chart
            chartType="Bar" // 차트 타입지정 Bar , Line , Pie , Doughnut 중 택1
            labels={labels} // 위에서 작성한 x축의 데이터
            dataset={dataset} // 위에서 작성한 차트의 데이터
            width={100} // 차트 가로 사이즈임
            xAxisColor="rgba(75, 192, 192, 1)" // Bar , Line 에만 사용되고 x축 글씨색상임
            yAxisColor="rgba(255, 99, 132, 1)" // Bar , Line 에만 사용되고 y축 글씨색상임
            //xLabelVisible={true} // 추가: X축 라벨 표시 여부 (기본값: true)
          />
          <h1>Line 차트 예시</h1>
          <Chart
            chartType="Line" // 차트 타입지정
            labels={labels} // 위랑 동일
            dataset={dataset} // 위랑 동일
            width={100} // 위랑 동일
            xAxisColor="rgba(54, 162, 235, 1)" // x축 색상
            yAxisColor="rgba(255, 159, 64, 1)" // y축 색상
            // yMin={}     // y축 최소값 음수가 필요한거 아니면 주석 유지하면됨
            // yMax={}        // y축 최댓값 설정안하면 자동 스케일링됨
            // yUnit={}       // y축에 표시될 수치의 단위를 입력할 수 있음 안쓰면 자동으로 공백처리
          />
          {/* 전부다 위와 동일한데 dataset에서 배경색을 지정해야함 */}
          <h1>Pie 차트 예시</h1>
          <Chart chartType="Pie" labels={labels} dataset={dataset} width={100} height={500} />
          {/* 전부다 위와 동일한데 dataset에서 배경색을 지정해야함 */}
          <h1>Doughnut 차트 예시</h1>
          <Chart chartType="Doughnut" labels={labels} dataset={dataset} width={100} height={500} />
        </ContentArea>
      </ContentLayout>
    </>
  );
};

export default Report;
