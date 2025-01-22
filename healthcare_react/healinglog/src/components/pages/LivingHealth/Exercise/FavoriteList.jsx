import React from 'react';
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

export default FavoriteList;
