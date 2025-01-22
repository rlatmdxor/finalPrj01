import Title from '../../../util/Title';
import { setSelection } from '../../../../redux/selectSlice';
import SelectedBar from '../../../util/SelectedBar';
import styled from 'styled-components';
import Calendar from '../../../util/Calendar';
import Modal from '../../../util/Modal';

const SubTitle = styled.div`
  font-size: 35px;
  font-weight: 600;
  color: gray;
  margin-top: 30px;
  margin-bottom: 50px;
  margin-left: 50px;
`;

const Highlight = styled.span`
  border-bottom: 6px solid #ff7f50; /* 주황색 밑줄 */
  padding-bottom: 5px;
  color: black;
`;

const Box = styled.span``;

const Alc = () => {
  return (
    <div>
      <Title>음주</Title>
      <SubTitle>
        <Highlight>캘린더</Highlight>&nbsp;&nbsp;리포트
      </SubTitle>

      <Box>
        <Calendar></Calendar>
      </Box>
      <SelectedBar
        label="alcohol"
        options={['소주', '맥주', '막걸리', '와인']}
        reduxAction={setSelection}
        index={0}
        margin="500px 10px"
      />
      <SelectedBar label="alcohol" options={['주 1회', '주 2~3회', '매일']} reduxAction={setSelection} index={1} />

      <Modal></Modal>
    </div>
  );
};

export default Alc;
