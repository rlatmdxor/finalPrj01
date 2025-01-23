import React, { useState, useEffect } from 'react';
import Title from '../../../util/Title';
import styled from 'styled-components';
import Calendar from '../../../util/Calendar';
import Modal from '../../../util/Modal';
import Btn from '../../../util/Btn';
import { open as open } from '../../../../redux/modalSlice';
import { useDispatch } from 'react-redux';
import InputTag from '../../../util/Input';

const SubTitle = styled.div`
  font-size: 35px;
  font-weight: 600;
  color: gray;
  margin-top: 30px;
  margin-bottom: 50px;
  margin-left: 50px;
`;

const Highlight = styled.span`
  border-bottom: 6px solid #ff7f50; /* 주황색 밑줄 */
  padding-bottom: 5px;
  color: black;
`;

const Box = styled.span``;

const Cigarette = () => {
  const dispatch = useDispatch(); // 최상위 레벨에서 호출

  const handleOpenModal = () => {
    dispatch(open({ title: '흡연', value: 'block' }));
  };
  return (
    <div>
      <Title>흡연 관리</Title>
      <SubTitle>
        <Highlight>캘린더</Highlight>&nbsp;&nbsp;리포트
      </SubTitle>
      <Calendar></Calendar>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => {
            dispatch(open({ title: '흡연', value: 'block' }));
          }}
        >
          <Btn str="등록" c="#FF7F50" fc="white" />
        </button>
      </div>

      <Modal title="흡연">
        <InputTag type="text" placeholder="담배 종류" title="담배 종류" size="size3" mb="10" mt="5"></InputTag>
        <InputTag
          type="date"
          plcaeholder="소모 시작 날짜"
          title="소모 시작 날짜"
          size={'size3'}
          mb={'10'}
          mt={'5'}
        ></InputTag>
        <InputTag
          type="date"
          plcaeholder="소모 종료 날짜"
          title="소모 종료 날짜"
          size={'size3'}
          mb={'10'}
          mt={'5'}
        ></InputTag>
      </Modal>
    </div>
  );
};

export default Cigarette;
