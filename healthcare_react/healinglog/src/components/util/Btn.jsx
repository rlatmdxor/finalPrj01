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
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0')};
  margin-top: ${({ mt }) => (mt ? `${mt}px` : '0')};
  margin-left: ${({ ml }) => (ml ? `${ml}px` : '0')};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : '0')};
`;

const Btn = ({ str, f, c, fc, w, h, mb, mt, ml, mr, fs }) => {
  return (
    <CommonBtn onClick={f} c={c} fc={fc} fs={fs} w={w} h={h} mb={mb} mt={mt} ml={ml} mr={mr}>
      {str}
    </CommonBtn>
  );
};

export default Btn;
