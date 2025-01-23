import React, { useEffect } from 'react';
import Title from '../../../util/Title';
import Chart from '../../../util/Chart';
import styled from 'styled-components';
import Btn from '../../../util/Btn';
import Modal from '../../../util/Modal';
import InputTag from '../../../util/Input';
import { useDispatch, useSelector } from 'react-redux';
import { open } from '../../../../redux/modalSlice';
import Table from '../../../common/Table';
import { resetPaging, setTotalCount } from '../../../../redux/pagingSlice';
import BoardList from '../../../common/BoardList';
import DateBtn from '../../../util/DateBtn';

const BtnDiv = styled.div`
  margin-top: 30px;
  margin-left: 1100px;
`;

const DataDiv = styled.div`
  margin-left: 1100px;
  margin-bottom: -30px;
`;

const CharDiv = styled.div`
  margin-left: 180px;
  margin-top: 30px;
`;

const Sleep = () => {
  const dataBtn = ['일', '주', '월'];
  const dispatch = useDispatch();
  const boardType = 'honeyTip';

  const dataVoList = [
    { no: 15, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 14, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 13, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 12, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 11, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 10, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 9, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 8, category: '병원', title: '제목11111111111111111', votes: 15, writer: '홍길동', date: '2025-01-18' },
    { no: 7, category: '보험', title: '제목222222222222222222', votes: 25, writer: '홍길동', date: '2025-01-18' },
    { no: 6, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 5, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 4, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 3, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 2, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
    { no: 1, category: '생활', title: '제목333333333333333333', votes: 36, writer: '홍길동', date: '2025-01-18' },
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
    <div>
      <Modal title="수면">
        <InputTag type="date" plcaeholder="날짜" title="날짜" size={'size3'} mb={'10'} mt={'5'}></InputTag>
        <InputTag type="date" plcaeholder="날짜" title="날짜" size={'size3'} mb={'10'} mt={'5'}></InputTag>
        <InputTag type="date" plcaeholder="날짜" title="날짜" size={'size3'} mb={'10'} mt={'5'}></InputTag>
      </Modal>
      <Title>수면</Title>
      <DataDiv>
        <DateBtn dataBtn={dataBtn}></DateBtn>
      </DataDiv>
      <CharDiv>
        <Chart
          chartType="Bar"
          labels={labels}
          dataset={dataset}
          width={1000}
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
        <Btn str={'등록'} c={'#FF7F50'} fc={'white'}></Btn>
      </BtnDiv>

      <BoardList>
        <thead>
          <tr>
            <th>번호</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>추천수</th>
            <th>작성자</th>
            <th>등록일자</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vo) => {
            return (
              <tr
                key={vo.no}
                onClick={() => {
                  window.location.href = `/board?bno=${vo.no}`;
                }}
              >
                <td>{vo.no}</td>
                <td>{vo.category}</td>
                <td>{vo.title}</td>
                <td>{vo.votes}</td>
                <td>{vo.writer}</td>
                <td>{vo.date}</td>
              </tr>
            );
          })}
        </tbody>
      </BoardList>
    </div>
  );
};

export default Sleep;
