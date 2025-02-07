import React, { useState } from 'react';
import Title from '../../../util/Title';
import styled from 'styled-components';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';
import Btn from '../../../util/Btn';
import Modal from '../../../util/Modal';
import { useDispatch } from 'react-redux';
import { open } from '../../../../redux/modalSlice';
import Input from '../../../util/Input';
import { Autocomplete, IconButton, TextField, Tooltip } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

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

  &:hover {
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

const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 6px;
`;

const MealButton = styled.button`
  padding: 6px 12px;
  border: 1px solid ${(props) => (props.selected ? '#ff8a60' : '#cccccc')};
  font-size: 14px;
  border-radius: 20px;
  background-color: ${(props) => (props.selected ? '#ff8a60' : '#ffffff')};
  color: ${(props) => (props.selected ? '#ffffff' : '#000000')};
  cursor: pointer;
`;

const Diet = () => {
  const dispatch = useDispatch();

  const handelOpenWaterModal = () => {
    dispatch(open({ title: '물 등록', value: 'block' }));
  };

  const handleOpenWeightModal = () => {
    dispatch(open({ title: '체중 등록', value: 'block' }));
  };

  const handleOpenDietEnrollModal = () => {
    dispatch(open({ title: '식단 등록', value: 'block' }));
  };

  const handleOpenFoodEnrollModal = () => {
    dispatch(open({ title: '음식 직접입력', value: 'block' }));
  };

  const [selectedMeal, setSelectedMeal] = useState('');

  const options = [
    { id: 'morning', label: '아침' },
    { id: 'morningsnack', label: '오전간식' },
    { id: 'lunch', label: '점심' },
    { id: 'afternoonsnack', label: '오후간식' },
    { id: 'evening', label: '저녁' },
    { id: 'night', label: '야식' },
  ];

  const [selectedFood, setSelectedFood] = useState('');
  const [foodList, setFoodList] = useState([]);

  const foodDummyData = [
    { label: '쌀밥', unit: '1공기', weight: 210, calories: 336 },
    { label: '잡곡밥', unit: '1공기', weight: 210, calories: 306 },
    { label: '삶은계란', unit: '1개', weight: 45, calories: 65 },
    { label: '계란후라이', unit: '1개', weight: 46, calories: 95 },
    { label: '배추김치', unit: '1그릇', weight: 40, calories: 14 },
    { label: '사과', unit: '1개', weight: 250, calories: 142 },
    { label: '바나나', unit: '1개', weight: 150, calories: 114 },
    { label: '딸기', unit: '1개', weight: 20, calories: 6 },
  ];

  const handleSelectFood = (e, newValue) => {
    if (newValue) {
      setSelectedFood(newValue.label);
      setFoodList((prevList) => [...prevList, newValue]);
    }
  };

  const [formData, setFormData] = useState({});

  const handleFoodInputChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAddFood = (e) => {
    e.preventDefault();
    setFoodList((prevList) => [...prevList, formData]);
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
                <Btn
                  str={'등록'}
                  w={'50'}
                  h={'25'}
                  mt={'0'}
                  mb={'0'}
                  ml={'0'}
                  mr={'0'}
                  fs={'13'}
                  c={'#ff8a60'}
                  fc={'#ffffff'}
                  f={handelOpenWaterModal}
                />
              </SmallTextDiv>
              <BigTextDiv>1600 ml</BigTextDiv>
            </SmallCard>
            <SmallCard>
              <SmallTextDiv>
                <div>오늘의 체중</div>
                <Btn
                  str={'등록'}
                  w={'50'}
                  h={'25'}
                  mt={'0'}
                  mb={'0'}
                  ml={'0'}
                  mr={'0'}
                  fs={'13'}
                  c={'#ff8a60'}
                  fc={'#ffffff'}
                  f={handleOpenWeightModal}
                />
              </SmallTextDiv>
              <BigTextDiv>60 Kg</BigTextDiv>
            </SmallCard>
          </ContentAreaDiv>
          <ContentAreaDiv>
            <BigCard>
              <div>
                나의 BMI
                <Tooltip title="BMI = 체중(kg) / (키(m)× 키(m))">
                  <IconButton>
                    <InfoOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
              <div>
                표준체중
                <Tooltip title="BMI= 체중(kg) / (키(m)× 키(m))">
                  <IconButton>
                    <InfoOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
              <div>
                권장섭취칼로리
                <Tooltip title="BMI= 체중(kg) / (키(m)× 키(m))">
                  <IconButton>
                    <InfoOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
              <div>
                권장섭취물양
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
            <Btn
              str={'등록'}
              w={'60'}
              h={'34'}
              mt={'0'}
              mb={'0'}
              ml={'0'}
              mr={'0'}
              fs={'15'}
              c={'#ff8a60'}
              fc={'#ffffff'}
              f={handleOpenDietEnrollModal}
            />
          </TodayDietitian>
          <ContentAreaDiv>
            <SmallCard>
              <SmallTextDiv>
                <div>아침</div>
                <Btn str={'상세'} w={'50'} h={'25'} mt={'0'} mb={'0'} ml={'0'} mr={'0'} fs={'13'} />
              </SmallTextDiv>
              <BigTextDiv>2500 Kcal</BigTextDiv>
            </SmallCard>
            <SmallCard>
              <SmallTextDiv>
                <div>오전간식</div>
                <Btn str={'상세'} w={'50'} h={'25'} mt={'0'} mb={'0'} ml={'0'} mr={'0'} fs={'13'} />
              </SmallTextDiv>
              <div>등록된 식단이 없습니다.</div>
            </SmallCard>
            <SmallCard>
              <SmallTextDiv>
                <div>점심</div>
                <Btn str={'상세'} w={'50'} h={'25'} mt={'0'} mb={'0'} ml={'0'} mr={'0'} fs={'13'} />
              </SmallTextDiv>
              <BigTextDiv>2500 Kcal</BigTextDiv>
            </SmallCard>
          </ContentAreaDiv>
          <ContentAreaDiv>
            <SmallCard>
              <SmallTextDiv>
                <div>오후간식</div>
                <Btn str={'상세'} w={'50'} h={'25'} mt={'0'} mb={'0'} ml={'0'} mr={'0'} fs={'13'} />
              </SmallTextDiv>
              <div>등록된 식단이 없습니다.</div>
            </SmallCard>
            <SmallCard>
              <SmallTextDiv>
                <div>저녁</div>
                <Btn str={'상세'} w={'50'} h={'25'} mt={'0'} mb={'0'} ml={'0'} mr={'0'} fs={'13'} />
              </SmallTextDiv>
              <div>등록된 식단이 없습니다.</div>
            </SmallCard>
            <SmallCard>
              <SmallTextDiv>
                <div>야식</div>
                <Btn str={'상세'} w={'50'} h={'25'} mt={'0'} mb={'0'} ml={'0'} mr={'0'} fs={'13'} />
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
          <div>구분</div>
          <Container>
            {options.map(({ id, label }) => (
              <MealButton key={id} selected={selectedMeal === id} onClick={() => setSelectedMeal(id)}>
                {label}
              </MealButton>
            ))}
          </Container>
          <br />
          <div>음식 입력</div>
          <Container>
            <Autocomplete
              disablePortal
              options={foodDummyData}
              getOptionLabel={(option) => option.label}
              onChange={handleSelectFood}
              renderOption={(props, option) => (
                <li {...props} key={option.label}>
                  {option.label} ({option.unit} / {option.weight}g / {option.calories}kcal)
                </li>
              )}
              sx={{
                width: '100%',
              }}
              slotProps={{
                listbox: {
                  sx: {
                    fontSize: '15px',
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  placeholder="음식명을 입력해서 검색하세요"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'gray',
                        borderRadius: '10px',
                        borderWidth: '1.5px',
                      },
                      '&:hover fieldset': {
                        borderColor: 'gray',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '15px',
                    },
                  }}
                />
              )}
            />
            <Btn
              str="직접입력"
              mt={'0'}
              mb={'0'}
              ml={'3'}
              mr={'0'}
              w={'100'}
              h={'38'}
              fs={'14'}
              f={handleOpenFoodEnrollModal}
            />
          </Container>
          <div>
            <h3>선택된 음식 리스트:</h3>
            <ul>
              {foodList.map((food, index) => (
                <li key={index}>
                  {food.label} ({food.unit} / {food.weight}g / {food.calories}kcal)
                </li>
              ))}
            </ul>
          </div>
          <br />
          <Input type="text" plcaeholder="" title="구분" size={'size2'} mb={'10'} mt={'5'} />
        </Modal>

        <Modal title="음식 직접입력" type={'add'}>
          <form onSubmit={handleAddFood}>
            <input type="text" name="label" onChange={handleFoodInputChange} placeholder="음식명" />
            <input type="text" name="unit" onChange={handleFoodInputChange} placeholder="예) 1공기, 1회, 3개 등 " />
            <input type="text" name="weight" onChange={handleFoodInputChange} placeholder="양(g)" />
            <input type="text" name="calories" onChange={handleFoodInputChange} placeholder="칼로리(kcal)" />
            <input type="submit" value="음식추가" />
          </form>
        </Modal>
      </ContentLayout>
    </>
  );
};

export default Diet;
