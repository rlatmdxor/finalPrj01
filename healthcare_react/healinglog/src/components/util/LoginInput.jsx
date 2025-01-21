import React from 'react';
import styled from 'styled-components';

const InputTag = styled.input`
  width: 580px;
  height: 60px;
  margin-bottom: 20px;
  border-radius: 15px;
  border: 1px solid gray;
  padding: 10px;
`;

const LoginInput = ({ type, placeholder }) => {
  return (
    <>
      <InputTag type={type} placeholder={placeholder} />
    </>
  );
};

export default LoginInput;
