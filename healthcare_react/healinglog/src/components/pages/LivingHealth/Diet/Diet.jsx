import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Title from '../../../util/Title';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';
import TodayKcal from './TodayKcal';
import TodayWater from './TodayWater';
import TodayWeight from './TodayWeight';
import MyBmi from './MyBmi';
import TodayMeal from './TodayMeal';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDay,
  updateDay,
  setWaterAmount,
  setWeightAmount,
  setTotalKcal,
  setHeight,
  setGender,
} from '../../../../redux/dietSlice';
import { useNavigate } from 'react-router-dom';
import { getMealData, getMemberInfo, getTodayWater, getTodayWeight } from '../../../services/dietService';
import { getRoleFromToken, isTokenExpired } from '../../../util/JwtUtil';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 300px;
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 3fr 3fr;
`;

const DayDiv = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #78be78;
  box-sizing: border-box;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  margin-top: 60px;
  margin-bottom: 30px;

  & input {
    background: none;
    border: none;
    font-family: Arial, sans-serif;
    font-size: 19px;
    cursor: pointer;
    color: white;
  }

  & button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: white;
  }
`;

export const ContentAreaDiv = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 25px;
  margin-bottom: 25px;
`;

export const SmallTextDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 25px;
  margin-top: 13px;
  padding: 0px 15px;
  font-size: 16px;
  font-weight: 500;
  color: #3b3b3b;
`;

export const BigTextDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 24px;
  font-size: 38px;
`;

export const ModalContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const Diet = () => {
  const dispatch = useDispatch();
  const navi = useNavigate();
  const Swal = require('sweetalert2');

  const token = localStorage.getItem('token');
  const [isAuthorized, setIsAuthorized] = useState(false); // 로그인 여부 체크

  const day = useSelector((state) => state.diet.day);

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

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    const fetchMemberInfo = async () => {
      try {
        const fetchData = await getMemberInfo(token);
        if (fetchData) {
          dispatch(setHeight(fetchData.height));
          dispatch(setGender(fetchData.gender));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMemberInfo();
  }, [isAuthorized, token, dispatch]);

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    const fetchTotalKcal = async () => {
      try {
        const fetchData = await getMealData(day, token);
        let total = 0;
        if (fetchData) {
          for (let i = 0; i < fetchData.length; i++) {
            total += Number(fetchData[i].sumKcal);
          }
        }
        dispatch(setTotalKcal(total || 0));
      } catch {
        dispatch(setTotalKcal(0));
      }
    };
    fetchTotalKcal();
  }, [isAuthorized, token, day, dispatch]);

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    const fetchWaterAmount = async () => {
      try {
        const fetchData = await getTodayWater(day, token);
        dispatch(setWaterAmount(fetchData.amount));
      } catch {
        dispatch(setWaterAmount(0));
      }
    };
    fetchWaterAmount();
  }, [isAuthorized, token, day, dispatch]);

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    const fetchWeightAmount = async () => {
      try {
        const fetchData = await getTodayWeight(day, token);
        dispatch(setWeightAmount(fetchData.amount));
      } catch {
        dispatch(setWeightAmount(0));
      }
    };
    fetchWeightAmount();
  }, [isAuthorized, token, day, dispatch]);

  const handleChangeDay = (e) => {
    dispatch(setDay(e.target.value));
  };

  const handlePrevDay = () => {
    dispatch(updateDay(-1));
  };

  const handleNextDay = () => {
    dispatch(updateDay(+1));
  };

  return (
    <>
      <Title>식단</Title>
      <NaviContainer>
        <Navi target="diet" tag={'식단기록'}></Navi>
        <Navi target="diet/calendar" tag={'캘린더'}></Navi>
        <Navi target="diet/report" tag={'리포트'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <DayDiv>
          <button onClick={handlePrevDay}>◀</button>
          <input type="date" name="day" value={day} onChange={handleChangeDay} />
          <button onClick={handleNextDay}>▶</button>
        </DayDiv>
        <ContentAreaDiv>
          <TodayKcal />
          <TodayWater token={token} />
          <TodayWeight token={token} />
        </ContentAreaDiv>
        <ContentAreaDiv>
          <MyBmi />
        </ContentAreaDiv>
        <TodayMeal token={token} />
        <br />
        <br />
        <br />
      </ContentLayout>
    </>
  );
};

export default Diet;
