import React, { useEffect, useState } from 'react';
import Title from '../../../util/Title';
import Navi from '../../../util/Navi';
import Chart from '../../../util/Chart';
import styled from 'styled-components';
import RadiusTable from '../../../util/RadiusTable';
import { useDispatch, useSelector } from 'react-redux';
import { resetPaging, setTotalCount } from '../../../../redux/pagingSlice';
import Btn from '../../../util/Btn';
import Pagination from '../../../util/Pagination';
import DateBtn from '../../../util/DateBtn';
import ContentLayout from '../../../util/ContentLayout';
import Modal from '../../../util/Modal';
import InputTag from '../../../util/Input';
import { close, open } from '../../../../redux/modalSlice';
import Swal from 'sweetalert2';
import { isTokenExpired, getRoleFromToken } from '../../../util/JwtUtil';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../services/config';

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
const LineDiv = styled.div`
  height: 50px;
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

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 300px;
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 6fr;
`;
const ModalInputDiv = styled.div`
  width: 450px;
  display: grid;
  grid-template: repeat(2, 1fr) / 1fr 1fr;
`;

const getCustomWeekNumber = (dateString) => {
  if (dateString instanceof Date) {
    dateString = dateString.toISOString().split('T')[0];
  }

  const tempDate = new Date(dateString);
  if (isNaN(tempDate)) {
    return null;
  }

  tempDate.setHours(0, 0, 0, 0);

  const yearStart = new Date(tempDate.getFullYear(), 0, 1);
  const firstMonday = new Date(yearStart);
  firstMonday.setDate(yearStart.getDate() + ((1 - yearStart.getDay() + 7) % 7));

  const weekNumber = Math.ceil(((tempDate - firstMonday) / 86400000 + 1) / 7);

  return weekNumber;
};

const getWeeklyData = (data, year, week) => {
  console.log(`🔥 선택된 연도: ${year}, 선택된 주차: ${week}`);

  return data.filter((d) => {
    const dDate = new Date(d.day);
    const dYear = dDate.getFullYear();
    const dWeek = getCustomWeekNumber(d.day);

    return dYear === year && dWeek === week;
  });
};

const getMonthlyData = (data, year, month) => {
  return data.filter((d) => {
    const dDate = new Date(d.day);
    const dYear = dDate.getFullYear();
    const dMonth = dDate.getMonth() + 1;
    return dYear === year && dMonth === month;
  });
};

const generateWeekDates = (year, week) => {
  const firstDayOfYear = new Date(year, 0, 1);
  const firstMonday = new Date(firstDayOfYear);
  firstMonday.setDate(firstDayOfYear.getDate() + ((1 - firstDayOfYear.getDay() + 7) % 7));

  const startDate = new Date(firstMonday);
  startDate.setDate(startDate.getDate() + (week - 1) * 7);

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    weekDates.push(date.toISOString().split('T')[0]);
  }
  return weekDates;
};

const generateMonthDates = (year, month) => {
  const lastDay = new Date(year, month, 0).getDate();
  return Array.from({ length: lastDay }, (_, i) => new Date(year, month - 1, i + 1).toISOString().split('T')[0]);
};

const fillWeekData = (data, year, week) => {
  const weekDates = generateWeekDates(year, week);

  return weekDates
    .map((date) => {
      const filteredData = data.filter((d) => d.day === date);

      return filteredData.length > 0
        ? filteredData.sort((a, b) => a.time.localeCompare(b.time))
        : [{ day: date, systole: null, diastole: null, time: '00:00' }];
    })
    .flat();
};
const fillMonthData = (data, year, month) => {
  const monthDates = generateMonthDates(year, month);

  return monthDates
    .map((date) => {
      const filteredData = data.filter((d) => d.day === date);

      return filteredData.length > 0
        ? filteredData.sort((a, b) => a.time.localeCompare(b.time))
        : [{ day: date, systole: null, diastole: null, time: '00:00' }];
    })
    .flat();
};

const BloodSugar = () => {
  const navi = useNavigate();
  const token = localStorage.getItem('token');
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

  const url = `${BASE_URL}/api/bloodSugar/list`;

  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  };
  const boardType = 'bloodSugar';
  const initialInputData = {
    no: '',
    memberNo: '1',
    sugar: '',
    enrollDate: '',
    note: '',
    day: '',
    time: '',
  };
  const [num, setNum] = useState(0);
  const [fullData, setFullData] = useState([]);
  const [pagedData, setPagedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRange, setSelectedRange] = useState('주');
  const [selectChart, setSelectChart] = useState('Line');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentWeek, setCurrentWeek] = useState(getCustomWeekNumber(new Date()));
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const { currentPage, boardLimit } = useSelector((state) => state.paging[boardType] || {});
  const [inputData, setInputData] = useState(initialInputData);
  const offset = (currentPage - 1) * boardLimit;
  const dispatch = useDispatch();
  const handleRangeChange = (range) => {
    setSelectedRange(range);

    if (range === '주') {
      setCurrentYear(new Date().getFullYear());
      setCurrentWeek(getCustomWeekNumber(new Date()));
    } else {
      setCurrentYear(new Date().getFullYear());
      setCurrentMonth(new Date().getMonth() + 1);
    }
  };

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }
    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => {
        if (Array.isArray(data)) {
          dispatch(setTotalCount({ boardType, totalCount: data.length }));
          setFullData(data);
        } else {
          dispatch(resetPaging({ boardType }));
          setFullData([]);
        }
      })
      .catch((error) => console.error('데이터 불러오기 실패:', error));
  }, [num, isAuthorized, token]);
  const reset = () => {
    setInputData(initialInputData);
  };
  useEffect(() => {
    if (fullData.length > 0) {
      if (selectedRange === '주') {
        const weeklyData = getWeeklyData(fullData, currentYear, currentWeek);
        setFilteredData(weeklyData);
      } else {
        const monthlyData = getMonthlyData(fullData, currentYear, currentMonth);
        setFilteredData(monthlyData);
      }
    }
  }, [fullData, selectedRange, currentYear, currentWeek, currentMonth]);

  const handlePrev = () => {
    if (selectedRange === '주') {
      if (currentWeek > 1) {
        setCurrentWeek((prev) => prev - 1);
      } else {
        setCurrentYear((prev) => prev - 1);
        setCurrentWeek(52);
      }
    } else {
      if (currentMonth > 1) {
        setCurrentMonth((prev) => prev - 1);
      } else {
        setCurrentYear((prev) => prev - 1);
        setCurrentMonth(12);
      }
    }
  };

  const handleNext = () => {
    if (selectedRange === '주') {
      const lastDayOfYear = new Date(currentYear, 11, 31);
      const maxWeeks = getCustomWeekNumber(lastDayOfYear.toISOString().split('T')[0]);

      console.log(`🔄 현재 연도: ${currentYear}, 현재 주차: ${currentWeek}, 최대 주차: ${maxWeeks}`);

      if (currentWeek < maxWeeks) {
        setCurrentWeek((prev) => prev + 1);
      } else {
        setCurrentYear((prev) => prev + 1);
        setCurrentWeek(1);
      }
    } else {
      if (currentMonth < 12) {
        setCurrentMonth((prev) => prev + 1);
      } else {
        setCurrentYear((prev) => prev + 1);
        setCurrentMonth(1);
      }
    }
  };

  const handleChange = (e) => {
    setInputData((props) => {
      return {
        ...props,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    Swal.fire({
      title: '등록하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        if (inputData.day == '' || inputData.day == null) {
          Swal.fire({
            icon: 'error',
            title: '측정 날짜를 기록해주세요.',
          });
          return;
        }
        if (inputData.time == '' || inputData.time == null) {
          Swal.fire({
            icon: 'error',
            title: '측정 시간을 기록해주세요.',
          });
          return;
        }
        if (inputData.sugar == '' || inputData.sugar == null) {
          Swal.fire({
            icon: 'error',
            title: '혈당을 기록해주세요.',
          });
          return;
        }
        if (inputData.sugar < 50 || inputData.sugar > 500) {
          Swal.fire({
            icon: 'error',
            title: '혈당 수치 오류!',
          });
          return;
        }

        fetch(`${BASE_URL}/api/bloodSugar/write`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(inputData),
        })
          .then((resp) => resp.text())
          .then((data) => {
            if (data == 1) {
              setNum((x) => x + 1);
              Swal.fire({
                title: '등록되었습니다.',
                icon: 'success',
                draggable: true,
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: '정확한 수치를 입력해주세요.',
                text: '다시 입력해주세요',
              });
            }
          });

        dispatch(close(e.target.title));
      }
    });
  };

  const handleEditSubmit = (e) => {
    Swal.fire({
      title: '수정하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        if (inputData.day == '' || inputData.day == null) {
          Swal.fire({
            icon: 'error',
            title: '측정 날짜를 기록해주세요.',
          });
          return;
        }
        if (inputData.time == '' || inputData.time == null) {
          Swal.fire({
            icon: 'error',
            title: '측정 시간을 기록해주세요.',
          });
          return;
        }
        if (inputData.sugar == '' || inputData.sugar == null) {
          Swal.fire({
            icon: 'error',
            title: '혈당을 기록해주세요.',
          });
          return;
        }
        if (inputData.sugar < 50 || inputData.sugar > 500) {
          Swal.fire({
            icon: 'error',
            title: '혈당 수치 오류!',
          });
          return;
        }
        fetch(`${BASE_URL}/api/bloodSugar/edit`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(inputData),
        })
          .then((resp) => resp.text())
          .then((data) => {
            if (data == 1) {
              setNum((x) => x + 1);
              Swal.fire({
                title: '수정되었습니다.',
                icon: 'success',
                draggable: true,
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: '정확한 수치를 입력해주세요.',
                text: '다시 입력해주세요',
              });
            }
          });

        setInputData(initialInputData);

        dispatch(close(e.target.title));
      }
    });
  };
  const handleDelSubmit = (e) => {
    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/api/bloodSugar/delete`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(inputData),
        })
          .then((resp) => resp.text())
          .then((data) => {
            setNum((x) => x - 1);
            Swal.fire({
              title: '삭제되었습니다.',
              icon: 'success',
              draggable: true,
            });
          });

        dispatch(close(e.target.title));
      }
    });
  };

  useEffect(() => {
    setPagedData(fullData.slice(offset, offset + boardLimit));
  }, [fullData, currentPage, boardLimit]);

  const filledData =
    selectedRange === '주'
      ? fillWeekData(filteredData, currentYear, currentWeek)
      : fillMonthData(filteredData, currentYear, currentMonth);

  const chartData = {
    labels: filledData.map((d) => d.day.substring(5)),
    datasets: [
      {
        label: '혈당 (mg/dL)',
        data: filledData.map((d) => d.sugar),
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

  let now = new Date();

  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, '0');
  let day = String(now.getDate()).padStart(2, '0');
  let hours = String(now.getHours()).padStart(2, '0');
  let minutes = String(now.getMinutes()).padStart(2, '0');

  const today = `${year}-${month}-${day}`;

  return (
    <>
      <Title>혈당</Title>
      <NaviContainer>
        <Navi target="bloodsugar" tag={'혈당 기록'}></Navi>
        <Navi target="insulin" tag={'인슐린 기록지'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <Modal title="혈당 등록">
          <ModalInputDiv>
            <div>
              <InputTag
                type="date"
                name="day"
                plcaeholder="측정일"
                title="측정일"
                mb={'10'}
                mt={'5'}
                max={today}
                value={inputData.day}
                f={handleChange}
              ></InputTag>
            </div>
            <div>
              <InputTag
                type="time"
                name="time"
                plcaeholder="측정시간"
                title="측정시간"
                mb={'10'}
                mt={'5'}
                value={inputData.time}
                f={handleChange}
              ></InputTag>
            </div>
            <div>
              <InputTag
                name="sugar"
                type="number"
                step="0.1"
                title="혈당"
                value={inputData.sugar}
                mb={'10'}
                mt={'5'}
                f={handleChange}
              ></InputTag>
            </div>
            <div>
              <InputTag
                name="note"
                type="text"
                title="특이사항"
                value={inputData.note}
                mb={'10'}
                mt={'5'}
                f={handleChange}
              ></InputTag>
            </div>
          </ModalInputDiv>
          <ModalContainer>
            <Btn
              title={'혈당 등록'}
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

        <Modal title="혈당 수정">
          <ModalInputDiv>
            <div>
              <InputTag
                type="date"
                name="day"
                plcaeholder="측정일"
                title="측정일"
                mb={'10'}
                mt={'5'}
                max={today}
                value={inputData.day}
                f={handleChange}
              ></InputTag>
            </div>
            <div>
              <InputTag
                type="time"
                name="time"
                plcaeholder="측정시간"
                title="측정시간"
                mb={'10'}
                mt={'5'}
                value={inputData.time}
                f={handleChange}
              ></InputTag>
            </div>
            <div>
              <InputTag
                name="sugar"
                type="number"
                step="0.1"
                title="혈당"
                value={inputData.sugar}
                mb={'10'}
                mt={'5'}
                f={handleChange}
              ></InputTag>
            </div>
            <div>
              <InputTag
                name="note"
                type="text"
                title="특이사항"
                value={inputData.note}
                mb={'10'}
                mt={'5'}
                f={handleChange}
              ></InputTag>
            </div>
          </ModalInputDiv>
          <ModalContainer>
            <Btn
              f={handleEditSubmit}
              mt={'10'}
              mb={'20'}
              mr={'20'}
              c={'#7ca96d'}
              fc={'white'}
              str={'수정'}
              title={'혈당 수정'}
            ></Btn>
            <Btn
              f={handleDelSubmit}
              mt={'10'}
              mb={'20'}
              mr={'-20'}
              c={'lightgray'}
              fc={'black'}
              str={'삭제'}
              title={'혈당 수정'}
            ></Btn>
          </ModalContainer>
        </Modal>
        <YearContainer>
          <div onClick={handlePrev}>&lt;</div>
          {selectedRange === '주' ? (
            <h1>
              {currentYear}-{currentWeek}주
            </h1>
          ) : (
            <h1>
              {currentYear}-{currentMonth}월
            </h1>
          )}
          <div onClick={handleNext}>&gt;</div>
        </YearContainer>

        <DateBtn dataBtn={['주', '월']} onSelect={handleRangeChange} onChange={setSelectChart}></DateBtn>

        <Chart
          chartType={selectChart}
          labels={chartData.labels}
          dataset={chartData.datasets}
          width={100}
          height={450}
          xAxisColor="rgba(54, 162, 235, 1)"
          yAxisColor="rgba(255, 159, 64, 1)"
          yMax={500}
          yMin={0}
          xLabelVisible={true}
        />

        <BtnContainer>
          <div
            onClick={() => {
              reset();

              dispatch(open({ title: '혈당 등록', value: 'block' }));
            }}
          >
            <Btn mt={'50'} mr={'46'} mb={'20'} str={'등록'} c={'#FF7F50'} fc={'white'}></Btn>
          </div>
        </BtnContainer>

        <RadiusTable width="100%" thBgColor="" radius="0px">
          <thead>
            <tr>
              <th>측정일</th>
              <th>측정시간</th>
              <th>혈당 (mg/dL)</th>
              <th colSpan={3}>특이사항</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(
              pagedData.reduce((acc, vo) => {
                if (!acc[vo.day]) acc[vo.day] = [];
                acc[vo.day].push(vo);
                return acc;
              }, {})
            ).map(([day, records]) =>
              records.map((vo, index) => (
                <tr
                  key={vo.no}
                  onClick={() => {
                    setInputData({
                      no: vo.no,
                      memberNo: vo.memberNo,
                      sugar: vo.sugar,
                      enrollDate: vo.enrollDate,
                      note: vo.note,
                      day: vo.day,
                      time: vo.time,
                    });
                    dispatch(open({ title: '혈당 수정', value: 'block' }));
                  }}
                >
                  {index === 0 && (
                    <td
                      rowSpan={records.length}
                      style={{ verticalAlign: 'middle', fontWeight: 'bold', textAlign: 'center' }}
                    >
                      {day}
                    </td>
                  )}
                  <td>{vo.time}</td>
                  <td>{vo.sugar}</td>
                  <td>{vo.note}</td>
                </tr>
              ))
            )}
          </tbody>
        </RadiusTable>
        <LineDiv />
        <Pagination boardType={boardType}></Pagination>
        <LineDiv />
      </ContentLayout>
    </>
  );
};

export default BloodSugar;
