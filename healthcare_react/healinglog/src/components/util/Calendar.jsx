import React, { useState } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  text-align: center;
`;

const Header = styled.div`
  display: flex; //
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
  position: relative; // 하위 요소 배치를 위한 상대 위치
  cursor: ${(props) => (props.empty ? 'default' : 'pointer')}; // 빈 칸은 클릭 불가능, 날짜는 클릭 가능
`;

const Info = styled.div`
  position: absolute; // 부모(Day) 기준으로 배치
  bottom: 5px;
  left: 5px;
  font-size: 12px;
  color: #555;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({}); // 날짜별 이벤트 정보를 저장하는 상태
  const [modalOpen, setModalOpen] = useState(false); // 모달창 열림/닫힘 상태
  const [selectedDate, setSelectedDate] = useState(null); // 클릭한 날짜 저장
  const [inputData, setInputData] = useState({ kcal: '', water: '' });

  const getCalendarDays = () => {
    const year = date.getFullYear(); // 현재 년도
    const month = date.getMonth(); // 현재 월 (0부터 시작)
    const firstDay = new Date(year, month, 1).getDay(); // 해당 월 첫째 날의 요일 (0: 일요일)
    const lastDate = new Date(year, month + 1, 0).getDate(); // 해당 월의 마지막 날짜

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(''); // 첫째 날 전 빈 칸
    }
    for (let i = 1; i <= lastDate; i++) {
      days.push(i);
    }
    return days;
  };

  // 이전 달로 이동
  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1)); // 현재 월에서 -1
  };

  // 다음 달로 이동
  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1)); // 현재 월에서 +1
  };

  // 날짜 클릭 핸들러
  const onDayClick = (day) => {
    if (!day) return; // 빈 칸 클릭 방지
    setSelectedDate(`${date.getFullYear()}-${date.getMonth() + 1}-${day}`); // 클릭한 날짜 저장
    setModalOpen(true); // 모달 열기
  };

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false); // 모달 닫기
    setInputData({ kcal: '', water: '' }); // 입력 데이터 초기화
  };

  // 입력 데이터 저장
  const saveData = () => {
    setEvents((prev) => ({
      ...prev, // 기존 데이터 유지
      [selectedDate]: { ...inputData }, // 새로운 데이터 추가
    }));
    closeModal(); // 모달 닫기
  };

  // 달력 데이터 생성
  const days = getCalendarDays();

  return (
    <CalendarContainer>
      {/* 달력 헤더 */}
      <Header>
        <button onClick={prevMonth}>&lt;</button>
        <span>
          {date.getFullYear()}년 {date.getMonth() + 1}월
        </span>
        <button onClick={nextMonth}>&gt;</button>
      </Header>

      {/* 달력 그리드 */}
      <Grid>
        {/* 요일 헤더 */}
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <DayHeader key={index}>{day}</DayHeader>
        ))}

        {/* 날짜 칸 */}
        {days.map((day, index) => (
          <Day
            key={index}
            empty={!day} // 빈 칸 여부 확인
            isWeekend={index % 7 === 0 ? 'sun' : index % 7 === 6 ? 'sat' : 'work'}
            onClick={() => onDayClick(day)}
          >
            {day}
            {/* 날짜에 저장된 데이터 표시 */}
            {day && events[`${date.getFullYear()}-${date.getMonth() + 1}-${day}`] && (
              <Info>
                <div>🍴 {events[`${date.getFullYear()}-${date.getMonth() + 1}-${day}`].kcal} Kcal</div>
                <div>💧 {events[`${date.getFullYear()}-${date.getMonth() + 1}-${day}`].water} ml</div>
              </Info>
            )}
          </Day>
        ))}
      </Grid>

      {/* 모달창 */}
      {modalOpen && (
        <>
          <Overlay onClick={closeModal} /> {/* 모달 외부 클릭 시 닫기 */}
          <Modal>
            <h3>{selectedDate}</h3>
            <div>
              <label>
                칼로리:{' '}
                <input
                  type="text"
                  value={inputData.kcal}
                  onChange={(e) => setInputData({ ...inputData, kcal: e.target.value })}
                />
              </label>
            </div>
            <div>
              <label>
                물(ml):{' '}
                <input
                  type="text"
                  value={inputData.water}
                  onChange={(e) => setInputData({ ...inputData, water: e.target.value })}
                />
              </label>
            </div>
            <button onClick={saveData}>저장</button>
            <button onClick={closeModal}>취소</button>
          </Modal>
        </>
      )}
    </CalendarContainer>
  );
};

export default Calendar;
