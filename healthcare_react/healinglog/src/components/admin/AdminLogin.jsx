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
import Swal from 'sweetalert2';
import { BASE_URL } from '../services/config';

const StyledMiddle = styled.div`
  display: grid;
  grid-template: 1fr 1fr / 0.5fr;
`;

const ImgLayout = styled.img`
  margin-left: 285px;
  width: 60%;
  height: 100%;
`;

const InputTag = styled.input`
  width: 400px;
  height: 30px;
  margin-bottom: 20px;
  margin-left: 290px;
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
    const url = `${BASE_URL}/api/admin/login`;
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
          Swal.fire({
            icon: 'error',
            title: '로그인에 실패했습니다.',
            confirmButtonText: '확인',
          });

          return;
        }
        localStorage.setItem('token', token);

        const no = getPayload(token, 'no');
        const id = getPayload(token, 'id');
        const nick = getPayload(token, 'nick');
        dispatch(setNick(nick));
        dispatch(login({ no, id, nick }));
        Swal.fire({
          icon: 'success',
          title: `환영합니다. ${nick}님`,
          confirmButtonText: '확인',
        });
        navi('../../admin/usermanage');
      })
      .catch(() => {});
  };

  const { formData, handleInputChange, handleSubmit } = useFormData(initState, submitCallBack);

  return (
    <>
      <Title></Title>
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
              ml={'290'}
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
