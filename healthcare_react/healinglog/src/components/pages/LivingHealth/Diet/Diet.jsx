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
  setMemberNo,
} from '../../../../redux/dietSlice';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { getMealData, getMemberHeight, getTodayWater, getTodayWeight } from '../../../services/dietService';

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
  margin-top: 12px;
  padding: 0px 14px;
  font-size: 16px;
  font-weight: 500;
  color: #3b3b3b;
`;

export const BigTextDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 19px;
  font-size: 38px;
`;

export const ModalContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const Diet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const memberNo = useSelector((state) => state.diet.memberNo);
  const day = useSelector((state) => state.diet.day);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      alert('로그인 정보가 없습니다.');
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        dispatch(setMemberNo(decodedToken.no));
        setIsLoading(false);
      } catch {
        navigate('/login');
      }
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (memberNo > 0) {
      const fetchMemberHeight = async () => {
        try {
          const fetchData = await getMemberHeight(token);
          if (fetchData) {
            dispatch(setHeight(fetchData.height));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchMemberHeight();
    }
  }, [memberNo, dispatch]);

  useEffect(() => {
    if (memberNo > 0) {
      const fetchTotalKcal = async () => {
        try {
          const fetchData = await getMealData(memberNo, day, token);
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
    }
  }, [day, memberNo, dispatch]);

  useEffect(() => {
    if (memberNo > 0) {
      const fetchWaterAmount = async () => {
        try {
          const fetchData = await getTodayWater(memberNo, day, token);
          dispatch(setWaterAmount(fetchData.amount || 0));
        } catch {
          dispatch(setWaterAmount(0));
        }
      };
      fetchWaterAmount();
    }
  }, [day, memberNo, dispatch]);

  useEffect(() => {
    if (memberNo > 0) {
      const fetchWeightAmount = async () => {
        try {
          const fetchData = await getTodayWeight(memberNo, day, token);
          dispatch(setWeightAmount(fetchData.amount || 0));
        } catch {
          dispatch(setWeightAmount(0));
        }
      };
      fetchWeightAmount();
    }
  }, [day, memberNo, dispatch]);

  const handleChangeDay = (e) => {
    dispatch(setDay(e.target.value));
  };

  const handlePrevDay = () => {
    dispatch(updateDay(-1));
  };

  const handleNextDay = () => {
    dispatch(updateDay(+1));
  };

  if (isLoading) {
    return;
  }

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
