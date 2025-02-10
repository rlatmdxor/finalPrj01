import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../../util/Modal';
import Input from '../../../util/Input';
import { Autocomplete, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { close, open } from '../../../../redux/modalSlice';
import { ModalContainer } from './Diet';
import Btn from '../../../util/Btn';

const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 6px;
  margin-top: 9px;
  margin-bottom: 15px;
`;

const MealButton = styled.button`
  padding: 6px 12px;
  margin-bottom: 8px;
  border: 1px solid ${(props) => (props.selected ? '#ff8a60' : '#cccccc')};
  font-size: 14px;
  border-radius: 20px;
  background-color: ${(props) => (props.selected ? '#ff8a60' : '#ffffff')};
  color: ${(props) => (props.selected ? '#ffffff' : '#000000')};
  cursor: pointer;
`;

const SelectedFoodListArea = styled.div`
  margin-bottom: 25px;
  font-size: 14px;
`;

const SelectedFoodContainer = styled.div`
  border: 1px solid #d4d4d4;
  padding: 9px 12px;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectedFoodContainerBtn = styled.div`
  display: flex;
  gap: 4px;
`;

const DietEnroll = () => {
  const initialInputData = {};
  const [inputData, setInputData] = useState(initialInputData);

  const reset = () => {
    setInputData(initialInputData);
  };

  const [selectedMeal, setSelectedMeal] = useState(''); // 끼니 구분 선택 상태 (아침, 점심, 저녁 등)
  const [selectedFood, setSelectedFood] = useState(''); // Autocomplete에서 선택한 음식 상태

  const initialFoodInputData = { label: '', unit: '', weight: 0, calories: 0 };
  const [foodInputData, setFoodInputData] = useState({}); // 음식 직접추가 데이터
  const [foodList, setFoodList] = useState([]); // 추가된 음식 목록

  const dispatch = useDispatch();

  const options = [
    { id: 'morning', label: '아침' },
    { id: 'morningsnack', label: '오전간식' },
    { id: 'lunch', label: '점심' },
    { id: 'afternoonsnack', label: '오후간식' },
    { id: 'dinner', label: '저녁' },
    { id: 'night', label: '야식' },
  ];

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

  const handleOpenFoodEnrollModal = () => {
    dispatch(open({ title: '음식 직접추가', value: 'block' }));
  };

  const handleOpenFoodEditModal = (index) => {
    dispatch(open({ title: '음식 수정', value: 'block' }));
    setFoodInputData({ ...foodList[index], index });
    console.log(foodInputData);
  };

  const handleSelectFood = (e, newValue) => {
    if (newValue) {
      setSelectedFood(newValue.label);
      setFoodList((prev) => [...prev, newValue]);
    }
  };

  const handleFoodInputChange = (e) => {
    setFoodInputData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAddFood = (e) => {
    setFoodList((prevList) => [...prevList, foodInputData]);
    console.log(foodInputData);
    console.log(e.target);
    dispatch(close(e.target.title));
  };

  const handleEditFood = (e) => {
    e.preventDefault();
    const updatedList = [];
    for (let i = 0; i < foodList.length; i++) {
      if (i === foodInputData.index) {
        updatedList.push(foodInputData);
      } else {
        updatedList.push(foodList[i]);
      }
    }
    setFoodList(updatedList);
    console.log(foodList);
  };

  const handleFoodDelete = (index) => {
    console.log(index);
    const updatedFoodList = foodList.filter((food, i) => i !== index);
    setFoodList(updatedFoodList);
  };

  return (
    <>
      <Modal title="식단 등록">
        <div>구분</div>
        <Container>
          {options.map(({ id, label }) => (
            <MealButton key={id} selected={selectedMeal === id} onClick={() => setSelectedMeal(id)}>
              {label}
            </MealButton>
          ))}
        </Container>
        <div>음식 추가</div>
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
            str="직접추가"
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
        <SelectedFoodListArea>
          {foodList.map((food, index) => (
            <SelectedFoodContainer key={index}>
              <div>
                {food.label} ({food.unit} / {food.weight}g / {food.calories}
                kcal)
              </div>
              <SelectedFoodContainerBtn>
                <Btn
                  str={'수정'}
                  w={'44'}
                  h={'24'}
                  mt={'0'}
                  mb={'0'}
                  ml={'0'}
                  mr={'0'}
                  fs={'13'}
                  f={() => handleOpenFoodEditModal(index)}
                />
                <Btn
                  str={'삭제'}
                  w={'44'}
                  h={'24'}
                  mt={'0'}
                  mb={'0'}
                  ml={'0'}
                  mr={'0'}
                  fs={'13'}
                  f={() => handleFoodDelete(index)}
                />
              </SelectedFoodContainerBtn>
            </SelectedFoodContainer>
          ))}
        </SelectedFoodListArea>
        <Input type="text" plcaeholder="메모를 입력해주세요" title="메모" size={'size2'} mb={'12'} mt={'9'} />
        <Input type="text" placeholder="사진선택" title="사진" size={'size2'} mb={'12'} mt={'9'} />
        <ModalContainer>
          <Btn str={'등록'} mt={'15'} mb={'30'} mr={'0'} c={'#ff8a60'} fc={'white'}></Btn>
        </ModalContainer>
      </Modal>

      <Modal title="음식 직접추가">
        <Input
          type="text"
          name="label"
          f={handleFoodInputChange}
          title="음식명"
          placeholder="음식명"
          size={'size2'}
          mb={'12'}
          mt={'8'}
        />
        <Input
          type="text"
          name="unit"
          f={handleFoodInputChange}
          title="단위"
          placeholder="예) 1공기, 1회, 3개 등 "
          size={'size2'}
          mb={'12'}
          mt={'8'}
        />
        <Input
          type="text"
          name="weight"
          f={handleFoodInputChange}
          title="양 (g)"
          placeholder="숫자만 입력해주세요"
          size={'size2'}
          mb={'12'}
          mt={'8'}
        />
        <Input
          type="text"
          name="calories"
          f={handleFoodInputChange}
          title="칼로리(kcal)"
          placeholder="숫자만 입력해주세요"
          size={'size2'}
          mb={'12'}
          mt={'8'}
        />
        <ModalContainer>
          <Btn
            title={'음식 직접추가'}
            str={'추가'}
            mt={'15'}
            mb={'30'}
            mr={'0'}
            c={'#ff8a60'}
            fc={'white'}
            f={handleAddFood}
          ></Btn>
        </ModalContainer>
      </Modal>

      <Modal title="음식 수정" type={'edit'}>
        <form onSubmit={handleEditFood}>
          <input
            type="text"
            name="label"
            onChange={handleFoodInputChange}
            placeholder="음식명"
            value={foodInputData.label || ''}
          />
          <input
            type="text"
            name="unit"
            onChange={handleFoodInputChange}
            placeholder="예) 1공기, 1회, 3개 등 "
            value={foodInputData.unit || ''}
          />
          <input
            type="text"
            name="weight"
            onChange={handleFoodInputChange}
            placeholder="양(g)"
            value={foodInputData.weight || ''}
          />
          <input
            type="text"
            name="calories"
            onChange={handleFoodInputChange}
            placeholder="칼로리(kcal)"
            value={foodInputData.calories || ''}
          />
          <input type="submit" value="음식수정" />
        </form>
      </Modal>
    </>
  );
};

export default DietEnroll;
