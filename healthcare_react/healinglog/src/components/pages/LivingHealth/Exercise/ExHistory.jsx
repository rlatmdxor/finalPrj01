import React, { useEffect, useState } from 'react';
import Modal from '../../../util/Modal';
import Input from '../../../util/Input';
import Title from '../../../util/Title';
import Navi from '../../../util/Navi';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { close } from '../../../../redux/modalSlice';
import ContentLayout from '../../../util/ContentLayout';
import ExCalendar from '../../../util/ExCalendar';

const ExHistory = () => {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const [events, setEvents] = useState({});
  const [exerciseType, setExerciseType] = useState('aerobic');

  useEffect(() => {
    dispatch(close('운동시작'));
    fetchEvents();
  }, [exerciseType]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:80/api/exercise/getHistory?type=${exerciseType}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      console.log(data);

      setEvents(data);
    } catch (error) {
      console.error('Error fetching exercise history:', error);
    }
  };

  return (
    <>
      <Title>운동</Title>
      <NaviContainer>
        <Navi target="aerobic" tag={'유산소'}></Navi>
        <Navi target="anaerobic" tag={'무산소'}></Navi>
        <Navi target="exhistory" tag={'내역 관리'}></Navi>
        <Navi target="exreport" tag={'리포트'}></Navi>
      </NaviContainer>

      <ContentLayout>
        <BlankSpace />

        <Modal title="캘린더 모달">
          <div>
            <Input type="text" placeholder="이벤트 내용을 입력하세요" size="size3" mb={20} />
          </div>
        </Modal>

        <ButtonContainer>
          <ToggleButton onClick={() => setExerciseType('aerobic')} active={exerciseType === 'aerobic'}>
            유산소
          </ToggleButton>
          <ToggleButton onClick={() => setExerciseType('anaerobic')} active={exerciseType === 'anaerobic'}>
            무산소
          </ToggleButton>
        </ButtonContainer>

        <ExCalendar modalTitle="캘린더 모달" vo={[]} events={events} width={800} height={100} />

        <BlankSpace />
      </ContentLayout>
    </>
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

const ButtonContainer = styled.div`
  display: flex;
  width: 800px;
  justify-self: center;
  justify-content: end;
  margin-bottom: 20px;
`;

const ToggleButton = styled.button`
  background-color: ${(props) => (props.active ? '#4CAF50' : '#ddd')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  border: none;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background-color: ${(props) => (props.active ? '#45a049' : '#bbb')};
  }
`;

export default ExHistory;
