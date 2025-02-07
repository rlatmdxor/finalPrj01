import React from 'react';
import styled from 'styled-components';

const InputTag = styled.input`
  display: flex;
  width: ${({ size }) =>
    size === 'size1' ? '500px' : size === 'size2' ? '440px' : size === 'size3' ? '300px' : 'auto'};
  height: ${({ size }) => (size === 'size1' ? '50px' : size === 'size2' ? '40px' : size === 'size3' ? '30px' : 'auto')};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0')};
  margin-top: ${({ mt }) => (mt ? `${mt}px` : '0')};
  margin-left: ${({ ml }) => (ml ? `${ml}px` : '0')};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : '0')};
  border-radius: 10px;
  border: 1.5px solid gray;
  padding: 10px;
  box-sizing: border-box;
`;

const Input = ({ type, placeholder, size, mb, mt, ml, mr, title, value, disabled, min, max, step, f }) => {
  return (
    <>
      {title}
      <InputTag
        disabled={disabled}
        value={value}
        type={type}
        placeholder={placeholder}
        size={size}
        mb={mb}
        mt={mt}
        ml={ml}
        mr={mr}
        min={min}
        max={max}
        step={step}
        onChange={f}
        // onChange={handleChange}
      />
    </>
  );
};

export default Input;
