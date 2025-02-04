import React from 'react';
import Sider from './Sider';
import Sider2 from './Sider2';
import Header from './Header';
import styled from 'styled-components';
import Footer from './Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from '../../routes';
import ScrollToTop from '../util/ScrollToTop';

const Layout = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1380px 1fr;
  grid-template-rows: 110px 1fr;
  box-sizing: border-box;
`;

const MainContainer = styled.div`
  display: grid;

  min-height: 834px;
  grid-template-rows: 100px 80px 1fr 230px;
`;

const HomePage = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Header></Header>
        <Sider></Sider>
        <MainContainer>
          <ScrollToTop />
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
