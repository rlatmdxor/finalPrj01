import React from 'react';
import Btn from '../../util/Btn';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { open } from '../../../redux/modalSlice';

const SettingBtnDiv = styled.div`
  display: flex;
  height: 25px;
  justify-content: flex-end;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const SettingBtn = () => {
  const dispatch = useDispatch();

  const handleSettingModal = () => {
    dispatch(open({ title: '표시내용 설정', value: 'block' }));
  };

  return (
    <SettingBtnDiv>
      <Btn str={'설정'} w={'60'} h={'32'} mt={'0'} mb={'0'} ml={'0'} mr={'0'} fs={'14'} f={handleSettingModal} />
    </SettingBtnDiv>
  );
};

export default SettingBtn;
