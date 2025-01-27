import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { data } from 'react-router-dom';

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

const Alc = () => {
  const boardType = 'AlcReport';
  const dispatch = useDispatch();

  // 데이터 목록을 useEffect 전에 선언
  const dataVoList = [
    { no: 1, date: '01/16', type: '소주', amount: 50, alc: 17 },
    { no: 2, date: '01/17', type: '맥주', amount: 500, alc: 5 },
    { no: 3, date: '01/18', type: '막걸리', amount: 200, alc: 6 },
    { no: 4, date: '01/19', type: '와인', amount: 150, alc: 12 },
    { no: 5, date: '01/20', type: '위스키', amount: 30, alc: 40 },
    { no: 6, date: '01/21', type: '칵테일', amount: 60, alc: 10 },
    { no: 7, date: '01/22', type: '맥주', amount: 500, alc: 5 },
    { no: 8, date: '01/23', type: '소주', amount: 100, alc: 17 },
    { no: 9, date: '01/23', type: '소주', amount: 100, alc: 17 },
    { no: 10, date: '01/23', type: '소주', amount: 100, alc: 17 },
    { no: 11, date: '01/23', type: '소주', amount: 100, alc: 17 },
    { no: 12, date: '01/23', type: '소주', amount: 100, alc: 17 },
    { no: 13, date: '01/23', type: '소주', amount: 100, alc: 17 },
    { no: 14, date: '01/23', type: '소주', amount: 100, alc: 17 },
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

  // 술 옵션 설정
  const alcoholOptions = [
    { name: '소주', alc: 17, std: 50 },
    { name: '맥주', alc: 5, std: 250 },
    { name: '막걸리', alc: 6, std: 200 },
    { name: '와인', alc: 12, std: 150 },
    { name: '칵테일', alc: 10, std: 60 },
  ];

  // 상태 관리
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [alcoholAmount, setAlcoholAmount] = useState('');
  const [drinkDate, setDrinkDate] = useState('');
  const [alcoholIntake, setAlcoholIntake] = useState(0);

  // 테이블에서 술 선택 시 상태 업데이트
  const handleDrinkSelection = (drink) => {
    setSelectedDrink(drink);
  };

  // 알코올 섭취량 계산
  const calculateAlcoholIntake = () => {
    if (selectedDrink && alcoholAmount) {
      const intake = (selectedDrink.alc / 100) * parseFloat(alcoholAmount);
      setAlcoholIntake(intake.toFixed(2));
    } else {
      setAlcoholIntake(0);
    }
  };

  // 선택된 음료 로그 출력
  useEffect(() => {
    console.log('선택된 술:', selectedDrink);
  }, [selectedDrink]);

  return (
    <div>
      <Title>음주관리</Title>
      <MarginTitle>
        <NaviContainer>
          <Navi target="alc" tag={'캘린더'}></Navi>
          <Navi target="alc/report" tag={'리포트'}></Navi>
        </NaviContainer>
      </MarginTitle>
      {/* <Title>으악</Title> */}

      <Calendar></Calendar>

      <Modal title="음주">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* 왼쪽 입력 폼 */}
          <div>
            <InputTag
              type="text"
              placeholder="선택된 술종류"
              title="술종류"
              size="size4"
              mb="10"
              mt="5"
              value={selectedDrink ? selectedDrink.name : ''}
            />

            <InputTag
              type="number"
              placeholder="(0~99)"
              title="알코올 도수"
              size="size4"
              mb="10"
              mt="5"
              value={selectedDrink ? selectedDrink.alc : ''}
            />

            <InputTag
              type="number"
              placeholder="마신 양 (ml)"
              title="마신술 양(ml)"
              size="size4"
              mb="10"
              mt="5"
              value={alcoholAmount}
              onChange={(e) => setAlcoholAmount(e.target.value)}
              onBlur={calculateAlcoholIntake}
            />

            <InputTag
              type="date"
              placeholder="날짜"
              title="날짜"
              size="size4"
              mb="10"
              mt="5"
              value={drinkDate}
              onChange={(e) => setDrinkDate(e.target.value)}
            />
          </div>

          {/* 오른쪽 설명 텍스트 */}
          <div style={{ fontSize: '14px', color: '#555' }}>
            <table border="0" style={{ width: '100%', textAlign: 'center' }}>
              <thead>
                <tr>
                  <th>술 종류</th>
                  <th>도수 (%)</th>
                  <th>한잔 (ml)</th>
                </tr>
              </thead>
              <tbody>
                {alcoholOptions.map((drink, index) => (
                  <tr
                    key={index}
                    onClick={() => handleDrinkSelection(drink)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: selectedDrink?.name === drink.name ? '#FF7F50' : 'white',
                    }}
                  >
                    <td>{drink.name}</td>
                    <td>{drink.alc}</td>
                    <td>{drink.std}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 추가된 알코올 섭취량 표시 */}
            <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd' }}>
              <h4>섭취한 총 알코올 양:</h4>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#FF7F50' }}>{alcoholIntake} ml</p>
            </div>
          </div>
        </div>
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>날짜</th>
            <th>술종류</th>
            <th>마신량</th>
            <th>도수</th>
            <th>알코올량</th>
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
                <td>{vo.date}</td>
                <td>{vo.type}</td>
                <td>{vo.amount}</td>
                <td>{vo.alc}</td>
                <td>{((vo.alc / 100) * vo.amount).toFixed(2)}ml</td>
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
              dispatch(open({ title: '음주', value: 'block' }));
            }}
          >
            <Btn str="등록" c="#FF7F50" fc="white" />
          </button>
        </div>
      </BottomDiv>
    </div>
  );
};

export default Alc;
