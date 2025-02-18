import React, { useEffect, useState } from 'react';
import { BigCard } from './Diet';
import { IconButton, Tooltip } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import styled from 'styled-components';

const BigCardInnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BigCardInnerTopDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5f5f5f;
`;

const BigCardInnerMidDiv = styled.div`
  font-size: 22px;
  color: #000000;
  margin-bottom: 6px;
  margin-right: 12px;
`;

const MyBmi = ({ day, reRender }) => {
  const token = localStorage.getItem('token');

  const height = 1.62;
  const [bmi, setBmi] = useState(0);
  const [standardWeight, setStandardWeight] = useState(0);
  const [recommendedKcal, setRecommendedKcal] = useState(0);
  const [recommendedWater, setRecommendedWater] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:80/api/weight', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        memberNo: '1',
        enrollDate: day,
      }),
    })
      .then((resp) => resp.text())
      .then((weight) => {
        if (weight) {
          const calculatedBmi = weight / (height * height);
          setBmi(calculatedBmi.toFixed(1));

          const calculatedStandardWeight = height * height * 22;
          setStandardWeight(calculatedStandardWeight.toFixed(1));

          const calculatedKcal = weight * 30;
          setRecommendedKcal(calculatedKcal.toFixed(0));

          const calculatedWater = weight * 30;
          setRecommendedWater(calculatedWater.toFixed(0));
        } else {
          setBmi(0);
          setStandardWeight(0);
          setRecommendedKcal(0);
          setRecommendedWater(0);
        }
      });
  }, [day, reRender]);

  return (
    <>
      <BigCard>
        <BigCardInnerDiv>
          <BigCardInnerTopDiv>
            <div>나의 BMI</div>
            <Tooltip title="BMI = 체중(kg) / (키(m)× 키(m))">
              <IconButton sx={{ paddingTop: '11px' }}>
                <InfoOutlined sx={{ fontSize: '1.1rem' }} />
              </IconButton>
            </Tooltip>
          </BigCardInnerTopDiv>
          <BigCardInnerMidDiv>{bmi} kg/㎡</BigCardInnerMidDiv>
        </BigCardInnerDiv>
        <BigCardInnerDiv>
          <BigCardInnerTopDiv>
            <div>표준체중</div>
            <Tooltip
              title={
                <>
                  남성: 키(m) × 키(m) × 22 <br />
                  여성: 키(m) × 키(m) × 21
                </>
              }
            >
              <IconButton sx={{ paddingTop: '11px' }}>
                <InfoOutlined sx={{ fontSize: '1.1rem' }} />
              </IconButton>
            </Tooltip>
          </BigCardInnerTopDiv>
          <BigCardInnerMidDiv>{standardWeight} kg</BigCardInnerMidDiv>
        </BigCardInnerDiv>
        <BigCardInnerDiv>
          <BigCardInnerTopDiv>
            <div>권장섭취칼로리</div>
            <Tooltip title={<>보통활동 기준 : 체중(kg) x 30kcal</>}>
              <IconButton sx={{ paddingTop: '11px' }}>
                <InfoOutlined sx={{ fontSize: '1.1rem' }} />
              </IconButton>
            </Tooltip>
          </BigCardInnerTopDiv>
          <BigCardInnerMidDiv>{recommendedKcal} Kcal</BigCardInnerMidDiv>
        </BigCardInnerDiv>
        <BigCardInnerDiv>
          <BigCardInnerTopDiv>
            <div>권장섭취물양</div>
            <Tooltip title={<>체중(kg) x 30ml</>}>
              <IconButton sx={{ paddingTop: '11px' }}>
                <InfoOutlined sx={{ fontSize: '1.1rem' }} />
              </IconButton>
            </Tooltip>
          </BigCardInnerTopDiv>
          <BigCardInnerMidDiv>{recommendedWater} ml</BigCardInnerMidDiv>
        </BigCardInnerDiv>
      </BigCard>
    </>
  );
};

export default MyBmi;
