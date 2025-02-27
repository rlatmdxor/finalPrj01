import React from 'react';
import styled from 'styled-components';

const LayoutDiv = styled.div`
  width: 320px;
  height: 150px;
  display: flex;
  flex-direction: column;
  border: 1px solid #c5cbd1;
  border-radius: 6px;
  text-align: center;

  &:hover {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  }
`;

const SmallCard = ({ children }) => {
  return <LayoutDiv>{children}</LayoutDiv>;
};

export default SmallCard;
