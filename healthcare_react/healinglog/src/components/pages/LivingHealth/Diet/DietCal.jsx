import { BASE_URL } from '../../../services/config';
import React, { useEffect, useState } from 'react';
import Title from '../../../util/Title';
import styled from 'styled-components';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';
import { useNavigate } from 'react-router-dom';
import { getRoleFromToken, isTokenExpired } from '../../../util/JwtUtil';
import DietCalendar from '../../../util/DietCalendar';

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
`;

const DietCal = () => {
  const navi = useNavigate();
  const Swal = require('sweetalert2');

  const token = localStorage.getItem('token');
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

  const [events, setEvents] = useState({});

  const formatDate = (date) => {
    const [year, month, day] = date.slice(0, 10).split('-');
    return `${parseInt(year)}-${parseInt(month)}-${parseInt(day)}`;
  };

  const formatData = (data) => {
    const events = {};
    data.kcal.forEach((item) => {
      const day = formatDate(item.dietDay);

      if (!events[day]) {
        events[day] = [];
      }
      events[day].push(`칼로리 ${item.totalKcal} Kcal`);
    });

    data.water.forEach((item) => {
      const day = formatDate(item.enrollDate);

      if (!events[day]) {
        events[day] = [];
      }
      events[day].push(`물섭취 ${item.amount} ml`);
    });

    data.weight.forEach((item) => {
      const day = formatDate(item.enrollDate);

      if (!events[day]) {
        events[day] = [];
      }
      events[day].push(`체중 ${item.amount} kg`);
    });

    return events;
  };

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    fetch(`${BASE_URL}/api/diet/cal`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const formattedData = formatData(data);
        setEvents(formattedData);
      });
  }, [isAuthorized, token]);

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
          <DietCalendar modalTitle="캘린더 모달" vo={[]} events={events} width={970} height={100} />
        </CalAreaDiv>
      </ContentLayout>
    </>
  );
};

export default DietCal;
