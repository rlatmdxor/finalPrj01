import React, { useEffect, useState } from 'react';
import Title from '../../../util/Title';
import Chart from '../../../util/Chart';
import styled from 'styled-components';
import RadiusTable from '../../../util/RadiusTable';
import { useDispatch, useSelector } from 'react-redux';
import { resetPaging, setTotalCount } from '../../../../redux/pagingSlice';
import Btn from '../../../util/Btn';
import Pagination from '../../../util/Pagination';
import DateBtn from '../../../util/DateBtn';
import ContentLayout from '../../../util/ContentLayout';
import Modal from '../../../util/Modal';
import InputTag from '../../../util/Input';
import { close, open } from '../../../../redux/modalSlice';
import Swal from 'sweetalert2';
import { isTokenExpired, getRoleFromToken } from '../../../util/JwtUtil';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../services/config';
const LineDiv = styled.div`
  height: 50px;
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-right: -45px;
`;
const ModalContainer = styled.div`
  display: flex;
  justify-content: end;
`;
const ModalInputDiv = styled.div`
  width: 450px;
  display: grid;
  grid-template: repeat(3, 1fr) / 1fr 1fr;
`;

const BloodPressure = () => {
  const navi = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token || isTokenExpired(token) || getRoleFromToken(token) == 'ROLE_ADMIN') {
      window.localStorage.removeItem('token');
      navi('/login');
      Swal.fire({
        icon: 'warning',
        title: '로그인이 필요합니다',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      });
    } else {
      setIsAuthorized(true);
    }
  }, [navi, token]);

  const url = `${BASE_URL}/api/bloodPressure/list`;

  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  };

  const [num, setNum] = useState(0);
  const [fullData, setFullData] = useState([]);
  const [pagedData, setPagedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRange, setSelectedRange] = useState('주');
  const [selectChart, setSelectChart] = useState('Line');
  const dispatch = useDispatch();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const dataBtn = ['주', '월'];
  const boardType = 'bloodPressure';
  const { currentPage, boardLimit } = useSelector((state) => state.paging[boardType] || {});
  const offset = (currentPage - 1) * boardLimit;

  const initialInputData = {
    no: '',
    systole: '',
    diastole: '',
    pulse: '',
    enrollDate: '',
    note: '',
    day: '',
    time: '',
  };

  const [inputData, setInputData] = useState(initialInputData);

  const reset = () => {
    setInputData(initialInputData);
  };

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
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        if (inputData.day == '' || inputData.day == null) {
          Swal.fire({
            icon: 'error',
            title: '측정 날짜를 기록해주세요.',
          });
          return;
        }
        if (inputData.time == '' || inputData.time == null) {
          Swal.fire({
            icon: 'error',
            title: '측정 시간을 기록해주세요.',
          });
          return;
        }
        if (inputData.systole == '' || inputData.systole == null) {
          Swal.fire({
            icon: 'error',
            title: '수축기 혈압을 기록해주세요.',
          });
          return;
        }
        if (inputData.systole < 50 || inputData.systole > 500) {
          Swal.fire({
            icon: 'error',
            title: '수축기 수치 오류!',
          });
          return;
        }
        if (inputData.diastole == '' || inputData.diastole == null) {
          Swal.fire({
            icon: 'error',
            title: '이완기 혈압을 기록해주세요.',
          });
          return;
        }
        if (inputData.diastole < 30 || inputData.diastole > 200) {
          Swal.fire({
            icon: 'error',
            title: '이완기 수치 오류!',
          });
          return;
        }

        fetch(`${BASE_URL}/api/bloodPressure/write`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(inputData),
        })
          .then((resp) => resp.text())
          .then((data) => {
            if (data == 1) {
              setNum((x) => x + 1);
              Swal.fire({
                title: '등록되었습니다.',
                icon: 'success',
                draggable: true,
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: '정확한 수치를 입력해주세요.',
                text: '다시 입력해주세요',
              });
            }
          });

        setInputData(initialInputData);

        dispatch(close(e.target.title));
      }
    });
  };

  const handleEditSubmit = (e) => {
    Swal.fire({
      title: '수정하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        if (inputData.day == '' || inputData.day == null) {
          Swal.fire({
            icon: 'error',
            title: '측정 날짜를 기록해주세요.',
          });
          return;
        }
        if (inputData.time == '' || inputData.time == null) {
          Swal.fire({
            icon: 'error',
            title: '측정 시간을 기록해주세요.',
          });
          return;
        }
        if (inputData.systole == '' || inputData.systole == null) {
          Swal.fire({
            icon: 'error',
            title: '수축기 혈압을 기록해주세요.',
          });
          return;
        }
        if (inputData.systole < 50 || inputData.systole > 500) {
          Swal.fire({
            icon: 'error',
            title: '수축기 수치 오류!',
          });
          return;
        }
        if (inputData.diastole == '' || inputData.diastole == null) {
          Swal.fire({
            icon: 'error',
            title: '이완기 혈압을 기록해주세요.',
          });
          return;
        }
        if (inputData.diastole < 30 || inputData.diastole > 200) {
          Swal.fire({
            icon: 'error',
            title: '이완기 수치 오류!',
          });
          return;
        }

        fetch(`${BASE_URL}/api/bloodPressure/edit`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(inputData),
        })
          .then((resp) => resp.text())
          .then((data) => {
            if (data == 1) {
              setNum((x) => x + 1);
              Swal.fire({
                title: '수정되었습니다.',
                icon: 'success',
                draggable: true,
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: '정확한 수치를 입력해주세요.',
                text: '다시 입력해주세요',
              });
            }
          });

        dispatch(close(e.target.title));
      }
    });
  };
  const handleDelSubmit = (e) => {
    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/api/bloodPressure/delete`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(inputData),
        })
          .then((resp) => resp.text())
          .then((data) => {
            if (data == 1) {
              setNum((x) => x - 1);
              console.log(num);
              Swal.fire({
                title: '삭제되었습니다.',
                icon: 'success',
                draggable: true,
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: '삭제 실패.',
                text: '다시 시도해주세요',
              });
            }
          });

        dispatch(close(e.target.title));
      }
    });
  };

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length > 0) {
          dispatch(setTotalCount({ boardType, totalCount: data.length }));
          setFullData(data);
        } else if (data == null) {
          Swal.fire({
            title: '다시 로그인해주세요.',
            icon: 'success',
            draggable: true,
          }).then(() => (window.location.href = '/login'));
        } else {
          dispatch(resetPaging({ boardType }));
          setFullData([]);
        }
      })
      .catch((error) => console.error('데이터 불러오기 실패:', error));
  }, [num, isAuthorized, token]);

  useEffect(() => {
    setPagedData(fullData.slice(offset, offset + boardLimit));
  }, [fullData, currentPage, boardLimit]);

  useEffect(() => {
    if (selectedRange == '주') {
      setFilteredData(filterData('week'));
    } else if (selectedRange == '월') {
      setFilteredData(filterData('month'));
    } else {
      setFilteredData(filterData('all'));
    }
  }, [selectedRange]);

  const filterData = (type) => {
    const voList = [];

    for (const vo of fullData) {
      voList.push(vo.day);
    }
    const latestDate = new Date(voList[0]);

    if (type === 'week') {
      const oneWeekAgo = new Date(latestDate);
      oneWeekAgo.setDate(latestDate.getDate() - 7);

      return fullData.filter((item) => {
        const itemDate = new Date(item.day);
        return itemDate >= oneWeekAgo && itemDate <= latestDate;
      });
    }

    if (type === 'month') {
      const currentYear = latestDate.getFullYear();
      const currentMonth = latestDate.getMonth() + 1;

      return fullData.filter((item) => {
        const [year, month] = item.day.split('-').map(Number);
        return year === currentYear && month === currentMonth;
      });
    }

    return fullData;
  };

  useEffect(() => {
    setFilteredData(filterData('week'));
  }, [fullData]);

  const labels = [];

  for (const vo of filteredData) {
    labels.unshift(vo.enrollDate);
  }

  const systoleList = [];
  for (const vo of filteredData) {
    systoleList.unshift(vo.systole);
  }
  const diastoleList = [];

  for (const vo of filteredData) {
    diastoleList.unshift(vo.diastole);
  }

  const dataset = [
    {
      label: '수축기 혈압 (mmHg)',

      data: systoleList,
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
      ],
      borderWidth: 1,
    },
    {
      label: '이완기 혈압 (mmHg)',

      data: diastoleList,
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
      ],
      borderWidth: 1,
    },
  ];

  let now = new Date();

  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, '0');
  let day = String(now.getDate()).padStart(2, '0');
  let hours = String(now.getHours()).padStart(2, '0');
  let minutes = String(now.getMinutes()).padStart(2, '0');

  const today = `${year}-${month}-${day}`;

  return (
    <>
      <Title>혈압</Title>
      <div></div>

      <ContentLayout>
        <Modal title="혈압 등록">
          <ModalInputDiv>
            <div>
              <InputTag
                type="date"
                name="day"
                value={inputData.day}
                plcaeholder="측정일"
                title="측정일"
                mb={'10'}
                mt={'5'}
                max={today}
                f={handleChange}
              ></InputTag>
            </div>
            <div>
              <InputTag
                type="time"
                name="time"
                value={inputData.time}
                plcaeholder="측정시간"
                title="측정시간"
                mb={'10'}
                mt={'5'}
                f={handleChange}
              ></InputTag>
            </div>
            <div>
              <InputTag
                name="systole"
                type="number"
                title="수축기 혈압"
                value={inputData.systole}
                mb={'10'}
                mt={'5'}
                f={handleChange}
              ></InputTag>
            </div>
            <div>
              <InputTag
                name="diastole"
                type="number"
                title="이완기 혈압"
                value={inputData.diastole}
                mb={'10'}
                mt={'5'}
                f={handleChange}
              ></InputTag>
            </div>
            <div>
              <InputTag
                name="pulse"
                type="number"
                title="맥박"
                value={inputData.pulse}
                mb={'10'}
                mt={'5'}
                f={handleChange}
              ></InputTag>
            </div>
            <div>
              <InputTag
                name="note"
                type="text"
                title="특이사항"
                value={inputData.note}
                mb={'10'}
                mt={'5'}
                f={handleChange}
              ></InputTag>
            </div>
          </ModalInputDiv>
          <ModalContainer>
            <Btn
              title={'혈압 등록'}
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

        <Modal title="혈압 수정">
          <ModalInputDiv>
            <div>
              <InputTag
                type="date"
                name="day"
                plcaeholder="측정일"
                value={inputData.day}
                title="측정일"
                mb={'10'}
                mt={'5'}
                max={today}
                f={handleChange}
              ></InputTag>
            </div>
            <div>
              <InputTag
                type="time"
                name="time"
                value={inputData.time}
                plcaeholder="측정시간"
                title="측정시간"
                mb={'10'}
                mt={'5'}
                f={handleChange}
              ></InputTag>
            </div>
            <div>
              <InputTag
                name="systole"
                type="number"
                title="수축기 혈압"
                value={inputData.systole}
                mb={'10'}
                mt={'5'}
                f={handleChange}
              ></InputTag>
            </div>
            <div>
              <InputTag
                name="diastole"
                type="number"
                title="이완기 혈압"
                value={inputData.diastole}
                mb={'10'}
                mt={'5'}
                f={handleChange}
              ></InputTag>
            </div>
            <div>
              <InputTag
                name="pulse"
                type="number"
                title="맥박"
                value={inputData.pulse}
                mb={'10'}
                mt={'5'}
                f={handleChange}
              ></InputTag>
            </div>
            <div>
              <InputTag
                name="note"
                type="text"
                title="특이사항"
                value={inputData.note}
                mb={'10'}
                mt={'5'}
                f={handleChange}
              ></InputTag>
            </div>
          </ModalInputDiv>
          <ModalContainer>
            <Btn
              f={handleEditSubmit}
              mt={'10'}
              mb={'20'}
              mr={'20'}
              c={'#7ca96d'}
              fc={'white'}
              str={'수정'}
              title={'혈압 수정'}
            ></Btn>
            <Btn
              f={handleDelSubmit}
              mt={'10'}
              mb={'20'}
              mr={'-20'}
              c={'lightgray'}
              fc={'black'}
              str={'삭제'}
              title={'혈압 수정'}
            ></Btn>
          </ModalContainer>
        </Modal>

        <DateBtn dataBtn={dataBtn} onSelect={setSelectedRange} onChange={setSelectChart} line={'Bar'}></DateBtn>

        <Chart
          chartType={selectChart}
          labels={labels}
          dataset={dataset}
          width={100}
          height={450}
          xAxisColor="rgba(54, 162, 235, 1)"
          yAxisColor="rgba(255, 159, 64, 1)"
          yMax={300}
          yMin={0}
          xLabelVisible={true}
        />

        <BtnContainer>
          <div
            onClick={() => {
              reset();
              dispatch(open({ title: '혈압 등록', value: 'block' }));
            }}
          >
            <Btn mt={'50'} mr={'46'} mb={'20'} str={'등록'} c={'#FF7F50'} fc={'white'}></Btn>
          </div>
        </BtnContainer>

        <RadiusTable width="100%" thBgColor="" radius="0px">
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
              pagedData.reduce((acc, vo) => {
                if (!acc[vo.day]) acc[vo.day] = [];
                acc[vo.day].push(vo);
                return acc;
              }, {})
            ).map(([day, records]) =>
              records.map((vo, index) => (
                <tr
                  key={vo.no}
                  onClick={() => {
                    setInputData({
                      no: vo.no,
                      memberNo: vo.memberNo,
                      systole: vo.systole,
                      diastole: vo.diastole,
                      pulse: vo.pulse,
                      enrollDate: vo.enrollDate,
                      day: vo.day,
                      time: vo.time,
                      note: vo.note,
                    });
                    dispatch(open({ title: '혈압 수정', value: 'block' }));
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
                  {vo.pulse == null ? <td>-</td> : <td>{vo.pulse}</td>}

                  <td>{vo.note}</td>
                </tr>
              ))
            )}
          </tbody>
        </RadiusTable>
        <LineDiv />
        <Pagination boardType={boardType}></Pagination>
        <LineDiv />
      </ContentLayout>
    </>
  );
};

export default BloodPressure;
