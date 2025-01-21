import React from 'react';
import styled from 'styled-components';

const CommonBtn = styled.button`
  display: flex;
  background-color: ${(props) => {
    return props.c;
  }};
  width: ${({ w }) => (w ? `${w}px` : '70px')};
  height: ${({ h }) => (h ? `${h}px` : '35px')};
  border-radius: 15px;
  border: none;
  font-size: ${({ fs }) => (fs ? `${fs}px` : '17px')};
  color: ${({ fc }) => (fc ? `${fc}` : 'black')};
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Btn = ({ str, f, c, fc, w, h, fs }) => {
  return (
    <CommonBtn onClick={f} c={c} fc={fc} fs={fs} w={w} h={h}>
      {str}
    </CommonBtn>
  );
};

export default Btn;
