import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { nextPage, pageChange, prevPage } from '../../redux/pagingSlice';

const PageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const NumberBtn = styled.button`
  width: 30px;
  height: 30px;
  font-size: 15px;
  border: transparent;
  border-radius: 6px;
  background-color: ${({ $active }) => ($active ? '#7CA96D' : 'transparent')};
  color: ${({ $active }) => ($active ? 'white' : 'black')};
  cursor: pointer;
`;

const PaginationBtn = styled.button`
  height: 30px;
  border: transparent;
  font-size: 14px;
  font-weight: 600;
  color: #313131;
  background-color: transparent;
  cursor: pointer;

  &:disabled {
    cursor: default;
    color: #ccc;
  }
`;

const Pagination = ({ boardType }) => {
  const dispatch = useDispatch();

  const currentPage = useSelector((state) => state.paging[boardType]?.currentPage || 1);
  const boardLimit = useSelector((state) => state.paging[boardType]?.boardLimit || 12);
  const totalCount = useSelector((state) => state.paging[boardType]?.totalCount || 0);
  const startPage = useSelector((state) => state.paging[boardType]?.startPage || 1);
  const endPage = useSelector((state) => state.paging[boardType]?.endPage || 5);

  if (!currentPage) {
    return null;
  }

  const pageNumber = [];
  const maxpage = Math.ceil(totalCount / boardLimit);
  const adjustedEndPage = Math.min(endPage, maxpage);

  for (let i = startPage; i <= adjustedEndPage; i++) {
    pageNumber.push(i);
  }

  return (
    <PageDiv>
      <PaginationBtn
        onClick={() => {
          dispatch(prevPage({ boardType }));
        }}
        disabled={startPage === 1}
      >
        {'<'}
      </PaginationBtn>
      {pageNumber.map((page) => (
        <NumberBtn
          key={page}
          $active={page === currentPage}
          onClick={() => {
            dispatch(pageChange({ boardType, page }));
          }}
        >
          {page}
        </NumberBtn>
      ))}

      <PaginationBtn
        onClick={() => {
          dispatch(nextPage({ boardType }));
        }}
        disabled={endPage >= maxpage}
      >
        {'>'}
      </PaginationBtn>
    </PageDiv>
  );
};

export default Pagination;
