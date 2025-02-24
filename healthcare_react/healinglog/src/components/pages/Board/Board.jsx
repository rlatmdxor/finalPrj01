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
  const boardType = 'honeyTip';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dataVoList, setVoList] = useState([]);
  const currentPage = useSelector((state) => state.paging[boardType]?.currentPage || 1);
  const boardLimit = useSelector((state) => state.paging[boardType]?.boardLimit || 12);
  const offset = (currentPage - 1) * boardLimit;

  const url = 'http://127.0.0.1:80/api/board/honeytip';
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  };

  useEffect(() => {
    dispatch(resetPaging({ boardType }));
  }, []);

  useEffect(() => {
    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length > 0) {
          dispatch(setTotalCount({ boardType, totalCount: data.length }));
          const pagedData = data.slice(offset, offset + boardLimit);
          setVoList(pagedData);
        } else {
          dispatch(resetPaging({ boardType }));
          setVoList([]);
        }
      })
      .catch((error) => console.error('데이터 불러오기 실패:', error));
  }, [currentPage, boardLimit]);

  const searchFilter = {
    order: ['최신순', '오래된순', '조회순', '추천순'],
    category: ['카테고리 전체', '병원', '약국', '생활'],
    searchType: ['제목', '내용', '제목+내용'],
  };

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
