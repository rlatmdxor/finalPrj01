import React from 'react';
import Title from '../../../util/Title';
import styled from 'styled-components';
import Navi from '../../../util/Navi';

const LayoutDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  row-gap: 20px;
`;

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 300px;
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 3fr 3fr;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1000px;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;

  & .content-area {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 25px 0px;
  }

  & .intake-card {
    width: 480px;
    height: 150px;
    border: 1px solid black;
    border-radius: 6px;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #78be78;
  box-sizing: border-box;
  border-radius: 5px;
  color: white;
  font-weight: bold;

  button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: white;
  }
`;

const Diet = () => {
  return (
    <div>
      <Title>식단</Title>
      <LayoutDiv>
        <NaviContainer>
          <Navi target="diet" tag={'식단기록'}></Navi>
          <Navi target="dietcalendar" tag={'캘린더'}></Navi>
          <Navi target="dietreport" tag={'리포트'}></Navi>
        </NaviContainer>
        <ContentDiv>
          <Header>
            <button>◀</button>
            <span>2024-01-15 (수)</span>
            <button>▶</button>
          </Header>
          <div className="content-area">
            <div className="intake-card">aaa</div>
            <div className="intake-card">bbb</div>
          </div>
          <div>
            <div>ddd</div>
            <div>ddd</div>
          </div>
        </ContentDiv>
      </LayoutDiv>
    </div>
  );
};

export default Diet;
