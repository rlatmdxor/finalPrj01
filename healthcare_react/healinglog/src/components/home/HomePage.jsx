import React from 'react';
import Sider from './Sider';
import Sider2 from './Sider2';
import Header from './Header';
import styled from 'styled-components';
import Footer from './Footer';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { routes } from '../../routes';
import ScrollToTop from '../util/ScrollToTop';
import AdminHeader from './AdminHeader';
import Chatbot from '../pages/Chatbot/Chatbot';

const Layout = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1380px 1fr;
  grid-template-rows: 110px 1fr;
  box-sizing: border-box;
`;

const MainContainer = styled.div`
  display: grid;
  min-height: 835px;
  grid-template-rows: 100px auto 1fr auto;
`;

const HomePage = () => {
  document.body.style.overflow = 'hidden';
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <Layout>
      {isAdminPage ? <AdminHeader /> : <Header />}
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
      <Chatbot />
    </Layout>
  );
};

export default HomePage;
