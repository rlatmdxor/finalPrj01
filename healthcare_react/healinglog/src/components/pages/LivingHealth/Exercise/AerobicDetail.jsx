import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { close } from '../../../../redux/modalSlice';
import Title from '../../../util/Title';
import ContentLayout from '../../../util/ContentLayout';

const AerobicDetail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(close('운동시작'));
  });

  const { name } = useParams();

  return (
    <>
      <Title>{name} 상세 정보</Title>
      <div />
      <ContentLayout>{name} 이렇게 하세요</ContentLayout>
    </>
  );
};

export default AerobicDetail;
