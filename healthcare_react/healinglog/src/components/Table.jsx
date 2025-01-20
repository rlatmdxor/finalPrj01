import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: ${(props) => props.width || '100%'};
  border-collapse: collapse;
  border-spacing: 0;
  margin: 20px 0;
  text-align: center;
  border: 1px solid #d0d7de;
  outline: 1px solid #d0d7de;
  outline-offset: -2px;
  border-radius: 6px;
  overflow: hidden;

  & th {
    background-color: ${(props) => props.thBgColor || '#BAD8B6'};
    color: #24292f;
    font-weight: 600;
    padding: 12px 15px;
    font-size: 14px;
    border: 1px solid #fafafa;
  }

  & td {
    background-color: #ffffff;
    color: #393e44;
    padding: 12px 15px;
    font-size: 14px;
    border: 1px solid #d0d7de;
  }

  & tr:hover td {
    background-color: #f6f8fa;
  }
`;

const Table = ({ children, width, thBgColor }) => {
  return (
    <>
      <StyledTable width={width} thBgColor={thBgColor}>
        {children}
      </StyledTable>
    </>
  );
};

export default Table;
