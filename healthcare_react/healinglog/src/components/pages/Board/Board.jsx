import React, { useEffect, useState } from 'react';
import Title from '../../util/Title';
import styled from 'styled-components';
import Btn from '../../util/Btn';
import Pagination from '../../util/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setTotalCount, resetPaging } from '../../../redux/pagingSlice';
import SearchBar from '../../util/SearchBar';
import Table from '../../util/Table';
import { useNavigate } from 'react-router-dom';
import ContentLayout from '../../util/ContentLayout';

const SearchDiv = styled.div`
  display: flex;
  justify-content: end;
  gap: 5px;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const SelectBox = styled.select`
  width: ${(props) => props.width || '100px'};
  height: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0px 3px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const BottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Board = () => {
  const boardType = 'honeyTip';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dataVoList, setVoList] = useState([]);
  const currentPage = useSelector((state) => state.paging[boardType]?.currentPage || 1);
  const boardLimit = useSelector((state) => state.paging[boardType]?.boardLimit || 12);
  const offset = (currentPage - 1) * boardLimit;

  const url = 'http://127.0.0.1:80/board/honeytip';
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  };

  useEffect(() => {
    dispatch(resetPaging({ boardType }));
  }, []);

  useEffect(() => {
    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length > 0) {
          dispatch(setTotalCount({ boardType, totalCount: data.length }));
          const pagedData = data.slice(offset, offset + boardLimit);
          setVoList(pagedData);
        } else {
          dispatch(resetPaging({ boardType }));
          setVoList([]);
        }
      })
      .catch((error) => console.error('데이터 불러오기 실패:', error));
  }, [currentPage, boardLimit]);

  const searchFilter = {
    order: ['최신순', '오래된순', '조회순', '추천순'],
    category: ['카테고리 전체', '병원', '약국', '생활'],
    searchType: ['제목', '내용', '제목+내용'],
  };

  return (
    <>
      <Title>꿀팁게시판</Title>
      <div></div>
      <ContentLayout>
        <SearchDiv>
          <SelectBox>
            {searchFilter.order.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </SelectBox>
          <SelectBox width="130px">
            {searchFilter.category.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </SelectBox>
          <SelectBox>
            {searchFilter.searchType.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </SelectBox>
          <SearchBar />
        </SearchDiv>
        <Table>
          <thead>
            <tr>
              <th>번호</th>
              <th>카테고리</th>
              <th>제목</th>
              <th>추천수</th>
              <th>작성자</th>
              <th>등록일자</th>
            </tr>
          </thead>
          <tbody>
            {dataVoList.map((vo) => {
              return (
                <tr key={vo.no} onClick={() => navigate(`/board?bno=${vo.no}`)}>
                  <td>{vo.no}</td>
                  <td>{vo.categoryNo}</td>
                  <td>{vo.title}</td>
                  <td>{vo.hit}</td>
                  <td>{vo.memberNo}</td>
                  <td>{vo.enrollDate}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <BottomDiv>
          <div></div>
          <div>
            <Pagination boardType={boardType} />
          </div>
          <div>
            <Btn str={'등록'} c={'#FF7F50'} fc={'#ffffff'} h={'40'} f={() => navigate('/board/write')} />
          </div>
        </BottomDiv>
      </ContentLayout>
    </>
  );
};

export default Board;
