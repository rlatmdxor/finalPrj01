import React, { useEffect, useState } from 'react';
import Title from '../../../util/Title';
import styled from 'styled-components';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';
import MedisonTable from '../../../util/MedisonTable';
import Btn from '../../../util/Btn';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired, getRoleFromToken } from '../../../util/JwtUtil';
import { BASE_URL } from '../../../services/config';

const BottomDiv = styled.div`
  margin-top: 25px;
  margin-bottom: 35px;
`;

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
  const token = localStorage.getItem('token');
  const navi = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [name, setName] = useState('');
  useEffect(() => {
    if (!token || isTokenExpired(token) || getRoleFromToken(token) == 'ROLE_ADMIN') {
      window.localStorage.removeItem('token');
      navi('/login');
      Swal.fire({
        icon: 'warning',
        title: '로그인이 필요합니다',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      });
    } else {
      setIsAuthorized(true);
    }
  }, [navi, token]);

  const [drugVoList, setDrugVoList] = useState([]);
  const [num, setNum] = useState(0);
  const [drugDel, setDrugDel] = useState([]);

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    fetch(`${BASE_URL}/api/drug/delList`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setDrugVoList(data);
      });
  }, [isAuthorized, token, num]);

  const handleDel = () => {
    const checkedDrug = drugDel.filter((item) => item.isChecked).map((item) => item.no);
    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '등록',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/api/drug/removeDrug`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(checkedDrug),
        })
          .then((resp) => resp.text())
          .then((data) => {
            setNum(num + 1);
            Swal.fire({
              icon: 'success',
              title: '삭제 완료.',
              confirmButtonText: '확인',
            });
          });
        setDrugDel((prev) =>
          prev.filter((item) => !checkedDrug.includes(item.no)).map((item) => ({ ...item, isChecked: false }))
        );
      }
    });
  };

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }
    fetch(`${BASE_URL}/api/drug/get/name`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return resp.text();
      })
      .then((data) => {
        return setName(data);
      });
  }, []);

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
          title={`${name} 님의 과거 복용약`}
          MediSonData={drugVoList}
          setDrugDel={setDrugDel}
          drugDel={drugDel}
        />
        <TextDiv>* 최근 1년 간 등록된 약만 표시됩니다.</TextDiv>
      </ContentLayout>
      <BottomDiv></BottomDiv>
    </>
  );
};

export default Drug1;
