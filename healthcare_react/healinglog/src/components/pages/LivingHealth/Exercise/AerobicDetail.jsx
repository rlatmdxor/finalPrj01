import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { close } from '../../../../redux/modalSlice';
import Title from '../../../util/Title';
import ContentLayout from '../../../util/ContentLayout';
import styled from 'styled-components';
import Navi from '../../../util/Navi';

const AerobicDetail = () => {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const [aerobic, setAerobic] = useState({});
  const { name } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:80/api/aerobic/getDetail?name=${encodeURIComponent(name)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setAerobic(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    dispatch(close('운동시작'));
  });

  return (
    <>
      <Title>{name} 상세 정보</Title>
      <NaviContainer>
        <Navi target="aerobic" tag={'유산소'}></Navi>
        <Navi target="anaerobic" tag={'무산소'}></Navi>
        <Navi target="exhistory" tag={'내역 관리'}></Navi>
        <Navi target="exreport" tag={'리포트'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <BlankSpace />
        <BlankSpace />

        <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{aerobic.name}</div>
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'gray', paddingTop: '14px' }}>
          {aerobic.description}
        </div>
        <BlankSpace />
        <div>
          <video playsInline muted autoPlay loop src={aerobic.imageUrl} style={{ width: '1020px' }}></video>
          <BlankSpace />
        </div>
        <div dangerouslySetInnerHTML={{ __html: aerobic.guide }} style={{ color: 'black', fontSize: '17px' }} />
        <BlankSpace />
        <BlankSpace />
      </ContentLayout>
    </>
  );
};

export default AerobicDetail;

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
