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
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired, getRoleFromToken } from '../../../util/JwtUtil';
import { BASE_URL } from '../../../services/config';

const BottomDiv = styled.div`
  margin-top: 25px;
  margin-bottom: 35px;
`;

const YearContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  gap: 35px;
  height: 0px;
  & > div {
    cursor: pointer;
  }
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
  const navi = useNavigate();
  const token = localStorage.getItem('token');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!token || isTokenExpired(token) || getRoleFromToken(token) == 'ROLE_ADMIN') {
      window.localStorage.removeItem('token');
      navi('/login');
      Swal.fire({
        icon: 'warning',
        title: '로그인이 필요합니다',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      });
    } else {
      setIsAuthorized(true);
    }
  }, [navi, token]);

  const [dataVoList, setDataVoList] = useState([]);
  const [chartVoList, setChartVoList] = useState([]);
  const [num, setNum] = useState(0);
  const TempDayList = [];
  const dataBtn = ['일', '주', '월'];
  const [selectedRange, setSelectedRange] = useState('일');
  const [selectChart, setSelectChart] = useState('Bar');
  const initialInputData = { no: '', recordDate: '', sleepStart: '', sleepEnd: '' };
  const [inputData, setInputData] = useState(initialInputData);
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(inputData),
  };
  const [dayList, setDayList] = useState([]);
  const [dayLabels, setDayLabels] = useState([]);
  const now = new Date();
  const [state, setState] = useState(0);
  const currentYear = String(now.getFullYear() + state);
  const yearStartDay = subYears(startOfYear(now), -state);

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

  let matchedDay = 0;
  let daySleepDuration = 0;

  let startDay = addDays(startOfMonth(addMonths(now, state)), 1);
  let endDay = addDays(endOfMonth(addMonths(now, state)), 1);
  let MonthStartDay = addDays(startOfMonth(addMonths(now, state)), 1);
  let MonthEndDay = addDays(endOfMonth(addMonths(now, state)), 1);
  let currentDay = startDay.toISOString().split('T')[0];

  useEffect(() => {
    const endDayStr = endDay.toISOString().split('T')[0];

    dataVoList.sort((a, b) => new Date(a.day) - new Date(b.day));

    for (const vo of dataVoList) {
      if (vo.day === endDay.toISOString().split('T')[0]) {
        break;
      }

      while (currentDay < vo.day) {
        const hours = Math.floor(daySleepDuration / matchedDay / 60);

        TempDayList.push(matchedDay > 0 ? hours : 0);
        matchedDay = 0;
        daySleepDuration = 0;
        startDay = addDays(startDay, 1);
        currentDay = startDay.toISOString().split('T')[0];
      }

      if (vo.day === currentDay) {
        daySleepDuration += Number(vo.sleepDuration);
        matchedDay++;
      }
    }

    if (TempDayList.length === 0) {
      let currentDay = startDay.toISOString().split('T')[0];
      while (currentDay <= endDayStr) {
        TempDayList.push(0);
        startDay = addDays(startDay, 1);
        currentDay = startDay.toISOString().split('T')[0];
      }
    }

    if (matchedDay > 0) {
      const hours = Math.floor(daySleepDuration / matchedDay / 60);
      TempDayList.push(hours);
    }

    setDayList(TempDayList);
  }, [num, dataVoList.length, state]);

  useEffect(() => {
    let TempDayLabels = [];
    let monthLabels = [];
    let monthList = [];

    while (MonthStartDay <= MonthEndDay) {
      TempDayLabels.push(MonthStartDay.toISOString().split('T')[0].slice(5, 10));
      MonthStartDay = addDays(startOfDay(MonthStartDay), 1);
    }
    if (TempDayLabels.length > 0) {
      setDayLabels(TempDayLabels);
    }

    const monthCount = Array.from({ length: 12 }, () => 0);
    let lastDate = '';

    for (let i = 0; i < 12; i++) {
      for (const vo of dataVoList) {
        if (vo.day.slice(5, 7) === String(i + 1).padStart(2, '0') && vo.day.slice(0, 4) === currentYear) {
          if (lastDate !== vo.day) {
            monthCount[i] += 1;
            lastDate = vo.day;
          }
        }
      }
    }

    let x = 0;
    for (let i = 0; i < 12; i++) {
      monthLabels.push(i + 1 + '월');
      x = 0;
      for (const vo of dataVoList) {
        if (vo.day.slice(5, 7) === String(i + 1).padStart(2, '0') && vo.day.slice(0, 4) === currentYear) {
          x += Number(vo.sleepDuration);
        }
      }

      if (monthCount[i] > 0) {
        monthList.push(Math.floor(x / monthCount[i] / 60));
      } else {
        monthList.push(0);
      }
    }

    setMonthLabels(monthLabels);
    setMonthList(monthList);
  }, [dataVoList.length, state, num]);

  useEffect(() => {
    for (let i = 1; i <= daysInYear; i++) {
      dayCounter++;
      const currentDate = addDays(yearStartDay, i);
      const currentDateStr = currentDate.toISOString().split('T')[0];

      const matchedVo = dataVoList.find((vo) => vo.day === currentDateStr);

      if (matchedVo) {
        weekSleepDuration += Number(matchedVo.sleepDuration);
        uniqueDaysInWeek.add(currentDateStr);
      }

      if (dayCounter === 7) {
        removeDate[weekCounter] = uniqueDaysInWeek.size;
        TempWeekList.push(Math.floor(weekSleepDuration / removeDate[weekCounter] / 60));
        TempWeekLables.push(weekCounter + 1 + '주');
        weekCounter++;
        weekSleepDuration = 0;
        dayCounter = 0;
        uniqueDaysInWeek.clear();
      }
    }

    if (dayCounter > 0) {
      removeDate[weekCounter] = uniqueDaysInWeek.size;
      TempWeekList.push(weekSleepDuration / removeDate[weekCounter]);
      TempWeekLables.push(weekCounter + 1 + '주');
    }

    setWeekList(TempWeekList);
    setWeekLabels(TempWeekLables);
  }, [dataVoList.length, state, num]);

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }
    fetch(`${BASE_URL}/api/sleep/list`, options)
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
  }, [num, isAuthorized, token]);

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
  }, [num, chartVoList.length, dispatch]);

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
      ],
      borderWidth: 1,
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
    if (!isAuthorized) {
      return;
    }
    if (inputData.recordDate === '' && inputData.sleepStart === '' && inputData.sleepEnd === '') {
      Swal.fire({
        icon: 'warning',
        title: '작성해주세요.',
        confirmButtonText: '확인',
      });

      return;
    }

    if (inputData.recordDate === '') {
      Swal.fire({
        icon: 'warning',
        title: '날짜를 선택하세요.',
        confirmButtonText: '확인',
      });

      return;
    }
    if (inputData.sleepStart === '') {
      Swal.fire({
        icon: 'warning',
        title: '수면 시작 시간을 입력하세요.',
        confirmButtonText: '확인',
      });

      return;
    }
    if (inputData.sleepEnd === '') {
      Swal.fire({
        icon: 'warning',
        title: '수면 종료 시간을 입력하세요.',
        confirmButtonText: '확인',
      });

      return;
    }
    Swal.fire({
      title: '등록하시겠습니까?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '등록',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/api/sleep/write`, options)
          .then((resp) => resp.text())
          .then((data) => {
            setNum((prev) => prev + 1);
          });

        dispatch(close(e.target.title));
      }
    });
  };

  const handleEditSubmit = (e) => {
    if (!isAuthorized) {
      return;
    }

    Swal.fire({
      title: '수정하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '수정',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/api/sleep/edit`, options)
          .then((resp) => resp.text())
          .then((data) => {
            Swal.fire({
              icon: 'success',
              title: '수정 완료.',
              confirmButtonText: '확인',
            });
            setNum((prev) => prev + 1);
          });

        dispatch(close(e.target.title));
      }
    });
  };

  const handleMinusYear = () => {
    setState(state - 1);
  };
  const handlePlusYear = () => {
    setState(state + 1);
  };

  const handleDel = (e) => {
    if (!isAuthorized) {
      return;
    }

    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/api/sleep/del`, options)
          .then((resp) => resp.text())
          .then((data) => {
            setNum((prev) => prev + 1);
            Swal.fire({
              icon: 'success',
              title: '삭제 완료.',
              confirmButtonText: '확인',
            });
          });
        dispatch(close(e.target.title));
      }
    });
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
            <Btn
              title={'수면 수정'}
              mt={'10'}
              mb={'20'}
              mr={'-20'}
              c={'lightgray'}
              fc={'black'}
              str={'삭제'}
              f={handleDel}
            ></Btn>
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
        <DateBtn
          dataBtn={dataBtn}
          onSelect={setSelectedRange}
          line={'Line'}
          onChange={setSelectChart}
          setState={setState}
        ></DateBtn>
        <Chart
          chartType={selectChart}
          labels={label()}
          dataset={dataset}
          width={100}
          height={400}
          xAxisColor="rgba(75, 192, 192, 1)"
          yAxisColor="rgba(255, 99, 132, 1)"
          yMax={24}
          yMin={0}
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
                  <td>{vo.sleepDurationHour}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <BottomDiv>
          <Pagination boardType={boardType}></Pagination>
        </BottomDiv>
      </ContentLayout>
    </>
  );
};

export default Sleep;
