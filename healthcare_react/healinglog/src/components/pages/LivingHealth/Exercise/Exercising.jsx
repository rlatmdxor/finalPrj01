import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Title from '../../../util/Title';
import Navi from '../../../util/Navi';
import Btn from '../../../util/Btn';
import { useDispatch } from 'react-redux';
import { close } from '../../../../redux/modalSlice';
import ContentLayout from '../../../util/ContentLayout';

const Exercising = () => {
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(close('운동시작'));
  });

  const { title, hours, minutes, sets, repeats, rangeValue } = location.state || {};

  // 초기 시간(초) 계산
  const initialSeconds = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60;

  // 남은 시간을 초 단위로 관리하는 상태
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  // 카운트다운 타이머 효과
  useEffect(() => {
    // 시간이 0 이하이면 타이머 작동 중지
    if (timeLeft <= 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        // 1초 이하라면 타이머 종료
        if (prevTime <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // 남은 시간에서 시, 분, 초 계산
  const displayHours = Math.floor(timeLeft / 3600);
  const displayMinutes = Math.floor((timeLeft % 3600) / 60);
  const displaySeconds = timeLeft % 60;

  // 숫자를 2자리 문자열로 변환 (예: 5 -> "05")
  const pad = (num) => num.toString().padStart(2, '0');

  return (
    <>
      <Title>운동</Title>
      <NaviContainer>
        <Navi target="aerobic" tag={'유산소'} selected={minutes || hours ? 'selected' : undefined}></Navi>
        <Navi target="anaerobic" tag={'무산소'} selected={sets || repeats ? 'selected' : undefined}></Navi>
        <Navi target="exhistory" tag={'내역 관리'}></Navi>
        <Navi target="exreport" tag={'리포트'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <BlankSpace />
        <IngContainer>
          <h1 style={{ gridColumn: 'span 2', marginLeft: '50px', marginTop: '40px' }}>{title}</h1>
          <DataCard>
            <DataTitle>운동 시간</DataTitle>
            <DataContent>
              {/* {hours} : {minutes} */}
              {pad(displayHours)} : {pad(displayMinutes)} : {pad(displaySeconds)}
            </DataContent>
          </DataCard>
          <DataCard2>
            <DataTitle>소모칼로리</DataTitle>
            <DataContent> 0 kcal</DataContent>
          </DataCard2>
          <DataCard>
            <DataTitle>세트 수</DataTitle>
            <DataContent>{sets}</DataContent>
          </DataCard>
          <DataCard2>
            <DataTitle>반복 수</DataTitle>
            <DataContent>{repeats}</DataContent>
          </DataCard2>
          <BtnContainer>
            <Btn c={theme.green} str={'종료'} fc={'white'} />
          </BtnContainer>
          <BtnContainer2>
            <Btn
              c={theme.orange}
              str={'취소'}
              fc={'white'}
              f={() => {
                if ((hours || minutes) !== undefined) {
                  navigate('/aerobic');
                } else if (sets !== undefined) {
                  navigate('/anaerobic');
                }
              }}
            />
          </BtnContainer2>
        </IngContainer>

        <BlankSpace />
      </ContentLayout>
    </>
  );
};

const Container = styled.div`
  display: grid;
`;

const BlankSpace = styled.div`
  height: 100px;
`;

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 400px;
  top: 20px;
  left: 40px;
  grid-template-columns: 3fr 3fr 4fr 3fr;
`;

const IngContainer = styled.div`
  display: grid;
  width: 1000px;
  height: 600px;
  background-color: rgb(159, 159, 159, 0.5);
  border-radius: 15px;
  justify-self: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.5fr 1fr 1fr 0.5fr;
`;

const DataCard = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr;
  width: 400px;
  height: 150px;
  border-radius: 20px;
  background-color: white;
  justify-self: center;
  align-self: center;
  margin-left: 40px;
`;

const DataCard2 = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr;
  width: 400px;
  height: 150px;
  border-radius: 20px;
  background-color: white;
  justify-self: center;
  align-self: center;
  margin-right: 40px;
`;

const DataTitle = styled.div`
  display: grid;
  color: #696969;
  font-size: 20px;
  justify-self: center;
  align-self: end;
  padding-top: 20px;
`;

const DataContent = styled.div`
  display: grid;
  color: black;
  font-size: 28px;
  justify-self: center;
  align-self: center;
  margin-bottom: 10px;
`;

const BtnContainer = styled.div`
  display: grid;
  justify-items: end;
  margin-top: 20px;
  margin-right: 30px;
`;
const BtnContainer2 = styled.div`
  display: grid;
  justify-items: start;
  margin-top: 20px;
  margin-left: 30px;
`;

export default Exercising;
