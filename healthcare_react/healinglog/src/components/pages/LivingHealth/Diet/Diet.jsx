import React from 'react';
import Title from '../../../util/Title';
import styled from 'styled-components';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';
import Btn from '../../../util/Btn';
import Modal from '../../../util/Modal';
import { useDispatch } from 'react-redux';
import { open } from '../../../../redux/modalSlice';
import Input from '../../../util/Input';
import { IconButton, Tooltip } from '@mui/material';
import { Delete, Info, InfoOutlined } from '@mui/icons-material';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 300px;
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 3fr 3fr;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 60px;
  margin-bottom: 60px;
`;

const DayDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #78be78;
  box-sizing: border-box;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  margin-bottom: 30px;

  & input {
    background: none;
    border: none;
    font-family: Arial, sans-serif;
    font-size: 19px;
    cursor: pointer;
    color: white;
  }

  & button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: white;
  }
`;

const ContentAreaDiv = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 25px;
  margin-bottom: 25px;
`;

const SmallCard = styled.div`
  width: 100%;
  height: 150px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 48px auto;
  border: 1px solid #c5cbd1;
  border-radius: 6px;
  text-align: center;

  &: hover {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  }
`;

const SmallTextDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 14px;
  font-size: 16px;
  font-weight: 500;
  color: #3b3b3b;
`;

const BigTextDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 11px;
  font-size: 38px;
`;

const BigCard = styled.div`
  width: 100%;
  height: 130px;
  grid-column: span 3;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #c5cbd1;
  border-radius: 6px;
`;

const TodayDietitian = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Diet = () => {
  const dispatch = useDispatch();

  const handleWaterEnroll = () => {
    dispatch(open({ title: '물 등록', value: 'block' }));
  };

  const handleWeightEnroll = () => {
    dispatch(open({ title: '체중 등록', value: 'block' }));
  };

  const handleDietEnroll = () => {
    dispatch(open({ title: '식단 등록', value: 'block' }));
  };

  return (
    <>
      <Title>식단</Title>
      <NaviContainer>
        <Navi target="diet" tag={'식단기록'}></Navi>
        <Navi target="dietcalendar" tag={'캘린더'}></Navi>
        <Navi target="dietreport" tag={'리포트'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <ContentDiv>
          <DayDiv>
            <button>◀</button>
            <input type="date" value={new Date().toISOString().split('T')[0]} />
            <button>▶</button>
          </DayDiv>
          <ContentAreaDiv>
            <SmallCard>
              <SmallTextDiv>오늘 섭취 칼로리</SmallTextDiv>
              <BigTextDiv>2500 Kcal</BigTextDiv>
            </SmallCard>
            <SmallCard>
              <SmallTextDiv>
                <div>오늘 마신 물</div>
                <Btn str={'등록'} w={'50'} h={'25'} fs={'13'} c={'#ff8a60'} fc={'#ffffff'} f={handleWaterEnroll} />
              </SmallTextDiv>
              <BigTextDiv>1600 ml</BigTextDiv>
            </SmallCard>
            <SmallCard>
              <SmallTextDiv>
                <div>오늘의 체중</div>
                <Btn str={'등록'} w={'50'} h={'25'} fs={'13'} c={'#ff8a60'} fc={'#ffffff'} f={handleWeightEnroll} />
              </SmallTextDiv>
              <BigTextDiv>60 Kg</BigTextDiv>
            </SmallCard>
          </ContentAreaDiv>
          <ContentAreaDiv>
            <BigCard>
              <div>
                나의 BMI
                <Tooltip title="BMI= 체중(kg) / (키(m)× 키(m))">
                  <IconButton>
                    <InfoOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
              <div>
                표준체중{' '}
                <Tooltip title="BMI= 체중(kg) / (키(m)× 키(m))">
                  <IconButton>
                    <InfoOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
              <div>
                권장섭취칼로리{' '}
                <Tooltip title="BMI= 체중(kg) / (키(m)× 키(m))">
                  <IconButton>
                    <InfoOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
              <div>
                권장섭취물양{' '}
                <Tooltip title="BMI= 체중(kg) / (키(m)× 키(m))">
                  <IconButton>
                    <InfoOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
            </BigCard>
          </ContentAreaDiv>
          <TodayDietitian>
            <div>오늘의 식단</div>
            <Btn str={'등록'} w={'60'} h={'34'} fs={'15'} c={'#ff8a60'} fc={'#ffffff'} f={handleDietEnroll} />
          </TodayDietitian>
          <ContentAreaDiv>
            <SmallCard>
              <SmallTextDiv>
                <div>아침</div>
                <Btn str={'상세'} w={'50'} h={'25'} fs={'13'} />
              </SmallTextDiv>
              <BigTextDiv>2500 Kcal</BigTextDiv>
            </SmallCard>
            <SmallCard>
              <SmallTextDiv>
                <div>오전간식</div>
                <Btn str={'상세'} w={'50'} h={'25'} fs={'13'} />
              </SmallTextDiv>
              <div>등록된 식단이 없습니다.</div>
            </SmallCard>
            <SmallCard>
              <SmallTextDiv>
                <div>점심</div>
                <Btn str={'상세'} w={'50'} h={'25'} fs={'13'} />
              </SmallTextDiv>
              <BigTextDiv>2500 Kcal</BigTextDiv>
            </SmallCard>
          </ContentAreaDiv>
          <ContentAreaDiv>
            <SmallCard>
              <SmallTextDiv>
                <div>오후간식</div>
                <Btn str={'상세'} w={'50'} h={'25'} fs={'13'} />
              </SmallTextDiv>
              <div>등록된 식단이 없습니다.</div>
            </SmallCard>
            <SmallCard>
              <SmallTextDiv>
                <div>저녁</div>
                <Btn str={'상세'} w={'50'} h={'25'} fs={'13'} />
              </SmallTextDiv>
              <div>등록된 식단이 없습니다.</div>
            </SmallCard>
            <SmallCard>
              <SmallTextDiv>
                <div>야식</div>
                <Btn str={'상세'} w={'50'} h={'25'} fs={'13'} />
              </SmallTextDiv>
              <div>등록된 식단이 없습니다.</div>
            </SmallCard>
          </ContentAreaDiv>
        </ContentDiv>
        <h1>여기에 광고를 넣어서 돈을 벌자</h1>
        <Modal title="물 등록" type={'add'}>
          <Input type="number" plcaeholder="" title="마신 양 (ml)" size={'size2'} mb={'10'} mt={'5'} />
        </Modal>
        <Modal title="체중 등록" type={'add'}>
          <Input type="number" plcaeholder="" title="체중 (kg)" size={'size2'} mb={'10'} mt={'5'} />
        </Modal>
        <Modal title="식단 등록" type={'add'}>
          <Input type="text" plcaeholder="" title="체중 (kg)" size={'size2'} mb={'10'} mt={'5'} />
        </Modal>
      </ContentLayout>
    </>
  );
};

export default Diet;
