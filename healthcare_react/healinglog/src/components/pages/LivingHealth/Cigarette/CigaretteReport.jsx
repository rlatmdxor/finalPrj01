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

import { setSelection } from '../../../../redux/selectSlice';
import { open, close as modalClose } from '../../../../redux/modalSlice';
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

const BottomDiv = styled.div`
  display: flex;
  margin: 30px 50px 50px 50px;
  justify-content: space-between;
  align-items: center;
`;

const BtnContainer = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 875px;
  margin-bottom: 30px;
`;

const DataDiv = styled.div`
  margin-left: 1100px;
`;

const CigaretteReport = () => {
  const boardType = 'CigraetteBoard';
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState({ daily: [], weekly: [], monthly: [] });
  const [selectedView, setSelectedView] = useState('daily');

  const dataVoList = [
    { no: 1, cigarette: '레종 블루', tar: '3', start_date: '2025-01-16', end_date: '2025-01-23' },
    { no: 2, cigarette: '레종 블루', tar: '3', start_date: '2025-01-17', end_date: '2025-01-23' },
    { no: 3, cigarette: '레종 블루', tar: '3', start_date: '2025-01-18', end_date: '2025-01-23' },
    { no: 4, cigarette: '레종 블루', tar: '3', start_date: '2025-01-19', end_date: '2025-01-23' },
    { no: 5, cigarette: '레종 블루', tar: '3', start_date: '2025-01-20', end_date: '2025-01-23' },
    { no: 6, cigarette: '레종 블루', tar: '3', start_date: '2025-01-21', end_date: '2025-01-23' },
    { no: 7, cigarette: '레종 블루', tar: '3', start_date: '2025-01-22', end_date: '2025-01-23' },
    { no: 8, cigarette: '레종 블루', tar: '3', start_date: '2025-01-23', end_date: '2025-01-23' },
    { no: 9, cigarette: '레종 블루', tar: '3', start_date: '2025-01-23', end_date: '2025-01-23' },
    { no: 10, cigarette: '레종 블루', tar: '3', start_date: '2025-01-23', end_date: '2025-01-23' },
    { no: 11, cigarette: '레종 블루', tar: '3', start_date: '2025-01-23', end_date: '2025-01-23' },
    { no: 12, cigarette: '레종 블루', tar: '3', start_date: '2025-01-23', end_date: '2025-01-23' },
    { no: 13, cigarette: '레종 블루', tar: '3', start_date: '2025-01-24', end_date: '2025-01-23' },
    { no: 14, cigarette: '레종 블루', tar: '3', start_date: '2025-01-23', end_date: '2025-01-23' },
  ];

  //GPT시작

  useEffect(() => {
    dispatch(setTotalCount({ boardType, totalCount: dataVoList.length }));
    dispatch(resetPaging({ boardType }));
    processChartData();
  }, [boardType, dataVoList.length, dispatch]);

  // 🔹 일, 주, 월별 평균 소모갑수 계산
  const processChartData = () => {
    const dailyConsumption = {};
    const weeklyConsumption = {};
    const monthlyConsumption = {};

    dataVoList.forEach((vo) => {
      const startDate = new Date(vo.start_date);
      const endDate = new Date(vo.end_date);
      const daysConsumed = Math.ceil((endDate - startDate + 1) / (1000 * 60 * 60 * 24));

      if (daysConsumed > 0) {
        const perDay = 1 / daysConsumed;

        // ✅ 일별 데이터 저장
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().split('T')[0]; // YYYY-MM-DD 형식
          dailyConsumption[dateStr] = (dailyConsumption[dateStr] || 0) + perDay;
        }

        // ✅ 주별 데이터 저장 (연도 + 주차 기준)
        const weekKey = `${startDate.getFullYear()}-W${Math.ceil(startDate.getDate() / 7)}`;
        weeklyConsumption[weekKey] = (weeklyConsumption[weekKey] || 0) + perDay * daysConsumed;

        // ✅ 월별 데이터 저장
        const monthKey = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}`;
        monthlyConsumption[monthKey] = (monthlyConsumption[monthKey] || 0) + perDay * daysConsumed;
      }
    });

    // 🔹 차트 데이터로 변환
    setChartData({
      daily: Object.entries(dailyConsumption).map(([date, value]) => ({ date, value })),
      weekly: Object.entries(weeklyConsumption).map(([week, value]) => ({ week, value })),
      monthly: Object.entries(monthlyConsumption).map(([month, value]) => ({ month, value })),
    });
  };

  //GPT종료

  const startDate = new Date(dataVoList.start_date);
  const endDate = new Date(dataVoList.end_date);
  const daysConsumed = Math.ceil((endDate - startDate + 1) / (1000 * 60 * 60 * 24));
  const Cigarette_Duration = daysConsumed / 1;

  //일주월 누르면 바꾸게
  const handleDateBtnClick = (selected) => {
    setSelectedView(selected);
  };

  // Redux 상태 가져오기
  const { currentPage, boardLimit } = useSelector((state) => state.paging[boardType] || {});

  const modals = useSelector((state) => state.modal.modals || {}); // 여러 모달 상태 가져오기
  const isModalOpen = modals['흡연 수정'] === 'block'; // 특정 모달이 열려 있는지 확인

  // ✅ 선택된 데이터 저장 초기값 빈객체로
  const [selectedData, setSelectedData] = useState({});

  useEffect(() => {
    dispatch(setTotalCount({ boardType, totalCount: dataVoList.length }));
    dispatch(resetPaging({ boardType }));
  }, [boardType, dataVoList.length, dispatch]);

  // useEffect(() => {
  //   if (modals['흡연 수정'] === 'block' && selectedData) {
  //     setSelectedData((prev) => ({
  //       ...prev,
  //     }));
  //   }
  // }, [modals, selectedData]);

  const dataBtn = ['일', '주', '월'];

  const labels = [dataVoList.start_date];
  const dataset = [
    {
      // 차트에서 그래프가 나타내는 이름 표시 ex)수축기 혈압 , 이완기 혈압
      // Bar , Pie , Doughnut에서는 마우스를 해당 부분에 호버하면 이 label의 이름이 표시된다.
      label: 'tnftnftnf',

      data: [dataVoList.Cigarette_Duration], // 데이터 값 위의 labels와 같은 갯수 넣어야됨
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
  // 페이지네이션 로직
  const offset = (currentPage - 1) * (boardLimit || 5);
  const data = dataVoList.slice(offset, offset + (boardLimit || 5));

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
      {/* <Modal title="흡연 수정" type={'edit'}>
        <InputTag type="text" placeholder="담배명" title="담배명" size={'size3'} mb={'10'} mt={'5'}></InputTag>
        <InputTag type="number" placeholder="타르량" title="타르량" size={'size3'} mb={'10'} mt={'5'}></InputTag>
        <InputTag type="date" placeholder="시작날짜" title="시작날짜" size={'size3'} mb={'10'} mt={'5'}></InputTag>
        <InputTag type="date" placeholder="종료날짜" title="종료날짜" size={'size3'} mb={'10'} mt={'5'}></InputTag>
        <InputTag type="text" placeholder="특이사항" title="특이사항" size={'size3'} mb={'10'} mt={'5'}></InputTag>
      </Modal> */}

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
            value={selectedData?.start_date || ''}
            onChange={(e) => setSelectedData({ ...selectedData, start_date: e.target.value })}
          />
          <InputTag
            type="date"
            placeholder="종료날짜"
            title="종료날짜"
            size="size3"
            mb="10"
            mt="5"
            value={selectedData?.end_date || ''}
            onChange={(e) => setSelectedData({ ...selectedData, end_date: e.target.value })}
          />
        </Modal>
      )}

      <Title>흡연관리</Title>
      <NaviContainer>
        <Navi target="cigarette" tag={'캘린더'}></Navi>
        <Navi target="cigarette/report" tag={'리포트'}></Navi>
      </NaviContainer>

      <ContentLayout>
        {/* <DataDiv>
          <DateBtn dataBtn={dataBtn}></DateBtn>
        </DataDiv> */}

        <DataDiv>
          <DateBtn dataBtn={['일', '주', '월']} onClick={handleDateBtnClick} />
        </DataDiv>

        {/* <Chart
          chartType="Bar" // 차트 타입지정 Bar , Line , Pie , Doughnut 중 택1
          labels={labels} // 위에서 작성한 x축의 데이터
          dataset={dataset} // 위에서 작성한 차트의 데이터
          // width={100} // 차트 가로 사이즈임
          // height={100} // 차트 세로 사이즈임
          // margin={20}
          xAxisColor="rgba(75, 192, 192, 1)" // Bar , Line 에만 사용되고 x축 글씨색상임
          yAxisColor="rgba(255, 99, 132, 1)" // Bar , Line 에만 사용되고 y축 글씨색상임
        /> */}

        {/* <Chart
          chartType="Line" // 차트 타입지정
          labels={labels} // 위랑 동일
          dataset={dataset} // 위랑 동일
          width={600} // 위랑 동일
          height={400} // 위랑 동일
          xAxisColor="rgba(54, 162, 235, 1)" // x축 색상
          yAxisColor="rgba(255, 159, 64, 1)" // y축 색상
          // yMin={}     // y축 최소값 음수가 필요한거 아니면 주석 유지하면됨
          yMax={1} // y축 최댓값 설정안하면 자동 스케일링됨
          // yUnit={}       // y축에 표시될 수치의 단위를 입력할 수 있음 안쓰면 자동으로 공백처리
        /> */}

        <Chart
          chartType="Line"
          labels={chartData.daily?.map((d) => d.date) || []}
          dataset={[
            {
              label: '일별 소모갑수',
              data: chartData.daily?.map((d) => d.value) || [],
              borderWidth: 2,
            },
          ]}
        />
        {/* 
        <Chart
          chartType="Bar"
          labels={chartData.weekly?.map((w) => w.week) || []}
          dataset={[
            {
              label: '주별 소모갑수',
              data: chartData.weekly?.map((w) => w.value) || [],
              borderWidth: 2,
            },
          ]}
        />

        <Chart
          chartType="Bar"
          labels={chartData.monthly?.map((m) => m.month) || []}
          dataset={[
            {
              label: '월별 소모갑수',
              data: chartData.monthly?.map((m) => m.value) || [],
              borderWidth: 2,
            },
          ]}
        /> */}

        <BtnContainer>
          <div>
            <div
              onClick={() => {
                dispatch(open({ title: '흡연 등록', value: 'block' }));
              }}
            >
              <Btn str={'등록'} c={'#FF7F50'} fc={'white'}></Btn>
            </div>
          </div>
        </BtnContainer>

        <Table>
          <thead>
            <tr>
              <th>번호</th>
              <th>담배명</th>
              <th>타르수치</th>
              <th>시작날짜</th>
              <th>종료날짜</th>
              <th>소모일</th>
              <th>일당 소모갑수</th>
            </tr>
          </thead>
          <tbody>
            {data.map((vo) => {
              const startDate = new Date(vo.start_date);
              const endDate = new Date(vo.end_date);
              const daysConsumed = Math.ceil((endDate - startDate + 1) / (1000 * 60 * 60 * 24));
              return (
                <tr
                  key={vo.no}
                  onClick={() => {
                    handleRowClick(vo);
                    // window.location.href = `/board?bno=${vo.no}`;
                  }}
                >
                  <td>{vo.no}</td>
                  <td>{vo.cigarette}</td>
                  <td>{vo.tar}</td>
                  <td>{vo.start_date}</td>
                  <td>{vo.end_date}</td>
                  {/* <td>{vo.end_date - vo.start_date}</td> */}
                  <td>{daysConsumed}일</td>
                  <td>{daysConsumed > 0 ? (1 / daysConsumed).toFixed(2) : '-'}</td>
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

          <div></div>
        </BottomDiv>
      </ContentLayout>
    </>
  );
};

export default CigaretteReport;
