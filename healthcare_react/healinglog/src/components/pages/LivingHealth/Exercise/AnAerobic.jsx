import React, { useEffect, useState } from 'react';
import Title from '../../../util/Title';
import Navi from '../../../util/Navi';
import styled from 'styled-components';
import Modal from '../../../util/Modal';
import Input from '../../../util/Input';
import { useDispatch } from 'react-redux';
import { close, open } from '../../../../redux/modalSlice';
import { useNavigate } from 'react-router-dom';
import ContentLayout from '../../../util/ContentLayout';

const AnAerobic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalTitle, setModalTitle] = useState('');
  const [sets, setSets] = useState(1);
  const [repeats, setRepeats] = useState(10);
  const [rangeValue, setRangeValue] = useState(180);
  const token = localStorage.getItem('token');

  const handleRegister = () => {
    navigate(`/exercising/${modalTitle}`, {
      state: {
        title: modalTitle,
        sets,
        repeats,
        rangeValue,
      },
    });
  };

  // //페이지 첫렌더링 시 데이터 가져오기
  // useEffect(() => {
  //   fetch('http://127.0.0.1:80/api/exercise/anaerobic/getdata', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       console.log('data : ', data);
  //     })
  //     .catch((error) => {
  //       console.error('fetch 오류:', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   dispatch(close('운동시작'));
  // }, []);

  return (
    <>
      <Title>운동</Title>
      <NaviContainer>
        <Navi target="bookmark" tag={'즐겨찾기'}></Navi>
        <Navi target="aerobic" tag={'유산소'}></Navi>
        <Navi target="anaerobic" tag={'무산소'}></Navi>
        <Navi target="exhistory" tag={'내역 관리'}></Navi>
        <Navi target="exreport" tag={'리포트'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <BlankSpace />
        {/* <AnFavoriteList
          f={(name) => {
            setModalTitle(name);
            dispatch(open({ title: '운동시작', value: 'block' }));
          }}
        /> */}

        <ListContainer>
          {/* <ArmExList
            f={(name) => {
              setModalTitle(name);
              dispatch(open({ title: '운동시작', value: 'block' }));
            }}
          />
          <LegExList
            f={(name) => {
              setModalTitle(name);
              dispatch(open({ title: '운동시작', value: 'block' }));
            }}
          />
          <CoreExList
            f={(name) => {
              setModalTitle(name);
              dispatch(open({ title: '운동시작', value: 'block' }));
            }}
          />
        </ListContainer>
        <ListContainer>
          <ChestExList
            f={(name) => {
              setModalTitle(name);
              dispatch(open({ title: '운동시작', value: 'block' }));
            }}
          />
          <ShoulderExList
            f={(name) => {
              setModalTitle(name);
              dispatch(open({ title: '운동시작', value: 'block' }));
            }}
          />
          <EtcExList
            f={(name) => {
              setModalTitle(name);
              dispatch(open({ title: '운동시작', value: 'block' }));
            }}
          /> */}
        </ListContainer>
        <BlankSpace />
      </ContentLayout>
      <Modal title="운동시작" type={'exercise'} f={handleRegister}>
        <Input
          type="text"
          plcaeholder="value"
          title="운동명"
          size={'size3'}
          mb={'10'}
          mt={'5'}
          value={modalTitle}
          disabled={true}
        ></Input>
        <Input
          type="number"
          plcaeholder="VALUE"
          title="세트 수"
          size={'size3'}
          mb={'10'}
          mt={'5'}
          f={(e) => {
            let inputValue = Number(e.target.value);

            if (inputValue < 1) {
              inputValue = 1;
            }

            if (inputValue > 20) {
              inputValue = 20;
            }

            setSets(inputValue);
          }}
          value={sets}
          disabled={false}
        ></Input>
        <Input
          type="number"
          plcaeholder="VALUE"
          title="반복 횟수"
          size={'size3'}
          mb={'10'}
          mt={'5'}
          f={(e) => {
            let inputValue = Number(e.target.value);

            if (inputValue < 10) {
              inputValue = 10;
            }

            if (inputValue > 100) {
              inputValue = 100;
            }

            setRepeats(inputValue);
          }}
          value={repeats}
          disabled={false}
        ></Input>
        <div style={{ marginTop: '20px' }}>인터벌</div>
        <Input
          type="range"
          plcaeholder="VALUE"
          style={{ marginTop: '10px', marginRight: '10px' }}
          disabled={false}
          min="0"
          max="300"
          step="30"
          f={(e) => setRangeValue(Number(e.target.value))}
          value={rangeValue}
        ></Input>
        <span>{rangeValue}</span>초
      </Modal>
    </>
  );
};

const Container = styled.div``;

const BlankSpace = styled.div`
  height: 50px;
`;

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 500px;
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 3fr 3fr 4fr 3fr;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default AnAerobic;
