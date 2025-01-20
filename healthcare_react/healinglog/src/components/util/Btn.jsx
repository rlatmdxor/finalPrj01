import React from 'react';
import styled from 'styled-components';

const CommonBtn = styled.button`
  display: flex;
  background-color: ${(props) => {
    return props.c;
  }};
  width: 70px;
  height: 35px;
  border-radius: 15px;
  border: none;
  font-size: 17px;
  color: ${(props) => {
    return props.fc;
  }};
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Btn = ({ str, f, c, fc }) => {
  return (
    <CommonBtn onClick={f} c={c} fc={fc}>
      {str}
    </CommonBtn>
  );
};

export default Btn;
