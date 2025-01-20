import React from 'react';
import Sider from './Sider';
import Sider2 from './Sider2';
import Header from './Header';
import styled from 'styled-components';
import Footer from './Footer';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { routes } from '../../routes';

const Layout = styled.div`
  display: grid;
  width: 1920px;

  grid-template-columns: 1fr 5fr 1fr;
  grid-template-rows: 110px fr;
`;

const MainContainer = styled.div`
  display: grid;
  min-height: 834px;
  grid-template-rows: 1fr 230px;
`;

const HomePage = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Header></Header>
        <Sider></Sider>
        <MainContainer>
          <Routes>
            {routes.map(({ path, component }) => (
              <Route key={path} path={path} element={component} />
            ))}
          </Routes>
          <Footer></Footer>
        </MainContainer>
        <Sider2></Sider2>
      </BrowserRouter>
    </Layout>
  );
};

export default HomePage;
