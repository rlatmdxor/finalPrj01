import React, { useEffect, useState } from 'react';
import { BigTextDiv, SmallCard, SmallTextDiv } from './Diet';
import Btn from '../../../util/Btn';
import { open } from '../../../../redux/modalSlice';
import { ModalContainer } from './Diet';
import Modal from '../../../util/Modal';
import Input from '../../../util/Input';
import { close } from '../../../../redux/modalSlice';
import { useDispatch } from 'react-redux';

const TodayWeight = ({ day }) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);

  const initialInputData = {
    memberNo: '1',
    enrollDate: day,
    amount: 0,
  };
  const [inputData, setInputData] = useState(initialInputData);

  useEffect(() => {
    fetch('http://127.0.0.1:80/api/weight', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        memberNo: '1',
        enrollDate: day,
      }),
    })
      .then((resp) => resp.text())
      .then((data) => {
        console.log(data);
        setAmount(data);
      });
  }, [day]);

  const handleOpenWeightModal = () => {
    setInputData((prev) => ({
      ...prev,
      amount: amount,
    }));

    dispatch(open({ title: '체중 등록', value: 'block' }));
  };

  const reset = () => {
    setInputData(initialInputData);
  };

  const handleChange = (e) => {
    setInputData((props) => {
      return {
        ...props,
        [e.target.name]: String(parseFloat(e.target.value)),
      };
    });
  };

  const handleSubmit = (e) => {
    if (inputData.amount < 0) {
      alert('0 이상 입력해주세요.');
      return;
    }

    fetch('http://127.0.0.1:80/api/weight/enroll', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(inputData),
    })
      .then((resp) => resp.text())
      .then((data) => {
        console.log(data);
        setAmount(inputData.amount);
        dispatch(close('체중 등록'));
        alert('등록되었습니다.');
        reset();
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
        <BigTextDiv>{amount ? `${amount} kg` : '- kg'}</BigTextDiv>
      </SmallCard>

      <Modal title="체중 등록">
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
