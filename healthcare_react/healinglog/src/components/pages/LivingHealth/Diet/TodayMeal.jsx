import { BASE_URL } from '../../../services/config';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../../util/Modal';
import Input from '../../../util/Input';
import { Autocomplete, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { close, open } from '../../../../redux/modalSlice';
import { ModalContainer } from './Diet';
import { ContentAreaDiv, BigTextDiv, SmallTextDiv } from './Diet';
import Btn from '../../../util/Btn';
import SmallCard from '../../../util/SmallCard';
import { setMealDetailList, setMealKcalSum, setTotalKcal } from '../../../../redux/dietSlice';
import { getMealData } from '../../../services/dietService';

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

const SmallTitleDiv = styled.div`
  font-weight: 900;
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
  width: 55%;
  height: 55%;
  object-fit: contain;
`;

const DeleteImgBtn = styled.button`
  background-color: transparent;
  border: none;
  color: #363636;
  cursor: pointer;
`;

const RequiredMark = styled.span`
  color: red;
`;

const TodayMeal = ({ token }) => {
  const dispatch = useDispatch();
  const Swal = require('sweetalert2');

  const day = useSelector((state) => state.diet.day);
  const mealDetailList = useSelector((state) => state.diet.mealDetailList);
  const mealKcalSum = useSelector((state) => state.diet.mealKcalSum);

  const [foodData, setFoodData] = useState([]); // 음식 목록 데이터

  const fetchMealData = async () => {
    try {
      const data = await getMealData(day, token);
      dispatch(setMealDetailList(data));
      let totalKcal = 0;
      const kcalSummary = {};
      data.forEach((item) => {
        const kcal = Number(item.sumKcal);
        kcalSummary[item.mealCode] = kcal;
        totalKcal += kcal;
      });
      dispatch(setMealKcalSum(kcalSummary));
      dispatch(setTotalKcal(totalKcal));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMealData();
  }, [day]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/diet/food`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setFoodData(data);
      });
  }, []);

  // 식단 등록 폼데이터
  const initialInputData = {
    no: '',
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

  const enrollImgRef = useRef(null);
  const editImgRef = useRef(null);

  const options = [
    { id: '1', label: '아침' },
    { id: '2', label: '오전간식' },
    { id: '3', label: '점심' },
    { id: '4', label: '오후간식' },
    { id: '5', label: '저녁' },
    { id: '6', label: '야식' },
  ];

  const handleOpenDietEnrollModal = (mealCode) => {
    setInputData(initialInputData);
    setAutoCompleteValue('');
    setInputData((prev) => ({
      ...prev,
      mealCode: mealCode,
    }));
    if (enrollImgRef.current) {
      enrollImgRef.current.value = '';
    }
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
    if (!foodInputData.label.trim()) {
      Swal.fire({
        icon: 'warning',
        title: '음식명을 입력해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    if (!foodInputData.unit.trim()) {
      Swal.fire({
        icon: 'warning',
        title: '단위을 입력해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    if (!foodInputData.amount || foodInputData.amount < 0) {
      Swal.fire({
        icon: 'warning',
        title: '음식양을 0 이상 입력해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    if (!foodInputData.kcal || foodInputData.kcal < 0) {
      Swal.fire({
        icon: 'warning',
        title: '칼로리를을 0 이상 입력해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    setInputData((prev) => {
      return {
        ...prev,
        foodList: [...prev.foodList, foodInputData],
      };
    });
    dispatch(close(e.target.title));
  };

  const handleEditFood = (e) => {
    if (!foodInputData.label.trim()) {
      Swal.fire({
        icon: 'warning',
        title: '음식명을 입력해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    if (!foodInputData.unit.trim()) {
      Swal.fire({
        icon: 'warning',
        title: '단위을 입력해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    if (!foodInputData.amount || foodInputData.amount < 0) {
      Swal.fire({
        icon: 'warning',
        title: '음식양을 0 이상 입력해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    if (!foodInputData.kcal || foodInputData.kcal < 0) {
      Swal.fire({
        icon: 'warning',
        title: '칼로리를을 0 이상 입력해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

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

  const handleImageChange = (imgRef) => {
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

  const handleImageDelete = (imgRef) => {
    setInputData((prev) => ({
      ...prev,
      image: '',
      imagePreview: '',
    }));
    imgRef.current.value = '';
  };

  // 식단 등록
  const handleSubmit = () => {
    if (!inputData.foodList || inputData.foodList.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: '음식을 추가해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    Swal.fire({
      title: '등록하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('dietDay', inputData.dietDay);
        formData.append('mealCode', inputData.mealCode);
        formData.append('foodListArr', JSON.stringify(inputData.foodList));
        formData.append('memo', inputData.memo);
        formData.append('f', inputData.image);

        fetch(`${BASE_URL}/api/diet/enroll`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }).then((resp) => {
          if (resp.status == 200) {
            Swal.fire({
              icon: 'success',
              title: '등록되었습니다.',
              confirmButtonText: '확인',
            });
            fetchMealData();
          } else {
            Swal.fire({
              title: '오류발생...',
              confirmButtonText: '확인',
            });
          }
          dispatch(close('식단 등록'));
        });
      }
    });
  };

  // 식단 상세 조회
  const handleOpenDietDetailModal = (mealCode) => {
    const mealDetail = mealDetailList.find((meal) => meal.mealCode === mealCode);
    setInputData((prev) => ({
      ...prev,
      no: mealDetail.no,
      dietDay: day,
      mealCode: mealDetail.mealCode,
      foodList: mealDetail.foodList || [],
      memo: mealDetail.memo || '',
      image: mealDetail.image || '',
      imagePreview: mealDetail.image ? mealDetail.image : prev.imagePreview,
    }));
    dispatch(open({ title: '식단 상세', value: 'block' }));
  };

  // 식단 수정
  const handleEdit = () => {
    if (!inputData.foodList || inputData.foodList.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: '음식을 추가해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }
    Swal.fire({
      title: '저장하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('no', inputData.no);
        formData.append('dietDay', inputData.dietDay);
        formData.append('mealCode', inputData.mealCode);
        formData.append('foodListArr', JSON.stringify(inputData.foodList));
        formData.append('memo', inputData.memo);

        if (typeof inputData.image === 'string') {
          formData.append('imageUrl', inputData.image); // 기존 이미지 URL 유지
        } else if (inputData.image) {
          formData.append('f', inputData.image); // 새 이미지 업로드
        }

        fetch(`${BASE_URL}/api/diet/edit`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }).then((resp) => {
          if (resp.status == 200) {
            Swal.fire({
              icon: 'success',
              title: '저장되었습니다.',
              confirmButtonText: '확인',
            });
            fetchMealData();
          } else {
            Swal.fire({
              title: '오류발생...',
              confirmButtonText: '확인',
            });
          }
          dispatch(close('식단 상세'));
        });
      }
    });
  };

  // 식단 삭제
  const handleDelete = () => {
    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/api/diet/delete`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            no: inputData.no,
          }),
        }).then((resp) => {
          if (resp.status == 200) {
            Swal.fire({
              icon: 'success',
              title: '삭제되었습니다.',
              confirmButtonText: '확인',
            });
            fetchMealData();
          } else {
            Swal.fire({
              title: '오류발생...',
              confirmButtonText: '확인',
            });
          }
          dispatch(close('식단 상세'));
        });
      }
    });
  };

  return (
    <>
      <TodayDietArea>
        <div>오늘의 식단</div>
      </TodayDietArea>
      <ContentAreaDiv>
        {options.map((option) => {
          const kcal = mealKcalSum[option.id] || '0';
          return (
            <SmallCard key={option.id}>
              <SmallTextDiv>
                <div>{option.label}</div>
                {mealKcalSum[option.id] ? (
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
        <SmallTitleDiv>
          <RequiredMark>* </RequiredMark>
          {options.find((option) => option.id === inputData.mealCode)?.label || ''}
        </SmallTitleDiv>
        <Container>
          <Autocomplete
            disablePortal
            options={foodData}
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
        <FileInput type="file" accept="image/*" onChange={() => handleImageChange(enrollImgRef)} ref={enrollImgRef} />

        <PreviewDiv>
          {inputData.image ? (
            <>
              <UploadedImg src={inputData.imagePreview} alt="식단이미지" />
              <DeleteImgBtn onClick={() => handleImageDelete(enrollImgRef)}>✖</DeleteImgBtn>
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

      <Modal title="식단 상세">
        <SmallTitleDiv>
          <RequiredMark>* </RequiredMark>
          {options.find((option) => option.id === inputData.mealCode)?.label || ''}
        </SmallTitleDiv>
        <Container>
          <Autocomplete
            disablePortal
            options={foodData}
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
        <FileInput type="file" accept="image/*" onChange={() => handleImageChange(editImgRef)} ref={editImgRef} />

        <PreviewDiv>
          {inputData.image ? (
            <>
              <UploadedImg src={inputData.imagePreview} alt="식단이미지" />
              <DeleteImgBtn onClick={() => handleImageDelete(editImgRef)}>✖</DeleteImgBtn>
            </>
          ) : (
            ''
          )}
        </PreviewDiv>

        <ModalContainer>
          <Btn
            title={'식단 상세'}
            str={'저장'}
            mt={'15'}
            mb={'30'}
            mr={'10'}
            c={'#ff8a60'}
            fc={'white'}
            f={handleEdit}
          ></Btn>
          <Btn title={'식단 상세'} str={'삭제'} mt={'15'} mb={'30'} mr={'0'} f={handleDelete}></Btn>
        </ModalContainer>
      </Modal>

      <Modal title="음식 직접추가">
        <RequiredMark>* </RequiredMark>
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
        <RequiredMark>* </RequiredMark>
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
        <RequiredMark>* </RequiredMark>
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
        <RequiredMark>* </RequiredMark>
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
        <RequiredMark>* </RequiredMark>
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
        <RequiredMark>* </RequiredMark>
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
        <RequiredMark>* </RequiredMark>
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
        <RequiredMark>* </RequiredMark>
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

export default TodayMeal;
