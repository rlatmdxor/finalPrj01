import React, { useEffect, useState } from 'react';
import Title from '../../../util/Title';
import styled from 'styled-components';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';
import Calendar from '../../../util/Calendar';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../../../redux/modalSlice';
import { useNavigate } from 'react-router-dom';
import { setDay } from '../../../../redux/dietSlice';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 300px;
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 3fr 3fr;
`;

const CalAreaDiv = styled.div`
  margin-top: 70px;
  margin-bottom: 75px;

  & div div div div:not(:first-child) {
    margin-top: 4px;
    font-size: 14px;
  }
`;

const DietCal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  const [events, setEvents] = useState({});

  const formatData = (data) => {
    return Object.fromEntries(
      data.map((diet) => {
        const [year, month, day] = diet.dietDay.split(' ')[0].split('-');
        const dietDay = `${year}-${parseInt(month)}-${parseInt(day)}`;
        const eventList = [];

        eventList.push(`[칼로리] ${diet.sumKcal} Kcal`);
        eventList.push(`[물섭취] ${diet.waterAmount} ml`);
        eventList.push(`[체중] ${diet.weightAmount} kg`);

        return [dietDay, eventList];
      })
    );
  };

  useEffect(() => {
    fetch('http://127.0.0.1:80/api/dietcal', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        memberNo: '1',
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        const formattedData = formatData(data);
        setEvents(formattedData);
      });
  }, []);

  const modalState = useSelector((state) => state.modal.modals['캘린더 모달']);
  const selectedDate = useSelector((state) => state.modal.selectedDate);

  useEffect(() => {
    if (modalState === 'block' && selectedDate) {
      dispatch(close('캘린더 모달'));
      const [year, month, day] = selectedDate.split('-');
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

      dispatch(setDay(formattedDate));
      navigate('/diet');
    }
  }, [modalState, selectedDate]);

  return (
    <>
      <Title>식단</Title>
      <NaviContainer>
        <Navi target="diet" tag={'식단기록'}></Navi>
        <Navi target="diet/calendar" tag={'캘린더'}></Navi>
        <Navi target="diet/report" tag={'리포트'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <CalAreaDiv>
          <Calendar modalTitle="캘린더 모달" vo={[]} events={events} width={1000} height={100} />
        </CalAreaDiv>
      </ContentLayout>
    </>
  );
};

export default DietCal;
