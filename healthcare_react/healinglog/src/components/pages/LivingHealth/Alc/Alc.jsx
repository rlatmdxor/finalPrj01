import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';

import Title from '../../../util/Title';
import Calendar from '../../../util/Calendar';
import Modal from '../../../util/Modal';
import Btn from '../../../util/Btn';
import InputTag from '../../../util/Input';
import Navi from '../../../util/Navi';
import Table from '../../../util/Table';
import Pagination from '../../../util/Pagination';

import { close, open } from '../../../../redux/modalSlice';
import { setTotalCount, resetPaging } from '../../../../redux/pagingSlice';
import ContentLayout from '../../../util/ContentLayout';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 300px; // 항목수에 비례해서 주시면 됩니다.
  top: 20px;
  left: 40px;
  grid-template-columns: 3fr 3fr; // 글자수만큼 fr 주면 됩니다. ex) 유산소 3글자니까 3fr
`;

const CalContainer = styled.div`
  /* margin-top: 200px; */
  padding-top: 100px;
`;

const Alc = () => {
  const url = 'http://127.0.0.1/api/alc/list';

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ memberNo: '1' }),
  };

  const [fullData, setFullData] = useState([]); // 전체 데이터 저장
  const [pagedData, setPagedData] = useState([]); // 페이징된 데이터

  const dispatch = useDispatch();

  const boardType = 'Alc';
  const { currentPage, boardLimit } = useSelector((state) => state.paging[boardType] || {});
  const offset = (currentPage - 1) * boardLimit;

  //모달 밖의 버튼 컨테이너
  const BtnContainer = styled.div`
    display: flex;
    justify-content: end;
    margin-right: -45px;
  `;

  //모달 안의 버튼 컨테이너
  const ModalContainer = styled.div`
    display: flex;
    justify-content: end;
  `;

  useEffect(() => {
    dispatch(resetPaging({ boardType }));
  }, [boardType, dispatch]);

  // fetch실행
  useEffect(() => {
    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length > 0) {
          dispatch(setTotalCount({ boardType, totalCount: data.length })); // 페이징 처리할때 totalCount 저장
          setFullData(data);
        } else {
          dispatch(resetPaging({ boardType }));
          setFullData([]);
        }
      })
      .catch((error) => console.error('데이터 불러오기 실패:', error));
  }, []);

  const alcList = [];

  // 테이블 페이징 처리
  useEffect(() => {
    setPagedData(fullData.slice(offset, offset + boardLimit));
  }, [fullData, currentPage, boardLimit]);

  //인풋 안 쪽에 들어가는 데이터 ~~~Vo에 들어있는 이름으로 맞춰주기
  const initialInputData = { alcType: '', abv: '', cc: '', enrollDate: '' };
  // 모달 안 쪽 인풋에 데이터 관리
  const [inputData, setInputData] = useState(initialInputData);
  // 페이징 쪽에 있는 자료 활용
  // const data = dataVoList.slice(offset, offset + boardLimit);
  // 화면 렌더링
  const [num, setNum] = useState('');

  //토큰관련코드
  const token = localStorage.getItem('token');

  // 인풋 데이터 초기화
  const reset = () => {
    setInputData(initialInputData);
  };
  // 인풋 입력값 받아오기
  const handleChange = (e) => {
    setInputData((props) => {
      return {
        ...props,
        [e.target.name]: e.target.value,
      };
    });
  };

  // 인풋 입력값 보내기
  const handleSubmit = (e) => {
    fetch('http://127.0.0.1:80/api/alc/write', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputData),
    })
      .then((resp) => resp.text())
      .then((data) => {});
    setNum(num - 1);
    // 입력 후 모달 창 닫기
    dispatch(close(e.target.title));
  };

  //수정모달
  const handleEditSubmit = (e) => {
    fetch('http://127.0.0.1:80/api/alc/update', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputData),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error! Status: ${resp.status}`);
        }
        return resp.text(); // 또는 .json() (응답 형식에 따라)
      })
      .then((data) => {
        console.log('수정 완료:', data);
      })
      .catch((error) => {
        console.error('수정 실패:', error);
      });

    dispatch(close('음주 수정'));
    // setNum(num - 1);
    // 입력 후 모달 창 닫기
    // dispatch(close(e.target.title));
  };
  //삭제모달
  const handleDeleteSubmit = (e) => {
    fetch('http://127.0.0.1/api/alc/delete', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputData),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error! Status: ${resp.status}`);
        }
        return resp.text(); // 또는 .json() (응답 형식에 따라)
      })
      .then((data) => {
        console.log('삭제 완료:', data);
      })
      .catch((error) => {
        console.error('삭제 실패:', error);
      });
    //창닫기
    dispatch(close('음주 수정'));
  };

  // 술 옵션 설정 하드코딩 고도화 과정중 DB / 자동입력 예정
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
    <>
      <Title>음주관리</Title>

      <NaviContainer>
        <Navi target="alc" tag={'캘린더'}></Navi>
        <Navi target="alc/report" tag={'리포트'}></Navi>
      </NaviContainer>

      <ContentLayout>
        <Modal title="음주 등록">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* 왼쪽 입력 폼 */}
            <div>
              <InputTag
                type="text"
                name="alcType"
                placeholder="선택된 술종류"
                value={inputData.alcType}
                title="술종류"
                size="size4"
                mb="10"
                mt="5"
                f={handleChange}
                // value={selectedDrink ? selectedDrink.name : ''}
              />

              <InputTag
                type="number"
                name="abv"
                placeholder="(0~99)"
                value={inputData.abv}
                title="알코올 도수"
                size="size4"
                mb="10"
                mt="5"
                f={handleChange}
                // value={selectedDrink ? selectedDrink.alc : ''}
              />

              <InputTag
                type="number"
                placeholder="음주량 (ml)"
                name="cc"
                title="음주량(ml)"
                size="size4"
                value={inputData.cc}
                mb="10"
                mt="5"
                // value={alcoholAmount}
                // onChange={(e) => setAlcoholAmount(e.target.value)}
                // onBlur={calculateAlcoholIntake}
                f={handleChange}
              />

              <InputTag
                type="date"
                name="enrollDate"
                placeholder="날짜"
                title="날짜"
                size="size4"
                mb="10"
                mt="5"
                value={inputData.enrollDate}
                // onChange={(e) => setDrinkDate(e.target.value)}
                f={handleChange}
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
                      <td>{drink.cc}</td>
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
          <ModalContainer>
            <Btn
              title={'음주 등록'}
              // 인풋 입력값 보내기
              f={handleSubmit}
              //margin top bottom right
              mt={'10'}
              mb={'20'}
              mr={'-10'}
              // background color
              c={'#FF7F50'}
              // font color
              fc={'white'}
              // 화면에 노출되는 버튼 안 쪽 내용
              str={'등록'}
            ></Btn>
          </ModalContainer>
        </Modal>

        <Modal title="음주 수정">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* 왼쪽 입력 폼 */}
            <div>
              <InputTag
                type="text"
                name="alcType"
                placeholder="선택된 술종류"
                value={inputData.alcType}
                title="술종류"
                size="size4"
                mb="10"
                mt="5"
                f={handleChange}
                // value={selectedDrink ? selectedDrink.name : ''}
              />

              <InputTag
                type="number"
                name="abv"
                placeholder="(0~99)"
                value={inputData.abv}
                title="알코올 도수"
                size="size4"
                mb="10"
                mt="5"
                f={handleChange}
                // value={selectedDrink ? selectedDrink.alc : ''}
              />

              <InputTag
                type="number"
                placeholder="음주량 (ml)"
                name="cc"
                title="음주량(ml)"
                size="size4"
                value={inputData.cc}
                mb="10"
                mt="5"
                // value={alcoholAmount}
                // onChange={(e) => setAlcoholAmount(e.target.value)}
                // onBlur={calculateAlcoholIntake}
                f={handleChange}
              />

              <InputTag
                type="date"
                name="enrollDate"
                placeholder="날짜"
                title="날짜"
                size="size4"
                mb="10"
                mt="5"
                value={inputData.enrollDate}
                // onChange={(e) => setDrinkDate(e.target.value)}
                f={handleChange}
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
                      <td>{drink.cc}</td>
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
          <ModalContainer>
            <Btn
              title={'음주 수정'}
              f={handleEditSubmit}
              mt={'10'}
              mb={'20'}
              mr={'20'}
              c={'#7ca96d'}
              fc={'white'}
              str={'수정'}
            ></Btn>
            <Btn f={handleDeleteSubmit} mt={'10'} mb={'20'} mr={'-20'} c={'lightgray'} fc={'black'} str={'삭제'}></Btn>
          </ModalContainer>
        </Modal>

        <CalContainer>
          <Calendar
            modalTitle="음주 수정" // 모달 제목과 맞춰야됨
            vo={[]} /* 이벤트 정보 배열 나중을 위해서는 필요하다는데 
        현재 우리는 안쓸 가능성이 높음 복잡하고 다양한 데이터를 넘길때 사용함 */
            // events={events} // 캘린더에 표시할 데이터 위에 예시대로 데이터 가공해서 사용
            width={800} // 캘린더 넓이
            height={100} // 캘린더 한칸 높이
          />
        </CalContainer>

        <BtnContainer>
          <div
            onClick={() => {
              reset();
              dispatch(open({ title: '음주 등록', value: 'block' }));
            }}
          >
            <Btn mt={'50'} mr={'46'} mb={'20'} str={'등록'} c={'#FF7F50'} fc={'white'}></Btn>
          </div>
        </BtnContainer>

        <Table>
          <thead>
            <tr>
              <th>날짜</th>
              <th>술종류</th>
              <th>마신량</th>
              <th>도수</th>
              <th>알코올량</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map((vo) => {
              return (
                <tr
                  key={vo.no}
                  onClick={() => {
                    setInputData({
                      no: vo.no,
                      alcType: vo.alcType,
                      cc: vo.cc,
                      abv: vo.abv,
                      alc: vo.alc,
                      enrollDate: vo.enrollDate,
                    });
                    //모달 열기
                    dispatch(open({ title: '음주 수정', value: 'block' }));
                  }}
                >
                  <td>{vo.enrollDate}</td>
                  <td>{vo.alcType}</td>
                  <td>{vo.cc}</td>
                  <td>{vo.abv}</td>
                  <td>{((vo.abv / 100) * vo.cc).toFixed(2)}ml</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div>
          <Pagination boardType={boardType} />
        </div>

        <div></div>
      </ContentLayout>
      <div></div>
    </>
  );
};

export default Alc;
