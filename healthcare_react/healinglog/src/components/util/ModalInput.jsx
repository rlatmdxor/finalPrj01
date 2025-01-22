import React from 'react';
import styled from 'styled-components';

const InputTag = styled.input`
  display: flex;
  margin-bottom: 15px;
  margin-top: 5px;
  width: 300px;
  height: 30px;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid gray;
  box-sizing: border-box;
`;

const ModalInput = ({ type, plcaeholder, title }) => {
  return (
    <>
      {title}
      <InputTag type={type} placeholder={plcaeholder}></InputTag>
    </>
  );
};

export default ModalInput;
