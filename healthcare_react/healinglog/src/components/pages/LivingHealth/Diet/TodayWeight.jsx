import React, { useState } from 'react';
import { BigTextDiv, SmallTextDiv } from './Diet';
import Btn from '../../../util/Btn';
import { open } from '../../../../redux/modalSlice';
import { ModalContainer } from './Diet';
import Modal from '../../../util/Modal';
import Input from '../../../util/Input';
import { close } from '../../../../redux/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import SmallCard from '../../../util/SmallCard';
import { enrollTodayWeight } from '../../../services/dietService';
import { setWeightAmount } from '../../../../redux/dietSlice';
import styled from 'styled-components';

const RequiredMark = styled.span`
  color: red;
`;

const TodayWeight = ({ token }) => {
  const dispatch = useDispatch();
  const Swal = require('sweetalert2');

  const day = useSelector((state) => state.diet.day);
  const amount = useSelector((state) => state.diet.weight);

  const [inputData, setInputData] = useState({ amount: 0 });

  const handleOpenWeightModal = () => {
    setInputData(() => ({
      amount: parseFloat(amount),
    }));
    dispatch(open({ title: '체중 등록', value: 'block' }));
  };

  const handleChange = (e) => {
    setInputData((props) => {
      return {
        ...props,
        [e.target.name]: String(parseFloat(e.target.value)),
      };
    });
  };

  const handleSubmit = () => {
    const amountValue = Number(inputData.amount);

    if (isNaN(amountValue) || amountValue <= 0) {
      Swal.fire({
        icon: 'warning',
        title: '0 이상 입력해주세요.',
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
        const enrollWeight = async () => {
          try {
            const result = await enrollTodayWeight(day, inputData, token);
            if (result == 200) {
              Swal.fire({
                icon: 'success',
                title: '등록되었습니다.',
                confirmButtonText: '확인',
              });
              dispatch(setWeightAmount(amountValue));
            } else {
              Swal.fire({
                title: '오류발생...',
                confirmButtonText: '확인',
              });
            }
          } catch (error) {
            console.error('[ERROR] WEIGHT ENROLL FAIL', error);
          }
          dispatch(close('체중 등록'));
        };
        enrollWeight();
      }
    });
  };

  return (
    <>
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
        <BigTextDiv>{amount} kg</BigTextDiv>
      </SmallCard>

      <Modal title="체중 등록">
        <RequiredMark>* </RequiredMark>
        <Input
          type="number"
          name="amount"
          placeholder="숫자만 입력해주세요"
          title="체중 (kg)"
          value={inputData.amount}
          size={'size2'}
          mb={'14'}
          mt={'7'}
          min={0}
          f={handleChange}
        />
        <ModalContainer>
          <Btn
            title={'체중 등록'}
            str={'등록'}
            mt={'17'}
            mb={'30'}
            mr={'0'}
            c={'#ff8a60'}
            fc={'white'}
            f={handleSubmit}
          ></Btn>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default TodayWeight;
