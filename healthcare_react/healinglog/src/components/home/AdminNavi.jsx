import React, { createElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { close, open } from '../../redux/menuSlice';
import { Link } from 'react-router-dom';

const Layout = styled.div`
  display: flex;
  height: 110px;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #7ca96d;
  box-sizing: border-box;
`;

const MenuDiv = styled.div`
  text-align: center;
  background-color: #f2f2f2;
  opacity: 0.9;
  padding: 20px;
  display: ${(props) => props.display || 'none'};
  justify-content: space-evenly;
  position: absolute;
  width: 1380px;
  left: 50%;
  transform: translateX(-50%);
  top: 110px;
  border-bottom: 1px solid #7ca96d;
  border-left: 1px solid #7ca96d;
  border-right: 1px solid #7ca96d;
  z-index: 100;
  box-sizing: border-box;
`;

const NaviDiv = styled.div`
  font-size: 20px;
  font-weight: 900;
`;

const MenuLayoutDiv1 = styled.div`
  display: grid;
  grid-auto-rows: 35px;
  padding-left: 32px;
`;

const LinkTag = styled(Link)`
  text-decoration: none;
  color: black;
`;

const AdminNavi = () => {
  const dispatch = useDispatch();
  const { value } = useSelector((state) => {
    return state.menu;
  });

  return (
    <>
      <Layout
        onMouseOver={() => {
          dispatch(open());
        }}
        onMouseOut={() => {
          dispatch(close());
        }}
      >
        <LinkTag to={'admin/usermanage'}>
          <NaviDiv>회원 관리</NaviDiv>
        </LinkTag>
        <NaviDiv>게시판 관리</NaviDiv>
        <LinkTag to={'admin/notice'}>
          <NaviDiv>공지사항 관리</NaviDiv>
        </LinkTag>
        <LinkTag to={'admin/banner'}>
          <NaviDiv>배너 관리</NaviDiv>
        </LinkTag>

        <MenuDiv display={value}>
          <MenuLayoutDiv1>
            <LinkTag to={'admin/board'}>꿀팁 게시판</LinkTag>
            <LinkTag to={'admin/review'}>병원 리뷰 게시판</LinkTag>
          </MenuLayoutDiv1>
          <div></div>
        </MenuDiv>
      </Layout>
    </>
  );
};

export default AdminNavi;
