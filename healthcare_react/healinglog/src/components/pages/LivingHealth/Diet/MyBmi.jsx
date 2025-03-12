import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import styled from 'styled-components';
import BigCard from '../../../util/BigCard';
import { useSelector } from 'react-redux';

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
  margin-bottom: 3px;
`;

const BigCardTitleDiv = styled.div`
  margin-top: 2px;
`;

const BigCardInnerMidDiv = styled.div`
  font-size: 22px;
  color: #000000;
  margin-bottom: 6px;
  margin-right: 12px;
`;

const SmallTextDiv = styled.div`
  font-size: 14px;
  color: #2c2c2c;
  margin-top: 2px;
`;

const MyBmi = () => {
  const [bmi, setBmi] = useState(0);
  const [bmiState, setBmiState] = useState('');
  const [standardWeight, setStandardWeight] = useState(0);
  const [recommendedKcal, setRecommendedKcal] = useState(0);
  const [recommendedWater, setRecommendedWater] = useState(0);

  const weight = useSelector((state) => state.diet.weight);
  const memberHeight = useSelector((state) => state.diet.height);
  const height = memberHeight * 0.01;
  const gender = useSelector((state) => state.diet.gender);

  useEffect(() => {
    const calculatedBmi = weight / (height * height);
    setBmi(Math.round(calculatedBmi * 10) / 10);

    let state;
    if (calculatedBmi < 18.5) {
      state = '저체중';
    } else if (calculatedBmi < 23) {
      state = '정상';
    } else if (calculatedBmi < 25) {
      state = '과체중';
    } else {
      state = '비만';
    }
    setBmiState(state);

    let calculatedStandardWeight;
    if (gender === 'M') {
      calculatedStandardWeight = height * height * 22;
    } else if (gender === 'F') {
      calculatedStandardWeight = height * height * 21;
    }
    setStandardWeight(Math.round(calculatedStandardWeight * 10) / 10);

    const calculatedKcal = weight * 32;
    setRecommendedKcal(Math.round(calculatedKcal));

    const calculatedWater = weight * 30;
    setRecommendedWater(Math.round(calculatedWater));
  }, [weight, height]);

  return (
    <>
      <BigCard>
        <BigCardInnerDiv>
          <BigCardInnerTopDiv>
            <BigCardTitleDiv>나의 BMI</BigCardTitleDiv>
            <Tooltip
              title={
                <>
                  BMI = 체중(kg) / (키(m)× 키(m)) <br />
                  - 저체중 : 18.5 미만 <br />
                  - 정상 : 18.5이상 23미만 <br />
                  - 과체중 : 23이상 25미만 <br />- 비만 : 25 이상
                </>
              }
            >
              <IconButton sx={{ paddingTop: '11px' }}>
                <InfoOutlined sx={{ fontSize: '1.1rem' }} />
              </IconButton>
            </Tooltip>
          </BigCardInnerTopDiv>
          {!height || height <= 0 ? (
            <>
              <SmallTextDiv>마이페이지에서</SmallTextDiv>
              <SmallTextDiv>키를 설정해주세요.</SmallTextDiv>
            </>
          ) : (
            <BigCardInnerMidDiv>
              {bmi} kg/㎡ ({bmiState})
            </BigCardInnerMidDiv>
          )}
        </BigCardInnerDiv>
        <BigCardInnerDiv>
          <BigCardInnerTopDiv>
            <BigCardTitleDiv>표준체중</BigCardTitleDiv>
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
          {!height || height <= 0 ? (
            <>
              <SmallTextDiv>마이페이지에서</SmallTextDiv>
              <SmallTextDiv>키를 설정해주세요.</SmallTextDiv>
            </>
          ) : (
            <BigCardInnerMidDiv>{standardWeight} kg</BigCardInnerMidDiv>
          )}
        </BigCardInnerDiv>
        <BigCardInnerDiv>
          <BigCardInnerTopDiv>
            <BigCardTitleDiv>권장섭취칼로리</BigCardTitleDiv>
            <Tooltip title={<>보통활동 기준 : 체중(kg) x 32Kcal</>}>
              <IconButton sx={{ paddingTop: '11px' }}>
                <InfoOutlined sx={{ fontSize: '1.1rem' }} />
              </IconButton>
            </Tooltip>
          </BigCardInnerTopDiv>
          <BigCardInnerMidDiv>{recommendedKcal} Kcal</BigCardInnerMidDiv>
        </BigCardInnerDiv>
        <BigCardInnerDiv>
          <BigCardInnerTopDiv>
            <BigCardTitleDiv>권장섭취물양</BigCardTitleDiv>
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
