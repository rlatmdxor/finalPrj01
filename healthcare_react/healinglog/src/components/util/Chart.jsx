import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // 추가: PointElement를 등록
  ArcElement, // 추가: Pie와 Doughnut 차트를 위한 요소
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2'; // 추가: Pie와 Doughnut 컴포넌트

// Chart.js에서 사용할 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement, // 추가 등록
  Title,
  Tooltip,
  Legend
);

const Chart = ({
  chartType = 'Bar', // 기본 차트 타입
  labels = [], // X축 라벨
  dataset = [], // 데이터셋
  options = {}, // 추가 옵션
  width = 100, // 차트 가로 크기
  height = 400, // 차트 세로 크기
  xAxisColor = '#000',
  yAxisColor = '#000',
  yMax = null, // Y축 최대값 (선택 사항)
  yMin = null, // Y축 최소값 (선택 사항)
  yUnit = '', // Y축 숫자 단위 (선택 사항)
}) => {
  // 차트 데이터 생성
  const data = {
    labels, // props로 전달된 X축 라벨
    datasets: dataset, // props로 전달된 데이터셋
  };

  // 사용자 정의 차트 옵션 병합
  const mergedOptions = {
    ...options,
    responsive: true,
    maintainAspectRatio: false, // 크기 조절 가능
    ...(chartType === 'Bar' || chartType === 'Line' // Bar와 Line에서만 스케일 옵션 적용
      ? {
          scales: {
            x: {
              ticks: { color: xAxisColor },
              grid: { color: xAxisColor },
            },
            y: {
              ticks: {
                color: yAxisColor,
                callback: function (value) {
                  return `${value}${yUnit}`; // 숫자 뒤에 단위 추가
                },
              },
              grid: { color: yAxisColor },
              ...(yMax !== null || yMin !== null
                ? {
                    min: yMin !== null ? yMin : undefined,
                    max: yMax !== null ? yMax : undefined,
                  }
                : {}),
            },
          },
        }
      : {}),
  };

  // 차트 타입에 따라 컴포넌트 선택
  let ChartComponent;
  switch (chartType) {
    case 'Bar':
      ChartComponent = Bar;
      break;
    case 'Line':
      ChartComponent = Line;
      break;
    case 'Pie':
      ChartComponent = Pie;
      break;
    case 'Doughnut':
      ChartComponent = Doughnut;
      break;
    default:
      ChartComponent = Bar; // 기본값
  }

  return (
    <div style={{ width: `${width}%`, height: `${height}px` }}>
      <ChartComponent data={data} options={mergedOptions} />
    </div>
  );
};

export default Chart;
