import React from 'react';
import styled from 'styled-components';

const LayoutDiv = styled.div`
  width: 100%;
  height: 130px;
  grid-column: span 3;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #c5cbd1;
  border-radius: 6px;
`;

const BigCard = ({ children }) => {
  return <LayoutDiv>{children}</LayoutDiv>;
};

export default BigCard;
