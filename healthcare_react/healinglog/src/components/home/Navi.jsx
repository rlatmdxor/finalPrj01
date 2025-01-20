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
  width: 1330px;
  left: 274px;
  top: 110px;
  border-bottom: 1px solid #7ca96d;
  border-left: 1px solid #7ca96d;
  border-right: 1px solid #7ca96d;
`;

const NaviDiv = styled.div`
  font-size: 20px;
  font-weight: 900;
`;

const MenuLayoutDiv1 = styled.div`
  display: grid;
  grid-auto-rows: 35px;
  padding-left: 14px;
`;

const MenuLayoutDiv2 = styled.div`
  display: grid;
  grid-auto-rows: 35px;
  padding-left: 40px;
`;

const MenuLayoutDiv3 = styled.div`
  display: grid;
  grid-auto-rows: 35px;
  padding-left: 35px;
`;

const MenuLayoutDiv4 = styled.div`
  display: grid;
  grid-auto-rows: 35px;
  padding-right: 68px;
`;

const LinkTag = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Navi = () => {
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
        <LinkTag to={'dashboard'}>
          <NaviDiv>나의 건강 현황</NaviDiv>
        </LinkTag>
        <NaviDiv>생활 건강 관리</NaviDiv>
        <NaviDiv>심혈관 관리</NaviDiv>
        <NaviDiv>의료기관 찾기</NaviDiv>
        <NaviDiv>게시판</NaviDiv>
        <LinkTag to={'notice'}>
          <NaviDiv>공지사항</NaviDiv>
        </LinkTag>
        <MenuDiv display={value}>
          <div></div>
          <MenuLayoutDiv1>
            <LinkTag to={'sleep'}>수면</LinkTag>
            <LinkTag to={'diet'}>식단</LinkTag>
            <LinkTag to={'exercise'}>운동</LinkTag>
            <LinkTag to={'alc'}>음주</LinkTag>
            <LinkTag to={'cigarette'}>흡연</LinkTag>
            <LinkTag to={'drug'}>복용약</LinkTag>
          </MenuLayoutDiv1>
          <MenuLayoutDiv2>
            <LinkTag to={'bloodpressure'}>혈압</LinkTag>
            <LinkTag to={'bloodsugar'}>혈당</LinkTag>
          </MenuLayoutDiv2>
          <MenuLayoutDiv3>
            <LinkTag to={'hospital'}>병원</LinkTag>
            <LinkTag to={'pharmacy'}>약국</LinkTag>
            <LinkTag to={'publichealthcenter'}>보건소</LinkTag>
          </MenuLayoutDiv3>
          <MenuLayoutDiv4>
            <LinkTag to={'board'}>꿀팁게시판</LinkTag>
            <LinkTag to={'hospitalreview'}>병원리뷰</LinkTag>
          </MenuLayoutDiv4>
        </MenuDiv>
      </Layout>
    </>
  );
};

export default Navi;
