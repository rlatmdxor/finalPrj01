import React from 'react';
import Title from '../../../util/Title';
import Chart from '../../../util/Chart';
import styled from 'styled-components';
import Btn from '../../../util/Btn';
import Modal from '../../../util/Modal';
import InputTag from '../../../util/Input';
import { useDispatch } from 'react-redux';
import { open } from '../../../../redux/modalSlice';

const BtnDiv = styled.div`
  margin-left: 910px;
`;

const CharDiv = styled.div`
  margin-left: 380px;
  margin-top: 30px;
`;

const Sleep = () => {
  const dispatch = useDispatch();

  const labels = ['월', '화', '수', '목', '금', '토', '일'];
  const dataset = [
    {
      label: '수면 시간',

      data: [480, 420, 660, 540, 300, 360, 240],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(201, 203, 207, 1)',
      ], // 테두리 색상
      borderWidth: 1, // 테두리 두께
    },
  ];

  return (
    <div>
      <Modal title="수면">
        <InputTag type="date" plcaeholder="날짜" title="날짜"></InputTag>
        <InputTag type="time" plcaeholder="시작 시간" title="수면 시작 시간"></InputTag>
        <InputTag type="time" plcaeholder="시작 시간" title="수면 시작 시간"></InputTag>
        <InputTag type="time" plcaeholder="시작 시간" title="수면 시작 시간"></InputTag>
      </Modal>
      <Title>수면</Title>
      <CharDiv>
        <Chart
          chartType="Bar"
          labels={labels}
          dataset={dataset}
          width={600}
          height={400}
          xAxisColor="rgba(75, 192, 192, 1)"
          yAxisColor="rgba(255, 99, 132, 1)"
        />
      </CharDiv>
      <BtnDiv
        onClick={() => {
          dispatch(open({ title: '수면', value: 'block' }));
        }}
      >
        <Btn onClick={console.log('zz')} str={'등록'} c={'#FF7F50'} fc={'white'}></Btn>
      </BtnDiv>
    </div>
  );
};

export default Sleep;
