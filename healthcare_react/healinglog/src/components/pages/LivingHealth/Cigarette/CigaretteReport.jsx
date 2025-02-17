import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';

import Title from '../../../util/Title';
import Modal from '../../../util/Modal';
import Btn from '../../../util/Btn';
import InputTag from '../../../util/Input';
import Navi from '../../../util/Navi';
import Table from '../../../util/Table';
import Pagination from '../../../util/Pagination';

import { open, close } from '../../../../redux/modalSlice';
import { setTotalCount, resetPaging } from '../../../../redux/pagingSlice';
import ContentLayout from '../../../util/ContentLayout';
import Chart from '../../../util/Chart';
import DateBtn from '../../../util/DateBtn';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 300px; // 항목수에 비례해서 주시면 됩니다.
  top: 20px;
  left: 40px;
  grid-template-columns: 3fr 3fr; // 글자수만큼 fr 주면 됩니다. ex) 유산소 3글자니까 3fr
`;

const CigaretteReport = () => {
  const url = 'http://127.0.0.1/api/cigarette/report/list';

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ memberNo: '1' }),
  };

  const [fullData, setFullData] = useState([]); // 전체 데이터 저장
  const [pagedData, setPagedData] = useState([]); // 페이징된 데이터
  const [filteredData, setFilteredData] = useState([]); // 차트용 필터링 데이터
  const [selectedRange, setSelectedRange] = useState('주'); // 기본값 '일'
  const [selectChart, setSelectChart] = useState('Line'); // 그래프 모양 정하는 state
  const dispatch = useDispatch();

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
    setFilteredData(filterData('week'));
  }, [fullData]);

  const dataBtn = ['주', '월', '년'];

  // 날짜 기준 오름차순 정렬 (과거 → 현재)
  const sortedData = [...filteredData].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

  // X축: 정렬된 날짜 리스트
  const labels = sortedData.map((vo) => vo.endDate);

  const getDaysConsumed = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // 시작일부터 포함하여 계산
  };

  const datasetData = sortedData.map((vo) => {
    const days = getDaysConsumed(vo.startDate, vo.endDate);
    return days > 0 ? parseFloat((1 / days).toFixed(2)) : 0;
  });

  const cigaretteList = [];
  // 차트에 들어갈 1번 데이터의 내용
  for (const vo of filteredData) {
    cigaretteList.push(vo.endDate);
  }

  // ✅ 선택된 데이터 저장 초기값 빈객체로
  const [selectedData, setSelectedData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 수정 모달 상태

  const dataset = [
    {
      // 차트에서 그래프가 나타내는 이름 표시 ex)수축기 혈압 , 이완기 혈압
      // Bar , Pie , Doughnut에서는 마우스를 해당 부분에 호버하면 이 label의 이름이 표시된다.
      // label: 'end_date',

      // data: systoleList, // 위에서 뽑아온 데이터 노션내역

      // data: [data.Cigarette_Duration], // 데이터 값 위의 labels와 같은 갯수 넣어야됨
      label: '일당 소모갑 수',
      data: datasetData,
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
  const maxValue = Math.max(...datasetData);

  // yMax 값 설정 (최대값 + 0.5)
  const yMaxValue = maxValue + 0.2;

  //인풋 안 쪽에 들어가는 데이터 ~~~Vo에 들어있는 이름으로 맞춰주기
  const initialInputData = { cigarette: '', startDate: '', endDate: '', tar: '' };
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
    fetch('http://127.0.0.1:80/api/cigarette/report/write', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputData),
    })
      .then((resp) => resp.text())
      .then((data) => {});
    //렌
    setNum(num - 1);
    // 입력 후 모달 창 닫기
    dispatch(close(e.target.title));
  };

  //수정모달
  const handleEditSubmit = (e) => {
    fetch('http://127.0.0.1:80/api/cigarette/report/update', {
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

    dispatch(close('흡연 수정'));
    //렌
    // setNum(num - 1);
    // 입력 후 모달 창 닫기
    // dispatch(close(e.target.title));
  };

  const handleDeleteSubmit = (e) => {
    fetch('http://127.0.0.1/api/cigarette/report/delete', {
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
    dispatch(close('흡연 수정'));
  };

  return (
    <>
      <Title>흡연관리</Title>
      <NaviContainer>
        <Navi target="cigarette" tag={'캘린더'}></Navi>
        <Navi target="cigarette/report" tag={'리포트'}></Navi>
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
        {/* <RadiusTable width="100%" thBgColor="" radius="0px"> */}
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
        <div>
          <Pagination boardType={boardType} />
        </div>
        <div></div>
      </ContentLayout>
    </>
  );
};

export default CigaretteReport;
