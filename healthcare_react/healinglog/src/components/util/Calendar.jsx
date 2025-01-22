import React, { useState } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  width: 800px;
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
`;

const Day = styled.div`
  padding: 10px;
  height: 100px;
  border: 1px solid #ddd;
  text-align: start;
  background-color: ${(props) => (props.empty ? '#f9f9f9' : 'white')};
  color: ${({ isWeekend }) => (isWeekend === 'sun' ? 'red' : isWeekend === 'sat' ? 'blue' : 'black')};
  position: relative;
  cursor: ${(props) => (props.empty ? 'default' : 'pointer')};
`;

const Calendar = ({ vo, onDayClick, getEventInfoTemplate }) => {
  const [date, setDate] = useState(new Date());

  const getCalendarDays = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push('');
    }
    for (let i = 1; i <= lastDate; i++) {
      days.push(i);
    }
    return days;
  };

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const days = getCalendarDays();

  return (
    <CalendarContainer>
      <Header>
        <button onClick={prevMonth}>&lt;</button>
        <span>
          {date.getFullYear()}년 {date.getMonth() + 1}월
        </span>
        <button onClick={nextMonth}>&gt;</button>
      </Header>

      <Grid>
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <DayHeader key={index}>{day}</DayHeader>
        ))}

        {days.map((day, index) => {
          const fullDate = `${date.getFullYear()}-${date.getMonth() + 1}-${day}`;
          const event = vo?.find((e) => e.date === fullDate);

          return (
            <Day
              key={index}
              empty={!day}
              isWeekend={index % 7 === 0 ? 'sun' : index % 7 === 6 ? 'sat' : 'work'}
              onClick={() => day && onDayClick(fullDate)}
            >
              {day}
              {event && getEventInfoTemplate(event)}
            </Day>
          );
        })}
      </Grid>
    </CalendarContainer>
  );
};

export default Calendar;
