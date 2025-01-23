import Title from '../../../util/Title';
import { setSelection } from '../../../../redux/selectSlice';
import SelectedBar from '../../../util/SelectedBar';
import styled from 'styled-components';
import Calendar from '../../../util/Calendar';
import Modal from '../../../util/Modal';
import Btn from '../../../util/Btn';
import { useDispatch } from 'react-redux';
import InputTag from '../../../util/Input';
import { open as open } from '../../../../redux/modalSlice';
import React, { useState, useEffect } from 'react';

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

const Alc = () => {
  const dispatch = useDispatch();

  const alcoholOptions = [
    { name: '소주', alc: 17, std: 50 },
    { name: '맥주', alc: 5, std: 250 },
    { name: '막걸리', alc: 6, std: 200 },
    { name: '와인', alc: 12, std: 150 },
    { name: '칵테일', alc: 10, std: 60 },
  ];

  const [selectedDrink, setSelectedDrink] = useState(null);
  const [alcoholAmount, setAlcoholAmount] = useState('');
  const [drinkDate, setDrinkDate] = useState('');
  const [alcoholIntake, setAlcoholIntake] = useState(0);

  useEffect(() => {
    console.log('선택된 술:', selectedDrink);
  }, [selectedDrink]);

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
  return (
    <div>
      <Title>음주</Title>
      <SubTitle>
        <Highlight>캘린더</Highlight>&nbsp;&nbsp;리포트
      </SubTitle>

      <Box>
        {/* <button
          onClick={() => {
            console.log('zz');
            dispatch(open({ title: '음주', value: 'block' }));
          }}
        >
          <Btn str="등록" c="#FF7F50" fc="white" />
        </button> */}

        <Calendar></Calendar>

        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => {
              dispatch(open({ title: '음주', value: 'block' }));
            }}
          >
            <Btn str="등록" c="#FF7F50" fc="white" />
          </button>
        </div>

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
      </Box>
      {/* <SelectedBar label="alcohol" options={['소주', '맥주', '막걸리', '와인']} reduxAction={setSelection} index={0} />
      <SelectedBar label="alcohol" options={['주 1회', '주 2~3회', '매일']} reduxAction={setSelection} index={1} />

      <Btn
        // w="60"
        // h="60"
        str="등록"
        c={() => {
          return `#FF7F50`;
        }}
        fs="20"
        fc="white"
        type="submit"
        f={() => {}}
      ></Btn> */}
    </div>
  );
};

export default Alc;
