import React from 'react';
import Modal from '../util/Modal';
import InputTag from '../util/Input';

const Main = () => {
  return (
    <div>
      <Modal title="복용약 등록" modalId={'복용약 등록'}>
        <InputTag type="text" plcaeholder="날짜" title="날짜"></InputTag>
        <InputTag type="text" plcaeholder="시작 시간" title="수면 시작 시간"></InputTag>
      </Modal>
    </div>
  );
};

export default Main;
