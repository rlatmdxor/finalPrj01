import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Btn from '../../util/Btn';
import Pagination from '../../util/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setTotalCount, resetPaging } from '../../../redux/pagingSlice';
import SearchBar from '../../util/SearchBar';
import Table from '../../util/Table';
import { useNavigate } from 'react-router-dom';
import Title from '../../util/Title';
import ContentLayout from '../../util/ContentLayout';
import { isTokenExpired, getRoleFromToken } from '../../util/JwtUtil';
import Swal from 'sweetalert2';
import BoardTable from '../../util/BoardTable';
import { BASE_URL } from '../../services/config';

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
const LayDiv = styled.div`
  height: 40px;
`;

const BottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const TitleText = styled.span`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 95%;
`;

const NoticeList = () => {
  const navi = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      setIsLogin(false);
    }
    if (getRoleFromToken(token) == 'ROLE_ADMIN') {
      setIsAdmin(true);
    }
    if (!token || isTokenExpired(token)) {
      setIsLogin(false);
    }
  }, [navi, token]);

  const boardType = 'notice';
  const initstate = {
    order: '',
    searchType: '',
    searchValue: '',
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [dataVoList, setVoList] = useState([]);
  const [pagedData, setPagedData] = useState([]);
  const [searchInput, setSearchInput] = useState(initstate);

  const currentPage = useSelector((state) => state.paging[boardType]?.currentPage || 1);
  const boardLimit = useSelector((state) => state.paging[boardType]?.boardLimit || 12);
  const [num, setNum] = useState(0);
  const offset = (currentPage - 1) * boardLimit;

  const url = `${BASE_URL}/api/notice/list`;
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(searchInput),
  };

  useEffect(() => {
    dispatch(resetPaging({ boardType }));
  }, []);

  useEffect(() => {
    setPagedData(dataVoList.slice(offset, offset + boardLimit));
  }, [dataVoList, currentPage, boardLimit]);

  useEffect(() => {
    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length > 0) {
          dispatch(setTotalCount({ boardType, totalCount: data.length }));
          setVoList(data);
        } else {
          dispatch(resetPaging({ boardType }));
          setVoList([]);
        }
      })
      .catch((error) => console.error('데이터 불러오기 실패:', error));
  }, [num]);

  const searchFilter = {
    order: ['최신순', '오래된순', '조회순'],
    searchType: ['제목', '내용', '제목+내용', '작성자'],
  };

  const handleOrder = (e) => {
    setSearchInput((prev) => {
      return {
        ...prev,
        order: e.target.value,
      };
    });
    setNum((prev) => prev + 1);
  };
  const handleSearchType = (e) => {
    setSearchInput((prev) => {
      return {
        ...prev,
        searchType: e.target.value,
      };
    });
  };

  const handleClick = () => {
    setNum((prev) => prev + 1);
  };

  const handleChange = (e) => {
    setSearchInput((prev) => {
      return {
        ...prev,
        searchValue: e.target.value,
      };
    });
  };

  const handleClearClick = () => {
    setSearchInput((prev) => {
      return {
        ...prev,
        searchValue: '',
      };
    });
  };
  const handleNaviDetail = (e, no) => {
    const bno = no;
    if (isLogin == false) {
      navigate(`/notice`);
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: '로그인해주세요',
      });
    } else if (isLogin === true) {
      navigate(`/notice/detail?bno=${bno}`);
    }
  };

  return (
    <>
      <Title>공지사항</Title>
      <div></div>
      <ContentLayout>
        <SearchDiv>
          <SelectBox onChange={handleOrder}>
            {searchFilter.order.map((option, idx) => (
              <option key={idx} value={idx} name={option}>
                {option}
              </option>
            ))}
          </SelectBox>
          <SelectBox onChange={handleSearchType}>
            {searchFilter.searchType.map((option, idx) => (
              <option key={idx} value={idx} name={option}>
                {option}
              </option>
            ))}
          </SelectBox>
          <SearchBar
            handleClick={handleClick}
            handleChange={handleChange}
            handleClearClick={handleClearClick}
            value={searchInput.searchValue}
          />
        </SearchDiv>
        <BoardTable columnWidths={['80px', '110px', '500px', '80px', '100px', '120px']}>
          <thead>
            <tr>
              <th>번호</th>
              <th>카테고리</th>
              <th>제목</th>
              <th>조회수</th>
              <th>작성자</th>
              <th>등록일자</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map((vo) => {
              return (
                <tr key={vo.no} value={vo.no} onClick={(e) => handleNaviDetail(e, vo.no)}>
                  <td>{vo.no}</td>
                  <td>공지</td>
                  <td>
                    <TitleWrapper>
                      <TitleText>{vo.title}</TitleText>
                    </TitleWrapper>
                  </td>
                  <td>{vo.hit}</td>
                  <td>{vo.nick}</td>
                  <td>{vo.enrollDate}</td>
                </tr>
              );
            })}
          </tbody>
        </BoardTable>
        <BottomDiv>
          <div></div>
          <div>
            <Pagination boardType={boardType} />
          </div>
          {isAdmin ? (
            <div>
              <Btn str={'등록'} c={'#FF7F50'} fc={'#ffffff'} mr={'0'} f={() => navigate('/notice/write')} />
            </div>
          ) : (
            <LayDiv />
          )}
        </BottomDiv>
      </ContentLayout>
    </>
  );
};

export default NoticeList;
