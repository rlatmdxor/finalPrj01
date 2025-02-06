import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { close } from '../../../../redux/modalSlice';
import Title from '../../../util/Title';
import ContentLayout from '../../../util/ContentLayout';

const AnAerobicDetail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(close('운동시작'));
  });

  const { name } = useParams();

  return (
    <>
      <Title>{name} 상세 정보</Title>
      <div />
      <ContentLayout>{name}에 대한 세부 정보를 처리합니다.</ContentLayout>
    </>
  );
};

export default AnAerobicDetail;
