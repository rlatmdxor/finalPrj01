import React, { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import styled from 'styled-components';

const Postcode = () => {
  const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

  const [zoneAddress, setZoneAddress] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const handleComplete = (data) => {
    let detailAddress = '';
    if (data.bname !== '') {
      detailAddress += data.bname;
    }
    if (data.buildingName !== '') {
      detailAddress += detailAddress !== '' ? ', ' + data.buildingName : data.buildingName;
    }

    setZoneAddress(data.zonecode);
    setRoadAddress(data.roadAddress);
    setDetailAddress(detailAddress);
  };

  const handleClick = (e) => {
    e.preventDefault();
    open({ onComplete: handleComplete });
  };

  return (
    <>
      <LayoutDiv>
        <ZoneInput value={zoneAddress} placeholder="우편번호" />
        <DaumBtn onClick={handleClick}>우편번호 찾기</DaumBtn>

        <AdressInput value={roadAddress} placeholder="도로명주소" />

        <AdressInput2 value={detailAddress} placeholder="상세주소" />
      </LayoutDiv>
    </>
  );
};

export default Postcode;

const LayoutDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 175px;
  grid-template-rows: 1fr 1fr 1fr;
  margin-right: 50px;
  /* row-gap: 10px; */
`;

const DaumBtn = styled.button`
  display: grid;
  justify-self: start;
  align-self: center;
  box-sizing: border-box;
  width: 110px;
  height: 30px;

  border: 1px solid #ccc;
  border-color: #dbdbdb #d2d2d2 #b2b2b2 #d2d2d3;
  cursor: pointer;
  color: #464646;
  border-radius: 0.2em;
  align-items: center;
  font-size: 12px;
  margin-bottom: 10px;
`;

const ZoneInput = styled.input`
  display: grid;
  box-sizing: border-box;
  width: 250px;
  height: 40px;
  border: 1px solid gray;
  border-radius: 10px;
  padding-left: 20px;
`;

const AdressInput = styled.input`
  display: grid;
  box-sizing: border-box;
  width: 450px;
  height: 40px;
  border: 1px solid gray;
  border-radius: 10px;
  grid-column: span 2;
  padding-left: 20px;
`;

const AdressInput2 = styled.input`
  display: grid;
  box-sizing: border-box;
  width: 450px;
  height: 40px;
  border: 1px solid gray;
  border-radius: 10px;
  grid-column: span 2;
  margin-bottom: 10px;
  padding-left: 20px;
`;
