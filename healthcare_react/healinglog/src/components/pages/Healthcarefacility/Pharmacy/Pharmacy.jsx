import React from 'react';
import Title from '../../../util/Title';
import { setSelection } from '../../../../redux/selectSlice';
import SelectedBar from '../../../util/SelectedBar';
import styled, { ThemeProvider, useTheme } from 'styled-components';
// import CommonBtn from '../../../util/Btn';

const Wrapper = styled.div`
  display: flex;
  /* justify-content: center; 중앙 정렬 */
  gap: 20px; /* 간격 추가 */
  flex-wrap: wrap; /* 줄 바꿈 허용 */
  /* margin-top: 20px; */
  margin-left: 100px;
  margin-right: 100px;
  padding: 30px;
  padding-left: 50px;
  padding-right: 50px;
`;

const TitleBox = styled.div`
  text-align: center;
  font-size: 2em;
  font-weight: bold;
  width: 1024px;
  height: 40px;
  margin-left: 150px;
  margin-top: 50px;
  background-color: rgb(203, 225, 190);
  /* border: 1px solid black; */
`;

const ContextBox = styled.div`
  width: 1024px;
  height: 600px;
  margin-left: 150px;
  background-color: rgb(238, 245, 233);
  margin-bottom: 100px;
  /* border: 1px solid black; */
`;

const Box = styled.div`
  width: 80%;
  height: 80%;
`;

// const Selected = styled.div`
//   padding: 30px;
//   display: flex;
//   flex-wrap: wrap; /* 줄 바꿈 허용 */
// `;

// const Btn = ({ str, f, c, fc }) => {
//   return (
//     <CommonBtn onClick={f} c={c} fc={fc}>
//       {str}
//     </CommonBtn>
//   );
// };

const Pharmacy = () => {
  return (
    <div>
      <Title>의료기관 찾기</Title>
      <Title>약국</Title>

      <Box>
        <TitleBox>지역</TitleBox>
        {/* <ThemeProvider theme={theme}>
        <CommonBtn c={theme.orange} fc="black">
          {'내용'}
        </CommonBtn>
      </ThemeProvider> */}

        <ContextBox>
          <Wrapper>
            {/* <Selected> */}
            <SelectedBar options={['서울', '경기', '인천', '어디지']} reduxAction={setSelection} index={0} />
            <SelectedBar
              label="alcohol"
              options={['동작구', '은평구', '아무구', '저리구']}
              reduxAction={setSelection}
              index={1}
            />
            <SelectedBar
              label="alcohol"
              options={['동작구', '은평구', '아무구', '저리구']}
              reduxAction={setSelection}
              index={2}
            />
            {/* </Selected> */}
          </Wrapper>
        </ContextBox>
      </Box>
    </div>
  );
};

export default Pharmacy;
