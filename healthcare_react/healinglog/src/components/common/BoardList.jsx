import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: ${(props) => props.width || '100%'};
  border-collapse: separate;
  border-spacing: 0;
  text-align: center;
  border: 1px solid #d0d7de;
  overflow: hidden;

  & th {
    background-color: ${(props) => props.thBgColor || '#BAD8B6'};
    color: ${(props) => props.thTextColor || '#24292f'};
    font-weight: 600;
    padding: 12px 15px;
    font-size: ${(props) => props.thTextSize || '14px'};
    border-right: 1px solid #fafafa;
    border-bottom: 1px solid #fafafa;
  }

  & td {
    background-color: ${(props) => props.tdBgColor || '#ffffff'};
    color: ${(props) => props.tdTextColor || '#393e44'};
    padding: 12px 15px;
    font-size: ${(props) => props.tdTextSize || '14px'};
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

const BoardList = ({ children, width, thBgColor, thTextColor, thTextSize, tdBgColor, tdTextColor, tdTextSize }) => {
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

export default BoardList;
