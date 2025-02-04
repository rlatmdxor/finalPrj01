import React from 'react';
import styled from 'styled-components';

const ContentDiv = styled.div`
  display: grid;
  grid-template-columns: 100%;
  padding-left: 180px;
  padding-right: 180px;
`;

const ContentLayout = ({ children }) => {
  return <ContentDiv>{children}</ContentDiv>;
};

export default ContentLayout;
