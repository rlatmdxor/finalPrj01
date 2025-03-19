import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navi from '../../../util/Navi';
import Title from '../../../util/Title';
import Chart from '../../../util/Chart';
import { useDispatch } from 'react-redux';
import { close } from '../../../../redux/modalSlice';
import ContentLayout from '../../../util/ContentLayout';
import DateBtn from '../../../util/DateBtn';
import DateBtn2 from '../../../util/DateBtn2';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired, getRoleFromToken } from '../../../util/JwtUtil';
import { BASE_URL } from '../../../services/config';

const ExReport = () => {
  const dispatch = useDispatch();
  const dataBtn = ['일', '주', '월'];
  const dataBtn2 = ['월', '년'];

  const token = localStorage.getItem('token');
  const navi = useNavigate();
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

  // 칼로리 (Calories) 전용 상태
  const [selectedRangeCalories, setSelectedRangeCalories] = useState('일');
  const [selectedYearCalories, setSelectedYearCalories] = useState(new Date().getFullYear());
  const [selectedMonthCalories, setSelectedMonthCalories] = useState(new Date().getMonth() + 1);
  const [caloriesChartData, setCaloriesChartData] = useState(null);
  const [selectedChartCalories, setSelectedChartCalories] = useState('Bar');

  // 유산소 운동 시간 (Duration) 전용 상태
  const [selectedRangeDuration, setSelectedRangeDuration] = useState('일');
  const [selectedYearDuration, setSelectedYearDuration] = useState(new Date().getFullYear());
  const [selectedMonthDuration, setSelectedMonthDuration] = useState(new Date().getMonth() + 1);
  const [durationChartData, setDurationChartData] = useState(null);
  const [selectedChartDuration, setSelectedChartDuration] = useState('Bar');

  // 즐겨찾기 운동 전용 상태
  const [maxWeightChartData, setMaxWeightChartData] = useState(null);

  // 유형별 운동 횟수 (Type Count) 전용 상태
  const [selectedRangeTypeCount, setSelectedRangeTypeCount] = useState('월');
  const [selectedYearTypeCount, setSelectedYearTypeCount] = useState(new Date().getFullYear());
  const [selectedMonthTypeCount, setSelectedMonthTypeCount] = useState(new Date().getMonth() + 1);
  const [typeCountChartData, setTypeCountChartData] = useState(null);
  const [selectedChartTypeCount, setSelectedChartTypeCount] = useState('Doughnut');

  // 종류별 운동 횟수 (Category Count) 전용 상태
  const [selectedRangeCategoryCount, setSelectedRangeCategoryCount] = useState('월');
  const [selectedYearCategoryCount, setSelectedYearCategoryCount] = useState(new Date().getFullYear());
  const [selectedMonthCategoryCount, setSelectedMonthCategoryCount] = useState(new Date().getMonth() + 1);
  const [categoryCountChartData, setCategoryCountChartData] = useState(null);
  const [selectedChartCategoryCount, setSelectedChartCategoryCount] = useState('Doughnut');

  // 연도 및 월 변경 함수 (Calories)
  const handlePrevCalories = () => {
    if (selectedRangeCalories === '일') {
      setSelectedMonthCalories((prev) => (prev === 1 ? 12 : prev - 1));
      if (selectedMonthCalories === 1) setSelectedYearCalories((prev) => prev - 1);
    } else {
      setSelectedYearCalories((prev) => prev - 1);
    }
  };

  const handleNextCalories = () => {
    if (selectedRangeCalories === '일') {
      setSelectedMonthCalories((prev) => (prev === 12 ? 1 : prev + 1));
      if (selectedMonthCalories === 12) setSelectedYearCalories((prev) => prev + 1);
    } else {
      setSelectedYearCalories((prev) => prev + 1);
    }
  };

  // 연도 및 월 변경 함수 (Duration)
  const handlePrevDuration = () => {
    if (selectedRangeDuration === '일') {
      setSelectedMonthDuration((prev) => (prev === 1 ? 12 : prev - 1));
      if (selectedMonthDuration === 1) setSelectedYearDuration((prev) => prev - 1);
    } else {
      setSelectedYearDuration((prev) => prev - 1);
    }
  };

  const handleNextDuration = () => {
    if (selectedRangeDuration === '일') {
      setSelectedMonthDuration((prev) => (prev === 12 ? 1 : prev + 1));
      if (selectedMonthDuration === 12) setSelectedYearDuration((prev) => prev + 1);
    } else {
      setSelectedYearDuration((prev) => prev + 1);
    }
  };

  // 연도 및 월 변경 함수 (유형별)
  const handlePrevTypeCount = () => {
    if (selectedRangeTypeCount === '월') {
      setSelectedMonthTypeCount((prev) => (prev === 1 ? 12 : prev - 1));
      if (selectedMonthTypeCount === 1) {
        setSelectedYearTypeCount((prev) => prev - 1);
      }
    } else {
      setSelectedYearTypeCount((prev) => prev - 1);
    }
  };

  const handleNextTypeCount = () => {
    if (selectedRangeTypeCount === '월') {
      setSelectedMonthTypeCount((prev) => (prev === 12 ? 1 : prev + 1));
      if (selectedMonthTypeCount === 12) {
        setSelectedYearTypeCount((prev) => prev + 1);
      }
    } else {
      setSelectedYearTypeCount((prev) => prev + 1);
    }
  };

  // 연도 및 월 변경 함수 (종류별)
  const handlePrevCategoryCount = () => {
    if (selectedRangeCategoryCount === '년') {
      setSelectedYearCategoryCount((prev) => prev - 1);
    } else {
      setSelectedMonthCategoryCount((prev) => (prev === 1 ? 12 : prev - 1));
      if (selectedMonthCategoryCount === 1) setSelectedYearCategoryCount((prev) => prev - 1);
    }
  };

  const handleNextCategoryCount = () => {
    if (selectedRangeCategoryCount === '년') {
      setSelectedYearCategoryCount((prev) => prev + 1);
    } else {
      setSelectedMonthCategoryCount((prev) => (prev === 12 ? 1 : prev + 1));
      if (selectedMonthCategoryCount === 12) setSelectedYearCategoryCount((prev) => prev + 1);
    }
  };

  //월별 칼로리 소모량 fetch
  const fetchCaloriesData = async () => {
    try {
      let url = `${BASE_URL}/api/exercise/getCalories?rangeType=${selectedRangeCalories}&year=${selectedYearCalories}`;
      if (selectedRangeCalories === '일') url += `&month=${selectedMonthCalories}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('칼로리 데이터 불러오기 실패');

      const data = await response.json();
      setCaloriesChartData({
        labels: data.map((item) => item.PERIOD),
        datasets: [
          {
            label: '무산소',
            data: data.map((item) => item.TOTAL_ANAEROBIC_CALORIES),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: '유산소',
            data: data.map((item) => item.TOTAL_AEROBIC_CALORIES),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: '유산소 + 무산소',
            data: data.map((item) => item.TOTAL_CALORIES),
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  //운동시간 fetch
  const fetchDurationData = async () => {
    try {
      let url = `${BASE_URL}/api/exercise/getDuration?rangeType=${selectedRangeDuration}&year=${selectedYearDuration}`;
      if (selectedRangeDuration === '일') url += `&month=${selectedMonthDuration}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('운동 시간 데이터 불러오기 실패');

      const data = await response.json();
      setDurationChartData({
        labels: data.map((item) => item.PERIOD),
        datasets: [
          {
            label: '유산소 운동 시간 (분)',
            data: data.map((item) => item.TOTAL_AEROBIC_DURATION),
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
      console.error(error);
    }
  };

  //최대중량 fetch
  const fetchMaxWeightData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/exercise/getMonthlyMaxWeight`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

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

  // 유형별 운동 횟수 fetch
  const fetchTypeCountData = async () => {
    try {
      let url = `${BASE_URL}/api/exercise/getTypeCount?rangeType=${selectedRangeTypeCount}&year=${selectedYearTypeCount}`;
      if (selectedRangeTypeCount === '월') url += `&month=${selectedMonthTypeCount}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('유형별 운동 횟수 데이터 불러오기 실패');

      const data = await response.json();

      if (!data || data.length === 0) {
        setTypeCountChartData({
          labels: ['유산소', '무산소'],
          datasets: [
            {
              label: '운동 유형',
              data: [0, 0],
              backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
            },
          ],
        });
        return;
      }

      let aerobicCount = 0;
      let anaerobicCount = 0;

      if (selectedRangeTypeCount === '년') {
        // "년" 선택 시 연도별 총합을 계산
        data.forEach((item) => {
          aerobicCount += item.AEROBIC_COUNT || 0;
          anaerobicCount += item.ANAEROBIC_COUNT || 0;
        });
      } else {
        // "월" 선택 시, 해당 월 데이터만 반영
        aerobicCount = data[0].AEROBIC_COUNT || 0;
        anaerobicCount = data[0].ANAEROBIC_COUNT || 0;
      }

      setTypeCountChartData({
        labels: ['유산소', '무산소'],
        datasets: [
          {
            label: '운동 횟수',
            data: [aerobicCount, anaerobicCount],
            backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error(error);
      setTypeCountChartData({
        labels: ['유산소', '무산소'],
        datasets: [
          { label: '운동 유형', data: [0, 0], backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'] },
        ],
      });
    }
  };

  // 운동 ID를 운동 이름으로 매핑
  const exerciseNameMap = {
    1: '바벨 컬',
    2: '해머 컬',
    3: '딥스',
    4: '킥백',
    5: '스쿼트',
    6: '레그 프레스',
    7: '런지',
    8: '카프 레이즈',
    9: '숄더 프레스',
    10: '레터럴 레이즈',
    11: '프론트 레이즈',
    12: '페이스 풀',
    13: '벤치 프레스',
    14: '푸쉬업',
    15: '체스트 플라이',
    16: '인클라인 벤치 프레스',
    17: '크런치',
    18: '플랭크',
    19: '레그 레이즈',
    20: '러시안 트위스트',
    21: '풀업',
    22: '데드 리프트',
    23: '로우',
    24: '행잉 레그 레이즈',
  };

  // 도넛 차트 적용을 위한 데이터 가공 함수
  const transformToChartData = (data) => {
    if (!data || data.length === 0) return { labels: [], datasets: [] };

    return {
      labels: data.map((item) => exerciseNameMap[item.EX_NO] || `운동 ${item.EX_NO}`), // 운동 이름 매핑
      datasets: [
        {
          label: '운동 횟수',
          data: data.map((item) => item.EXERCISE_COUNT),
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
    };
  };

  // 종류별 운동 횟수 fetch
  const fetchCategoryCountData = async () => {
    try {
      let url = `${BASE_URL}/api/exercise/getCategoryCount?rangeType=${selectedRangeCategoryCount}&year=${selectedYearCategoryCount}`;
      if (selectedRangeCategoryCount === '월') url += `&month=${selectedMonthCategoryCount}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('종류별 운동 횟수 데이터 불러오기 실패');

      const data = await response.json();
      setCategoryCountChartData(transformToChartData(data));
    } catch (error) {
      console.error(error);
      setCategoryCountChartData({ labels: [], datasets: [] });
    }
  };

  useEffect(() => {
    fetchCaloriesData();
  }, [selectedRangeCalories, selectedYearCalories, selectedMonthCalories]);

  useEffect(() => {
    fetchDurationData();
  }, [selectedRangeDuration, selectedYearDuration, selectedMonthDuration]);

  useEffect(() => {
    fetchMaxWeightData();
  }, []);

  useEffect(() => {
    fetchTypeCountData();
  }, [selectedRangeTypeCount, selectedYearTypeCount, selectedMonthTypeCount]);

  useEffect(() => {
    fetchCategoryCountData();
  }, [selectedRangeCategoryCount, selectedYearCategoryCount, selectedMonthCategoryCount]);

  useEffect(() => {
    if (selectedRangeTypeCount === '월' && selectedMonthTypeCount === null) {
      setSelectedMonthTypeCount(new Date().getMonth() + 1);
    }
  }, [selectedRangeTypeCount]);

  useEffect(() => {
    dispatch(close('운동 기록'));
    if (!isAuthorized) {
      return;
    }
  }, [isAuthorized, token]);

  // label 에서 연도 제거
  const formattedCaloriesLabels = (caloriesChartData?.labels || []).map((label) => {
    const parts = label.split('-');
    if (parts.length === 3) {
      return `${parts[2]}`;
    }
    if (parts.length === 2) {
      return `${parts[1]}`;
    }
    return label; //기존 label
  });

  // label 에서 연도 제거
  const formattedDurationLabels = (durationChartData?.labels || []).map((label) => {
    const parts = label.split('-');
    if (parts.length === 3) {
      return `${parts[2]}`;
    }
    if (parts.length === 2) {
      return `${parts[1]}`;
    }
    return label; //기존 label
  });

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

        <DayDiv>
          <button onClick={handlePrevCalories}>◀</button>
          <h1>
            {selectedYearCalories}년{' '}
            {selectedRangeCalories === '일' ? `${String(selectedMonthCalories).padStart(2, '0')}월` : ''}
          </h1>
          <button onClick={handleNextCalories}>▶</button>
        </DayDiv>
        <ChartContainer>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
            <TitleTag>칼로리 소모량</TitleTag>
            <DateBtn
              line={'Line'}
              dataBtn={dataBtn}
              onSelect={setSelectedRangeCalories}
              onChange={setSelectedChartCalories}
            />
          </div>
          <ChartPosition>
            <Chart
              chartType={selectedChartCalories}
              labels={formattedCaloriesLabels}
              dataset={caloriesChartData?.datasets || []}
              width={100}
              height={400}
              xAxisColor="rgba(75, 192, 192, 1)" // Bar , Line 에만 사용되고 x축 글씨색상임
              yAxisColor="rgba(255, 99, 132, 1)" // Bar , Line 에만 사용되고 y축 글씨색상임
            />
          </ChartPosition>
        </ChartContainer>

        <DayDiv>
          <button onClick={handlePrevDuration}>◀</button>
          <h1>
            {selectedYearDuration}년{' '}
            {selectedRangeDuration === '일' ? `${String(selectedMonthDuration).padStart(2, '0')}월` : ''}
          </h1>
          <button onClick={handleNextDuration}>▶</button>
        </DayDiv>
        <ChartContainer>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
            <TitleTag>유산소 운동 시간</TitleTag>
            <DateBtn
              line={'Line'}
              dataBtn={dataBtn}
              onSelect={setSelectedRangeDuration}
              onChange={setSelectedChartDuration}
            />
          </div>
          <ChartPosition>
            <Chart
              chartType={selectedChartDuration}
              labels={formattedDurationLabels}
              dataset={durationChartData?.datasets || []}
              width={100}
              height={400}
              xAxisColor="rgba(54, 162, 235, 1)" // x축 색상
              yAxisColor="rgba(255, 159, 64, 1)" // y축 색상
            />
          </ChartPosition>
        </ChartContainer>

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
            <DayDiv2>
              <button onClick={handlePrevTypeCount}>◀</button>
              <h1>
                {selectedYearTypeCount}년{' '}
                {selectedRangeTypeCount === '월' ? `${String(selectedMonthTypeCount).padStart(2, '0')}월` : ''}
              </h1>
              <button onClick={handleNextTypeCount}>▶</button>
            </DayDiv2>
            <TitleContainer>
              <TitleTag2>유형별 운동 횟수</TitleTag2>
              <DateBtn2 dataBtn={dataBtn2} onSelect={setSelectedRangeTypeCount} onChange={setSelectedChartTypeCount} />
            </TitleContainer>
            <ChartPosition>
              <ChartWithHoverEffect
                chartType={selectedChartTypeCount}
                labels={typeCountChartData?.labels || []}
                dataset={typeCountChartData?.datasets || []}
                initialWidth={90}
                hoverWidth={100}
                height={600}
              />
            </ChartPosition>
          </ChartContainer>

          <ChartContainer>
            <DayDiv2>
              <button onClick={handlePrevCategoryCount}>◀</button>
              <h1>
                {selectedYearCategoryCount}년
                {selectedRangeCategoryCount !== '년' ? ` ${String(selectedMonthCategoryCount).padStart(2, '0')}월` : ''}
              </h1>
              <button onClick={handleNextCategoryCount}>▶</button>
            </DayDiv2>
            <TitleContainer>
              <TitleTag2>종류별 운동 횟수</TitleTag2>
              <DateBtn2
                dataBtn={dataBtn2}
                onSelect={setSelectedRangeCategoryCount}
                onChange={setSelectedChartCategoryCount}
              />
            </TitleContainer>
            <ChartPosition>
              <ChartWithHoverEffect
                chartType={selectedChartCategoryCount}
                labels={categoryCountChartData?.labels || []}
                dataset={categoryCountChartData?.datasets || []}
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

const ChartWithHoverEffect = ({
  chartType,
  labels = ['유산소', '무산소'],
  dataset = [{ data: [0, 0] }],
  initialWidth,
  hoverWidth,
  height,
}) => {
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

const TitleTag2 = styled.h2`
  display: grid;
  justify-self: center;
`;

const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 80%;
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

const DayDiv = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background-color: #78be78;
  box-sizing: border-box;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: Arial, sans-serif;

  & h1 {
    margin: 0 20px;
    font-size: 19px;
  }

  & button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: white;
    font-weight: bold;
  }
`;

const DayDiv2 = styled.div`
  display: flex;
  width: 80%;
  height: 50px;
  justify-content: center;
  align-items: center;
  justify-self: center;
  padding: 12px;
  background-color: #78be78;
  box-sizing: border-box;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: Arial, sans-serif;

  & h1 {
    margin: 0 20px;
    font-size: 19px;
  }

  & button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: white;
    font-weight: bold;
  }
`;

export default ExReport;
