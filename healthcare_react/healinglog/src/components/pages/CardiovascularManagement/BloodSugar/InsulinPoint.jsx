import React from 'react';
import Title from '../../../util/Title';
import Modal from '../../../util/Modal'; // 모달 컴포넌트
import Input from '../../../util/Input'; // 입력 컴포넌트
import Chart from '../../../util/Chart';
import Table from '../../../util/Table';
import ContentLayout from '../../../util/ContentLayout';
import Navi from '../../../util/Navi';
import styled from 'styled-components';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 300px; // 항목수에 비례해서 주시면 됩니다.
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 6fr; // 글자수만큼 fr 주면 됩니다. ex) 유산소 3글자니까 3fr
`;
const ImageLayoutDiv = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ImageDiv = styled.div`
  width: 440px;
  height: 500px;
  background-image: url('/img/realBody.png');
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  background-size: contain; /* 요소에 맞게 크기 조정 */
  background-position: center; /* 중앙 정렬 */
  display: grid;
  grid-template-rows: 316px 1fr;
`;
const Div100 = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const Div200 = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const Div210 = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
`;
const RightLegDiv = styled.div`
  width: 66px;
  height: 120px;
  margin-bottom: 15px;
  margin-right: 10px;
  background-color: purple;
`;
const Div220 = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
`;
const LeftLegDiv = styled.div`
  width: 66px;
  height: 120px;
  margin-bottom: 15px;
  margin-right: 10px;
  background-color: purple;
`;
const Div110 = styled.div`
  display: grid;
  grid-template-columns: 88px 1fr 5px;
`;
const Div120 = styled.div`
  display: grid;
  grid-template-columns: 4px 1fr 95px;
`;
const Div111 = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;
const Div123 = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;
const RightArmDiv = styled.div`
  background-color: red;
  height: 120px;
  width: 62px;
  margin-top: 15px;
`;
const LeftArmDiv = styled.div`
  background-color: red;
  height: 120px;
  width: 62px;
  margin-top: 15px;
`;
const Div112 = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;
`;
const Div122 = styled.div`
  display: flex;
  align-items: end;
  justify-content: start;
`;
const RightStomDiv = styled.div`
  width: 120px;
  height: 120px;
  background-color: gray;
`;
const LeftStomDiv = styled.div`
  width: 120px;
  height: 120px;
  background-color: gray;
`;

const InsulinPoint = () => {
  const rightArmNumList = [1, 2, 3, 4, 5, 6, 7, 8];
  const leftArmNumList = [1, 2, 3, 4, 5, 6, 7, 8];
  const rightLegNumList = [1, 2, 3, 4, 5, 6, 7, 8];
  const leftLegNumList = [1, 2, 3, 4, 5, 6, 7, 8];
  const rightStomNumList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const leftStomNumList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  return (
    <>
      <Title>혈당</Title>
      <NaviContainer>
        <Navi target="bloodSugar" tag={'혈당 기록'}></Navi>
        <Navi target="insulin" tag={'인슐린 기록지'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <ImageLayoutDiv>
          <ImageDiv>
            <Div100>
              <Div110>
                <Div111>
                  <RightArmDiv></RightArmDiv>
                </Div111>
                <Div112>
                  <RightStomDiv></RightStomDiv>
                </Div112>
                <div></div>
              </Div110>
              <Div120>
                <div></div>
                <Div122>
                  <LeftStomDiv></LeftStomDiv>
                </Div122>
                <Div123>
                  <LeftArmDiv></LeftArmDiv>
                </Div123>
              </Div120>
            </Div100>
            <Div200>
              <Div210>
                <RightLegDiv></RightLegDiv>
              </Div210>
              <Div220>
                <LeftLegDiv></LeftLegDiv>
              </Div220>
            </Div200>
          </ImageDiv>
        </ImageLayoutDiv>
      </ContentLayout>
    </>
  );
};

export default InsulinPoint;
