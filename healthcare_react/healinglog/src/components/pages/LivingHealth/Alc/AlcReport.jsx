import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Title from '../../../util/Title';
import Chart from '../../../util/Chart';
import Table from '../../../util/Table';
import Btn from '../../../util/Btn';
import Pagination from '../../../util/Pagination';
import Modal from '../../../util/Modal';
import InputTag from '../../../util/Input';

import { setTotalCount, resetPaging } from '../../../../redux/pagingSlice';
import { open, close } from '../../../../redux/modalSlice';
import ContentLayout from '../../../util/ContentLayout';
import DateBtn from '../../../util/DateBtn';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getRoleFromToken, isTokenExpired } from '../../../util/JwtUtil';
import { BASE_URL } from '../../../services/config';

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

const YearDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  font-weight: bold;
  gap: 30px;
  height: 0px;
  margin-bottom: 20px;
  margin-right: 240px;
`;

const YearBtn = styled.button`
  background-color: transparent;
  justify-content: center;
  border: none;
  padding: 0px 5px;
  cursor: pointer;
  font-size: 34px;
  font-weight: bold;
`;

const MonthDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  font-weight: bold;
  gap: 30px;
  height: 0px;
  margin-bottom: 20px;
  margin-right: 200px;
`;

const MonthBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0px 5px;
  cursor: pointer;
  font-size: 34px;
  font-weight: bold;
`;

const WeekDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  font-weight: bold;
  gap: 30px;
  height: 0px;
  margin-bottom: 20px;
  margin-right: 220px;
`;

const WeekBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0px 5px;
  cursor: pointer;
  font-size: 34px;
  font-weight: bold;
`;

const SearchArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 9px;
  margin-top: 10px;
`;

const Input = styled.input`
  box-sizing: border-box;
  font-family: '맑은 고딕';
  height: 30px;
  padding: 0px 4px;
`;

const BottomDiv = styled.div`
  margin-top: 25px;
  margin-bottom: 35px;
`;

const AlcReport = () => {
  const dispatch = useDispatch();

  const [fullData, setFullData] = useState([]); // 전체 데이터 저장
  const [pagedData, setPagedData] = useState([]); // 페이징된 데이터
  const [filteredData, setFilteredData] = useState([]); // 차트용 필터링 데이터
  const [selectedRange, setSelectedRange] = useState('월'); // 기본값 '월'
  const [selectChart, setSelectChart] = useState('Line'); // 그래프 모양 정하는 state

  const boardType = 'AlcReport';
  const { currentPage, boardLimit } = useSelector((state) => state.paging[boardType] || {});
  const offset = Math.max((currentPage - 1) * boardLimit, 0);

  const [selectedDrink, setSelectedDrink] = useState(null);

  const alcoholOptions = [
    { name: '소주', alc: 17, cc: 50 },
    { name: '맥주', alc: 5, cc: 250 },
    { name: '막걸리', alc: 6, cc: 200 },
    { name: '와인', alc: 12, cc: 150 },
    { name: '칵테일', alc: 10, cc: 60 },
  ];

  const token = localStorage.getItem('token');
  const navi = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false); // 로그인 여부 체크

  const [dataVoList, setDataVoList] = useState([]);
  const [chartVoList, setChartVoList] = useState([]);

  useEffect(() => {
    if (!token || isTokenExpired(token) || getRoleFromToken(token) == 'ROLE_ADMIN') {
      window.localStorage.removeItem('token'); // 토큰 삭제
      navi('/login'); // 로그인 페이지로 이동
      Swal.fire({
        icon: 'warning',
        title: '로그인이 필요합니다',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      });
    } else {
      setIsAuthorized(true); // 로그인 성공 시 데이터 요청 가능
    }
  }, [navi, token]);

  const url = `${BASE_URL}/api/alc/report/list`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  //fetch 실행
  useEffect(() => {
    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => {
        if (!isAuthorized) {
          return;
        }
        if (data.length > 0) {
          dispatch(setTotalCount({ boardType, totalCount: data.length })); // 페이징 처리할때 totalCount 저장
          setFullData(data);
        } else {
          dispatch(resetPaging({ boardType }));
          setFullData([]);
        }
      })
      .catch(() => {});
  }, [isAuthorized, token]);

  // 테이블 페이징 처리
  useEffect(() => {
    setPagedData(fullData.slice(offset, offset + boardLimit));
  }, [fullData, currentPage, boardLimit]);

  // 차트용 필터링 데이터의 마지막 기록 날짜를 기준으로 최근 7일간의 데이터와 해당 날짜가 포함된 달의 데이터를 가져옴
  const filterData = (type) => {
    //데이터의 최근날짜
    const voList = [];

    for (const vo of fullData) {
      voList.push(vo.enrollDate);
    }

    const latestDate = new Date(voList[0]);

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
      const currentYear = latestDate.getFullYear();

      return fullData.filter((item) => {
        const [year] = item.enrollDate.split('-').map(Number);
        return year === currentYear;
      });
    }

    return fullData; // 전체 기간
  };

  const dataBtn = ['월', '년'];

  //테스트
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
  const currentYearMonth = currentYear + '-' + currentMonth;
  const currentWeek = new Date().getFullYear();
  const [week, setWeek] = useState(currentWeek);

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(`${year}-${String(new Date().getMonth() + 1).padStart(2, '0')}`);

  const handleIncrease = () => {
    setYear((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setYear((prev) => prev - 1);
  };

  const handleIncreaseMonth = () => {
    setMonth((prev) => {
      const [y, m] = prev.split('-').map(Number);
      const newMonth = m === 12 ? 1 : m + 1;
      const newYear = newMonth === 1 ? y + 1 : y;
      setYear(newYear);
      return `${newYear}-${String(newMonth).padStart(2, '0')}`;
    });
  };

  const handleDecreaseMonth = () => {
    setMonth((prev) => {
      const [y, m] = prev.split('-').map(Number);
      const newMonth = m === 1 ? 12 : m - 1;
      const newYear = newMonth === 12 ? y - 1 : y;
      setYear(newYear);
      return `${newYear}-${String(newMonth).padStart(2, '0')}`;
    });
  };

  const getYearalcList = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${BASE_URL}/api/alc/report/list`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alcList = await getYearalcList(); // 전체 데이터 가져오기

        let filteredData = [];

        if (selectedRange === '주') {
          // 최근 7일 데이터 필터링
          const today = new Date();
          const oneWeekAgo = new Date(today);
          oneWeekAgo.setDate(today.getDate() - 7);

          filteredData = alcList.filter((item) => {
            const itemDate = new Date(item.enrollDate);
            return itemDate >= oneWeekAgo && itemDate <= today;
          });
        } else if (selectedRange === '월') {
          // 월별 데이터 필터링
          filteredData = alcList.filter((item) => {
            const itemDate = new Date(item.enrollDate);
            return (
              itemDate.getFullYear() === year &&
              String(itemDate.getMonth() + 1).padStart(2, '0') === month.split('-')[1]
            );
          });
        } else if (selectedRange === '년') {
          // 연도별 데이터 필터링
          filteredData = alcList.filter((item) => {
            const itemYear = new Date(item.enrollDate).getFullYear();
            return itemYear === year;
          });
        }

        setFilteredData(filteredData);
      } catch (error) {}
    };

    fetchData();
  }, [selectedRange, year, month]);

  // 날짜 기준 오름차순 정렬 (과거 → 현재)
  const sortedData = [...filteredData].sort(
    (a, b) => new Date(a.endDate || a.enrollDate) - new Date(b.endDate || b.enrollDate)
  );

  //X축 라벨을 `selectedRange`에 따라 다르게 표시
  const labels = sortedData.map((vo) => {
    const dateStr = vo.endDate || vo.enrollDate || '날짜 없음';

    if (dateStr === '날짜 없음') return dateStr; // 날짜 정보 없으면 그대로 반환

    const dateParts = dateStr.split('-'); // 날짜를 '-' 기준 분할
    const [year, month, day] = dateParts;

    if (selectedRange === '년') {
      return `${month}-${day}`; // 년 단위: MM-DD 형식
    }
    if (selectedRange === '월') {
      return `${parseInt(day, 10)}일`; // 월 단위: "D일" 형식
    }

    return dateStr;
  });

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

  // 테이블에서 술 선택 시 상태 업데이트
  const handleDrinkSelection = (drink) => {
    setSelectedDrink(drink);
  };

  //인풋 안 쪽에 들어가는 데이터 ~~~Vo에 들어있는 이름으로 맞춰주기
  const initialInputData = { alcType: '', abv: '', cc: '', enrollDate: '' };
  // 모달 안 쪽 인풋에 데이터 관리
  const [inputData, setInputData] = useState(initialInputData);
  // 페이징 쪽에 있는 자료 활용
  // 화면 렌더링
  const [num, setNum] = useState('');

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

  const handleSubmit = (e) => {
    Swal.fire({
      title: '등록하시겠습니까?',
      icon: 'question', // 아이콘 유형 (success, warning, error 등)
      showCancelButton: true, // 취소 버튼 표시
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '등록',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/api/alc/report/write`, {
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
            return resp.text();
          })
          .then((data) => {
            // 실제 등록이 성공적으로 처리되었다면 성공 알림을 띄움
            Swal.fire({
              title: '등록 완료!',
              text: '등록이 성공적으로 처리되었습니다.',
              icon: 'success',
              confirmButtonColor: '#3085d6',
            }).then(() => {
              // 모달 닫기
              dispatch(close(e.target.title));
              // 페이지 새로고침 등 필요한 추가 동작
              window.location.reload();
            });
          })
          .catch((error) => {
            Swal.fire({
              title: '등록 실패',
              text: '오류가 발생했습니다. 다시 시도해주세요.',
              icon: 'error',
              confirmButtonColor: '#d33',
            });
          });
      }
    });
  };

  //수정모달
  const handleEditSubmit = (e) => {
    Swal.fire({
      title: '수정하시겠습니까?',
      icon: 'question', // 아이콘 유형
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '수정',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/api/alc/report/update`, {
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
            return resp.text(); // 또는 resp.json()
          })
          .then((data) => {
            // 수정 성공 시 다시 알림 표시
            Swal.fire({
              title: '수정 완료!',
              text: '수정이 성공적으로 처리되었습니다.',
              icon: 'success',
              confirmButtonColor: '#3085d6',
            }).then(() => {
              // 모달 닫기
              dispatch(close('음주 수정'));
              // 필요 시 페이지 새로고침
              window.location.reload();
            });
          })
          .catch((error) => {
            // 수정 실패 시 알림
            Swal.fire({
              title: '수정 실패',
              text: '오류가 발생했습니다. 다시 시도해주세요.',
              icon: 'error',
              confirmButtonColor: '#d33',
            });
          });
      }
    });
  };

  //삭제모달

  const handleDeleteSubmit = (e) => {
    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true, // 취소 버튼 표시
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        // 삭제 fetch 호출
        fetch(`${BASE_URL}/api/alc/report/delete`, {
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
            return resp.text(); // 또는 resp.json()
          })
          .then((data) => {
            // 삭제 성공 시 메시지
            Swal.fire({
              title: '삭제 완료!',
              text: '데이터가 삭제되었습니다.',
              icon: 'success',
              confirmButtonColor: '#3085d6',
            }).then(() => {
              dispatch(close('음주 수정'));
              // 필요 시 페이지 새로고침
              window.location.reload();
            });
          })
          .catch((error) => {
            Swal.fire({
              title: '삭제 실패',
              text: '오류가 발생했습니다. 다시 시도해주세요.',
              icon: 'error',
              confirmButtonColor: '#d33',
            });
          });
      }
    });
  };

  // datasetData에서 가장 큰 값 찾기
  const maxValue = Math.max(...alcList);

  // yMax 값 설정
  const yMaxValue = maxValue + maxValue * 0.2;
  return (
    <>
      <Title>음주관리</Title>

      <div></div>

      <ContentLayout>
        <SearchArea>
          {selectedRange === '주' ? (
            <WeekDiv>
              <WeekBtn></WeekBtn>
              <span>{week}</span>
              <WeekBtn></WeekBtn>
            </WeekDiv>
          ) : selectedRange === '월' ? (
            <MonthDiv>
              <MonthBtn onClick={handleDecreaseMonth}>{'<'}</MonthBtn>
              <span>{month}</span>
              <MonthBtn onClick={handleIncreaseMonth}>{'>'}</MonthBtn>
            </MonthDiv>
          ) : selectedRange === '년' ? (
            <YearDiv>
              <YearBtn onClick={handleDecrease}>{'<'}</YearBtn>
              <span>{year}</span>
              <YearBtn onClick={handleIncrease}>{'>'}</YearBtn>
            </YearDiv>
          ) : (
            ''
          )}
          <DateBtn dataBtn={dataBtn} onSelect={setSelectedRange} onChange={setSelectChart}></DateBtn>
        </SearchArea>
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
                f={handleChange}
              />
            </div>

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
            </div>
          </div>
          <ModalContainer>
            <Btn
              title={'음주 등록'}
              f={handleSubmit}
              mt={'10'}
              mb={'20'}
              mr={'-10'}
              c={'#FF7F50'}
              // font color
              fc={'white'}
              str={'등록'}
            ></Btn>
          </ModalContainer>
        </Modal>

        <Modal title="음주 수정">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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
        <BottomDiv>
          <Pagination boardType={boardType}></Pagination>
        </BottomDiv>

        <div></div>
      </ContentLayout>
      <div></div>
    </>
  );
};

export default AlcReport;
