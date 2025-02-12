import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';

import Title from '../../../util/Title';
import Calendar from '../../../util/Calendar';
import Modal from '../../../util/Modal';
import Btn from '../../../util/Btn';
import InputTag from '../../../util/Input';
import Navi from '../../../util/Navi';
import Table from '../../../util/Table';
import Pagination from '../../../util/Pagination';

import { setTotalCount, resetPaging } from '../../../../redux/pagingSlice';
import { close, open } from '../../../../redux/modalSlice';
import ContentLayout from '../../../util/ContentLayout';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 300px; // 항목수에 비례해서 주시면 됩니다.
  top: 20px;
  left: 40px;
  grid-template-columns: 3fr 3fr; // 글자수만큼 fr 주면 됩니다. ex) 유산소 3글자니까 3fr
`;

const CalContainer = styled.div`
  margin-top: 200px;
  padding-top: 200px;
`;

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const dataset = [
  {
    // 차트에서 그래프가 나타내는 이름 표시 ex)수축기 혈압 , 이완기 혈압
    // Bar , Pie , Doughnut에서는 마우스를 해당 부분에 호버하면 이 label의 이름이 표시된다.
    label: 'tnftnftnf',

    data: [12000, 15000, 8000, 18000, 22000, 13000, 17000], // 데이터 값 위의 labels와 같은 갯수 넣어야됨
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
      '#050303',
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

const Cigarette = () => {
  const url = 'http://127.0.0.1/api/cigarette/list';

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ memberNo: '1' }),
  };

  const [fullData, setFullData] = useState([]); // 전체 데이터 저장
  const [pagedData, setPagedData] = useState([]); // 페이징된 데이터

  const dispatch = useDispatch();

  const boardType = 'Cigarette';
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
    fetch('http://127.0.0.1:80/api/cigarette/write', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
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
    fetch('http://127.0.0.1:80/api/cigarette/update', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
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
  };

  const handleDeleteSubmit = (e) => {
    fetch('http://127.0.0.1/api/cigarette/delete', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
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

  const getDaysConsumed = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // 시작일부터 포함하여 계산
  };

  const CigaretteCalender = () => {
    const events = {
      '2025-1-8': ['에쎄 프라임', , '2025-1-6', '5'],
    };
  };

  return (
    <>
      <Title>흡연관리</Title>

      <NaviContainer>
        <Navi target="cigarette" tag={'캘린더'}></Navi>
        <Navi target="cigarette/report" tag={'리포트'}></Navi>
      </NaviContainer>

      <ContentLayout>
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

        <CalContainer>
          <Calendar
            modalTitle="흡연 수정" // 모달 제목과 맞춰야됨
            vo={[]} /* 이벤트 정보 배열 나중을 위해서는 필요하다는데 
        현재 우리는 안쓸 가능성이 높음 복잡하고 다양한 데이터를 넘길때 사용함 */
            // events={events} // 캘린더에 표시할 데이터 위에 예시대로 데이터 가공해서 사용
            width={800} // 캘린더 넓이
            height={100} // 캘린더 한칸 높이
          />
        </CalContainer>
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

export default Cigarette;
