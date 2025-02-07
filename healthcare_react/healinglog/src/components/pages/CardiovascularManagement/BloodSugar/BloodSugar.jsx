import React, { useEffect, useState } from 'react';
import Modal from '../../../util/Modal'; // 모달 컴포넌트
import Input from '../../../util/Input'; // 입력 컴포넌트
import Title from '../../../util/Title';
import Navi from '../../../util/Navi';
import Chart from '../../../util/Chart';
import styled from 'styled-components';
import RadiusTable from '../../../util/RadiusTable';
import { useDispatch, useSelector } from 'react-redux';
import { resetPaging, setTotalCount } from '../../../../redux/pagingSlice';
import Btn from '../../../util/Btn';
import { open } from '../../../../redux/modalSlice';
import Pagination from '../../../util/Pagination';
import DateBtn from '../../../util/DateBtn';
import ContentLayout from '../../../util/ContentLayout';

const BtnContainer = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 1030px;
  gap: 15px;
`;

const LineDiv = styled.div`
  height: 50px;
`;

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 300px; // 항목수에 비례해서 주시면 됩니다.
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 6fr; // 글자수만큼 fr 주면 됩니다. ex) 유산소 3글자니까 3fr
`;

const BloodSugar = () => {
  const url = 'http://127.0.0.1:80/api/bloodSugar/list';

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ memberNo: '1' }),
  };

  const [fullData, setFullData] = useState([]); // 전체 데이터 저장
  const [pagedData, setPagedData] = useState([]); // 페이징된 데이터
  const [filteredData, setFilteredData] = useState([]); // 차트용 필터링 데이터
  const [selectedRange, setSelectedRange] = useState('주'); // 기본값 '일'
  const [selectChart, setSelectChart] = useState('Line'); // 그래프 모양 정하는 state

  const boardType = 'bloodSugar';
  const { currentPage, boardLimit } = useSelector((state) => state.paging[boardType] || {});
  const offset = (currentPage - 1) * boardLimit;

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
    } else {
      setFilteredData(filterData('all'));
    }
  }, [selectedRange]);

  // 차트용 필터링 데이터의 마지막 기록 날짜를 기준으로 최근 7일간의 데이터와 해당 날짜가 포함된 달의 데이터를 가져옴
  const filterData = (type) => {
    // const today = new Date();       // 오늘 날짜 가져오기

    const voList = []; // 데이터의 가장 최신 날짜를 가져오기 위한 빈 배열

    for (const vo of fullData) {
      voList.push(vo.day);
    }
    const latestDate = new Date(voList[0]); // 가장 최근에 입력된 데이터 날짜

    if (type === 'week') {
      // 최근에 입력한 데이터를 기준으로 최신7일간의 데이터를 가져오기
      const oneWeekAgo = new Date(latestDate);
      oneWeekAgo.setDate(latestDate.getDate() - 7);

      return fullData.filter((item) => {
        const itemDate = new Date(item.day); // 문자열을 Date 객체로 변환
        return itemDate >= oneWeekAgo && itemDate <= latestDate; // 최신 날짜 기준 7일 이내 데이터
      });
    }

    if (type === 'month') {
      // 최근에 입력한 데이터를 기준으로 해당 월의 데이터를 가져오기
      const currentYear = latestDate.getFullYear();
      const currentMonth = latestDate.getMonth() + 1; // getMonth()는 0부터 시작

      return fullData.filter((item) => {
        const [year, month] = item.day.split('-').map(Number);
        return year === currentYear && month === currentMonth;
      });
    }

    return fullData; // 전체 기간
  };

  // 처음에 일주일 데이터 로드
  useEffect(() => {
    setFilteredData(filterData('week'));
  }, [fullData]);

  const dataBtn = ['주', '월'];
  const dispatch = useDispatch();

  const labels = [];

  // 차트에 들어갈 x축 라벨의 내용
  for (const vo of filteredData) {
    // unshift는 배열의 뒤에서부터 push하는 역할을 한다.
    // 예를들어 push를 이용하면 [1, 2, 3] 이렇게 들어간다면 unshift를 사용한다면 [3, 2, 1] 이렇게 저장됨
    labels.unshift(vo.enrollDate);
  }

  const sugarList = [];
  // 차트에 들어갈 1번 데이터의 내용
  for (const vo of filteredData) {
    sugarList.unshift(vo.sugar);
  }

  const dataset = [
    {
      // 차트에서 그래프가 나타내는 이름 표시 ex)수축기 혈압 , 이완기 혈압
      // Bar , Pie , Doughnut에서는 마우스를 해당 부분에 호버하면 이 label의 이름이 표시된다.
      label: '혈당 (mg/dL)',

      data: sugarList, // 위에서 뽑아온 데이터
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

  return (
    <>
      <Title>혈당</Title>
      <NaviContainer>
        <Navi target="bloodSugar" tag={'혈당 기록'}></Navi>
        <Navi target="insulin" tag={'인슐린 기록지'}></Navi>
      </NaviContainer>

      <ContentLayout>
        {/* dateBtn을 호출할때 그래프 타입을 바꿀수있는 setState (onChange) 와 단위기간을 바꿀 수 있는 setState(onSelect) 를 넘겨준다 */}
        <DateBtn dataBtn={dataBtn} onSelect={setSelectedRange} onChange={setSelectChart}></DateBtn>

        <Chart
          chartType={selectChart} // 차트 타입지정
          labels={labels} // 위랑 동일
          dataset={dataset} // 위랑 동일
          width={100} // 위랑 동일
          height={450} // 위랑 동일
          xAxisColor="rgba(54, 162, 235, 1)" // 위랑 동일
          yAxisColor="rgba(255, 159, 64, 1)" // 위랑 동일
          yMax={500} // y축 최댓값 상황에 맏춰서 지정 아무것도 안적으면 자동으로 짜준다.
          yMin={0} // y축 최솟값 지정 아무것도 안적으면 자동으로 짜줌 음수도 입력가능
          xLabelVisible={true} // 추가: X축 라벨 표시 여부 (기본값: true)
        />

        <BtnContainer>
          <div
            onClick={() => {
              dispatch(open({ title: '수면 등록', value: 'block' }));
            }}
          >
            <Btn str={'등록'} c={'#FF7F50'} fc={'white'}></Btn>
          </div>
        </BtnContainer>

        <RadiusTable width="100%" thBgColor="" radius="0px">
          <thead>
            <tr>
              <th>측정일</th>
              <th>측정시간</th>
              <th>혈당 (mg/dL)</th>
              <th colSpan={3}>특이사항</th>
            </tr>
          </thead>

          <tbody>
            {/* 한개의 날짜에 여러개의 데이터가 속해있고 그 데이터를 묶어서 표시하고 싶을때 사용하는 방식임 잘 모르겠으면 혈압
            페이지 찾아와서 참고 */}
            {Object.entries(
              pagedData.reduce((acc, vo) => {
                if (!acc[vo.day]) acc[vo.day] = [];
                acc[vo.day].push(vo);
                return acc;
              }, {})
            ).map(([day, records]) =>
              records.map((vo, index) => (
                <tr
                  key={vo.no}
                  // onClick={() => {
                  //   window.location.href = `/board?bno=${vo.no}`;
                  // }}
                >
                  {index === 0 && (
                    <td
                      rowSpan={records.length}
                      style={{ verticalAlign: 'middle', fontWeight: 'bold', textAlign: 'center' }}
                    >
                      {day}
                    </td>
                  )}
                  <td>{vo.time}</td>
                  <td>{vo.sugar}</td>
                  <td>{vo.note}</td>
                </tr>
              ))
            )}
          </tbody>
        </RadiusTable>
        <LineDiv />
        <LineDiv />
        <Pagination boardType={boardType}></Pagination>
        <LineDiv />
      </ContentLayout>
    </>
  );
};

export default BloodSugar;
