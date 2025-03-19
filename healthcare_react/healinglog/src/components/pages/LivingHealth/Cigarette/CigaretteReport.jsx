import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';

import Title from '../../../util/Title';
import Modal from '../../../util/Modal';
import Btn from '../../../util/Btn';
import InputTag from '../../../util/Input';
import Table from '../../../util/Table';
import Pagination from '../../../util/Pagination';

import { open, close } from '../../../../redux/modalSlice';
import { setTotalCount, resetPaging } from '../../../../redux/pagingSlice';
import ContentLayout from '../../../util/ContentLayout';
import Chart from '../../../util/Chart';
import DateBtn from '../../../util/DateBtn';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getRoleFromToken, isTokenExpired } from '../../../util/JwtUtil';
import { BASE_URL } from '../../../services/config';

const YearDiv = styled.div`
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
  margin-right: 160px;
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

const BottomDiv = styled.div`
  margin-top: 25px;
  margin-bottom: 35px;
`;

const CigaretteReport = () => {
  const dispatch = useDispatch();
  const [fullData, setFullData] = useState([]); // 전체 데이터 저장
  const [pagedData, setPagedData] = useState([]); // 페이징된 데이터
  const [filteredData, setFilteredData] = useState([]); // 차트용 필터링 데이터
  const [selectedRange, setSelectedRange] = useState('월'); // 기본값 '주'
  const [selectChart, setSelectChart] = useState('Line'); // 그래프 모양 정하는 state

  const boardType = 'CigaretteReport';
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

  //토큰관련코드
  const token = localStorage.getItem('token');

  const navi = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false); // 로그인 여부 체크

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

  const url = `${BASE_URL}/api/cigarette/report/list`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // fetch실행
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
      voList.push(vo.endDate);
    }

    const latestDate = new Date(voList[0]);

    if (type === 'week') {
      // 최근에 입력한 데이터를 기준으로 최신7일간의 데이터를 가져오기
      const oneWeekAgo = new Date(latestDate);
      oneWeekAgo.setDate(latestDate.getDate() - 7);

      return fullData.filter((item) => {
        const itemDate = new Date(item.endDate); // 문자열을 Date 객체로 변환
        return itemDate >= oneWeekAgo && itemDate <= latestDate; // 최신 날짜 기준 7일 이내 데이터
      });
    }

    if (type === 'month') {
      // 최근에 입력한 데이터를 기준으로 해당 월의 데이터를 가져오기
      const currentYear = latestDate.getFullYear();
      const currentMonth = latestDate.getMonth() + 1; // getMonth()는 0부터 시작

      return fullData.filter((item) => {
        const [year, month] = item.endDate.split('-').map(Number);
        return year === currentYear && month === currentMonth;
      });
    }

    if (type === 'year') {
      // 최근에 입력한 데이터를 기준으로 해당 년의 데이터를 가져오기
      const currentYear = latestDate.getFullYear();

      return fullData.filter((item) => {
        const [year] = item.endDate.split('-').map(Number);
        return year === currentYear;
      });
    }

    return fullData; // 전체 기간
  };

  // 처음에 일주일 데이터 로드
  useEffect(() => {
    setFilteredData(filterData('month'));
  }, [fullData]);

  //테스트
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
  const currentYearMonth = currentYear + '-' + currentMonth;
  const currentWeek = new Date().getFullYear();
  const [week, setWeek] = useState(currentWeek);
  // const [year, setYear] = useState(currentYear);
  // const [month, setMonth] = useState(currentYearMonth);

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

  const handleIncreaseWeek = () => {
    setWeek((prev) => prev + 1); // 주 증가
  };

  const handleDecreaseWeek = () => {
    setWeek((prev) => prev - 1); // 주 감소
  };
  const handleDateChange = (e) => {
    setMonth(e.target.value);
  };

  const getYearCigaretteList = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${BASE_URL}/api/cigarette/report/list`, {
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
        const cigaretteList = await getYearCigaretteList(); // 전체 데이터 가져오기

        let filteredData = [];

        if (selectedRange === '주') {
          // 최근 7일 데이터 필터링
          const today = new Date();
          const oneWeekAgo = new Date(today);
          oneWeekAgo.setDate(today.getDate() - 7);

          filteredData = cigaretteList.filter((item) => {
            const itemDate = new Date(item.endDate);
            return itemDate >= oneWeekAgo && itemDate <= today;
          });
        } else if (selectedRange === '월') {
          // 월별 데이터 필터링
          filteredData = cigaretteList.filter((item) => {
            const itemDate = new Date(item.endDate);
            return (
              itemDate.getFullYear() === year &&
              String(itemDate.getMonth() + 1).padStart(2, '0') === month.split('-')[1]
            );
          });
        } else if (selectedRange === '년') {
          // 연도별 데이터 필터링
          filteredData = cigaretteList.filter((item) => {
            const itemYear = new Date(item.endDate).getFullYear();
            return itemYear === year;
          });
        }

        setFilteredData(filteredData);
      } catch (error) {}
    };

    fetchData();
  }, [selectedRange, year, month, week]);
  //테스트

  const dataBtn = ['월', '년'];

  // 날짜 기준 오름차순 정렬 (과거 → 현재)
  const sortedData = [...filteredData].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

  // X축: 정렬된 날짜 리스트
  const labels = sortedData.map((vo) => {
    const dateParts = vo.endDate.split('-'); // 날짜를 '-'로 나눔
    const [year, month, day] = dateParts; // 연도, 월, 일을 분리

    if (selectedRange === '년') {
      // 년별 데이터일 때는 월-일 형식으로 표시 (ex: "03-01")
      return `${month}-${day}`;
    }

    if (selectedRange === '월') {
      // 월별 데이터일 때는 월-일 형식으로 표시 (ex: "03-01")
      return `${parseInt(day)}일`;
    }

    // 일별 데이터는 날짜 그대로 표시
    if (day) {
      return `${parseInt(day)}일`;
    }

    return vo.endDate;
  });

  const getDaysConsumed = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // 시작일부터 포함하여 계산
  };

  const cigaretteList = sortedData.map((vo) => {
    const days = getDaysConsumed(vo.startDate, vo.endDate);
    return days > 0 ? parseFloat((1 / days).toFixed(2)) : 0;
  });

  // const cigaretteList = [];
  // 차트에 들어갈 1번 데이터의 내용
  // for (const vo of filteredData) {
  //   cigaretteList.push(vo.endDate);
  // }

  const dataset = [
    {
      // 차트에서 그래프가 나타내는 이름 표시 ex)수축기 혈압 , 이완기 혈압
      // Bar , Pie , Doughnut에서는 마우스를 해당 부분에 호버하면 이 label의 이름이 표시된다.

      label: '일당 소모갑 수',
      data: cigaretteList,
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

  // datasetData에서 가장 큰 값 찾기
  const maxValue = Math.max(...cigaretteList);

  // yMax 값 설정 (최대값 + 0.5)
  const yMaxValue = maxValue + maxValue * 0.2;

  //인풋 안 쪽에 들어가는 데이터 ~~~Vo에 들어있는 이름으로 맞춰주기
  const initialInputData = { cigarette: '', startDate: '', endDate: '', tar: '' };
  // 모달 안 쪽 인풋에 데이터 관리
  const [inputData, setInputData] = useState(initialInputData);
  // 페이징 쪽에 있는 자료 활용
  // const data = dataVoList.slice(offset, offset + boardLimit);
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

  // 인풋 입력값 보내기
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
        fetch(`${BASE_URL}/api/cigarette/report/write`, {
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
        fetch(`${BASE_URL}/api/cigarette/report/update`, {
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
              dispatch(close('흡연 수정'));
              // 필요 시 페이지 새로고침
              window.location.reload();
            });
          })
          .catch((error) => {
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

  const handleDeleteSubmit = (e) => {
    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'warning', // 경고 아이콘
      showCancelButton: true, // 취소 버튼 표시
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        // 삭제 fetch 호출
        fetch(`${BASE_URL}/api/cigarette/report/delete`, {
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
              // 모달 닫기
              dispatch(close('흡연 수정'));
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

  return (
    <>
      <Title>흡연관리</Title>

      <div></div>

      <ContentLayout>
        <SearchArea>
          {selectedRange === '월' ? (
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
          dataset={dataset} // 위랑 동일111111111111
          width={100} // 위랑 동일
          height={450} // 위랑 동일
          xAxisColor="rgba(54, 162, 235, 1)" // 위랑 동일
          yAxisColor="rgba(255, 159, 64, 1)" // 위랑 동일
          yMax={yMaxValue} // y축 최대값 찾아서 최대값+n값으로 지정해둠
          yMin={0} // y축 최솟값 지정 아무것도 안적으면 자동으로 짜줌 음수도 입력가능
          xLabelVisible={true} // 추가: X축 라벨 표시 여부 (기본값: true)
        />

        <Modal title="흡연 등록">
          <InputTag
            type="text"
            name="cigarette"
            title="담배명"
            placeholder="담배명"
            value={inputData.cigarette}
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={handleChange}
          ></InputTag>
          <InputTag
            type="date"
            name="startDate"
            title="시작일"
            value={inputData.startDate}
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={handleChange}
          ></InputTag>
          <InputTag
            type="date"
            name="endDate"
            title="다핀날"
            value={inputData.endDate}
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={handleChange}
          ></InputTag>
          <InputTag
            type="number"
            name="tar"
            title="타르량"
            placeholder="타르량"
            value={inputData.tar}
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={handleChange}
          ></InputTag>

          <ModalContainer>
            <Btn
              title={'흡연 등록'}
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

        <Modal title="흡연 수정">
          <InputTag
            type="text"
            name="cigarette"
            title="담배명"
            placeholder="담배명"
            value={inputData.cigarette}
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={handleChange}
          ></InputTag>
          <InputTag
            type="date"
            name="startDate"
            title="시작일"
            value={inputData.startDate}
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={handleChange}
          ></InputTag>
          <InputTag
            type="date"
            name="endDate"
            title="다핀날"
            value={inputData.endDate}
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={handleChange}
          ></InputTag>
          <InputTag
            type="number"
            name="tar"
            title="타르량"
            placeholder="타르량"
            value={inputData.tar}
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={handleChange}
          ></InputTag>

          <ModalContainer>
            <Btn
              title={'흡연 수정'}
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
              dispatch(open({ title: '흡연 등록', value: 'block' }));
            }}
          >
            <Btn mt={'50'} mr={'46'} mb={'20'} str={'등록'} c={'#FF7F50'} fc={'white'}></Btn>
          </div>
        </BtnContainer>
        <Table>
          <thead>
            <tr>
              <th>기준일</th>
              <th>담배명</th>
              <th>타르수치</th>
              <th>시작날짜</th>
              <th>종료날짜</th>
              <th>소모일</th>
              <th>일당 소모갑수</th>
            </tr>
          </thead>

          <tbody>
            {pagedData.map((vo) => (
              <tr
                key={vo.no}
                onClick={() => {
                  setInputData({
                    no: vo.no,
                    cigarette: vo.cigarette,
                    tar: vo.tar,
                    startDate: vo.startDate,
                    endDate: vo.endDate,
                  });
                  // 모달 열기
                  dispatch(open({ title: '흡연 수정', value: 'block' }));
                }}
              >
                <td>{vo.endDate}</td>
                <td>{vo.cigarette}</td>
                <td>{vo.tar}</td>
                <td>{vo.startDate}</td>
                <td>{vo.endDate}</td>
                <td>{getDaysConsumed(vo.startDate, vo.endDate)}일</td>
                <td>
                  {getDaysConsumed(vo.startDate, vo.endDate) > 0
                    ? (1 / getDaysConsumed(vo.startDate, vo.endDate)).toFixed(2)
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div></div>
        <BottomDiv>
          <Pagination boardType={boardType}></Pagination>
        </BottomDiv>
        <div></div>
      </ContentLayout>
    </>
  );
};

export default CigaretteReport;
