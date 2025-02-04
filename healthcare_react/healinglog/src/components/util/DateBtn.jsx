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

const DataDiv = styled.div`
  display: flex;
  justify-content: end;
`;

const DateBtn = ({ dataBtn }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <DataDiv>
        {dataBtn.map((label, index) => (
          <StyleBtn key={index} isActive={activeIndex === index} onClick={() => setActiveIndex(index)}>
            {label}
          </StyleBtn>
        ))}
      </DataDiv>
    </>
  );
};

export default DateBtn;
