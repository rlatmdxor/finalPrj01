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

const Select = styled.select`
  margin-right: 15px;
`;

const DateBtn = ({ dataBtn, onSelect, line, onChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = () => {
    onChange(document.querySelector('select').value);
  };

  return (
    <>
      <DataDiv>
        {
          (line = 'Line' ? (
            <Select onChange={handleSelect}>
              <option value="Bar">막대</option>
              <option value="Line">꺽은 선</option>
            </Select>
          ) : (
            <Select onChange={handleSelect}>
              <option value="Line">꺽은 선</option>
              <option value="Bar">막대</option>
            </Select>
          ))
        }

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

export default DateBtn;
