import React, { useEffect, useState } from 'react';
import Title from '../../../util/Title';
import styled from 'styled-components';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';
import MedisonTable from '../../../util/MedisonTable';
import Btn from '../../../util/Btn';

const TextDiv = styled.div`
  display: flex;
  justify-content: end;
  font-size: 13px;
  margin-left: 0px;
  margin-top: -20px;
  margin-bottom: 20px;
`;

const BtnContainer = styled.div`
  display: flex;
  position: absolute;
  margin-left: 1130px;
  margin-top: 225px;
`;

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 400px;
  top: 20px;
  left: 40px;
  margin-bottom: 100px;
  grid-template-columns: 3fr 7fr;
`;

const Drug1 = () => {
  const [drugVoList, setDrugVoList] = useState([]);
  const [num, setNum] = useState(0);
  const [drugDel, setDrugDel] = useState([]);
  const url = 'http://127.0.0.1:/api/drug';

  useEffect(() => {
    fetch(`${url}/delList`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setDrugVoList(data);
      });
  }, [num]);

  const handleDel = () => {
    const checkedDrug = drugDel.filter((item) => item.isChecked).map((item) => item.no);

    fetch(`${url}/removeDrug`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkedDrug),
    })
      .then((resp) => resp.text())
      .then((data) => {
        setNum(num + 1);
      });
    setDrugDel(
      (prev) =>
        prev
          .filter((item) => !checkedDrug.includes(item.no)) // 삭제된 항목 제외
          .map((item) => ({ ...item, isChecked: false })) // 나머지 체크 해제
    );
  };

  return (
    <>
      <Title> 복용약</Title>
      <NaviContainer>
        <Navi target="drug" tag={'복용중'}></Navi>
        <Navi target="drug1" tag={'과거 복용 약'}></Navi>
      </NaviContainer>
      <BtnContainer>
        <Btn str={'삭제'} c={'lightgray'} fc={'black'} f={handleDel}></Btn>
      </BtnContainer>
      <ContentLayout>
        <MedisonTable
          title="구승용 님의 과거 복용약"
          MediSonData={drugVoList}
          setDrugDel={setDrugDel}
          drugDel={drugDel}
        />
        <TextDiv>* 최근 1년 간 등록된 약만 표시됩니다.</TextDiv>
      </ContentLayout>
    </>
  );
};

export default Drug1;
