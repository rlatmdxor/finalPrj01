import React, { useEffect, useState } from 'react';
import { BigTextDiv, SmallCard, SmallTextDiv } from './Diet';

const TodayKcal = ({ day, reRender }) => {
  const token = localStorage.getItem('token');
  const [totalKcal, setTotalKcal] = useState(0); // 총 섭취 칼로리

  useEffect(() => {
    fetch('http://127.0.0.1:80/api/diet', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        memberNo: '1',
        dietDay: day,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data) {
          let total = 0;
          for (let i = 0; i < data.length; i++) {
            total += Number(data[i].sumKcal);
          }
          setTotalKcal(total);
        } else {
          setTotalKcal(0);
        }
      });
  }, [day, reRender]);

  return (
    <>
      <SmallCard>
        <SmallTextDiv>오늘 섭취 칼로리</SmallTextDiv>
        <BigTextDiv>{totalKcal} Kcal</BigTextDiv>
      </SmallCard>
    </>
  );
};

export default TodayKcal;
