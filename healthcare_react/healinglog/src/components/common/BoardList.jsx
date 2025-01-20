import React from 'react';
import styled from 'styled-components';

const TableDiv = styled.div`
  display: flex;
  margin: 20px 50px;
`;

const StyledTable = styled.table`
  width: ${(props) => props.width || '100%'};
  border-collapse: separate;
  border-spacing: 0;
  text-align: center;
  border: 1px solid #d0d7de;
  overflow: hidden;

  & th {
    background-color: ${(props) => props.thbgcolor || '#BAD8B6'};
    color: ${(props) => props.thtextcolor || '#24292f'};
    font-weight: 600;
    padding: 12px 15px;
    font-size: ${(props) => props.thtextsize || '14px'};
    border-right: 1px solid #fafafa;
    border-bottom: 1px solid #fafafa;
  }

  & td {
    background-color: ${(props) => props.tdbgcolor || '#ffffff'};
    color: ${(props) => props.tdtextcolor || '#393e44'};
    padding: 12px 15px;
    font-size: ${(props) => props.tdtextsize || '14px'};
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

const BoardList = ({ children, width, thbgcolor, thtextcolor, thtextsize, tdbgcolor, tdtextcolor, tdtextsize }) => {
  return (
    <TableDiv>
      <StyledTable
        width={width}
        thbgcolor={thbgcolor}
        thtextcolor={thtextcolor}
        thtextsize={thtextsize}
        tdbgcolor={tdbgcolor}
        tdtextcolor={tdtextcolor}
        tdtextsize={tdtextsize}
      >
        {children}
      </StyledTable>
    </TableDiv>
  );
};

export default BoardList;
