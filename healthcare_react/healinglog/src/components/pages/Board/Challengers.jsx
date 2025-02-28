import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Title from '../../util/Title';
import Navi from '../../util/Navi';
import ContentLayout from '../../util/ContentLayout';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 400px;
  top: 20px;
  left: 40px;
  margin-bottom: 100px;
  grid-template-columns: 5fr 2fr 5fr;
`;

const TableTag = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const Exp = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  width: 100%;
  height: 12px;
  background: ${(props) => `linear-gradient(90deg, #00aaff ${props.value}%, #ddd ${props.value}%)`};
  border-radius: 6px;
  transition: 0.3s ease-in-out;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    background: none;
    height: 12px;
    border-radius: 6px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0px;
    height: 0px;
    background: transparent;
    box-shadow: none;
  }
`;
const RangeBar = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  width: 80%;
  height: 12px;
  background: ${(props) => `linear-gradient(90deg, #00aaff ${props.value}%, #ddd ${props.value}%)`};
  border-radius: 6px;
  transition: 0.3s ease-in-out;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    background: none;
    height: 12px;
    border-radius: 6px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0px;
    height: 0px;
    background: transparent;
    box-shadow: none;
  }
`;

const ContainerDiv = styled.div`
  width: 900px;
  border: 1px solid black;
  margin-bottom: 30px;

  &[id='underLine'] {
    margin-left: 40px;
    width: 830px;
    border: 0.5px solid lightgray;
  }
`;

const ThTag = styled.th`
  background-color: #e8f5e9;
  border: 1px solid #d3d3d3;
  padding: 10px;
  text-align: center;
`;

const TdTag = styled.td`
  border: 1px solid #d3d3d3;
  padding: 10px;
  text-align: center;
`;

const StyledDiv = styled.div`
  display: flex;
  & > button {
    margin-left: 110px;
    width: 100px;
    height: 35px;
    background-color: #ff7f50;
    color: white;
    border: none;
    border-radius: 15px;
    justify-content: end;
  }

  & > div[id='font'] {
    font-size: 16px;
    font-weight: bold;
  }
`;

const Challengers = () => {
  const [exp, setExp] = useState(40); // 경험치 % (0~100)
  const [boardData, setBoardData] = useState([]);
  const initialInputData = {
    title: '',
    content: '',
    writer: '1',
    recruitmentStart: '',
    recruitmentEnd: '',
    performanceStart: '',
    performanceEnd: '',
    maxMembers: '',
    memberNo: '',
    countMember: '',
  };
  const reset = () => {
    setBoardData(initialInputData);
  };
  useEffect(() => {
    fetch('http://127.0.0.1:/api/challenger/list')
      .then((resp) => resp.json())
      .then((data) => {
        setBoardData(data);
      });
  }, []);

  return (
    <>
      <Title>챌린저스</Title>
      <NaviContainer>
        <Navi target="challengers" tag={'나의 챌린저'}></Navi>
        <Navi target="challengersList" tag={'목록 '}></Navi>
        <Navi target="challengersBoard" tag={'인증 게시글'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <div style={{ width: '300px', textAlign: 'start' }}>
          <p style={{ fontSize: '20px' }}>Lv. 1 {exp} / 100(%)</p>
          <Exp value={exp} readOnly />
        </div>

        <div>
          <h2> 내가 신청한 챌린지</h2>
          <ContainerDiv></ContainerDiv>
          <>
            <ul>
              <h3>1. 하루 10000보 걷기</h3>
              <div>2025 .02 .25 ~ 2025 .03 .01 </div>
              <RangeBar id={'challengerRange'} value={'70'} />
              <StyledDiv>
                <div>달성률 : </div>
                <div id="font">10 / 100(%)</div>
              </StyledDiv>
              <StyledDiv>
                <div>금일 인증 : </div>
                <div id="font">N</div>
                <button>인증 바로가기</button>
              </StyledDiv>
            </ul>
            <ContainerDiv id="underLine"></ContainerDiv>
            <ul>
              <h3>2. 하루 10000보 걷기</h3>
              <div>2025 .02 .25 ~ 2025 .03 .01 </div>
              <RangeBar id={'challengerRange'} value={'70'} />
              <StyledDiv>
                <div>달성률 : </div>
                <div id="font">10 / 100(%)</div>
              </StyledDiv>
              <StyledDiv>
                <div>금일 인증 : </div>
                <div id="font">N</div>
                <button>인증 바로가기</button>
              </StyledDiv>
            </ul>
            <ContainerDiv id="underLine"></ContainerDiv>
            <ul>
              <h3>하루 10000보 걷기</h3>
              <div>2025 .02 .25 ~ 2025 .03 .01 </div>
              <RangeBar id={'challengerRange'} value={'70'} />
              <StyledDiv>
                <div>달성률 : </div>
                <div id="font">10 / 100(%)</div>
              </StyledDiv>
              <StyledDiv>
                <div>금일 인증 : </div>
                <div id="font">N</div>
                <button>인증 바로가기</button>
              </StyledDiv>
            </ul>
            <ContainerDiv id="underLine"></ContainerDiv>
            <ul>
              <h3>하루 10000보 걷기</h3>
              <div>2025 .02 .25 ~ 2025 .03 .01 </div>
              <RangeBar id={'challengerRange'} value={'70'} />
              <StyledDiv>
                <div>달성률 : </div>
                <div id="font">10 / 100(%)</div>
              </StyledDiv>
              <StyledDiv>
                <div>금일 인증 : </div>
                <div id="font">N</div>
                <button>인증 바로가기</button>
              </StyledDiv>
            </ul>
            <ContainerDiv id="underLine"></ContainerDiv>
            <ul>
              <h3>하루 10000보 걷기</h3>
              <div>2025 .02 .25 ~ 2025 .03 .01 </div>
              <RangeBar id={'challengerRange'} value={'70'} />
              <StyledDiv>
                <div>달성률 : </div>
                <div id="font">10 / 100(%)</div>
              </StyledDiv>
              <StyledDiv>
                <div>금일 인증 : </div>
                <div id="font">N</div>
                <button>인증 바로가기</button>
              </StyledDiv>
            </ul>
            <ContainerDiv id="underLine"></ContainerDiv>
            <ul>
              <h3>하루 10000보 걷기</h3>
              <div>2025 .02 .25 ~ 2025 .03 .01 </div>
              <RangeBar id={'challengerRange'} value={'70'} />
              <StyledDiv>
                <div>달성률 : </div>
                <div id="font">10 / 100(%)</div>
              </StyledDiv>
              <StyledDiv>
                <div>금일 인증 : </div>
                <div id="font">N</div>
                <button>인증 바로가기</button>
              </StyledDiv>
            </ul>
            <ContainerDiv id="underLine"></ContainerDiv>
          </>
        </div>

        <div>
          <h2>내가 등록한 챌린지</h2>
          <button> 삭제 </button>
          <div>
            <TableWrapper>
              <TableTag>
                <thead>
                  <tr>
                    <ThTag>번호</ThTag>
                    <ThTag>제목</ThTag>
                    <ThTag>내용</ThTag>
                    <ThTag>모집기간</ThTag>
                    <ThTag>수행기간</ThTag>
                    <ThTag>모집</ThTag>
                  </tr>
                </thead>
                <tbody>
                  {boardData.map((vo) => {
                    return (
                      <tr
                        key={vo.no}
                        onClick={() => {
                          reset();
                          setBoardData(() => {
                            return {
                              title: vo.title,
                              content: vo.content,
                              writer: '1',
                              recruitmentStart: vo.recruitmentStar,
                              recruitmentEnd: vo.recruitmentEn,
                              performanceStart: vo.performanceStar,
                              performanceEnd: vo.performanceEn,
                              maxMembers: vo.maxMembers,
                              status: vo.status,
                              no: vo.no,
                              memberNo: vo.memberNo,
                              countMember: vo.countMember,
                            };
                          });
                        }}
                      >
                        <TdTag>{vo.no}</TdTag>
                        <TdTag>{vo.title}</TdTag>
                        <TdTag>{vo.content}</TdTag>
                        <TdTag>
                          <span>{vo.recruitmentStar} ~ </span>
                          <div>{vo.recruitmentEn}</div>
                        </TdTag>
                        <TdTag>
                          <span>{vo.performanceStar} ~</span>
                          <div>{vo.performanceEn}</div>
                        </TdTag>
                        <TdTag width={'60px'}>{vo.status}</TdTag>
                      </tr>
                    );
                  })}
                </tbody>
              </TableTag>
            </TableWrapper>
          </div>
        </div>
      </ContentLayout>
    </>
  );
};

export default Challengers;
