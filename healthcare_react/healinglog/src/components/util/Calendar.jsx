import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { openCalModal } from '../../redux/modalSlice';

const CalendarContainer = styled.div`
  width: ${({ width }) => (width ? width : 800)}px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #a2d4a2;
  border-radius: 5px 5px 0 0;
  color: white;
  font-weight: bold;

  button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: white;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid #ddd;
`;

const DayHeader = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f0f0f0;
  font-weight: bold;
  color: ${(props) => (props.day === '일' ? 'red' : props.day === '토' ? 'blue' : 'black')};
`;

const Day = styled.div`
  padding: 10px;
  height: ${({ height }) => (height ? height : 100)}px;
  border: 1px solid #ddd;
  text-align: start;
  background-color: ${(props) => (props.empty ? '#f9f9f9' : 'white')};
  color: ${({ isWeekend }) => (isWeekend === 'sun' ? 'red' : isWeekend === 'sat' ? 'blue' : 'black')};
  position: relative;
  cursor: ${(props) => (props.empty ? 'default' : 'pointer')};
  &:hover {
    background-color: #a2d4a2;
  }
`;

const Calendar = ({ modalTitle, vo, events, width, height }) => {
  const [date, setDate] = useState(new Date()); // 현재 날짜 상태
  const dispatch = useDispatch();

  // 날짜 클릭 시 모달을 열도록 처리
  const onDayClick = (fullDate) => {
    dispatch(openCalModal({ title: modalTitle, value: 'block', date: fullDate }));
  };

  // 캘린더의 날짜를 계산하는 함수
  const getCalendarDays = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 첫 번째 날의 요일
    const lastDate = new Date(year, month + 1, 0).getDate(); // 월의 마지막 날짜

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(''); // 비어있는 날짜를 추가
    }
    for (let i = 1; i <= lastDate; i++) {
      days.push(i); // 실제 날짜를 추가
    }
    return days;
  };

  // 이전 달로 이동
  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  // 다음 달로 이동
  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const days = getCalendarDays();

  return (
    <CalendarContainer width={width}>
      {/* 헤더 */}
      <Header>
        <button onClick={prevMonth}>&lt;</button>
        <span>
          {date.getFullYear()}년 {date.getMonth() + 1}월
        </span>
        <button onClick={nextMonth}>&gt;</button>
      </Header>

      {/* 요일 헤더 */}
      <Grid>
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <DayHeader key={index} day={day}>
            {day}
          </DayHeader>
        ))}

        {/* 날짜 그리드 */}
        {days.map((day, index) => {
          const fullDate = `${date.getFullYear()}-${date.getMonth() + 1}-${day}`;
          const eventData = events && events[fullDate]; // 날짜에 해당하는 데이터 가져오기
          return (
            <Day
              key={index}
              empty={!day}
              isWeekend={index % 7 === 0 ? 'sun' : index % 7 === 6 ? 'sat' : 'work'}
              onClick={() => day && onDayClick(fullDate)} // 날짜 클릭 시 모달 열기
              height={height}
            >
              <div>{day}</div>

              {eventData && Array.isArray(eventData) ? ( // 날짜에 데이터가 배열이면 처리
                eventData.map((item, idx) => (
                  <div key={idx}>{item}</div> // 각 데이터를 표시
                ))
              ) : (
                <div>{eventData}</div> // 단일 데이터일 경우
              )}
            </Day>
          );
        })}
      </Grid>
    </CalendarContainer>
  );
};

export default Calendar;
