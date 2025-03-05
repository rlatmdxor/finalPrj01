import { BigTextDiv, SmallTextDiv } from './Diet';
import SmallCard from '../../../util/SmallCard';
import { useSelector } from 'react-redux';

const TodayKcal = () => {
  const totalKcal = useSelector((state) => state.diet.totalKcal);

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
