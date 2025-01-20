import React from 'react';
import styled from 'styled-components';

const TitleDiv = styled.div`
  font-size: 40px;
  font-weight: 900;
  margin-top: 50px;
  margin-left: 50px;
`;

const Title = ({ children }) => {
  return <TitleDiv>{children}</TitleDiv>;
};

export default Title;
