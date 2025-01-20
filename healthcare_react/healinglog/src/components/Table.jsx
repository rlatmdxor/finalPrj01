import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: ${(props) => props.width || '100%'};
  border-collapse: collapse;
  border-spacing: 0;
  text-align: center;
  border: 1px solid #d0d7de;
  outline: 1px solid #d0d7de;
  outline-offset: -2px;
  border-radius: 6px;
  overflow: hidden;

  & th {
    background-color: ${(props) => props.thBgColor || '#BAD8B6'};
    color: ${(props) => props.thTextColor || '#24292f'};
    font-weight: 600;
    padding: 12px 15px;
    font-size: ${(props) => props.thTextSize || '14px'};
    border: 1px solid #fafafa;
  }

  & td {
    background-color: ${(props) => props.tdBgColor || '#ffffff'};
    color: ${(props) => props.tdTextColor || '#393e44'};
    padding: 12px 15px;
    font-size: ${(props) => props.tdTextSize || '14px'};
    border: 1px solid #d0d7de;
  }

  & tr:hover td {
    background-color: #f6f8fa;
  }
`;

const Table = ({ children, width, thBgColor, thTextColor, thTextSize, tdBgColor, tdTextColor, tdTextSize }) => {
  return (
    <>
      <StyledTable
        width={width}
        thBgColor={thBgColor}
        thTextColor={thTextColor}
        thTextSize={thTextSize}
        tdBgColor={tdBgColor}
        tdTextColor={tdTextColor}
        tdTextSize={tdTextSize}
      >
        {children}
      </StyledTable>
    </>
  );
};

export default Table;
