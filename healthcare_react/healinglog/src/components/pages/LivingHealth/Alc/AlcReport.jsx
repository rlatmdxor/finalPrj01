import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Title from '../../../util/Title';
import Chart from '../../../util/Chart';
import Table from '../../../util/Table';
import Btn from '../../../util/Btn';
import Pagination from '../../../util/Pagination';
import Navi from '../../../util/Navi';
import Modal from '../../../util/Modal';
import InputTag from '../../../util/Input';
import ModalTitle from '../../../util/ModalTitle';

import { setTotalCount, resetPaging } from '../../../../redux/pagingSlice';
import { open } from '../../../../redux/modalSlice';

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

const SearchDiv = styled.div`
  display: flex;
  gap: 10px;
  justify-content: end;
  align-items: center;
  margin: 20px 50px;
`;

const ChartMargin = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 (필요 시 추가) */
  margin: 0 auto; /* 블록 요소의 중앙 정렬 */
  width: fit-content; /* 내용물 크기에 맞게 너비 조정 */
`;

const BottomDiv = styled.div`
  display: flex;
  margin: 30px 50px 50px 50px;
  justify-content: space-between;
  align-items: center;
`;

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const dataset = [
  {
    // 차트에서 그래프가 나타내는 이름 표시 ex)수축기 혈압 , 이완기 혈압
    // Bar , Pie , Doughnut에서는 마우스를 해당 부분에 호버하면 이 label의 이름이 표시된다.
    label: 'tnftnftnf',

    data: [12000, 15000, 8000, 18000, 22000, 13000, 17000], // 데이터 값 위의 labels와 같은 갯수 넣어야됨
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(201, 203, 207, 0.2)',
    ], // 배경색
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

const AlcReport = () => {
  const boardType = 'AlcReport';

  const [selectedDrink, setSelectedDrink] = useState(null);
  const [alcoholAmount, setAlcoholAmount] = useState('');
  const [drinkDate, setDrinkDate] = useState('');
  const [alcoholIntake, setAlcoholIntake] = useState(0);

  const alcoholOptions = [
    { name: '소주', alc: 17, std: 50 },
    { name: '맥주', alc: 5, std: 250 },
    { name: '막걸리', alc: 6, std: 200 },
    { name: '와인', alc: 12, std: 150 },
    { name: '칵테일', alc: 10, std: 60 },
  ];

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

  // 게시판 목록 데이터
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

  const dispatch = useDispatch();

  const { currentPage, boardLimit } = useSelector((state) => state.paging[boardType] || {});

  useEffect(() => {
    dispatch(setTotalCount({ boardType, totalCount: dataVoList.length }));
    dispatch(resetPaging({ boardType }));
  }, [boardType, dataVoList.length, dispatch]);

  const offset = (currentPage - 1) * boardLimit;
  const data = dataVoList.slice(offset, offset + boardLimit);

  const NaviContainer = styled.div`
    display: grid;
    position: relative;
    width: 400px; // 항목수에 비례해서 주시면 됩니다.
    top: 20px;
    left: 40px;
    grid-template-columns: 3fr 3fr; // 글자수만큼 fr 주면 됩니다. ex) 유산소 3글자니까 3fr
  `;

  return (
    <div>
      <Title>음주관리</Title>
      <MarginTitle>
        <NaviContainer>
          <Navi target="alc" tag={'캘린더'}></Navi>
          <Navi target="alc/report" tag={'리포트'}></Navi>
        </NaviContainer>
      </MarginTitle>
      {/* <SubTitle>
        캘린더&nbsp;&nbsp;<Highlight>리포트</Highlight>
      </SubTitle> */}
      {/* <Title>기간별 음주율</Title> */}

      <ChartMargin>
        <Chart
          chartType="Bar" // 차트 타입지정 Bar , Line , Pie , Doughnut 중 택1
          labels={labels} // 위에서 작성한 x축의 데이터
          dataset={dataset} // 위에서 작성한 차트의 데이터
          width={800} // 차트 가로 사이즈임
          height={400} // 차트 세로 사이즈임
          // margin={20}
          xAxisColor="rgba(75, 192, 192, 1)" // Bar , Line 에만 사용되고 x축 글씨색상임
          yAxisColor="rgba(255, 99, 132, 1)" // Bar , Line 에만 사용되고 y축 글씨색상임
        />
      </ChartMargin>

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

export default AlcReport;
