// import React from 'react';
// import Title from '../../../util/Title';
// import { setSelection } from '../../../../redux/selectSlice';
// import SelectedBar from '../../../util/SelectedBar';
// import styled, { ThemeProvider, useTheme } from 'styled-components';
// import Btn from '../../../util/Btn';
// import Table from '../../../common/Table';
// // import BoardList from '../../../common/BoardList';
// // import Pagination from '../../../util/Pagination';

// const Wrapper = styled.div`
//   display: flex;
//   /* justify-content: center; 중앙 정렬 */
//   gap: 20px; /* 간격 추가 */
//   flex-wrap: wrap; /* 줄 바꿈 허용 */
//   /* margin-top: 20px; */
//   margin-left: 100px;
//   margin-right: 100px;
//   padding: 30px;
//   padding-left: 50px;
//   padding-right: 50px;
// `;

// const TitleBox = styled.div`
//   text-align: center;
//   line-height: 55px;
//   font-size: 2em;
//   font-weight: 600;
//   width: 1024px;
//   height: 60px;
//   margin-left: 150px;
//   margin-top: 50px;
//   background-color: rgb(203, 225, 190);
//   /* border: 1px solid black; */
// `;

// const ContextBox = styled.div`
//   width: 1024px;
//   height: 600px;
//   margin-left: 150px;
//   background-color: rgb(238, 245, 233);
//   margin-bottom: 100px;
//   position: relative;
//   /* border: 1px solid black; */
// `;

// const PositionedBtn = styled.div`
//   position: absolute;
//   bottom: 40px;
//   right: 40px;
// `;

// const Box = styled.div`
//   width: 80%;
//   height: 80%;
// `;

// const SubTitle = styled.div`
//   font-size: 35px;
//   font-weight: 600;
//   color: gray;
//   margin-top: 30px;
//   margin-left: 50px;
// `;

// const Highlight = styled.span`
//   border-bottom: 6px solid #ff7f50; /* 주황색 밑줄 */
//   padding-bottom: 5px;
//   color: black;
// `;

// const Pharmacy = () => {
//   const theme = useTheme();
//   return (
//     <div>
//       <Title>의료기관 찾기</Title>
//       <SubTitle>
//         병원 <Highlight>약국</Highlight> 보건소
//       </SubTitle>

//       <Box>
//         <TitleBox>지역</TitleBox>

//         <ContextBox>
//           <Wrapper>
//             {/* <Selected> */}
//             <SelectedBar
//               label="city"
//               options={['서울', '경기', '인천', '어디지']}
//               reduxAction={setSelection}
//               index={0}
//             />
//             <SelectedBar
//               label="district"
//               options={[
//                 '동작구',
//                 '은평구',
//                 '아무구',
//                 '저리구',
//                 '은평구',
//                 '아무구',
//                 '저리구',
//                 '은평구',
//                 '아무구',
//                 '저리구',
//                 '은평구',
//                 '아무구',
//                 '저리구',
//                 '아무구',
//                 '저리구',
//                 '은평구',
//                 '아무구',
//                 '저리구',
//                 '은평구',
//                 '아무구',
//                 '저리구',
//                 '은평구',
//                 '아무구',
//                 '저리구',
//               ]}
//               reduxAction={setSelection}
//               index={1}
//             />
//             <SelectedBar
//               label="dong"
//               options={['동작구', '은평구', '아무구', '저리구']}
//               reduxAction={setSelection}
//               index={2}
//             />
//             {/* </Selected> */}
//           </Wrapper>
//           <PositionedBtn>
//             <Btn
//               // w="60"
//               // h="60"
//               str="검색"
//               c={() => {
//                 return `#FF7F50`;
//               }}
//               fs="20"
//               fc="white"
//               type="submit"
//               f={() => {}}
//             ></Btn>
//           </PositionedBtn>
//         </ContextBox>
//       </Box>
//     </div>
//   );
// };

// export default Pharmacy;
