import React from 'react';
import styled from 'styled-components';

const TitleDiv = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  font-size: 36px;
  font-weight: 900;
  padding-left: 50px;
  align-items: end;
  box-sizing: border-box;
`;

const Title = ({ children }) => {
  return <TitleDiv>{children}</TitleDiv>;
};

export default Title;
