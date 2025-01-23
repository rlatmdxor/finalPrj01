import React from 'react';
<<<<<<< Updated upstream
import styled from 'styled-components';

const FavoriteList = () => {
  return (
    <div>
      <Bookmark>
        <h2>즐겨찾기</h2>
        <Line>
          <Star>별</Star>
          <Content>달리기</Content>
        </Line>
        <Line>
          <Star>별</Star>
          <Content>걷기</Content>
        </Line>
        <Line>
          <Star>별</Star>
          <Content>자전거</Content>
        </Line>
      </Bookmark>
=======
import { useDispatch, useSelector } from 'react-redux';
import { setBookmark } from '../../../../redux/aerobicSlice';
import styled, { useTheme } from 'styled-components';
import Btn from '../../../util/Btn';
import { useNavigate } from 'react-router-dom';

const FavoriteList = () => {
  const dispatch = useDispatch();
  const exVoList = useSelector((state) => state.aerobic);
  const theme = useTheme();
  const navigate = useNavigate();

  const markData = exVoList.filter((item) => item.bookmark === 'y');
  const unmarkData = exVoList.filter((item) => item.bookmark === 'n');

  const handleToggleBookmark = (no) => {
    dispatch(setBookmark({ no }));
  };

  return (
    <div>
      {markData.length > 0 && (
        <Bookmark>
          <h2>즐겨찾기</h2>
          {markData.map((vo) => (
            <Line key={vo.no}>
              <Star>
                <StarIcon src="/img/Star.webp" onClick={() => handleToggleBookmark(vo.no)} />
              </Star>
              <Content>
                {vo.name}
                <div style={{ marginRight: '20px' }}>
                  <Btn
                    str={'상세조회'}
                    c={theme.gray}
                    fs={'14'}
                    f={() => {
                      navigate(`/aerobic/${vo.name}`);
                    }}
                  />
                </div>
              </Content>
            </Line>
          ))}
        </Bookmark>
      )}
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    </div>
  );
};

const Bookmark = styled.div`
  display: grid;
  grid-template-rows: 1fr 50px 50px 50px;
  justify-self: center;
  align-self: center;
`;

const Line = styled.div`
  display: grid;
  grid-template-columns: 75px 700px;
  justify-items: center;
`;

const Star = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: rgba(169, 205, 147, 0.4);
  width: 100%;
`;

const Content = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: rgba(169, 205, 147, 0.2);
  width: 100%;
  font-size: 18px;
  font-weight: bold;
`;

<<<<<<< Updated upstream
=======
const StarIcon = styled.img`
  width: 40px;
  height: 40px;
  background-color: unset;
  cursor: pointer;
`;

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
export default FavoriteList;
