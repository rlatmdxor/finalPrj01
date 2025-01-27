import React from 'react';
import Title from '../../../util/Title';
import Modal from '../../../util/Modal'; // 모달 컴포넌트
import Input from '../../../util/Input'; // 입력 컴포넌트
import Chart from '../../../util/Chart';
import Table from '../../../util/Table';
import styled from 'styled-components';

const CharDiv = styled.div`
  margin-left: 180px;
  margin-top: 30px;
`;

const BloodSugar = () => {
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
    <>
      <Title>혈당</Title>
      <CharDiv>
        <Chart
          chartType="Line" // 차트 타입지정
          labels={labels} // 위랑 동일
          dataset={dataset} // 위랑 동일
          width={900} // 위랑 동일
          height={400} // 위랑 동일
          xAxisColor="rgba(54, 162, 235, 1)" // 위랑 동일
          yAxisColor="rgba(255, 159, 64, 1)" // 위랑 동일
          yMax={200}
        />
      </CharDiv>
      {/* 전부다 위와 동일한데 dataset에서 배경색을 지정해야함 */}

      <Table width="" thBgColor="">
        <thead>
          <tr>
            <th>일자</th>
            <th>술종류</th>
            <th>마신 량(cc)</th>
            <th>도수</th>
            <th>표준 잔</th>
            <th>마신 알코올 량</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-01-10</td>
            <td>소주</td>
            <td>150</td>
            <td>20</td>
            <td>3</td>
            <td>24</td>
          </tr>
          <tr>
            <td>2024-01-11</td>
            <td>소주</td>
            <td>150</td>
            <td>20</td>
            <td>3</td>
            <td>24</td>
          </tr>
          <tr>
            <td>2024-01-12</td>
            <td>소주</td>
            <td>150</td>
            <td>20</td>
            <td>3</td>
            <td>24</td>
          </tr>
        </tbody>
      </Table>

      <Table width="" thBgColor="">
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
            <td rowSpan="2">2025-01-02 (목)</td>
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
            <td rowSpan="2">2025-01-01 (수)</td>
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
      </Table>

      <Table width="" thBgColor="">
        <thead>
          <tr>
            <th colSpan="4">닉네임 님의 현재 복용약</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan="3">1</td>
            <td rowSpan="2">복용 약 사진</td>
            <td>타이레놀</td>
            <td rowSpan="3">삭제</td>
          </tr>
          <tr>
            <td>1. 해열 및 감기에 의한 동통(통증)과 두통, 치통, 근육통, 허리동통(통증), 생리통, 관절통의 완화</td>
          </tr>
          <tr>
            <td>해열 진통제</td>
            <td>1회 1정 / 3회</td>
          </tr>
          <tr>
            <td rowSpan="3">2</td>
            <td rowSpan="2">복용 약 사진</td>
            <td>타이레놀</td>
            <td rowSpan="3">삭제</td>
          </tr>
          <tr>
            <td>1. 해열 및 감기에 의한 동통(통증)과 두통, 치통, 근육통, 허리동통(통증), 생리통, 관절통의 완화</td>
          </tr>
          <tr>
            <td>해열 진통제</td>
            <td>1회 1정 / 3회</td>
          </tr>
        </tbody>
      </Table>

      <Table width="" thBgColor="">
        <thead>
          <tr>
            <th colSpan="3">약 상세정보</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan="3">기본정보</td>
            <td rowSpan="3">약 사진</td>
            <td>타이레놀</td>
          </tr>
          <tr>
            <td>해열 진통 소염제</td>
          </tr>
          <tr>
            <td>1회 1정 / 3회</td>
          </tr>
          <tr>
            <td rowSpan="4">세부정보</td>
            <td>효능</td>
            <td>1. 해열 및 감기에 의한 동통(통증)과 두통, 치통, 근육통, 허리동통(통증), 생리통, 관절통의 완화</td>
          </tr>
          <tr>
            <td>부작용</td>
            <td>
              <div>
                1) 쇽: 쇽, 아나필락시양 증상(과민성유사증상: 호흡곤란, 온몸이 붉어짐, 혈관부기, 두드러기 등), 천식발작
              </div>
              <div>
                2) 혈액: 혈소판 감소, 과립구감소, 용혈성빈혈, 메트헤모글로빈혈증, 혈소판기능 저하(출혈시간 연장), 청색증
              </div>
              <div>3) 과민증: 과민증상(얼굴부기, 호흡곤란, 땀이 남, 저혈압, 쇽)</div>
              <div>
                4) 소화기: 구역, 구토, 식욕부진, 장기복용시 위장출혈, 소화성궤양, 천공(뚫림) 등의 위장관계 이상반응
              </div>
            </td>
          </tr>
          <tr>
            <td>금기사항</td>
            <td>
              <div>1) 이 약에 과민증 환자</div>
              <div>2) 소화성궤양 환자</div>
              <div>3) 심한 혈액 이상 환자</div>
              <div>4) 심한 간장애 환자</div>
            </td>
          </tr>
          <tr>
            <td>주의사항</td>
            <td>
              <div>1) 간장애 또는 그 병력이 있는 환자</div>
              <div>2) 신장(콩팥)장애 또는 그 병력이 있는 환자</div>
              <div>3) 소화성궤양의 병력이 있는 환자</div>
              <div>4) 혈액이상 또는 그 병력이 있는 환자</div>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default BloodSugar;
