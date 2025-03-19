import React, { useState } from 'react';
import styled from 'styled-components';

const StyleBtn = styled.button`
  width: 30px;
  height: 30px;
  font-family: 'goorm-sans-bold';
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
  height: 30px;
`;

const DateBtn2 = ({ dataBtn, onSelect, onChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (event) => {
    onChange(event.target.value);
  };

  return (
    <>
      <DataDiv>
        {dataBtn.map((label, index) => (
          <StyleBtn
            key={index}
            isActive={activeIndex === index}
            onClick={() => {
              setActiveIndex(index);
              onSelect(label);
            }}
          >
            {label}
          </StyleBtn>
        ))}
      </DataDiv>
    </>
  );
};

export default DateBtn2;
