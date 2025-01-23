import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// 스타일 정의
const Wrapper = styled.div`
  margin: ${(props) => props.margin || '20px'}; // 부모로부터 전달받은 margin 적용
  font-family: Arial, sans-serif;
`;

const Select = styled.select`
  width: ${(props) => props.width || '160px'}; // 부모로부터 전달받은 width 적용, 기본값 160px
  height: ${(props) => props.height || '40px'}; // 부모로부터 전달받은 height 적용, 기본값 40px
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

const SelectedBar = ({ label, options, reduxAction, index, margin, width, height }) => {
  const dispatch = useDispatch();

  // 상태에서 선택된 값 가져오기
  const selectedValue = useSelector((state) =>
    state.selection[label] && state.selection[label][index] !== undefined ? state.selection[label][index] : ''
  );

  const handleChange = (e) => {
    dispatch(reduxAction({ category: label, index, value: e.target.value }));
  };

  return (
    <Wrapper margin={margin}>
      <Select value={selectedValue} onChange={handleChange} width={width} height={height}>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};

// 기본 props 설정 (부모에서 값이 전달되지 않을 때)
SelectedBar.defaultProps = {
  margin: '20px',
  width: '160px',
  height: '40px',
};

export default SelectedBar;
