import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../../util/Title';
import LoginInput from '../../util/LoginInput';

const Layout = styled.div`
  margin-top: 100px;
  margin-left: 380px;
`;

const LinkLayout = styled(Link)`
  text-decoration: none;
  color: gray;
  margin-left: 370px;
  margin-right: -330px;
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

const LoginPage = () => {
  return (
    <div>
      <Title>로그인</Title>
      <Layout>
        <form action="" method="post">
          <LoginInput type="text" placeholder="아이디" />

          <LoginInput type="password" placeholder="비밀번호" />
          <br />
          <Btn>로그인</Btn>
        </form>
        <div>
          <LinkLayout to={'/findid'}>아이디 찾기</LinkLayout>
          <LinkLayout to={'/findpwd'}>비밀번호 찾기</LinkLayout>
        </div>
      </Layout>
    </div>
  );
};

export default LoginPage;
