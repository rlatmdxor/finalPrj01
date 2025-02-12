import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../../util/Modal';
import Input from '../../../util/Input';
import { Autocomplete, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { close, open } from '../../../../redux/modalSlice';
import { ModalContainer } from './Diet';
import Btn from '../../../util/Btn';

const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 6px;
  margin-top: 10px;
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

const FileInput = styled.input`
  margin: 10px 1px;
`;

const PreviewDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const UploadedImg = styled.img`
  width: 60%;
  height: 60%;
  object-fit: contain;
`;

const DietEnroll = () => {
  const [selectedMeal, setSelectedMeal] = useState(''); // 끼니 구분 선택 상태 (아침, 점심, 저녁 등)
  const [selectedFood, setSelectedFood] = useState(null); // Autocomplete에서 선택한 음식 상태

  const initialFoodInputData = { label: '', unit: '', weight: '', calories: '' }; // 음식 직접추가 데이터
  const [foodInputData, setFoodInputData] = useState({});
  const foodReset = () => {
    setFoodInputData(initialFoodInputData);
  };

  const [foodList, setFoodList] = useState([]); // 추가된 음식 목록

  const [imgFile, setImgFile] = useState(''); // 사진 선택 상태
  const imgRef = useRef();

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

  // 식단 등록 모달 오픈 시 데이터 초기화
  const [isInit, setIsInit] = useState(false);
  const modals = useSelector((state) => state.modal.modals);
  const isOpen = modals['식단 등록'] === 'block';

  useEffect(() => {
    if (isOpen) {
      setIsInit(false);
      setSelectedMeal('');
      setSelectedFood(null);
      setFoodList([]);
      setImgFile('');
      setTimeout(() => {
        setIsInit(true);
      }, 0);
    } else {
      setIsInit(false);
    }
  }, [isOpen]);

  const handleOpenFoodEnrollModal = () => {
    foodReset();
    dispatch(open({ title: '음식 직접추가', value: 'block' }));
  };

  const handleOpenFoodEditModal = (index) => {
    dispatch(open({ title: '음식 수정', value: 'block' }));

    const selectedFood = foodList[index];

    setFoodInputData({
      ...selectedFood,
      originalWeight: selectedFood.weight,
      originalCalories: selectedFood.calories,
      index,
    });
  };

  const handleSelectFood = (e, newValue) => {
    if (newValue) {
      setSelectedFood(newValue);
      setFoodList((prev) => [...prev, newValue]);
    }
  };

  const handleFoodInputChange = (e) => {
    setFoodInputData((prev) => {
      let updatedData = { ...prev, [e.target.name]: e.target.value };

      if (e.target.name == 'weight' && prev.weight && prev.calories) {
        const newCalories = (e.target.value / prev.originalWeight) * prev.originalCalories;
        updatedData.calories = Math.round(newCalories);
      }

      return updatedData;
    });
  };

  const handleAddFood = (e) => {
    setFoodList((prevList) => [...prevList, foodInputData]);
    console.log(foodInputData);
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
    dispatch(close(e.target.title));
  };

  const handleFoodDelete = (index) => {
    console.log(index);
    const updatedFoodList = foodList.filter((food, i) => i !== index);
    setFoodList(updatedFoodList);
  };

  const handleImageSelect = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  if (!isInit) return null;

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
            value={selectedFood}
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
        <Input type="text" plcaeholder="메모를 입력해주세요" title="메모" size={'size2'} mb={'14'} mt={'7'} />
        <div>사진</div>
        <FileInput type="file" accept="image/*" onChange={handleImageSelect} ref={imgRef} />
        <PreviewDiv>{imgFile ? <UploadedImg src={imgFile} alt="식단이미지" /> : ''}</PreviewDiv>
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
          value={foodInputData.label}
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
          value={foodInputData.unit}
        />
        <Input
          type="number"
          name="weight"
          f={handleFoodInputChange}
          title="양 (g)"
          placeholder="숫자만 입력해주세요"
          size={'size2'}
          mb={'12'}
          mt={'8'}
          value={foodInputData.weight}
        />
        <Input
          type="number"
          name="calories"
          f={handleFoodInputChange}
          title="칼로리(kcal)"
          placeholder="숫자만 입력해주세요"
          size={'size2'}
          mb={'12'}
          mt={'8'}
          value={foodInputData.calories}
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

      <Modal title="음식 수정">
        <Input
          type="text"
          name="label"
          f={handleFoodInputChange}
          title="음식명"
          placeholder="음식명"
          size={'size2'}
          mb={'12'}
          mt={'8'}
          value={foodInputData.label}
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
          value={foodInputData.unit}
        />
        <Input
          type="number"
          name="weight"
          f={handleFoodInputChange}
          title="양 (g)"
          placeholder="숫자만 입력해주세요"
          size={'size2'}
          mb={'12'}
          mt={'8'}
          value={foodInputData.weight}
        />
        <Input
          type="number"
          name="calories"
          f={handleFoodInputChange}
          title="칼로리(kcal)"
          placeholder="숫자만 입력해주세요"
          size={'size2'}
          mb={'12'}
          mt={'8'}
          value={foodInputData.calories}
        />
        <ModalContainer>
          <Btn
            title={'음식 수정'}
            str={'수정'}
            mt={'15'}
            mb={'30'}
            mr={'0'}
            c={'#ff8a60'}
            fc={'white'}
            f={handleEditFood}
          ></Btn>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default DietEnroll;
