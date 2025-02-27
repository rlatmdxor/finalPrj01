import { useEffect, useState } from 'react';

const getWeekRange = (date) => {
  const dayOfWeek = date.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
  const monday = new Date(date);
  monday.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // 이번주 월요일

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6); // 이번주 일요일

  return {
    monday: monday.toISOString().split('T')[0],
    sunday: sunday.toISOString().split('T')[0],
  };
};

const useWeekRange = () => {
  const initialDate = new Date();
  const initialRange = getWeekRange(initialDate);

  const [currentMonday, setCurrentMonday] = useState(initialRange.monday);
  const [currentSunday, setCurrentSunday] = useState(initialRange.sunday);

  const handlePrevWeek = () => {
    let newDate = new Date(currentMonday);
    newDate.setDate(newDate.getDate() - 7);
    const newRange = getWeekRange(newDate);

    setCurrentMonday(newRange.monday);
    setCurrentSunday(newRange.sunday);
  };

  const handleNextWeek = () => {
    let newDate = new Date(currentMonday);
    newDate.setDate(newDate.getDate() + 7);
    const newRange = getWeekRange(newDate);

    setCurrentMonday(newRange.monday);
    setCurrentSunday(newRange.sunday);
  };

  return { currentMonday, currentSunday, handlePrevWeek, handleNextWeek };
};

export default useWeekRange;
