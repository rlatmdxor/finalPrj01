import React, { useEffect, useState } from 'react';
import Title from '../../../util/Title';
import Chart from '../../../util/Chart';
import styled from 'styled-components';
import Btn from '../../../util/Btn';
import Modal from '../../../util/Modal';
import InputTag from '../../../util/Input';
import { useDispatch, useSelector } from 'react-redux';
import { close, open } from '../../../../redux/modalSlice';
import { resetPaging, setTotalCount } from '../../../../redux/pagingSlice';
import DateBtn from '../../../util/DateBtn';
import Table from '../../../util/Table';
import ContentLayout from '../../../util/ContentLayout';

const BtnContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-right: -45px;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const Sleep = () => {
  const [dataVoList, setDataVoList] = useState([]);
  const [num, setNum] = useState(0);
  console.log('voList 처음 렌더링 :::::::::::::::: ', dataVoList);

  const dataBtn = ['일', '주', '월'];
  const [selectedRange, setSelectedRange] = useState('일');
  const [selectChart, setSelectChart] = useState('Line');
  const initialInputData = { no: '', recordDate: '', sleepStart: '', sleepEnd: '' };

  const getChartData = () => {
    switch (selectedRange) {
      case '일':
        return [480, 420, 660, 540, 300, 360, 240];
      case '주':
        return [3500, 3200, 4000, 3800, 3700, 3600, 3400]; // 주간 합계 예시
      case '월':
        return [15000, 14000, 16000, 15500, 14800, 15200, 14900]; // 월간 합계 예시
      default:
        return [];
    }
  };

  const dispatch = useDispatch();
  const boardType = 'honeyTip';

  const { currentPage, boardLimit } = useSelector((state) => state.paging[boardType] || {});

  useEffect(() => {
    dispatch(setTotalCount({ boardType, totalCount: dataVoList.length }));
    dispatch(resetPaging({ boardType }));
  }, [dataVoList.length, dispatch]);

  const offset = (currentPage - 1) * boardLimit;
  const data = dataVoList.slice(offset, offset + boardLimit);

  const labels = ['월', '화', '수', '목', '금', '토', '일'];
  const dataset = [
    {
      label: '수면 시간',

      data: getChartData(),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ],
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

  const [inputData, setInputData] = useState(initialInputData);

  const handleChange = (e) => {
    setInputData((props) => {
      return {
        ...props,
        [e.target.name]: e.target.value,
      };
    });
  };

  const reset = () => {
    setInputData(initialInputData);
  };

  //저장하기기////////////////////////////////swy
  const handleSubmit = (e) => {
    console.log('handleSubmit 저장하기 ###############');

    fetch('http://127.0.0.1:80/api/sleep/write', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(inputData),
    })
      .then((resp) => resp.text())
      .then((data) => {
        console.log('insert clear ~~~ setNum at next line');
        setNum((prev) => prev + 1);
      });

    dispatch(close(e.target.title));
  };

  const handleEditSubmit = (e) => {
    fetch('http://127.0.0.1:80/api/sleep/edit', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(inputData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setNum((x) => {
          return x + 1;
        });
      });

    dispatch(close(e.target.title));
  };

  //select////////////////////////////////////////////////////////////////////////swy
  useEffect(() => {
    console.log('SELECT ********************');
    fetch('http://127.0.0.1:80/api/sleep/list', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('select data :::::::::::::::::::::', data);
        setDataVoList(data);
      });
  }, [num]);

  return (
    <>
      <Title>수면</Title>
      <div></div>
      <ContentLayout>
        <Modal title="수면 등록">
          <InputTag
            type="date"
            name="recordDate"
            plcaeholder="날짜"
            title="날짜"
            size={'size3'}
            mb={'10'}
            mt={'5'}
            value={inputData.recordDate}
            f={handleChange}
          ></InputTag>
          <InputTag
            name="sleepStart"
            type="time"
            title="수면 시작 시간"
            value={inputData.sleepStart}
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={handleChange}
          ></InputTag>
          <InputTag
            name="sleepEnd"
            type="time"
            title="수면 종료 시간"
            value={inputData.sleepEnd}
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={handleChange}
          ></InputTag>
          <ModalContainer>
            <Btn
              title={'수면 등록'}
              f={handleSubmit}
              mt={'10'}
              mb={'20'}
              mr={'-10'}
              c={'#FF7F50'}
              fc={'white'}
              str={'등록'}
            ></Btn>
          </ModalContainer>
        </Modal>

        <Modal title="수면 수정">
          <InputTag
            name={'recordDate'}
            type="date"
            plcaeholder="날짜"
            title="날짜"
            size={'size3'}
            mb={'10'}
            mt={'5'}
            value={inputData.recordDate}
            f={handleChange}
          ></InputTag>
          <InputTag
            name={'sleepStart'}
            type="time"
            title="수면 시작 시간"
            size={'size3'}
            mb={'10'}
            mt={'5'}
            value={inputData.sleepStart}
            f={handleChange}
          ></InputTag>
          <InputTag
            name={'sleepEnd'}
            type="time"
            title="수면 종료 시간"
            size={'size3'}
            mb={'10'}
            mt={'5'}
            value={inputData.sleepEnd}
            f={handleChange}
          ></InputTag>
          <ModalContainer>
            <Btn
              f={handleEditSubmit}
              title={'수면 수정'}
              mt={'10'}
              mb={'20'}
              mr={'20'}
              c={'#7ca96d'}
              fc={'white'}
              str={'수정'}
            ></Btn>
            <Btn mt={'10'} mb={'20'} mr={'-20'} c={'lightgray'} fc={'black'} str={'삭제'}></Btn>
          </ModalContainer>
        </Modal>

        <DateBtn dataBtn={dataBtn} onSelect={setSelectedRange} onChange={setSelectChart}></DateBtn>

        <Chart
          chartType={selectChart}
          labels={labels}
          dataset={dataset}
          width={100}
          height={400}
          xAxisColor="rgba(75, 192, 192, 1)"
          yAxisColor="rgba(255, 99, 132, 1)"
        />

        <BtnContainer>
          <div
            onClick={() => {
              reset();
              dispatch(open({ title: '수면 등록', value: 'block' }));
            }}
          >
            <Btn mt={'50'} mr={'46'} mb={'20'} str={'등록'} c={'#FF7F50'} fc={'white'}></Btn>
          </div>
        </BtnContainer>

        <Table>
          <thead>
            <tr>
              <th>날짜</th>
              <th>수면 시작 시간</th>
              <th>수면 종료 시간</th>
              <th>수면 지속 시간</th>
            </tr>
          </thead>
          <tbody>
            {data.map((vo) => {
              return (
                <tr
                  key={vo.no}
                  onClick={(e) => {
                    setInputData({
                      no: vo.no,
                      recordDate: vo.day,
                      sleepStart: vo.startTime,
                      sleepEnd: vo.endTime,
                    });
                    dispatch(open({ title: '수면 수정', value: 'block' }));
                  }}
                >
                  <td>{vo.day}</td>
                  <td>{vo.startTime}</td>
                  <td>{vo.endTime}</td>
                  <td>{vo.sleepDuration}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </ContentLayout>
    </>
  );
};

export default Sleep;
