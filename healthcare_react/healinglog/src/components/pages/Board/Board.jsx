import React, { useEffect, useState } from 'react';
import Title from '../../util/Title';
import styled from 'styled-components';
import Btn from '../../util/Btn';
import Pagination from '../../util/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setTotalCount, resetPaging } from '../../../redux/pagingSlice';
import SearchBar from '../../util/SearchBar';
import Table from '../../util/Table';
import { useNavigate } from 'react-router-dom';
import ContentLayout from '../../util/ContentLayout';
import HoneytipBoard from './HoneytipBoard';

const Board = () => {
  return (
    <>
      <Title>꿀팁게시판</Title>
      <div></div>
      <ContentLayout>
        <HoneytipBoard />
      </ContentLayout>
    </>
  );
};

export default Board;
