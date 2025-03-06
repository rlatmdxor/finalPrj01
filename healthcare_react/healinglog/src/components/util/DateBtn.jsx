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

const Select = styled.select`
  margin-right: 15px;
`;

const DateBtn = ({ dataBtn, onSelect, line, onChange, setState }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (event) => {
    onChange(event.target.value);
    // onChange(document.querySelector('select').value);
  };

  return (
    <>
      <DataDiv>
        {line === 'Line' ? (
          <Select onChange={handleSelect}>
            <option value="Bar">막대</option>
            <option value="Line">꺽은 선</option>
          </Select>
        ) : (
          <Select onChange={handleSelect}>
            <option value="Line">꺽은 선</option>
            <option value="Bar">막대</option>
          </Select>
        )}

        {dataBtn.map((label, index) => (
          <StyleBtn
            key={index}
            isActive={activeIndex === index}
            onClick={() => {
              setActiveIndex(index);
              if (setState) {
                setState((prev) => {
                  return 0;
                });
              }
              onSelect(() => {
                return label;
              });
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
