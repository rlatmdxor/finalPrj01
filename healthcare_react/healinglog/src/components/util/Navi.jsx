import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

const Navi = ({ target, tag }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const goTo = () => {
    navigate(`/${target}`);
  };

  const currentPath = location.pathname;
  const isSelected = location.pathname === `/${target}`;

  return (
    <>
      <Container>
        <DetailWrapper>
          <NaviBtn target={target} currentPath={currentPath} onClick={goTo} isSelected={isSelected}>
            {tag}
          </NaviBtn>
          {isSelected && <Indicator theme={theme} />}
        </DetailWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const NaviBtn = styled.button`
  background-color: unset;
  border: none;
  width: fit-content;
  height: 40px;
  font-size: 24px;
  /* font-weight: bold; */
  color: ${({ target, currentPath }) => (currentPath === `/${target}` ? 'black' : '#959595')};
  cursor: pointer;
`;

const Indicator = styled.div`
  width: 80%;
  height: 3px;
  background-color: ${({ theme }) => theme.orange};
  position: absolute;
  bottom: -3px;
`;

export default Navi;
