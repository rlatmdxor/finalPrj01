import React, { useEffect, useState } from 'react';
import Modal from '../../../util/Modal'; // 모달 컴포넌트
import Input from '../../../util/Input'; // 입력 컴포넌트
import Title from '../../../util/Title';
import Chart from '../../../util/Chart';
import styled from 'styled-components';
import RadiusTable from '../../../util/RadiusTable';
import { useDispatch, useSelector } from 'react-redux';
import { resetPaging, setTotalCount } from '../../../../redux/pagingSlice';
import Btn from '../../../util/Btn';
import { open } from '../../../../redux/modalSlice';
import Pagination from '../../../util/Pagination';
import DateBtn from '../../../util/DateBtn';
import useFetch from '../../../hook/useFetch';
import ContentLayout from '../../../util/ContentLayout';

const LayDiv = styled.div`
  height: 100px;
`;

const BtnContainer = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 1030px;
  gap: 15px;
`;

const CharDiv = styled.div`
  margin-left: 130px;
  margin-top: 30px;
`;

const DataDiv = styled.div`
  margin-left: 1100px;
  margin-bottom: -30px;
`;

const BloodPressure = () => {
  const url = 'http://127.0.0.1:80/api/bloodPressure/list';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      memberNo: '1',
    }),
  };

  const [dataVoList, setVoList] = useState([]);

  const boardType = 'bloodPressure';
  const { currentPage, boardLimit } = useSelector((state) => state.paging[boardType] || {});
  const offset = (currentPage - 1) * boardLimit;
  console.log(dataVoList);

  useEffect(() => {
    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length > 0) {
          dispatch(setTotalCount({ boardType, totalCount: data.length }));
          const pagedData = data.slice(offset, offset + boardLimit);
          setVoList(pagedData);
        } else {
          dispatch(resetPaging({ boardType }));
          setVoList([]); // 데이터가 없을 경우 초기화
        }
      })
      .catch((error) => console.error('데이터 불러오기 실패:', error));
  }, [currentPage, boardLimit]); // currentPage, boardLimit 변경 시 실행

  const dataBtn = ['일', '주', '월'];
  const dispatch = useDispatch();

  const labels = ['2025-02-04-12:00', '2025-02-04-12:00', '2025-02-04-12:00', '2025-02-04-12:00', '2025-02-04-12:00'];
  const dataset = [
    {
      // 차트에서 그래프가 나타내는 이름 표시 ex)수축기 혈압 , 이완기 혈압
      // Bar , Pie , Doughnut에서는 마우스를 해당 부분에 호버하면 이 label의 이름이 표시된다.
      label: '수축기 혈압 (mmHg)',

      data: [120, 150, 115, 117, 123, 131, 109], // 데이터
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
      <Title>혈압</Title>
      <div></div>

      <ContentLayout>
        <DataDiv>
          <DateBtn dataBtn={dataBtn}></DateBtn>
        </DataDiv>
        <CharDiv>
          <Chart
            chartType="Line" // 차트 타입지정
            labels={labels} // 위랑 동일
            dataset={dataset} // 위랑 동일
            width={100} // 위랑 동일
            height={450} // 위랑 동일
            xAxisColor="rgba(54, 162, 235, 1)" // 위랑 동일
            yAxisColor="rgba(255, 159, 64, 1)" // 위랑 동일
            yMax={200}
            xLabelVisible={true} // 추가: X축 라벨 표시 여부 (기본값: true)
          />
        </CharDiv>
        {/* 전부다 위와 동일한데 dataset에서 배경색을 지정해야함 */}

        <LayDiv></LayDiv>

        <BtnContainer>
          <div
            onClick={() => {
              dispatch(open({ title: '수면 등록', value: 'block' }));
            }}
          >
            <Btn str={'등록'} c={'#FF7F50'} fc={'white'}></Btn>
          </div>
        </BtnContainer>

        <RadiusTable width="" thBgColor="" radius="0px">
          <thead>
            <tr>
              <th>측정일</th>
              <th>측정시간</th>
              <th>이완기</th>
              <th>수축기</th>
              <th>맥박/분</th>
              <th>특이사항</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(
              dataVoList.reduce((acc, vo) => {
                if (!acc[vo.day]) acc[vo.day] = [];
                acc[vo.day].push(vo);
                return acc;
              }, {})
            ).map(([day, records]) =>
              records.map((vo, index) => (
                <tr
                  key={vo.no}
                  onClick={() => {
                    window.location.href = `/board?bno=${vo.no}`;
                  }}
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
                  <td>{vo.diastole}</td>
                  <td>{vo.systole}</td>
                  <td>{vo.pulse}</td>
                  <td>{vo.note}</td>
                </tr>
              ))
            )}
          </tbody>
        </RadiusTable>
        <Pagination boardType={boardType}></Pagination>
        <LayDiv></LayDiv>
        <LayDiv></LayDiv>
      </ContentLayout>
    </>
  );
};

export default BloodPressure;
