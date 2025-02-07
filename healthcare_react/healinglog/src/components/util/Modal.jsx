import React, { useState } from 'react';
import styled from 'styled-components';
import ModalTitle from './ModalTitle';

import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../redux/modalSlice';
import { useRef } from 'react';

const StyleDiv = styled.div`
  height: 50px;
`;

const CloseBtn = styled.button`
  position: absolute;
  margin-left: 470px;
  margin-top: -25px;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
`;

const ContainerDiv = styled.div`
  grid-template-rows: 30px 1fr 30px;
  z-index: 500;
  width: 500px;
  border: 1px solid gray;
  background-color: #ffffff;
  position: fixed;  
  border-radius: 15px;
  display: ${(props) => {
    return props.display;
  }};
  margin-left: ${({ position }) => {
    return position.x;
  }}px;
  margin-top: ${({ position }) => {
    return position.y;
  }}px;
  z-index: 1000;
`;

const ContentDiv = styled.div`
  padding: 30px 30px 0px 30px;
`;

const Modal = ({ children, title }) => {
  const [click, setClick] = useState(false);
  const [position, setPosition] = useState({ x: 280, y: 0 });
  const [offset, setOffset] = useState({ x: 280, y: 0 });

  const contentRef = useRef(null);

  const dispatch = useDispatch();
  const { modals } = useSelector((state) => {
    return state.modal;
  });

  const handleMouseMove = (e) => {
    if (click) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };
  const handleMouseUp = () => {
    setClick(false);
  };
  const handleMouseDown = (e) => {
    setClick(true);

    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleClose = () => {
    if (contentRef.current) {
      const inputs = contentRef.current.querySelectorAll('input');
      inputs.forEach((input) => (input.value = ''));
    }
    dispatch(close(title));
  };

  const displayValue = modals[title] || 'none';

  return (
    <>
      <ContainerDiv key={title} position={position} display={displayValue}>
        <StyleDiv onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown}>
          <ModalTitle>{title}</ModalTitle>
        </StyleDiv>

        <CloseBtn onClick={handleClose}>X</CloseBtn>
        <ContentDiv ref={contentRef}>{children}</ContentDiv>
      </ContainerDiv>
    </>
  );
};

export default Modal;
