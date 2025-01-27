import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { close } from '../../../../redux/modalSlice';

const AerobicDetail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(close('운동시작'));
  });

  const { name } = useParams();

  return (
    <div>
      <h1>{name} 운동 상세 정보</h1>
      <p>이곳에서 {name}에 대한 세부 정보를 처리합니다.</p>
    </div>
  );
};

export default AerobicDetail;
