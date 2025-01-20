import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: ${(props) => props.width || '100%'};
  border-collapse: separate;
  border-spacing: 0;
  margin: 20px 0;
  text-align: center;
  border: 1px solid #d0d7de;
  overflow: hidden;

  & th {
    background-color: ${(props) => props.thBgColor || '#BAD8B6'};
    color: #24292f;
    font-weight: 600;
    padding: 12px 15px;
    font-size: 14px;
    border-right: 1px solid #fafafa;
    border-bottom: 1px solid #fafafa;
  }

  & td {
    background-color: #ffffff;
    color: #393e44;
    padding: 12px 15px;
    font-size: 14px;
    border-bottom: 1px solid #d0d7de;
    border-right: 1px solid #d0d7de;
  }

  & tr:last-child td {
    border-bottom: none;
  }

  & th:last-child,
  & td:last-child {
    border-right: none;
  }

  & tr:hover td {
    background-color: #f6f8fa;
  }
`;

const BoardList = ({ children }) => {
  return (
    <>
      <StyledTable>{children}</StyledTable>
    </>
  );
};

export default BoardList;
