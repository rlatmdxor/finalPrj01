import React from "react";
import { BigTextDiv, SmallCard, SmallTextDiv } from "./Diet";

const TodayKcal = () => {
  return (
    <>
      <SmallCard>
        <SmallTextDiv>오늘 섭취 칼로리</SmallTextDiv>
        <BigTextDiv>2500 Kcal</BigTextDiv>
      </SmallCard>
    </>
  );
};

export default TodayKcal;
