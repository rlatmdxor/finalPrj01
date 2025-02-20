import React, { useEffect, useState } from 'react';
import Title from '../../../util/Title';
import Chart from '../../../util/Chart';
import styled from 'styled-components';
import Btn from '../../../util/Btn';
import Modal from '../../../util/Modal';
import InputTag from '../../../util/Input';
import { useDispatch, useSelector } from 'react-redux';
import { close, open } from '../../../../redux/modalSlice';
import { resetPaging, setTotalCount } from '../../../../redux/pagingSlice';
import DateBtn from '../../../util/DateBtn';
import Table from '../../../util/Table';
import ContentLayout from '../../../util/ContentLayout';
import Pagination from '../../../util/Pagination';
import { addDays, addMonths, endOfMonth, startOfDay, startOfMonth, startOfYear, subYears } from 'date-fns';

const YearContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  gap: 35px;
  height: 0px;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-right: -45px;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const Sleep = () => {
  const [dataVoList, setDataVoList] = useState([]);
  const [chartVoList, setChartVoList] = useState([]);
  const [num, setNum] = useState(0);

  const TempDayLabels = [];
  const TempDayList = [];
  const dataBtn = ['일', '주', '월'];
  const [selectedRange, setSelectedRange] = useState('일');
  const [selectChart, setSelectChart] = useState('Bar');
  const initialInputData = { no: '', recordDate: '', sleepStart: '', sleepEnd: '' };
  const [inputData, setInputData] = useState(initialInputData);
  const url = 'http://127.0.0.1:80/api/sleep/';
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputData),
  };
  const [dayList, setDayList] = useState([]);
  const [dayLabels, setDayLabels] = useState([]);
  const now = new Date();
  const [state, setState] = useState(0);
  const currentYear = String(now.getFullYear() + state);
  const yearStartDay = subYears(startOfYear(now), -state); // 올해 1월 1일

  const [monthList, setMonthList] = useState([]);
  const [monthLabels, setMonthLabels] = useState([]);

  const daysInYear = 365;

  const TempWeekList = [];
  const TempWeekLables = [];
  const [weekList, setWeekList] = useState([]);
  const [weekLables, setWeekLabels] = useState([]);

  let weekSleepDuration = 0;

  let dayCounter = 0;
  let weekCounter = 0;
  const removeDate = [];

  let uniqueDaysInWeek = new Set();

  let matchedDay = 0; // let으로 선언하여 값을 변경 가능하게 설정
  let daySleepDuration = 0; // 수면 지속 시간 초기화

  let startDay = addDays(startOfMonth(addMonths(now, state)), 1); // state에 따라 시작일을 설정
  let endDay = addDays(endOfMonth(addMonths(now, state)), 1); // state에 따라 종료일을 설정
  let MonthStartDay = addDays(startOfMonth(addMonths(now, state)), 1); // state에 따라 시작일을 설정
  let MonthEndDay = addDays(endOfMonth(addMonths(now, state)), 1); // state에 따라 종료일을 설정
  let currentDay = startDay.toISOString().split('T')[0];

  useEffect(() => {
    const endDayStr = endDay.toISOString().split('T')[0];
    // 전체 데이터를 날짜별로 정렬 (정렬이 되어있지 않다면)
    dataVoList.sort((a, b) => new Date(a.day) - new Date(b.day));

    for (const vo of dataVoList) {
      if (vo.day === endDay.toISOString().split('T')[0]) {
        break;
      }

      while (currentDay < vo.day) {
        // 현재 날짜에 해당하는 데이터가 없으면 0 추가
        TempDayList.push(matchedDay > 0 ? daySleepDuration / matchedDay : 0);
        matchedDay = 0;
        daySleepDuration = 0;
        startDay = addDays(startDay, 1);
        currentDay = startDay.toISOString().split('T')[0]; // 날짜 업데이트
      }

      // 현재 날짜와 vo.day가 일치하면 sleepDuration 합산
      if (vo.day === currentDay) {
        daySleepDuration += Number(vo.sleepDuration);
        matchedDay++;
      }
    }

    // 해당 달에 데이터가 하나도 없을 경우 0을 채워넣기
    if (TempDayList.length === 0) {
      let currentDay = startDay.toISOString().split('T')[0];
      while (currentDay <= endDayStr) {
        TempDayList.push(0);
        startDay = addDays(startDay, 1);
        currentDay = startDay.toISOString().split('T')[0]; // 날짜 업데이트
      }
    }

    // 마지막 데이터 추가
    if (matchedDay > 0) {
      TempDayList.push(daySleepDuration / matchedDay);
    }
    // 최종 리스트 저장
    setDayList(TempDayList);
  }, [dataVoList.length, state]);

  useEffect(() => {
    let TempDayLabels = [];
    let monthLabels = [];
    let monthList = [];

    // 월별 날짜 리스트 만들기
    while (MonthStartDay <= MonthEndDay) {
      TempDayLabels.push(MonthStartDay.toISOString().split('T')[0]);
      MonthStartDay = addDays(startOfDay(MonthStartDay), 1); // 하루씩 증가
    }
    if (TempDayLabels.length > 0) {
      setDayLabels(TempDayLabels); // 월별 날짜 설정
    }

    // 월별 데이터 처리
    const monthCount = Array.from({ length: 12 }, () => 0);
    let lastDate = '';

    for (let i = 0; i < 12; i++) {
      for (const vo of dataVoList) {
        if (vo.day.slice(5, 7) === String(i + 1).padStart(2, '0') && vo.day.slice(0, 4) === currentYear) {
          if (lastDate !== vo.day) {
            monthCount[i] += 1; // 중복되는 날짜는 세지 않음
            lastDate = vo.day;
          }
        }
      }
    }

    let x = 0;
    for (let i = 0; i < 12; i++) {
      monthLabels.push(i + 1 + '월');
      x = 0; // 누적 초기화
      for (const vo of dataVoList) {
        if (vo.day.slice(5, 7) === String(i + 1).padStart(2, '0') && vo.day.slice(0, 4) === currentYear) {
          x += Number(vo.sleepDuration); // 수면 시간 누적
        }
      }

      // 평균 계산: monthCount[i]가 0이 아닌 경우에만 평균 계산
      if (monthCount[i] > 0) {
        monthList.push(x / monthCount[i]); // 월별 평균
      } else {
        monthList.push(0); // 데이터가 없으면 0
      }
    }

    // 월별 데이터 업데이트
    setMonthLabels(monthLabels);
    setMonthList(monthList);
  }, [dataVoList.length, state]);

  useEffect(() => {
    for (let i = 1; i <= daysInYear; i++) {
      dayCounter++;
      const currentDate = addDays(yearStartDay, i);
      const currentDateStr = currentDate.toISOString().split('T')[0];

      // 날짜와 일치하는 데이터를 찾기
      const matchedVo = dataVoList.find((vo) => vo.day === currentDateStr);

      // 주에 입력된 날짜가 며칠인지 확인
      if (matchedVo) {
        weekSleepDuration += Number(matchedVo.sleepDuration);
        uniqueDaysInWeek.add(currentDateStr);
      }

      // 7일(1주)마다 데이터를 저장하고 초기화
      if (dayCounter === 7) {
        removeDate[weekCounter] = uniqueDaysInWeek.size; // 주별 입력된 고유 날짜 개수 저장
        TempWeekList.push(weekSleepDuration / removeDate[weekCounter]);
        TempWeekLables.push(weekCounter + 1 + '주'); // 주 레이블 추가
        weekCounter++;
        weekSleepDuration = 0;
        dayCounter = 0;
        uniqueDaysInWeek.clear();
      }
    }

    // 365일이라 1일~6일 남은 경우 처리 (마지막 주 데이터 추가)
    if (dayCounter > 0) {
      removeDate[weekCounter] = uniqueDaysInWeek.size;
      TempWeekList.push(weekSleepDuration / removeDate[weekCounter]);
      TempWeekLables.push(weekCounter + 1 + '주'); // 마지막 주 레이블 추가
    }

    // 최종 데이터 세팅
    setWeekList(TempWeekList);
    setWeekLabels(TempWeekLables); // 주 레이블 업데이트
  }, [dataVoList.length, state]);

  useEffect(() => {
    fetch(`${url}list`, options)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length > 0) {
          dispatch(setTotalCount({ boardType, totalCount: data.length }));
        } else {
          dispatch(resetPaging({ boardType }));
        }

        setDataVoList(data);
        setChartVoList(data);
      });
  }, [num]);
  chartVoList.sort((a, b) => new Date(b.day) - new Date(a.day));
  
  const getChartData = () => {
    switch (selectedRange) {
      case '일':
        return dayList;
      case '주':
        return weekList;
      case '월':
        return monthList;
      default:
        return [];
    }
  };

  const dispatch = useDispatch();
  const boardType = 'sleep';

  const { currentPage, boardLimit } = useSelector((state) => state.paging[boardType] || {});

  useEffect(() => {
    dispatch(setTotalCount({ boardType, totalCount: chartVoList.length }));
    dispatch(resetPaging({ boardType }));
  }, [chartVoList.length, dispatch]);

  const offset = (currentPage - 1) * boardLimit;
  const data = chartVoList.slice(offset, offset + boardLimit);

  const label = () => {
    switch (selectedRange) {
      case '일':
        return dayLabels;
      case '주':
        return weekLables;
      case '월':
        return monthLabels;
      default:
        return dayLabels;
    }
  };
  const dataset = [
    {
      label: '수면 지속 시간',

      data: getChartData(),
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
      ], // 테두리 색상
      borderWidth: 1, // 테두리 두께
    },
  ];

  const handleChange = (e) => {
    setInputData((props) => {
      return {
        ...props,
        [e.target.name]: e.target.value,
      };
    });
  };

  const reset = () => {
    setInputData(initialInputData);
  };

  const handleSubmit = (e) => {
    fetch(`${url}write`, options)
      .then((resp) => resp.text())
      .then((data) => {
        setNum((prev) => prev + 1);
      });

    dispatch(close(e.target.title));
  };

  const handleEditSubmit = (e) => {
    fetch(`${url}edit`, options)
      .then((resp) => resp.text())
      .then((data) => {
        setNum((prev) => prev + 1);
      });

    dispatch(close(e.target.title));
  };

  const handleMinusYear = () => {
    setState(state - 1);
  };
  const handlePlusYear = () => {
    setState(state + 1);
  };

  return (
    <>
      <Title>수면</Title>
      <div></div>
      <ContentLayout>
        <Modal title="수면 등록">
          <InputTag
            type="date"
            name="recordDate"
            plcaeholder="날짜"
            title="날짜"
            size={'size3'}
            mb={'10'}
            mt={'5'}
            value={inputData.recordDate}
            f={handleChange}
          ></InputTag>
          <InputTag
            name="sleepStart"
            type="time"
            title="수면 시작 시간"
            value={inputData.sleepStart}
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={handleChange}
          ></InputTag>
          <InputTag
            name="sleepEnd"
            type="time"
            title="수면 종료 시간"
            value={inputData.sleepEnd}
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={handleChange}
          ></InputTag>
          <ModalContainer>
            <Btn
              title={'수면 등록'}
              f={handleSubmit}
              mt={'10'}
              mb={'20'}
              mr={'-10'}
              c={'#FF7F50'}
              fc={'white'}
              str={'등록'}
            ></Btn>
          </ModalContainer>
        </Modal>
        <Modal title="수면 수정">
          <InputTag
            name={'recordDate'}
            type="date"
            plcaeholder="날짜"
            title="날짜"
            size={'size3'}
            mb={'10'}
            mt={'5'}
            value={inputData.recordDate}
            f={handleChange}
          ></InputTag>
          <InputTag
            name={'sleepStart'}
            type="time"
            title="수면 시작 시간"
            size={'size3'}
            mb={'10'}
            mt={'5'}
            value={inputData.sleepStart}
            f={handleChange}
          ></InputTag>
          <InputTag
            name={'sleepEnd'}
            type="time"
            title="수면 종료 시간"
            size={'size3'}
            mb={'10'}
            mt={'5'}
            value={inputData.sleepEnd}
            f={handleChange}
          ></InputTag>
          <ModalContainer>
            <Btn
              f={handleEditSubmit}
              title={'수면 수정'}
              mt={'10'}
              mb={'20'}
              mr={'20'}
              c={'#7ca96d'}
              fc={'white'}
              str={'수정'}
            ></Btn>
            <Btn mt={'10'} mb={'20'} mr={'-20'} c={'lightgray'} fc={'black'} str={'삭제'}></Btn>
          </ModalContainer>
        </Modal>
        <YearContainer>
          <div onClick={handleMinusYear}>{'<'}</div>
          {selectedRange === '일' ? (
            <>
              <h1>{currentDay.slice(0, 7)}</h1>
            </>
          ) : (
            <h1>{currentYear}</h1>
          )}
          <div onClick={handlePlusYear}>{'>'}</div>
        </YearContainer>
        <DateBtn dataBtn={dataBtn} onSelect={setSelectedRange} line={'Bar'} onChange={setSelectChart}></DateBtn>
        <Chart
          chartType={selectChart}
          labels={label()}
          dataset={dataset}
          width={100}
          height={400}
          xAxisColor="rgba(75, 192, 192, 1)"
          yAxisColor="rgba(255, 99, 132, 1)"
        />
        <BtnContainer>
          <div
            onClick={() => {
              reset();
              dispatch(open({ title: '수면 등록', value: 'block' }));
            }}
          >
            <Btn mt={'50'} mr={'46'} mb={'20'} str={'등록'} c={'#FF7F50'} fc={'white'}></Btn>
          </div>
        </BtnContainer>
        <Table>
          <thead>
            <tr>
              <th>날짜</th>
              <th>수면 시작 시간</th>
              <th>수면 종료 시간</th>
              <th>수면 지속 시간</th>
            </tr>
          </thead>
          <tbody>
            {data.map((vo) => {
              return (
                <tr
                  key={vo.no}
                  onClick={(e) => {
                    setInputData({
                      no: vo.no,
                      recordDate: vo.day,
                      sleepStart: vo.startTime,
                      sleepEnd: vo.endTime,
                    });
                    dispatch(open({ title: '수면 수정', value: 'block' }));
                  }}
                >
                  <td>{vo.day}</td>
                  <td>{vo.startTime}</td>
                  <td>{vo.endTime}</td>
                  <td>{vo.sleepDuration}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination boardType={boardType}></Pagination>
      </ContentLayout>
    </>
  );
};

export default Sleep;
