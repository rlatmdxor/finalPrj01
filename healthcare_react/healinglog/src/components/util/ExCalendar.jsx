import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { openCalModal } from '../../redux/modalSlice';

const ExCalendar = ({ modalTitle, vo, events, width, height, setSelectedDate }) => {
  const [date, setDate] = useState(new Date()); // 현재 날짜 상태
  const dispatch = useDispatch();

  // 날짜 클릭 시 모달을 열도록 처리
  const onDayClick = (fullDate) => {
    setSelectedDate(fullDate);
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

  // 분 -> 시간/분
  const formatTime = (timeString) => {
    if (timeString.includes('분')) {
      const minutesNumber = parseInt(timeString.replace(/[^\d]/g, ''), 10);
      const hours = Math.floor(minutesNumber / 60);
      const minutes = minutesNumber % 60;
      if (hours > 0) {
        return `${hours}시간 ${minutes}분`;
      }
      return `${minutes}분`;
    }
    // "분"이 없는 경우 원래 문자열 반환(무산소)
    return timeString;
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
          const fullDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
            day
          ).padStart(2, '0')}`;
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

              {eventData && Array.isArray(eventData) ? (
                <>
                  {eventData.slice(0, 1).map((item, idx) => (
                    <>
                      <div key={idx} style={{ display: 'none' }}>
                        {item[0]}
                      </div>
                      <ExDiv key={idx}>{item[2]}</ExDiv>
                      <TimeDiv key={idx}>{formatTime(item[1])}</TimeDiv>
                    </>
                  ))}
                  {eventData.length > 1 && (
                    <MoreDiv>+{eventData.length - 1}</MoreDiv> // 추가 데이터 개수 표시
                  )}
                </>
              ) : null}
            </Day>
          );
        })}
      </Grid>
    </CalendarContainer>
  );
};

export default ExCalendar;

const CalendarContainer = styled.div`
  width: ${({ width }) => (width ? width : 800)}px;
  margin: 0 auto;
  font-family: 'goorm-sans-bold';
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

const TimeDiv = styled.div`
  background-color: #a2d4a2;
  border-radius: 5px;
  margin-top: 5px;
  width: fit-content;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
  color: darkslategray;
  font-size: 12px;
`;

const ExDiv = styled.div`
  background-color: #a2d4a2;
  border-radius: 5px;
  margin-top: 5px;
  width: fit-content;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
  color: darkslategray;
  font-weight: bold;
  font-size: 12px;
`;

const MoreDiv = styled.div`
  background-color: #ffcccb;
  border-radius: 5px;
  margin-top: 5px;
  width: fit-content;
  padding: 2px 6px;
  color: darkred;
  font-weight: bold;
  font-size: 12px;
  display: inline-block;
`;
