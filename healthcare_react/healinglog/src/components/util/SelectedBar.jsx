import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// 스타일 정의
const Wrapper = styled.div`
  margin: 20px;
  font-family: Arial, sans-serif;
`;

const Select = styled.select`
  width: 160px;
  height: 40px;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

const SelectedBar = ({ label, options, reduxAction, index }) => {
  const dispatch = useDispatch();
  // const selectedValue = useSelector((state) => (state.selection[label] ? state.selection[label][index] : options[0]));
  const selectedValue = useSelector((state) =>
    state.selection[label] && state.selection[label][index] !== undefined ? state.selection[label][index] : ''
  );

  const handleChange = (e) => {
    dispatch(reduxAction({ category: label, index, value: e.target.value }));
  };

  return (
    <Wrapper>
      {/* <Label>
        {label} {index + 1}
      </Label> */}

      <Select value={selectedValue} onChange={handleChange}>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};

export default SelectedBar;
