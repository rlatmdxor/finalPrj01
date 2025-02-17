import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../../util/Modal';
import Input from '../../../util/Input';
import { Autocomplete, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { close, open } from '../../../../redux/modalSlice';
import { ModalContainer } from './Diet';
import { ContentAreaDiv, BigTextDiv, SmallCard, SmallTextDiv } from './Diet';
import Btn from '../../../util/Btn';

const TodayDietArea = styled.div`
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
  margin-top: 10px;
  margin-bottom: 15px;
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
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const UploadedImg = styled.img`
  width: 60%;
  height: 60%;
  object-fit: contain;
`;

const DeleteImgBtn = styled.button`
  background-color: transparent;
  border: none;
  color: #363636;
  cursor: pointer;
`;

const TodayDietMeal = ({ day }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  // 끼니별 섭취 칼로리 조회
  const [mealKcalSummary, setMealKcalSummary] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:80/api/diet', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        memberNo: 1,
        dietDay: day,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setMealKcalSummary(data);
      });
  }, []);

  // 식단 등록 폼데이터
  const initialInputData = {
    memberNo: '1',
    dietDay: day,
    mealCode: '',
    foodList: [],
    memo: '',
    image: '',
    imagePreview: '',
  };
  const [inputData, setInputData] = useState(initialInputData);

  // 음식 직접추가 폼데이터
  const initialFoodInputData = {
    label: '',
    unit: '',
    amount: '',
    kcal: '',
  };
  const [foodInputData, setFoodInputData] = useState(initialFoodInputData);

  // AutoComplete input 초기화를 위한 state
  const [autoCompleteValue, setAutoCompleteValue] = useState('');

  const imgRef = useRef(null);

  const options = [
    { id: '1', label: '아침' },
    { id: '2', label: '오전간식' },
    { id: '3', label: '점심' },
    { id: '4', label: '오후간식' },
    { id: '5', label: '저녁' },
    { id: '6', label: '야식' },
  ];

  const foodDummyData = [
    { label: '쌀밥', unit: '1공기', amount: 210, kcal: 336 },
    { label: '잡곡밥', unit: '1공기', amount: 210, kcal: 306 },
    { label: '삶은계란', unit: '1개', amount: 45, kcal: 65 },
    { label: '계란후라이', unit: '1개', amount: 46, kcal: 95 },
    { label: '배추김치', unit: '1그릇', amount: 40, kcal: 14 },
    { label: '사과', unit: '1개', amount: 250, kcal: 142 },
    { label: '바나나', unit: '1개', amount: 150, kcal: 114 },
    { label: '딸기', unit: '1개', amount: 20, kcal: 6 },
  ];

  const handleOpenDietEnrollModal = (mealCode) => {
    setInputData(initialInputData);
    setAutoCompleteValue('');
    setInputData((prev) => ({
      ...prev,
      mealCode: mealCode,
    }));
    dispatch(open({ title: '식단 등록', value: 'block' }));
  };

  const handleOpenFoodEnrollModal = () => {
    setFoodInputData(initialFoodInputData);

    dispatch(open({ title: '음식 직접추가', value: 'block' }));
  };

  const handleOpenFoodEditModal = (index) => {
    dispatch(open({ title: '음식 수정', value: 'block' }));

    const selectedFood = inputData.foodList[index];

    setFoodInputData({
      ...selectedFood,
      originalAmount: selectedFood.amount,
      originalKcal: selectedFood.kcal,
      index,
    });
  };

  const handleFoodSelect = (e, newValue) => {
    if (newValue) {
      setInputData((prev) => {
        return {
          ...prev,
          foodList: [...prev.foodList, newValue],
        };
      });
    }
    setAutoCompleteValue('');
  };

  const handleFoodInputChange = (e) => {
    setFoodInputData((prev) => {
      let updatedData = {
        ...prev,
        [e.target.name]: e.target.value,
      };

      if (e.target.name == 'amount' && prev.amount && prev.kcal) {
        const newKcal = (e.target.value / prev.originalAmount) * prev.originalKcal;
        updatedData.kcal = Math.round(newKcal);
      }

      return updatedData;
    });
  };

  const handleAddFood = (e) => {
    setInputData((prev) => {
      return {
        ...prev,
        foodList: [...prev.foodList, foodInputData],
      };
    });
    dispatch(close(e.target.title));
  };

  const handleEditFood = (e) => {
    e.preventDefault();
    const updatedFoodList = [];
    for (let i = 0; i < inputData.foodList.length; i++) {
      if (i === foodInputData.index) {
        updatedFoodList.push(foodInputData);
      } else {
        updatedFoodList.push(inputData.foodList[i]);
      }
    }
    setInputData((prev) => ({
      ...prev,
      foodList: updatedFoodList,
    }));
    dispatch(close(e.target.title));
  };

  const handleFoodDelete = (index) => {
    console.log(index);
    setInputData((prev) => {
      return {
        ...prev,
        foodList: prev.foodList.filter((food, i) => i !== index),
      };
    });
  };

  const handleMemoChange = (e) => {
    setInputData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleImageChange = () => {
    const file = imgRef.current.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setInputData((prev) => {
        return {
          ...prev,
          image: file,
          imagePreview: reader.result,
        };
      });
    };
  };

  const handleImageDelete = () => {
    setInputData((prev) => ({
      ...prev,
      image: '',
      imagePreview: '',
    }));
    imgRef.current.value = '';
  };

  const handleSubmit = () => {
    if (!window.confirm('등록하시겠습니까?')) {
      return;
    }

    const formData = new FormData();
    formData.append('memberNo', inputData.memberNo);
    formData.append('dietDay', inputData.dietDay);
    formData.append('mealCode', inputData.mealCode);
    formData.append('foodListArr', JSON.stringify(inputData.foodList));
    formData.append('memo', inputData.memo);
    formData.append('f', inputData.image);

    fetch('http://127.0.0.1:80/api/diet/enroll', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then((resp) => {
      if (resp.status == 200) {
        alert('등록되었습니다.');
      } else {
        alert('오류 발생..');
      }
      dispatch(close('식단 등록'));
    });
  };

  // 식단 상세 조회
  const handleOpenDietDetailModal = (mealCode) => {
    dispatch(open({ title: '식단 상세', value: 'block' }));
  };

  return (
    <>
      <TodayDietArea>
        <div>오늘의 식단</div>
      </TodayDietArea>
      <ContentAreaDiv>
        {options.map((option) => {
          const mealData = mealKcalSummary.find((meal) => meal.mealCode === option.id);
          const kcal = mealData ? mealData.summaryKcal : '0';
          return (
            <SmallCard key={option.id}>
              <SmallTextDiv>
                <div>{option.label}</div>
                {mealData ? (
                  <Btn
                    str={'상세'}
                    w={'50'}
                    h={'25'}
                    mt={'0'}
                    mb={'0'}
                    ml={'0'}
                    mr={'0'}
                    fs={'13'}
                    f={() => handleOpenDietDetailModal(option.id)}
                  />
                ) : (
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
                    f={() => handleOpenDietEnrollModal(option.id)}
                  />
                )}
              </SmallTextDiv>
              <BigTextDiv>{kcal} Kcal</BigTextDiv>
            </SmallCard>
          );
        })}
      </ContentAreaDiv>

      <Modal title="식단 등록">
        <div>{options.find((option) => option.id === inputData.mealCode)?.label || ''} 식단</div>
        <Container>
          <Autocomplete
            disablePortal
            options={foodDummyData}
            getOptionLabel={(option) => option.label || ''}
            value={autoCompleteValue}
            onChange={handleFoodSelect}
            renderOption={(props, option) => (
              <li {...props} key={option.label}>
                {option.label} ({option.unit} / {option.amount}g / {option.kcal}kcal)
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
          {inputData.foodList.map((food, index) => (
            <SelectedFoodContainer key={index}>
              <div>
                {food.label} ({food.unit} / {food.amount}g / {food.kcal}
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
        <Input
          type="text"
          name="memo"
          value={inputData.memo}
          plcaeholder="메모를 입력해주세요"
          title="메모"
          size={'size2'}
          mb={'14'}
          mt={'7'}
          f={handleMemoChange}
        />
        <div>사진</div>
        <FileInput type="file" accept="image/*" onChange={handleImageChange} ref={imgRef} />

        <PreviewDiv>
          {inputData.image ? (
            <>
              <UploadedImg src={inputData.imagePreview} alt="식단이미지" />
              <DeleteImgBtn onClick={handleImageDelete}>✖</DeleteImgBtn>
            </>
          ) : (
            ''
          )}
        </PreviewDiv>

        <ModalContainer>
          <Btn
            title={'식단 등록'}
            str={'등록'}
            mt={'15'}
            mb={'30'}
            mr={'0'}
            c={'#ff8a60'}
            fc={'white'}
            f={handleSubmit}
          ></Btn>
        </ModalContainer>
      </Modal>

      <Modal title="식단 수정">
        <div>{options.find((option) => option.id === inputData.mealCode)?.label || ''} 식단</div>
        <Container>
          <Autocomplete
            disablePortal
            options={foodDummyData}
            getOptionLabel={(option) => option.label || ''}
            value={autoCompleteValue}
            onChange={handleFoodSelect}
            renderOption={(props, option) => (
              <li {...props} key={option.label}>
                {option.label} ({option.unit} / {option.amount}g / {option.kcal}kcal)
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
          {inputData.foodList.map((food, index) => (
            <SelectedFoodContainer key={index}>
              <div>
                {food.label} ({food.unit} / {food.amount}g / {food.kcal}
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
        <Input
          type="text"
          name="memo"
          value={inputData.memo}
          plcaeholder="메모를 입력해주세요"
          title="메모"
          size={'size2'}
          mb={'14'}
          mt={'7'}
          f={handleMemoChange}
        />
        <div>사진</div>
        <FileInput type="file" accept="image/*" onChange={handleImageChange} ref={imgRef} />

        <PreviewDiv>
          {inputData.image ? (
            <>
              <UploadedImg src={inputData.imagePreview} alt="식단이미지" />
              <DeleteImgBtn onClick={handleImageDelete}>✖</DeleteImgBtn>
            </>
          ) : (
            ''
          )}
        </PreviewDiv>

        <ModalContainer>
          <Btn
            title={'식단 등록'}
            str={'등록'}
            mt={'15'}
            mb={'30'}
            mr={'0'}
            c={'#ff8a60'}
            fc={'white'}
            f={handleSubmit}
          ></Btn>
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
          name="amount"
          f={handleFoodInputChange}
          title="양 (g)"
          placeholder="숫자만 입력해주세요"
          size={'size2'}
          mb={'12'}
          mt={'8'}
          value={foodInputData.amount}
        />
        <Input
          type="number"
          name="kcal"
          f={handleFoodInputChange}
          title="칼로리(kcal)"
          placeholder="숫자만 입력해주세요"
          size={'size2'}
          mb={'12'}
          mt={'8'}
          value={foodInputData.kcal}
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
          name="amount"
          f={handleFoodInputChange}
          title="양 (g)"
          placeholder="숫자만 입력해주세요"
          size={'size2'}
          mb={'12'}
          mt={'8'}
          value={foodInputData.amount}
        />
        <Input
          type="number"
          name="kcal"
          f={handleFoodInputChange}
          title="칼로리(kcal)"
          placeholder="숫자만 입력해주세요"
          size={'size2'}
          mb={'12'}
          mt={'8'}
          value={foodInputData.kcal}
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

export default TodayDietMeal;
