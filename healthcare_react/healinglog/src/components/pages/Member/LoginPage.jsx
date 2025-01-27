import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../../util/Title';
import LoginInput from '../../util/LoginInput';

const LoginPage = () => {
  return (
    <div>
      <Container>
        <Title>로그인</Title>
        <Layout>
          <form
            action=""
            method="post"
            style={{
              display: 'grid',
              gridTemplateRows: '1fr 1fr1fr',
              boxSizing: 'border-box',
              width: '600px',
              height: '300px',
            }}
          >
            <LoginInput type="text" placeholder="아이디" />

            <LoginInput type="password" placeholder="비밀번호" />
            <Btn>로그인</Btn>
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
      </Container>
    </div>
  );
};

const Container = styled.div``;

const Layout = styled.div`
  box-sizing: border-box;
  display: grid;
  width: 600px;
  height: 300px;
  margin-top: 100px;
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

const BlankSpace = styled.div`
  height: 100px;
`;

export default LoginPage;
