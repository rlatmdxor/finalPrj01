import React from 'react';
import Modal from '../../../util/Modal'; // 모달 컴포넌트
import Input from '../../../util/Input'; // 입력 컴포넌트
import Title from '../../../util/Title';
import Chart from '../../../util/Chart';
import styled from 'styled-components';
import RadiusTable from '../../../util/RadiusTable';

const LayDiv = styled.div`
  height: 150px;
`;

const CharDiv = styled.div`
  margin-left: 130px;
  margin-top: 30px;
`;

const BloodPressure = () => {
  const labels = ['월', '화', '수', '목', '금', '토', '일'];
  const dataset = [
    {
      // 차트에서 그래프가 나타내는 이름 표시 ex)수축기 혈압 , 이완기 혈압
      // Bar , Pie , Doughnut에서는 마우스를 해당 부분에 호버하면 이 label의 이름이 표시된다.
      label: '수축기 혈압 (mmHg)',

      data: [120, 150, 115, 117, 123, 131, 109], // 데이터
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ], // 배경색
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
      <Title>혈압</Title>
      <LayDiv></LayDiv>
      <CharDiv>
        <Chart
          chartType="Line" // 차트 타입지정
          labels={labels} // 위랑 동일
          dataset={dataset} // 위랑 동일
          width={1100} // 위랑 동일
          height={450} // 위랑 동일
          xAxisColor="rgba(54, 162, 235, 1)" // 위랑 동일
          yAxisColor="rgba(255, 159, 64, 1)" // 위랑 동일
          yMax={200}
        />
      </CharDiv>
      {/* 전부다 위와 동일한데 dataset에서 배경색을 지정해야함 */}

      <LayDiv></LayDiv>

      <RadiusTable width="" thBgColor="" radius="0px">
        <thead>
          <tr>
            <th colSpan="2">측정일</th>
            <th>측정시간</th>
            <th>이완기</th>
            <th>수축기</th>
            <th>맥박/분</th>
            <th>특이사항</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan="2">2025-01-27 (월)</td>
            <td>아침</td>
            <td>07:00</td>
            <td>80 mmHg</td>
            <td>120 mmHg</td>
            <td>95 회</td>
            <td>특이사항입니당</td>
          </tr>
          <tr>
            <td>저녁</td>
            <td>07:00</td>
            <td>80 mmHg</td>
            <td>120 mmHg</td>
            <td>95 회</td>
            <td>특이사항입니당</td>
          </tr>
          <tr>
            <td rowSpan="2">2025-01-26 (일)</td>
            <td>아침</td>
            <td>07:00</td>
            <td>80 mmHg</td>
            <td>120 mmHg</td>
            <td>95 회</td>
            <td>특이사항입니당</td>
          </tr>
          <tr>
            <td>저녁</td>
            <td>07:00</td>
            <td>80 mmHg</td>
            <td>120 mmHg</td>
            <td>95 회</td>
            <td>특이사항입니당</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td rowSpan="2">2025-01-25 (토)</td>
            <td>아침</td>
            <td>07:00</td>
            <td>80 mmHg</td>
            <td>120 mmHg</td>
            <td>95 회</td>
            <td>특이사항입니당</td>
          </tr>
          <tr>
            <td>저녁</td>
            <td>07:00</td>
            <td>80 mmHg</td>
            <td>120 mmHg</td>
            <td>95 회</td>
            <td>특이사항입니당</td>
          </tr>
          <tr>
            <td rowSpan="2">2025-01-24 (금)</td>
            <td>아침</td>
            <td>07:00</td>
            <td>80 mmHg</td>
            <td>120 mmHg</td>
            <td>95 회</td>
            <td>특이사항입니당</td>
          </tr>
          <tr>
            <td>저녁</td>
            <td>07:00</td>
            <td>80 mmHg</td>
            <td>120 mmHg</td>
            <td>95 회</td>
            <td>특이사항입니당</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td rowSpan="2">2025-01-23 (목)</td>
            <td>아침</td>
            <td>07:00</td>
            <td>80 mmHg</td>
            <td>120 mmHg</td>
            <td>95 회</td>
            <td>특이사항입니당</td>
          </tr>
          <tr>
            <td>저녁</td>
            <td>07:00</td>
            <td>80 mmHg</td>
            <td>120 mmHg</td>
            <td>95 회</td>
            <td>특이사항입니당</td>
          </tr>
        </tbody>
        <tr>
          <td rowSpan="2">2025-01-22 (수)</td>
          <td>아침</td>
          <td>07:00</td>
          <td>80 mmHg</td>
          <td>120 mmHg</td>
          <td>95 회</td>
          <td>특이사항입니당</td>
        </tr>
        <tr>
          <td>저녁</td>
          <td>07:00</td>
          <td>80 mmHg</td>
          <td>120 mmHg</td>
          <td>95 회</td>
          <td>특이사항입니당</td>
        </tr>
        <tr>
          <td rowSpan="2">2025-01-21 (화)</td>
          <td>아침</td>
          <td>07:00</td>
          <td>80 mmHg</td>
          <td>120 mmHg</td>
          <td>95 회</td>
          <td>특이사항입니당</td>
        </tr>
        <tr>
          <td>저녁</td>
          <td>07:00</td>
          <td>80 mmHg</td>
          <td>120 mmHg</td>
          <td>95 회</td>
          <td>특이사항입니당</td>
        </tr>
      </RadiusTable>
    </div>
  );
};

export default BloodPressure;
