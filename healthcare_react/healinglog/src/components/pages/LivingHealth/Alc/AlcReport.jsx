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

import { setTotalCount, resetPaging } from '../../../../redux/pagingSlice';
import { open, close } from '../../../../redux/modalSlice';
import ContentLayout from '../../../util/ContentLayout';
import DateBtn from '../../../util/DateBtn';

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

const bodyContatiner = styled.div`
  margin-top: 20px;
`;

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 400px; // 항목수에 비례해서 주시면 됩니다.
  top: 20px;
  left: 40px;
  grid-template-columns: 3fr 3fr; // 글자수만큼 fr 주면 됩니다. ex) 유산소 3글자니까 3fr
`;

const AlcReport = () => {
  const url = 'http://127.0.0.1/api/alc/report/list';

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ memberNo: '1' }),
  };

  const dispatch = useDispatch();

  const [fullData, setFullData] = useState([]); // 전체 데이터 저장
  const [pagedData, setPagedData] = useState([]); // 페이징된 데이터
  const [filteredData, setFilteredData] = useState([]); // 차트용 필터링 데이터
  const [selectedRange, setSelectedRange] = useState('주'); // 기본값 '일'
  const [selectChart, setSelectChart] = useState('Line'); // 그래프 모양 정하는 state

  const boardType = 'AlcReport';
  const { currentPage, boardLimit } = useSelector((state) => state.paging[boardType] || {});
  const offset = (currentPage - 1) * boardLimit;

  const [selectedDrink, setSelectedDrink] = useState(null);
  const [alcoholAmount, setAlcoholAmount] = useState('');
  // const [drinkDate, setDrinkDate] = useState('');
  const [alcoholIntake, setAlcoholIntake] = useState(0);

  //나중엔 DB로 해야함 모달창 데이터(고도화 과정중 변경예정)
  const alcoholOptions = [
    { name: '소주', alc: 17, cc: 50 },
    { name: '맥주', alc: 5, cc: 250 },
    { name: '막걸리', alc: 6, cc: 200 },
    { name: '와인', alc: 12, cc: 150 },
    { name: '칵테일', alc: 10, cc: 60 },
  ];

  //fetch 실행
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

  // 테이블 페이징 처리
  useEffect(() => {
    setPagedData(fullData.slice(offset, offset + boardLimit));
  }, [fullData, currentPage, boardLimit]);

  // date버튼의 값에 따라서 그래프에 표시되는 데이터를 설정하는 부분
  useEffect(() => {
    if (selectedRange == '주') {
      setFilteredData(filterData('week'));
    } else if (selectedRange == '월') {
      setFilteredData(filterData('month'));
    } else if (selectedRange == '년') {
      setFilteredData(filterData('year'));
    } else {
      setFilteredData(filterData('all'));
    }
  }, [selectedRange]);

  // 차트용 필터링 데이터의 마지막 기록 날짜를 기준으로 최근 7일간의 데이터와 해당 날짜가 포함된 달의 데이터를 가져옴
  const filterData = (type) => {
    // const today = new Date(); // 오늘 날짜 가져오기

    //데이터의 최근날짜
    const voList = [];

    for (const vo of fullData) {
      voList.push(vo.enrollDate);
    }

    const latestDate = new Date(voList[0]);

    if (type === 'week') {
      // 최근에 입력한 데이터를 기준으로 최신7일간의 데이터를 가져오기
      const oneWeekAgo = new Date(latestDate);
      oneWeekAgo.setDate(latestDate.getDate() - 7);

      return fullData.filter((item) => {
        const itemDate = new Date(item.enrollDate); // 문자열을 Date 객체로 변환
        return itemDate >= oneWeekAgo && itemDate <= latestDate; // 최신 날짜 기준 7일 이내 데이터
      });
    }

    if (type === 'month') {
      // 최근에 입력한 데이터를 기준으로 해당 월의 데이터를 가져오기
      const currentYear = latestDate.getFullYear();
      const currentMonth = latestDate.getMonth() + 1; // getMonth()는 0부터 시작

      return fullData.filter((item) => {
        const [year, month] = item.enrollDate.split('-').map(Number);
        return year === currentYear && month === currentMonth;
      });
    }

    if (type === 'year') {
      // 최근에 입력한 데이터를 기준으로 해당 년의 데이터를 가져오기
      const currentYear = latestDate.getFullYear();

      return fullData.filter((item) => {
        const [year] = item.enrollDate.split('-').map(Number);
        return year === currentYear;
      });
    }

    return fullData; // 전체 기간
  };

  // 처음에 일주일 데이터 로드
  useEffect(() => {
    setFilteredData(filterData('week'));
  }, [fullData]);

  const dataBtn = ['주', '월', '년'];

  const labels = [];

  // 차트에 들어갈 x축 라벨
  for (const vo of filteredData) {
    labels.unshift(vo.enrollDate);
  }

  const alcList = [];

  for (const vo of filteredData) {
    alcList.unshift(((vo.abv / 100) * vo.cc).toFixed(2));
  }

  const dataset = [
    {
      label: '알코올 섭취량',
      data: alcList,
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

  //모달 고도화작업중 진행 예정 시작

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
  // 모달 고도화작업중 진행예정 끝

  useEffect(() => {
    dispatch(setTotalCount({ boardType, totalCount: alcList.length }));
    dispatch(resetPaging({ boardType }));
  }, [boardType, alcList.length, dispatch]);

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
    fetch('http://127.0.0.1:80/api/alc/report/write', {
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
    fetch('http://127.0.0.1:80/api/alc/report/update', {
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
    fetch('http://127.0.0.1/api/alc/report/delete', {
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

  // datasetData에서 가장 큰 값 찾기
  const maxValue = Math.max(...alcList);

  // yMax 값 설정 (최대값 + 0.5)
  const yMaxValue = maxValue + maxValue * 0.2;
  return (
    <>
      <Title>음주관리</Title>

      <NaviContainer>
        <Navi target="alc" tag={'캘린더'}></Navi>
        <Navi target="alc/report" tag={'리포트'}></Navi>
      </NaviContainer>

      <ContentLayout>
        <DateBtn dataBtn={dataBtn} onSelect={setSelectedRange} onChange={setSelectChart}></DateBtn>
        <Chart
          chartType={selectChart} // 차트 타입지정
          labels={labels} // 위랑 동일
          dataset={dataset} // 위랑 동일
          width={100} // 위랑 동일
          height={450} // 위랑 동일
          xAxisColor="rgba(54, 162, 235, 1)" // 위랑 동일
          yAxisColor="rgba(255, 159, 64, 1)" // 위랑 동일
          // yMax={yMaxValue} // y축 최대값 찾아서 최대값+n값으로 지정해둠
          yMin={0} // y축 최솟값 지정 아무것도 안적으면 자동으로 짜줌 음수도 입력가능
          xLabelVisible={true} // 추가: X축 라벨 표시 여부 (기본값: true)
        />

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

export default AlcReport;
