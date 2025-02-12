import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../../util/Title';
// import LoginInput from '../../util/LoginInput';
import { useFormData } from '../../util/useFormData';
import { useDispatch } from 'react-redux';
import { getPayload } from '../../util/JwtUtil';
import { login } from '../../../redux/MemberSlice';

const LoginPage = () => {
  const navi = useNavigate();
  const dispatch = useDispatch();

  const initState = {
    id: '',
    pwd: '',
  };

  const submitCallBack = (formData) => {
    const url = 'http://127.0.0.1:80/api/member/login';
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
        console.log('token ::: ', token);
        localStorage.setItem('token', token);

        const no = getPayload(token, 'no');
        const id = getPayload(token, 'id');
        const nick = getPayload(token, 'nick');
        dispatch(login({ no, id, nick }));
        alert(`환영합니다 ${nick}님`);
        navi('/');
      });
  };

  const { formData, handleInputChange, handleSubmit } = useFormData(initState, submitCallBack);

  return (
    <>
      <Title>로그인</Title>
      <div></div>
      <Layout>
        <BlankSpace />
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'grid',
            gridTemplateRows: '1fr 1fr1fr',
            boxSizing: 'border-box',
            width: '600px',
            height: '300px',
          }}
        >
          <InputTag onChange={handleInputChange} name="id" type="text" placeholder="아이디" />

          <InputTag onChange={handleInputChange} name="pwd" type="password" placeholder="비밀번호" />
          {/* <LoginInput type="password" placeholder="비밀번호" /> */}
          <Btn type="submit">로그인</Btn>
        </form>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: '20px' }}>
          <div>
            <LinkLayout to={'/join'}>회원 가입</LinkLayout>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', justifySelf: 'end' }}>
            <LinkLayout to={'/findid'}>아이디 찾기</LinkLayout>
            <LinkLayout to={'/findpwd'}>비밀번호 찾기</LinkLayout>
          </div>
        </div>
        <BlankSpace />
      </Layout>
    </>
  );
};

const Container = styled.div``;

const Layout = styled.div`
  box-sizing: border-box;
  display: grid;
  width: 600px;
  height: 300px;
  /* margin-top: 100px; */
  justify-self: center;
  /* margin-left: 380px; */
`;

const LinkLayout = styled(Link)`
  text-decoration: none;
  color: gray;
  /* margin-left: 370px;
  margin-right: -330px; */
`;

const Btn = styled.button`
  width: 600px;
  height: 80px;
  margin-bottom: 30px;
  margin-top: 15px;
  border-radius: 15px;
  border: none;
  color: white;
  font-size: 24px;
  font-weight: 900;
  background-color: #7ca96d;
  cursor: pointer;
`;

const InputTag = styled.input`
  width: 580px;
  height: 60px;
  margin-bottom: 20px;
  border-radius: 15px;
  border: 1px solid gray;
  padding: 10px;
`;

const BlankSpace = styled.div`
  height: 90px;
`;

export default LoginPage;
