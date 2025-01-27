import React, { useState } from 'react';
import styled from 'styled-components';
import ModalTitle from './ModalTitle';
import Btn from './Btn';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../redux/modalSlice';

const BtnContainerDiv = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 10px;
  margin-bottom: 10px;
  gap: 10px;
`;

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
  position: absolute;
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
`;

const ContentDiv = styled.div`
  padding: 30px;
`;

const Modal = ({ children, title, type }) => {
  const [click, setClick] = useState(false);
  const [position, setPosition] = useState({ x: 450, y: 150 });
  const [offset, setOffset] = useState({ x: 450, y: 150 });

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
        <ContentDiv>{children}</ContentDiv>

        <BtnContainerDiv>
          {type === 'edit' ? (
            <>
              <Btn f={() => {}} c={'#7ca96d'} fc={'white'} str={'수정'}></Btn>{' '}
              <Btn f={() => {}} c={'lightgray'} fc={'black'} str={'삭제'}></Btn>
            </>
          ) : type === 'add' ? (
            <Btn f={() => {}} c={'#FF7F50'} fc={'white'} str={'등록'}></Btn>
          ) : (
            <Btn f={() => {}} c={'#FF7F50'} fc={'white'} str={'시작'}></Btn>
          )}
        </BtnContainerDiv>
      </ContainerDiv>
    </>
  );
};

export default Modal;
