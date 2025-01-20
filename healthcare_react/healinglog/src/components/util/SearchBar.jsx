import React, { useState } from 'react';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 15px;
  top: 8px;
  cursor: pointer;
`;

const ClearIcon = styled.span`
  position: absolute;
  right: 15px;
  font-size: 18px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  padding: 10px 10px 10px 40px; /* 왼쪽 여백을 이모지 크기만큼 추가 */
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 300px;
`;

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  const handleClearClick = () => {
    setQuery('');
  };

  return (
    <SearchWrapper>
      <SearchInputWrapper>
        <SearchIcon onClick={handleSearchClick}>
          <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.5 9.5L7.325 7.325M8.5 4.5C8.5 6.70914 6.70914 8.5 4.5 8.5C2.29086 8.5 0.5 6.70914 0.5 4.5C0.5 2.29086 2.29086 0.5 4.5 0.5C6.70914 0.5 8.5 2.29086 8.5 4.5Z"
              stroke="#1E1E1E"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </SearchIcon>
        <SearchInput type="text" placeholder="검색어를 입력하세요" value={query} onChange={handleInputChange} />
        <ClearIcon onClick={handleClearClick}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="#1E1E1E"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </ClearIcon>
      </SearchInputWrapper>
    </SearchWrapper>
  );
};

export default SearchBar;
