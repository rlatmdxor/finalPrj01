import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { close } from '../../../../redux/modalSlice';
import Title from '../../../util/Title';
import ContentLayout from '../../../util/ContentLayout';
import Navi from '../../../util/Navi';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { isTokenExpired, getRoleFromToken } from '../../../util/JwtUtil';
import { BASE_URL } from '../../../services/config';

const AnAerobicDetail = () => {
  const dispatch = useDispatch();
  const [anaerobic, setAnaerobic] = useState({});
  const { name } = useParams();

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

  useEffect(() => {
    fetch(`${BASE_URL}/api/anaerobic/getDetail?name=${encodeURIComponent(name)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setAnaerobic(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    dispatch(close('운동 기록'));
    if (!isAuthorized) {
      return;
    }
  }, [isAuthorized, token]);

  return (
    <>
      <Title>운동 상세 정보</Title>
      <NaviContainer>
        <Navi target="aerobic" tag={'유산소'}></Navi>
        <Navi target="anaerobic" tag={'무산소'}></Navi>
        <Navi target="exhistory" tag={'내역 관리'}></Navi>
        <Navi target="exreport" tag={'리포트'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <BlankSpace />
        <BlankSpace />

        <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{anaerobic.name}</div>
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'gray', paddingTop: '14px' }}>
          {anaerobic.description}
        </div>
        <BlankSpace />
        <div>
          <video playsInline muted autoPlay loop src={anaerobic.imageUrl} style={{ width: '1020px' }}></video>
          <BlankSpace />
        </div>
        <div dangerouslySetInnerHTML={{ __html: anaerobic.guide }} style={{ color: 'black', fontSize: '17px' }} />
        <BlankSpace />
        <BlankSpace />
      </ContentLayout>
    </>
  );
};

export default AnAerobicDetail;

const BlankSpace = styled.div`
  height: 50px;
`;

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 400px;
  top: 20px;
  left: 40px;
  grid-template-columns: 3fr 3fr 4fr 3fr;
`;
