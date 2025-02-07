import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOrder } from '../redux/selectSlice';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 20px;
  font-family: Arial, sans-serif;
`;

const Select = styled.select`
  width: 200px;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SelectBar = () => {
  const { order, options } = useSelector((state) => state.select);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Select value={order} onChange={(e) => dispatch(setOrder(e.target.value))}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <p>현재 정렬 기준: {order}</p>
    </Wrapper>
  );
};

export default SelectBar;
