import React, { useEffect } from 'react';
import Title from '../../../util/Title';
import Chart from '../../../util/Chart';
import styled from 'styled-components';
import Btn from '../../../util/Btn';
import Modal from '../../../util/Modal';
import InputTag from '../../../util/Input';
import { useDispatch, useSelector } from 'react-redux';
import { open } from '../../../../redux/modalSlice';
import { resetPaging, setTotalCount } from '../../../../redux/pagingSlice';
import DateBtn from '../../../util/DateBtn';
import Table from '../../../util/Table';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 400px;
  top: 20px;
  left: 40px;
  margin-bottom: 100px;
  grid-template-columns: 3fr 7fr;
`;
const BtnContainer = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 1110px;
  gap: 15px;
`;

const CharDiv = styled.div`
  margin-top: 30px;
`;

const TableDiv = styled.div``;

const Sleep = () => {
  const dataBtn = ['일', '주', '월'];
  const dispatch = useDispatch();
  const boardType = 'honeyTip';

  const dataVoList = [
    { no: '월', startTime: '22:00', endTime: '07:00', runTime: '630분', date: '2025-01-18' },
    { no: '화', startTime: '22:00', endTime: '07:00', runTime: '630분', date: '2025-01-18' },
    { no: '수', startTime: '22:00', endTime: '07:00', runTime: '630분', date: '2025-01-18' },
    { no: '목', startTime: '22:00', endTime: '07:00', runTime: '630분', date: '2025-01-18' },
    { no: '금', startTime: '22:00', endTime: '07:00', runTime: '630분', date: '2025-01-18' },
    { no: '토', startTime: '22:00', endTime: '07:00', runTime: '630분', date: '2025-01-18' },
    { no: '일', startTime: '22:00', endTime: '07:00', runTime: '630분', date: '2025-01-18' },
  ];
  const { currentPage, boardLimit } = useSelector((state) => state.paging[boardType] || {});

  useEffect(() => {
    dispatch(setTotalCount({ boardType, totalCount: dataVoList.length }));
    dispatch(resetPaging({ boardType }));
  }, [dataVoList.length, dispatch]);

  const offset = (currentPage - 1) * boardLimit;
  const data = dataVoList.slice(offset, offset + boardLimit);

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
    <>
      <Title>수면</Title>
      <div></div>
      {/* <NaviContainer>
        <Navi target="drug" tag={'복용중'}></Navi>
        <Navi target="drug1" tag={'과거 먹은 약'}></Navi>
      </NaviContainer> */}
      <ContentLayout>
        <Modal title="수면 등록" type={'add'}>
          <InputTag type="date" plcaeholder="날짜" title="날짜" size={'size3'} mb={'10'} mt={'5'}></InputTag>
          <InputTag type="time" title="수면 시작 시간" size={'size3'} mb={'10'} mt={'5'}></InputTag>
          <InputTag type="time" title="수면 종료 시간" size={'size3'} mb={'10'} mt={'5'}></InputTag>
        </Modal>
        <Modal title="수면 수정" type={'edit'}>
          <InputTag type="date" plcaeholder="날짜" title="날짜" size={'size3'} mb={'10'} mt={'5'}></InputTag>
          <InputTag type="time" title="수면 시작 시간" size={'size3'} mb={'10'} mt={'5'}></InputTag>
          <InputTag type="time" title="수면 종료 시간" size={'size3'} mb={'10'} mt={'5'}></InputTag>
        </Modal>
        <div>
          <DateBtn dataBtn={dataBtn}></DateBtn>
        </div>
        <CharDiv>
          <Chart
            chartType="Bar"
            labels={labels}
            dataset={dataset}
            width={100}
            height={400}
            xAxisColor="rgba(75, 192, 192, 1)"
            yAxisColor="rgba(255, 99, 132, 1)"
          />
        </CharDiv>
        <BtnContainer>
          <div
            onClick={() => {
              dispatch(open({ title: '수면 등록', value: 'block' }));
            }}
          >
            <Btn str={'등록'} c={'#FF7F50'} fc={'white'}></Btn>
          </div>
        </BtnContainer>
        <TableDiv>
          <Table width={'100%'}>
            <thead>
              <tr>
                <th></th>
                <th>수면 시작 시간</th>
                <th>수면 종료 시간</th>
                <th>수면 지속 시간</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
              {data.map((vo) => {
                return (
                  <tr
                    key={vo.no}
                    onClick={() => {
                      dispatch(open({ title: '수면 수정', value: 'block' }));
                    }}
                  >
                    <td>{vo.no}</td>
                    <td>{vo.startTime}</td>
                    <td>{vo.endTime}</td>
                    <td>{vo.runTime}</td>
                    <td>{vo.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TableDiv>
      </ContentLayout>
    </>
  );
};

export default Sleep;
