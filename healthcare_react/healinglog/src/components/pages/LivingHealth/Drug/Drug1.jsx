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
  const [isAuthorized, setIsAuthorized] = useState(false); // 로그인 여부 체크
  useEffect(() => {
    if (!token || isTokenExpired(token) || getRoleFromToken(token) == 'ROLE_ADMIN') {
      window.localStorage.removeItem('token'); // 토큰 삭제
      navi('/login'); // 로그인 페이지로 이동
      Swal.fire({
        icon: 'warning',
        title: '로그인이 필요합니다',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      });
    } else {
      setIsAuthorized(true); // 로그인 성공 시 데이터 요청 가능
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
      title: '삭제하시겠습니까?', // 제목
      icon: 'question', // 아이콘 유형 (warning, success, error 등)
      showCancelButton: true, // 취소 버튼 표시
      confirmButtonColor: '#3085d6', // 등록 버튼 색상
      cancelButtonColor: '#d33', // 취소 버튼 색상
      confirmButtonText: '등록', // 등록 버튼 텍스트
      cancelButtonText: '취소', // 취소 버튼 텍스트
    }).then((result) => {
      if (result.isConfirmed) {
        //패치 넣기

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
        setDrugDel(
          (prev) =>
            prev
              .filter((item) => !checkedDrug.includes(item.no)) // 삭제된 항목 제외
              .map((item) => ({ ...item, isChecked: false })) // 나머지 체크 해제
        );
      }
    });
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
      <BottomDiv></BottomDiv>
    </>
  );
};

export default Drug1;
