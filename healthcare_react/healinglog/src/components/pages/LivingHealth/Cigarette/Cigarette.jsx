import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';

import Title from '../../../util/Title';
import SelectedBar from '../../../util/SelectedBar';
import Calendar from '../../../util/Calendar';
import Modal from '../../../util/Modal';
import Btn from '../../../util/Btn';
import InputTag from '../../../util/Input';
import Navi from '../../../util/Navi';
import Table from '../../../util/Table';
import Pagination from '../../../util/Pagination';

import { setSelection } from '../../../../redux/selectSlice';
import { open } from '../../../../redux/modalSlice';
import { setTotalCount, resetPaging } from '../../../../redux/pagingSlice';

const MarginTitle = styled.div`
  margin-bottom: 50px;
`;

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 400px; // 항목수에 비례해서 주시면 됩니다.
  top: 20px;
  left: 40px;
  grid-template-columns: 3fr 3fr; // 글자수만큼 fr 주면 됩니다. ex) 유산소 3글자니까 3fr
`;

const BottomDiv = styled.div`
  display: flex;
  margin: 30px 50px 50px 50px;
  justify-content: space-between;
  align-items: center;
`;

const Cigarette = () => {
  const boardType = 'Cigarette';
  const dispatch = useDispatch();

  // 데이터 목록을 useEffect 전에 선언
  const dataVoList = [
    { no: 1, cigarette: '레종 블루', tar: '3', start_date: '01/16', end_date: '01/23' },
    { no: 2, cigarette: '레종 블루', tar: '3', start_date: '01/17', end_date: '01/23' },
    { no: 3, cigarette: '레종 블루', tar: '3', start_date: '01/18', end_date: '01/23' },
    { no: 4, cigarette: '레종 블루', tar: '3', start_date: '01/19', end_date: '01/23' },
    { no: 5, cigarette: '레종 블루', tar: '3', start_date: '01/20', end_date: '01/23' },
    { no: 6, cigarette: '레종 블루', tar: '3', start_date: '01/21', end_date: '01/23' },
    { no: 7, cigarette: '레종 블루', tar: '3', start_date: '01/22', end_date: '01/23' },
    { no: 8, cigarette: '레종 블루', tar: '3', start_date: '01/23', end_date: '01/23' },
    { no: 9, cigarette: '레종 블루', tar: '3', start_date: '01/23', end_date: '01/23' },
    { no: 10, cigarette: '레종 블루', tar: '3', start_date: '01/23', end_date: '01/23' },
    { no: 11, cigarette: '레종 블루', tar: '3', start_date: '01/23', end_date: '01/23' },
    { no: 12, cigarette: '레종 블루', tar: '3', start_date: '01/23', end_date: '01/23' },
    { no: 13, cigarette: '레종 블루', tar: '3', start_date: '01/24', end_date: '01/23' },
    { no: 14, cigarette: '레종 블루', tar: '3', start_date: '01/23', end_date: '01/23' },
  ];

  // Redux 상태 가져오기
  const { currentPage, boardLimit } = useSelector((state) => state.paging[boardType] || {});

  useEffect(() => {
    dispatch(setTotalCount({ boardType, totalCount: dataVoList.length }));
    dispatch(resetPaging({ boardType }));
  }, [boardType, dataVoList.length, dispatch]);

  // 페이지네이션 로직
  const offset = (currentPage - 1) * (boardLimit || 5);
  const data = dataVoList.slice(offset, offset + (boardLimit || 5));

  return (
    <div>
      <Title>흡연관리</Title>
      <MarginTitle>
        <NaviContainer>
          <Navi target="cigarette" tag={'캘린더'}></Navi>
          <Navi target="cigarette/report" tag={'리포트'}></Navi>
        </NaviContainer>
      </MarginTitle>
      {/* <Title>으악</Title> */}

      <Calendar></Calendar>

      <Modal title="흡연">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* 왼쪽 입력 폼 */}
          <div>
            <InputTag type="text" placeholder="담배명" title="담배명" size="size4" mb="10" mt="5" />

            <InputTag type="number" placeholder="타르량" title="타르량" size="size4" mb="10" mt="5" />

            <InputTag type="date" placeholder="시작날짜" title="시작날짜" size="size4" mb="10" mt="5" />
            <InputTag type="date" placeholder="종료날짜" title="종료날짜" size="size4" mb="10" mt="5" />

            <InputTag type="cigarette" placeholder="" title="" size="" mb="10" mt="5"></InputTag>
          </div>

          {/* 오른쪽 설명 텍스트 */}
        </div>
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>담배명</th>
            <th>타르수치</th>
            <th>시작날짜</th>
            <th>종료날짜</th>
            <th>소모일</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vo) => {
            return (
              <tr
                key={vo.no}
                onClick={() => {
                  // window.location.href = `/board?bno=${vo.no}`;
                }}
              >
                <td>{vo.no}</td>
                <td>{vo.cigarette}</td>
                <td>{vo.tar}</td>
                <td>{vo.start_date}</td>
                <td>{vo.end_date}</td>
                {/* <td>{vo.end_date - vo.start_date}</td> */}
                <td>{Math.ceil((new Date(vo.end_date) - new Date(vo.start_date)) / (1000 * 60 * 60 * 24))}일</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <BottomDiv>
        <div></div>
        <div>
          <Pagination boardType={boardType} />
        </div>

        <div>
          {/* <Btn
            str={'등록'}
            c={'#FF7F50'}
            fc={'#ffffff'}
            h={'40'}
            onClick={() => {
              console.log('123123');
              dispatch(open({ title: '음주', value: 'block' }));
            }}
          /> */}

          <button
            onClick={() => {
              dispatch(open({ title: '흡연', value: 'block' }));
            }}
          >
            <Btn str="등록" c="#FF7F50" fc="white" />
          </button>
        </div>
      </BottomDiv>
    </div>
  );
};

export default Cigarette;
