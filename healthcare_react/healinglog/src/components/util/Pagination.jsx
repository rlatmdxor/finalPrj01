import React from 'react';
import styled from 'styled-components';

const PageDiv = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-between;
`;

const NumberBtn = styled.button`
  width: 30px;
  height: 30px;
  font-size: 15px;
  border: transparent;
  border-radius: 6px;
  background-color: ${({ active }) => (active ? '#7CA96D' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  cursor: pointer;
`;

const PaginationBtn = styled.button`
  width: 30px;
  height: 30px;
  border: transparent;
  font-size: 16px;
  font-weight: 600;
  color: #414141;
  background-color: transparent;
  cursor: pointer;
`;

const Pagination = () => {
  return (
    <PageDiv>
      <PaginationBtn>{'<'}</PaginationBtn>
      <NumberBtn active={true}>11</NumberBtn>
      <NumberBtn>12</NumberBtn>
      <NumberBtn>13</NumberBtn>
      <NumberBtn>14</NumberBtn>
      <NumberBtn>15</NumberBtn>
      <PaginationBtn> {'>'} </PaginationBtn>
    </PageDiv>
  );
};

export default Pagination;
