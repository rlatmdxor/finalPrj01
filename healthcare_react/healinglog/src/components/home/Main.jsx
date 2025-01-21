import React from 'react';
import Modal from '../util/Modal';
import ModalInput from '../util/ModalInput';

const Main = () => {
  return (
    <div>
      <Modal title={'복용약 등록'}>
        <ModalInput type="date" plcaeholder="날짜" title={'날짜'}></ModalInput>
        <ModalInput type="time" plcaeholder="시작 시간" title={'수면 시작 시간'}></ModalInput>
        <ModalInput type="text" plcaeholder="종료 시간" title={'수면 종료 시간'}></ModalInput>
        <ModalInput type="text" plcaeholder="종료 시간" title={'수면 종료 시간'}></ModalInput>
        <ModalInput type="text" plcaeholder="종료 시간" title={'수면 종료 시간'}></ModalInput>
        <ModalInput type="text" plcaeholder="종료 시간" title={'수면 종료 시간'}></ModalInput>
        <ModalInput type="text" plcaeholder="종료 시간" title={'수면 종료 시간'}></ModalInput>
        <ModalInput type="text" plcaeholder="종료 시간" title={'수면 종료 시간'}></ModalInput>
      </Modal>
    </div>
  );
};

export default Main;
