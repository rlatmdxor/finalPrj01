import React from 'react';
import Modal from '../../util/Modal';
import Btn from '../../util/Btn';
import styled from 'styled-components';
import { Switch } from '@mui/material';

const ModalContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const ContentDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 20px;
  row-gap: 2px;
  margin-bottom: 10px;
  margin-left: 5px;
`;

const SwitchInputDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SettingModal = () => {
  const handleSave = () => {
    alert('호호');
  };

  return (
    <>
      <Modal title="표시내용 설정">
        <ContentDiv>
          <SwitchInputDiv>
            <div>전체</div>
            <Switch defaultChecked />
          </SwitchInputDiv>
          <SwitchInputDiv>
            <div>혈압</div>
            <Switch defaultChecked />
          </SwitchInputDiv>
          <SwitchInputDiv>
            <div>혈당</div>
            <Switch defaultChecked />
          </SwitchInputDiv>
          <SwitchInputDiv>
            <div>수면</div>
            <Switch defaultChecked />
          </SwitchInputDiv>
          <SwitchInputDiv>
            <div>흡연</div>
            <Switch defaultChecked />
          </SwitchInputDiv>
          <SwitchInputDiv>
            <div>음주</div>
            <Switch defaultChecked />
          </SwitchInputDiv>
          <SwitchInputDiv>
            <div>체중</div>
            <Switch defaultChecked />
          </SwitchInputDiv>
          <SwitchInputDiv>
            <div>칼로리</div>
            <Switch defaultChecked />
          </SwitchInputDiv>
          <SwitchInputDiv>
            <div>물</div>
            <Switch defaultChecked />
          </SwitchInputDiv>
          <SwitchInputDiv>
            <div>유산소</div>
            <Switch defaultChecked />
          </SwitchInputDiv>
          <SwitchInputDiv>
            <div>무산소</div>
            <Switch defaultChecked />
          </SwitchInputDiv>
          <SwitchInputDiv>
            <div>총 운동시간</div>
            <Switch defaultChecked />
          </SwitchInputDiv>
        </ContentDiv>
        <ModalContainer>
          <Btn
            title={'표시내용 설정'}
            str={'저장'}
            mt={'17'}
            mb={'30'}
            mr={'0'}
            c={'#ff8a60'}
            fc={'white'}
            f={handleSave}
          ></Btn>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default SettingModal;
