import React from 'react';
import styled from 'styled-components';

const InputTag = styled.input`
  width: ${({ size }) =>
    size === 'size1' ? '500px' : size === 'size2' ? '450px' : size === 'size3' ? '350px' : 'auto'};
  height: ${({ size }) => (size === 'size1' ? '40px' : size === 'size2' ? '40px' : size === 'size3' ? '35px' : 'auto')};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0')};
  margin-top: ${({ mt }) => (mt ? `${mt}px` : '0')};
  margin-left: ${({ ml }) => (ml ? `${ml}px` : '0')};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : '0')};
  border-radius: 15px;
  border: 1.5px solid gray;
  padding: 10px;
  box-sizing: border-box;
`;

const Input = ({ type, placeholder, size, mb, mt, ml, mr }) => {
  return (
    <>
      <InputTag type={type} placeholder={placeholder} size={size} mb={mb} mt={mt} ml={ml} mr={mr} />
    </>
  );
};

export default Input;
