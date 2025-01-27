import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBookmark } from '../../../../../redux/aerobicSlice';
import styled, { useTheme } from 'styled-components';
import Btn from '../../../../util/Btn';
import { useNavigate } from 'react-router-dom';

const ArmExList = ({ f }) => {
  const dispatch = useDispatch();
  const exVoList = useSelector((state) => state.anAerobic);
  const theme = useTheme();
  const navigate = useNavigate();

  const armData = exVoList.filter((item) => item.part === 'arm' && item.bookmark === 'n');

  const handleToggleBookmark = (no) => {
    dispatch(setBookmark({ no }));
  };

  return (
    <div>
      <ExList>
        <h2>팔</h2>
        {armData.map((vo) => (
          <Line key={vo.no}>
            <Star>
              <StarIcon src="/img/EmptyStar.webp" onClick={() => handleToggleBookmark(vo.no)} />
            </Star>
            <Content>
              <div onClick={() => f(vo.name)}>{vo.name}</div>
              <div style={{ marginRight: '20px' }}>
                <Btn
                  str={'상세조회'}
                  c={theme.gray}
                  fs={'14'}
                  f={() => {
                    navigate(`/anaerobic/${vo.name}`);
                  }}
                />
              </div>
            </Content>
          </Line>
        ))}
      </ExList>
    </div>
  );
};

const Line = styled.div`
  display: grid;
  grid-template-columns: 75px 250px;
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
  grid-template-columns: 10fr 1fr;
  justify-items: center;
  align-items: center;
  background-color: rgba(169, 205, 147, 0.2);
  width: 100%;
  font-size: 18px;
  font-weight: bold;
`;

const StarIcon = styled.img`
  width: 40px;
  height: 40px;
  background-color: unset;
  cursor: pointer;
`;

const ExList = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-rows: 50px;
  justify-self: center;
  align-self: center;
  margin-bottom: 100px;
`;

export default ArmExList;
