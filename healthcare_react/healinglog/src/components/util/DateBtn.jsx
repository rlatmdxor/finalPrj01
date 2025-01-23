import React, { useState } from 'react';
import styled from 'styled-components';

const StyleBtn = styled.button`
  width: 30px;
  height: 30px;
  font-size: 15px;
  border-radius: 6px;
  background-color: ${(props) => (props.isActive ? '#7ca96d' : 'white')};
  color: ${(props) => (props.isActive ? 'white' : 'black')};

  border: none;
  cursor: pointer;
`;

const DateBtn = ({ dataBtn }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {dataBtn.map((label, index) => (
        <StyleBtn key={index} isActive={activeIndex === index} onClick={() => setActiveIndex(index)}>
          {label}
        </StyleBtn>
      ))}
    </>
  );
};

export default DateBtn;
