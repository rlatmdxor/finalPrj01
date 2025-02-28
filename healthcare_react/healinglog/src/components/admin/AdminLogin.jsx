import React from 'react';
import styled from 'styled-components';
import Btn from '../util/Btn';
import ContentLayout from '../util/ContentLayout';
import { getPayload } from '../util/JwtUtil';
import { useFormData } from '../util/useFormData';

import { useDispatch } from 'react-redux';
import Title from '../util/Title';
import { login } from '../../../src/redux/AdminSlice';
import { useNavigate } from 'react-router-dom';
import { setNick } from '../../redux/JoinSlice';

const StyledMiddle = styled.div`
  display: grid;
  grid-template: 1fr 1fr / 0.5fr;
`;

const ImgLayout = styled.img`
  margin-left: 250px;
  width: 60%;
  height: 100%;
`;

const InputTag = styled.input`
  width: 400px;
  height: 30px;
  margin-bottom: 20px;
  margin-left: 220px;
  border-radius: 15px;
  border: 1px solid gray;
  padding: 10px;
`;

const AdminLogin = () => {
  const navi = useNavigate();
  const dispatch = useDispatch();

  const initState = {
    id: '',
    pwd: '',
  };

  const submitCallBack = (formData) => {
    const url = 'http://127.0.0.1:80/api/admin/login';
    const option = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    fetch(url, option)
      .then((resp) => resp.text())
      .then((token) => {
        if (!token) {
          alert('로그인에 실패했습니다.');
          return;
        }
        localStorage.setItem('token', token);

        const no = getPayload(token, 'no');
        const id = getPayload(token, 'id');
        const nick = getPayload(token, 'nick');
        dispatch(setNick(nick));
        dispatch(login({ no, id, nick }));
        alert(`환영합니다 ${nick}님`);
        navi('../../admin/usermanage');
      })
      .catch((error) => console.error(`fetch 에러 발생:`, error));
  };

  const { formData, handleInputChange, handleSubmit } = useFormData(initState, submitCallBack);

  return (
    <>
      <Title>어드민 로그인</Title>
      <div></div>
      <ContentLayout>
        <StyledMiddle>
          <ImgLayout src="/img/logo.png"></ImgLayout>
          <form onSubmit={handleSubmit}>
            <InputTag onChange={handleInputChange} name="id" type="text" placeholder="아이디"></InputTag>
            <InputTag onChange={handleInputChange} name="pwd" type="password" placeholder="비밀번호"></InputTag>
            <Btn
              w={'422'}
              h={'60'}
              mt={'0'}
              mr={'0'}
              ml={'220'}
              mb={'0'}
              fs={'30'}
              str={'로그인'}
              c={'#FF7F50'}
              fc={'white'}
              type="submit"
            />
          </form>
        </StyledMiddle>
      </ContentLayout>
    </>
  );
};
export default AdminLogin;
