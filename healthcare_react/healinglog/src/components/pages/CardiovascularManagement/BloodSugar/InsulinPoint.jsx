import Title from '../../../util/Title';
import ContentLayout from '../../../util/ContentLayout';
import Navi from '../../../util/Navi';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import RadiusTable from '../../../util/RadiusTable';
import { useDispatch, useSelector } from 'react-redux';
import { resetPaging, setTotalCount } from '../../../../redux/pagingSlice';
import Btn from '../../../util/Btn';
import Pagination from '../../../util/Pagination';
import Modal from '../../../util/Modal';
import InputTag from '../../../util/Input';
import { close, open } from '../../../../redux/modalSlice';
import Swal from 'sweetalert2';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 300px; // 항목수에 비례해서 주시면 됩니다.
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 6fr; // 글자수만큼 fr 주면 됩니다. ex) 유산소 3글자니까 3fr
`;
const ImageLayoutDiv = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ImageDiv = styled.div`
  width: 440px;
  height: 500px;
  background-image: url('/img/realBody.png');
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  background-size: contain; /* 요소에 맞게 크기 조정 */
  background-position: center; /* 중앙 정렬 */
  display: grid;
  grid-template-rows: 316px 1fr;
`;
const Div100 = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const Div200 = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const Div210 = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
`;
const RightLegDiv = styled.div`
  width: 66px;
  height: 120px;
  margin-bottom: 15px;
  margin-right: 10px;
  background-color: purple;
  display: grid;
  grid-template: repeat(4, 1fr) / 1fr 1fr;
`;
const Div220 = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
`;
const LeftLegDiv = styled.div`
  width: 66px;
  height: 120px;
  margin-bottom: 15px;
  margin-right: 10px;
  background-color: purple;
  display: grid;
  grid-template: repeat(4, 1fr) / 1fr 1fr;
`;
const Div110 = styled.div`
  display: grid;
  grid-template-columns: 88px 1fr 5px;
`;
const Div120 = styled.div`
  display: grid;
  grid-template-columns: 4px 1fr 95px;
`;
const Div111 = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;
const Div123 = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;
const RightArmDiv = styled.div`
  height: 120px;
  width: 66px;
  margin-top: 15px;
  display: grid;
  grid-template: repeat(4, 1fr) / 1fr 1fr;
`;
const LeftArmDiv = styled.div`
  background-color: red;
  height: 120px;
  width: 66px;
  margin-top: 15px;
  display: grid;
  grid-template: repeat(4, 1fr) / 1fr 1fr;
`;
const Div112 = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;
`;
const Div122 = styled.div`
  display: flex;
  align-items: end;
  justify-content: start;
`;
const RightStomDiv = styled.div`
  width: 120px;
  height: 120px;
  background-color: gray;
  display: grid;
  grid-template: repeat(4, 1fr) / repeat(4, 1fr);
`;
const LeftStomDiv = styled.div`
  width: 120px;
  height: 120px;
  background-color: gray;
  display: grid;
  grid-template: repeat(4, 1fr) / repeat(4, 1fr);
`;
const CheckDiv = styled.div`
  background-color: ${({ isDisabled }) => (isDisabled ? 'darkgray' : 'white')};
  color: black;
  font-size: 1.2rem;
  font-weight: 500;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'auto')};

  &:hover {
    background-color: ${(props) => (props.isDisabled ? 'lightgray' : 'lightblue')};
  }
`;

const LineDiv = styled.div`
  height: 50px;
`;

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

const InsulinPoint = () => {
  const token = null;
  const url = 'http://127.0.0.1:80/api/insulin/list';

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ memberNo: '1' }),
  };
  /////////////////////////////////////////////////////
  const initialInputData = {
    no: '',
    memberNo: '1',
    point: '',
    enrollDate: '',
    ableDate: '',
    note: '',
  };
  const [num, setNum] = useState(0);
  const [inputData, setInputData] = useState(initialInputData);
  const [selectedItems, setSelectedItems] = useState([]);
  const boardType = 'insulin';
  const [dataVoList, setVoList] = useState([]);
  const currentPage = useSelector((state) => state.paging[boardType]?.currentPage || 1);
  const boardLimit = useSelector((state) => state.paging[boardType]?.boardLimit || 12);
  const [disablePoint, setDisablePoint] = useState([]);
  const offset = (currentPage - 1) * boardLimit;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetPaging({ boardType }));
  }, []);

  useEffect(() => {
    fetch(url, options)
      .then((resp) => resp.json())
      .then((model) => {
        const data = model.insulinList;
        const disablePointList = model.disablePointList;
        console.log(data);
        console.log(disablePointList);
        setDisablePoint(disablePointList);

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
  }, [num]);
  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  //인풋 안 쪽에 들어가는 데이터 ~~~Vo에 들어있는 이름으로 맞춰주기
  // 모달 안 쪽 인풋에 데이터 관리
  // 화면 렌더링

  // 인풋 입력값 받아오기
  const handleChange = (e) => {
    setInputData((props) => {
      return {
        ...props,
        [e.target.name]: e.target.value,
      };
    });
  };
  // 날짜 따로 입력받기
  const handleDateChange = (event) => {
    const newDate = event.target.value;

    // 2주 후 날짜 계산
    const dateObj = new Date(newDate);
    dateObj.setDate(dateObj.getDate() + 14);
    const formattedDate = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD 형식

    // state 업데이트 (기존 정보 유지)
    setInputData((prevState) => ({
      ...prevState,
      enrollDate: newDate,
      ableDate: formattedDate, // 2주 후 날짜 자동 추가
    }));
  };

  // 인풋 입력값 보내기
  const handleSubmit = (e) => {
    Swal.fire({
      title: '등록하시겠습니까?',
      icon: 'question',
      showCancelButton: true, //  취소 버튼 추가 (없으면 무조건 실행됨)
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        // ✅ 사용자가 '확인' 버튼을 눌렀을 때만 실행
        fetch('http://127.0.0.1:80/api/insulin/write', {
          method: 'POST',
          headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(inputData),
        })
          .then((resp) => resp.text())
          .then((data) => {
            console.log(data);
            setNum((x) => x + 1);
            if (data == 1) {
              Swal.fire({
                title: '등록되었습니다.',
                icon: 'success',
                draggable: true,
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: data,
                text: 'Something went wrong!',
                footer: '<a href="#">해당 위치는 아직 투약이 불가능합니다.</a>',
              });
            }
          });

        // 모달 창 닫기
        dispatch(close(e.target.title));
      }
    });
  };

  const handleDelSubmit = (e) => {
    if (selectedItems.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '삭제하실 항목을 선택해주세요',
      });
      return;
    }

    Swal.fire({
      title: `${selectedItems.length}개의 항목을 삭제하시겠습니까?`,
      icon: 'question',
      showCancelButton: true, // ❗ 취소 버튼 추가 (없으면 무조건 실행됨)
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        // ✅ 사용자가 '확인' 버튼을 눌렀을 때만 실행
        fetch('http://127.0.0.1:80/api/insulin/delete', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(selectedItems),
        })
          .then((resp) => resp.text())
          .then((data) => {
            setSelectedItems([]);
            setNum((x) => x - 1);
            console.log(num);
            Swal.fire({
              title: `${data}개의 항목이 삭제되었습니다.`,
              icon: 'success',
              draggable: true,
            });
          });

        // 모달 창 닫기
        dispatch(close(e.target.title));
      }
    });
  };
  //////////////////////////////////////////////////////////////////////////////

  const rightArmNumList = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const leftArmNumList = ['9', '10', '11', '12', '13', '14', '15', '16'];
  const rightLegNumList = ['49', '50', '51', '52', '53', '54', '55', '56'];
  const leftLegNumList = ['57', '58', '59', '60', '61', '62', '63', '64'];
  const rightStomNumList = [
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
  ];
  const leftStomNumList = [
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
  ];

  // 체크박스 선택/해제 핸들러
  const handleCheckboxChange = (no) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(no)
          ? prevSelected.filter((item) => item !== no) // 체크 해제 시 제거
          : [...prevSelected, no] // 체크 시 추가
    );
  };

  return (
    <>
      <Title>혈당</Title>
      <NaviContainer>
        <Navi target="bloodSugar" tag={'혈당 기록'}></Navi>
        <Navi target="insulin" tag={'인슐린 기록지'}></Navi>
      </NaviContainer>
      <ContentLayout>
        {/* // title 모달 위 쪽에 들어가는 제목 ,  */}
        <Modal title="인슐린 등록">
          <InputTag
            name="systole"
            type="disable"
            title="위치"
            value={inputData.point}
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={handleChange}
          ></InputTag>
          <InputTag
            //type 인풋 유형 date , time, text , password ...
            type="datetime-local"
            step="60"
            //vo 이름
            name="enrollDate"
            plcaeholder="측정시간"
            //인풋 상단 이름
            title="측정시간"
            //인풋태그 사이즈
            size={'size3'}
            // margin bottom , top
            mb={'10'}
            mt={'5'}
            // 위쪽에 만들어둔 useState
            value={inputData.enrollDate}
            // 입력값 저장하기
            f={handleDateChange}
          ></InputTag>
          <InputTag
            name="note"
            type="text"
            title="특이사항"
            value={inputData.note}
            size={'size3'}
            mb={'10'}
            mt={'5'}
            f={handleChange}
          ></InputTag>
          {/* // 모달 바깥 등록 버튼 */}
          <ModalContainer>
            <Btn
              //모달 title과 맞춰주기
              title={'인슐린 등록'}
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

        <ImageLayoutDiv>
          <ImageDiv>
            <Div100>
              <Div110>
                <Div111>
                  <RightArmDiv>
                    {rightArmNumList.map((vo) => {
                      const isDisabled = disablePoint.includes(vo); // 비활성화 여부 확인
                      return (
                        <CheckDiv
                          key={vo}
                          onClick={() => {
                            // 모달 안 데이터 초기화
                            // reset();
                            //해당 모달 열기
                            setInputData({
                              no: '',
                              memberNo: '1',
                              enrollDate: '',
                              ableDate: '',
                              note: '',
                              point: vo,
                            });
                            // title : 모달 이름
                            dispatch(open({ title: '인슐린 등록', value: 'block' }));
                          }}
                          isDisabled={isDisabled}
                        >
                          {vo}
                        </CheckDiv>
                      );
                    })}
                  </RightArmDiv>
                </Div111>
                <Div112>
                  <RightStomDiv>
                    {rightStomNumList.map((vo) => {
                      const isDisabled = disablePoint.includes(vo); // 비활성화 여부 확인
                      return (
                        <CheckDiv
                          key={vo}
                          onClick={() => {
                            setInputData({
                              no: '',
                              memberNo: '1',
                              enrollDate: '',
                              ableDate: '',
                              note: '',
                              point: vo,
                            });
                            // title : 모달 이름
                            dispatch(open({ title: '인슐린 등록', value: 'block' }));
                          }}
                          isDisabled={isDisabled}
                        >
                          {vo}
                        </CheckDiv>
                      );
                    })}
                  </RightStomDiv>
                </Div112>
                <div></div>
              </Div110>
              <Div120>
                <div></div>
                <Div122>
                  <LeftStomDiv>
                    {leftStomNumList.map((vo) => {
                      const isDisabled = disablePoint.includes(vo); // 비활성화 여부 확인
                      return (
                        <CheckDiv
                          key={vo}
                          onClick={() => {
                            // 모달 안 데이터 초기화
                            setInputData({
                              no: '',
                              memberNo: '1',
                              enrollDate: '',
                              ableDate: '',
                              note: '',
                              point: vo,
                            });
                            // title : 모달 이름
                            dispatch(open({ title: '인슐린 등록', value: 'block' }));
                          }}
                          isDisabled={isDisabled}
                        >
                          {vo}
                        </CheckDiv>
                      );
                    })}
                  </LeftStomDiv>
                </Div122>
                <Div123>
                  <LeftArmDiv>
                    {leftArmNumList.map((vo) => {
                      const isDisabled = disablePoint.includes(vo); // 비활성화 여부 확인
                      return (
                        <CheckDiv
                          key={vo}
                          onClick={() => {
                            // 모달 안 데이터 초기화
                            setInputData({
                              no: '',
                              memberNo: '1',
                              enrollDate: '',
                              ableDate: '',
                              note: '',
                              point: vo,
                            });
                            // title : 모달 이름
                            dispatch(open({ title: '인슐린 등록', value: 'block' }));
                          }}
                          isDisabled={isDisabled}
                        >
                          {vo}
                        </CheckDiv>
                      );
                    })}
                  </LeftArmDiv>
                </Div123>
              </Div120>
            </Div100>
            <Div200>
              <Div210>
                <RightLegDiv>
                  {rightLegNumList.map((vo) => {
                    const isDisabled = disablePoint.includes(vo); // 비활성화 여부 확인
                    return (
                      <CheckDiv
                        key={vo}
                        onClick={() => {
                          // 모달 안 데이터 초기화
                          setInputData({
                            no: '',
                            memberNo: '1',
                            enrollDate: '',
                            ableDate: '',
                            note: '',
                            point: vo,
                          });
                          // title : 모달 이름
                          dispatch(open({ title: '인슐린 등록', value: 'block' }));
                        }}
                        isDisabled={isDisabled}
                      >
                        {vo}
                      </CheckDiv>
                    );
                  })}
                </RightLegDiv>
              </Div210>
              <Div220>
                <LeftLegDiv>
                  {leftLegNumList.map((vo) => {
                    const isDisabled = disablePoint.includes(vo); // 비활성화 여부 확인
                    return (
                      <CheckDiv
                        key={vo}
                        onClick={() => {
                          // 모달 안 데이터 초기화
                          setInputData({
                            no: '',
                            memberNo: '1',
                            enrollDate: '',
                            ableDate: '',
                            note: '',
                            point: vo,
                          });
                          // title : 모달 이름
                          dispatch(open({ title: '인슐린 등록', value: 'block' }));
                        }}
                        isDisabled={isDisabled}
                      >
                        {vo}
                      </CheckDiv>
                    );
                  })}
                </LeftLegDiv>
              </Div220>
            </Div200>
          </ImageDiv>
        </ImageLayoutDiv>

        <BtnContainer>
          <div onClick={handleDelSubmit}>
            <Btn mt={'50'} mr={'46'} mb={'20'} str={'삭제'} c={'#FF7F50'} fc={'white'}></Btn>
          </div>
        </BtnContainer>
        <RadiusTable width="100%" thBgColor="" radius="0px">
          <thead>
            <tr>
              <th>투약일</th>
              <th>투약 시간</th>
              <th>투약 위치</th>
              <th>투약 가능일</th>
              <th>특이사항</th>
              <th>비고</th>
            </tr>
          </thead>

          <tbody>
            {/* 한개의 날짜에 여러개의 데이터가 속해있고 그 데이터를 묶어서 표시하고 싶을때 사용하는 방식임 잘 모르겠으면 혈압
            페이지 찾아와서 참고 */}
            {Object.entries(
              dataVoList.reduce((acc, vo) => {
                if (!acc[vo.day]) acc[vo.day] = [];
                acc[vo.day].push(vo);
                return acc;
              }, {})
            ).map(
              ([day, records]) =>
                records.map((vo, index) => (
                  <tr key={vo.no}>
                    {index === 0 && (
                      <td
                        rowSpan={records.length}
                        style={{ verticalAlign: 'middle', fontWeight: 'bold', textAlign: 'center' }}
                      >
                        {day}
                      </td>
                    )}
                    <td>{vo.time}</td>
                    <td>{vo.point}</td>
                    <td>{vo.ableDate}</td>
                    <td>{vo.note}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(vo.no)}
                        onChange={() => handleCheckboxChange(vo.no)}
                      />
                    </td>
                  </tr>
                ))
              // checked={setDelNo(vo.no)} onChange={handleDelNo}
            )}
          </tbody>
        </RadiusTable>
        <Pagination boardType={boardType}></Pagination>
      </ContentLayout>
    </>
  );
};

export default InsulinPoint;
