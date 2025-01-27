import React from 'react';
import Calendar from '../../../util/Calendar';
import Modal from '../../../util/Modal';
import Input from '../../../util/Input';
import Title from '../../../util/Title';
import Navi from '../../../util/Navi';
import styled from 'styled-components';

const ExHistory = () => {
  const events = {
    '2025-1-8': ['30분', '달리기'],
    '2025-1-9': ['2시간', '걷기'],
    '2025-1-14': ['2시간', '걷기'],
  };

  return (
    <div>
      <Title>운동</Title>
      <NaviContainer>
        <Navi target="aerobic" tag={'유산소'}></Navi>
        <Navi target="anaerobic" tag={'무산소'}></Navi>
        <Navi target="exhistory" tag={'내역 관리'}></Navi>
        <Navi target="exreport" tag={'리포트'}></Navi>
      </NaviContainer>

      <BlankSpace />

      <Modal title="캘린더 모달">
        <div>
          <Input type="text" placeholder="이벤트 내용을 입력하세요" size="size3" mb={20} />
        </div>
      </Modal>

      <Calendar modalTitle="캘린더 모달" vo={[]} events={events} width={800} height={100} />

      <BlankSpace />
    </div>
  );
};

const BlankSpace = styled.div`
  height: 100px;
`;

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 400px;
  top: 20px;
  left: 40px;
  grid-template-columns: 3fr 3fr 4fr 3fr;
`;

export default ExHistory;
