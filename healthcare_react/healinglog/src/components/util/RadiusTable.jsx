import React from 'react';
import styled from 'styled-components';

const LayoutDiv = styled.div`
  display: flex;
  margin: 20px 50px;
`;

const StyledTable = styled.table`
  width: ${(props) => props.width || '100%'};
  border-collapse: collapse;
  border-spacing: 0;
  text-align: center;
  border: 1px solid #d0d7de;
  outline: 1px solid #d0d7de;
  outline-offset: -2px;
  border-radius: ${(props) => props.radius || '6px'};
  overflow: hidden;

  & th {
    background-color: ${(props) => props.thbgcolor || '#BAD8B6'};
    color: ${(props) => props.thtextcolor || '#24292f'};
    font-weight: 600;
    padding: 12px 15px;
    font-size: ${(props) => props.thtextsize || '14px'};
    border: 1px solid #fafafa;
  }

  & td {
    background-color: ${(props) => props.tdbgcolor || '#ffffff'};
    color: ${(props) => props.tdtextcolor || '#393e44'};
    padding: 12px 15px;
    font-size: ${(props) => props.tdtextsize || '14px'};
    border: 1px solid #d0d7de;
  }

  & tr:hover td {
    background-color: #f6f8fa;
  }
`;

const RadiusTable = ({
  children,
  width,
  radius,
  thbgcolor,
  thtextcolor,
  thtextsize,
  tdbgcolor,
  tdtextcolor,
  tdtextsize,
}) => {
  return (
    <>
      <LayoutDiv>
        <StyledTable
          width={width}
          radius={radius}
          thbgcolor={thbgcolor}
          thtextcolor={thtextcolor}
          thtextsize={thtextsize}
          tdbgcolor={tdbgcolor}
          tdtextcolor={tdtextcolor}
          tdtextsize={tdtextsize}
        >
          {children}
        </StyledTable>
      </LayoutDiv>
    </>
  );
};

export default RadiusTable;
