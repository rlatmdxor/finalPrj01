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

import { open, close as modalClose } from '../../../../redux/modalSlice';
import { setTotalCount, resetPaging } from '../../../../redux/pagingSlice';
import ContentLayout from '../../../util/ContentLayout';
import Chart from '../../../util/Chart';
import DateBtn from '../../../util/DateBtn';
import { data } from 'react-router-dom';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 300px; // 항목수에 비례해서 주시면 됩니다.
  top: 20px;
  left: 40px;
  grid-template-columns: 3fr 3fr; // 글자수만큼 fr 주면 됩니다. ex) 유산소 3글자니까 3fr
`;

const BtnContainer = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 1030px;
  gap: 15px;
`;

const LineDiv = styled.div`
  height: 50px;
`;

const DataDiv = styled.div`
  margin-left: 1100px;
`;

const CigaretteReport = () => {
  const url = 'http://127.0.0.1/api/cigarette/list';

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

  const boardType = 'CigaretteReport';
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

    return fullData; // 전체 기간
  };

  // 처음에 일주일 데이터 로드
  useEffect(() => {
    setFilteredData(filterData('week'));
  }, [fullData]);

  const dataBtn = ['주', '월'];
  const dispatch = useDispatch();

  const labels = filteredData.map((vo) => vo.endDate);

  const getDaysConsumed = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // 시작일부터 포함하여 계산
  };

  const datasetData = filteredData.map((vo) => {
    const days = getDaysConsumed(vo.startDate, vo.endDate);
    return days > 0 ? (1 / days).toFixed(2) : 0; // 1 / 소모일수
  });

  const cigaretteList = [];
  // 차트에 들어갈 1번 데이터의 내용
  for (const vo of filteredData) {
    cigaretteList.unshift(vo.endDate);
  }

  const modals = useSelector((state) => state.modal.modals || {}); // 여러 모달 상태 가져오기
  const isModalOpen = modals['흡연 수정'] === 'block'; // 특정 모달이 열려 있는지 확인

  // ✅ 선택된 데이터 저장 초기값 빈객체로
  const [selectedData, setSelectedData] = useState({});

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

  // ✅ 게시글 클릭 시 수정 모달 열기
  const handleRowClick = (vo) => {
    console.log('✅ 클릭한 데이터:', vo);
    setSelectedData(vo);
    dispatch(open({ title: '흡연 수정', value: 'block' })); // Redux 상태 변경
  };

  // ✅ 수정 버튼 클릭 시 데이터 업데이트 (현재는 console.log로 확인)
  const handleEdit = () => {
    console.log('수정된 데이터:', selectedData);
    dispatch(modalClose('흡연 수정')); // 모달 닫기
  };

  return (
    <>
      <Modal title="흡연 등록" type={'add'}>
        <InputTag type="text" placeholder="담배명" title="담배명" size={'size3'} mb={'10'} mt={'5'}></InputTag>
        <InputTag type="number" placeholder="타르량" title="타르량" size={'size3'} mb={'10'} mt={'5'}></InputTag>
        <InputTag type="date" placeholder="시작날짜" title="시작날짜" size={'size3'} mb={'10'} mt={'5'}></InputTag>
        <InputTag type="date" placeholder="종료날짜" title="종료날짜" size={'size3'} mb={'10'} mt={'5'}></InputTag>
        <InputTag type="text" placeholder="특이사항" title="특이사항" size={'size3'} mb={'10'} mt={'5'}></InputTag>
      </Modal>

      {modals['흡연 수정'] === 'block' && selectedData && (
        <Modal title="흡연 수정" type="edit" f={handleEdit}>
          <InputTag
            type="text"
            placeholder="담배명"
            title="담배명"
            size="size3"
            mb="10"
            mt="5"
            value={selectedData?.cigarette || ''}
            onChange={(e) => setSelectedData({ ...selectedData, cigarette: e.target.value })}
          />
          <InputTag
            type="number"
            placeholder="타르량"
            title="타르량"
            size="size3"
            mb="10"
            mt="5"
            value={selectedData?.tar || ''}
            onChange={(e) => setSelectedData({ ...selectedData, tar: e.target.value })}
          />
          <InputTag
            type="date"
            placeholder="시작날짜"
            title="시작날짜"
            size="size3"
            mb="10"
            mt="5"
            value={selectedData?.startDate || ''}
            onChange={(e) => setSelectedData({ ...selectedData, startDate: e.target.value })}
          />
          <InputTag
            type="date"
            placeholder="종료날짜"
            title="종료날짜"
            size="size3"
            mb="10"
            mt="5"
            value={selectedData?.endDate || ''}
            onChange={(e) => setSelectedData({ ...selectedData, endDate: e.target.value })}
          />
        </Modal>
      )}

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
          // yMax={200} // y축 최댓값 상황에 맏춰서 지정 아무것도 안적으면 자동으로 짜준다.
          yMin={0} // y축 최솟값 지정 아무것도 안적으면 자동으로 짜줌 음수도 입력가능
          xLabelVisible={true} // 추가: X축 라벨 표시 여부 (기본값: true)
        />

        <BtnContainer>
          {/* <div> */}
          <div
            onClick={() => {
              dispatch(open({ title: '흡연 등록', value: 'block' }));
            }}
          >
            <Btn str={'등록'} c={'#FF7F50'} fc={'white'}></Btn>
          </div>
          {/* </div> */}
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
            {/* 한개의 날짜에 여러개의 데이터가 속해있고 그 데이터를 묶어서 표시하고 싶을때 사용하는 방식임 잘 모르겠으면 혈압
            페이지 찾아와서 참고 */}
            {Object.entries(
              pagedData.reduce((acc, vo) => {
                if (!acc[vo.endDate]) acc[vo.endDate] = [];
                acc[vo.endDate].push(vo);
                return acc;
              }, {})
            ).map(([endDate, records]) =>
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
                      {vo.no}
                    </td>
                  )}
                  <td>{vo.cigaretteName}</td>
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
              ))
            )}
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
