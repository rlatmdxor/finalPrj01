import React, { useEffect, useState } from 'react';
import Title from '../util/Title';
import ContentLayout from '../util/ContentLayout';
import Table from '../util/Table';
import { useDispatch, useSelector } from 'react-redux';
import { resetPaging, setTotalCount } from '../../redux/pagingSlice';
import styled from 'styled-components';
import SearchBar from '../util/SearchBar';
import Pagination from '../util/Pagination';
import Btn from '../util/Btn';
import { Navigate } from 'react-router-dom';
import { getPayload } from '../util/JwtUtil';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 400px;
  top: 20px;
  left: 40px;
  grid-template-columns: 2fr 2fr 3fr;
`;

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

const AdminUserManage = () => {
  const dispatch = useDispatch();
  const boardType = 'userManage';

  const [searchType, setSearchType] = useState('');
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState([]);
  const [delYn, setDelYn] = useState('');
  const [loading, setLoading] = useState(false);

  const currentPage = useSelector((state) => state.paging[boardType]?.currentPage || 1);
  const boardLimit = useSelector((state) => state.paging[boardType]?.boardLimit || 12);

  const token = localStorage.getItem('token');

  if (!token) {
    alert('로그인 정보가 없습니다.');
    localStorage.clear();
    window.location.href = 'login';
  }

  useEffect(() => {
    if (!token) {
      alert('로그인 정보가 없습니다.');
      console.log('로그인 정보가 없습니다.');
      localStorage.clear();
      window.location.href = 'login';
    }

    // 토큰에서 role 값 가져오기
    const role = getPayload(token, 'role');

    if (role == 'ROLE_USER') {
      alert('관리자 권한이 필요!!');
      window.location.href = 'login';
    }

    if (role !== 'ROLE_ADMIN') {
      alert('관리자 권한이 없습니다.');
      console.log('관리자 권한이 없습니다.');
      window.location.href = 'login';
    }
  }, [Navigate, token]);

  const url = 'http://127.0.0.1/api/admin/usermanage/search';

  const option = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    dispatch(resetPaging({ boardType }));
  }, []);

  useEffect(() => {
    handleSearch(); // 초기 로딩 시 검색 실행
  }, []);

  // 📌 검색어 업데이트 핸들러
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // 📌 검색어 초기화 핸들러
  const handleClearKeyword = () => {
    setKeyword('');
  };

  useEffect(() => {
    handleSearch();
  }, [delYn]);

  // Enter 키 입력 시 검색 실행
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 이벤트(폼 제출) 방지
      handleSearch(); // 검색 실행
    }
  };

  //검색
  const handleSearch = async () => {
    setLoading(true);

    let finalKeyword = keyword.trim();
    let finalSearchType = searchType;

    if (!finalKeyword) {
      finalKeyword = '';
      finalSearchType = '';
    }

    try {
      const requestUrl = `http://127.0.0.1/api/admin/usermanage/search?delYn=${delYn}&searchType=${finalSearchType}&keyword=${encodeURIComponent(
        finalKeyword
      )}&page=${currentPage}&size=${boardLimit}`;

      const response = await fetch(requestUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }
      const data = await response.json();

      // 데이터 업데이트
      if (data.users.length > 0) {
        dispatch(setTotalCount({ boardType, totalCount: data.totalElements }));
        setUsers(data.users);
      } else {
        dispatch(resetPaging({ boardType }));
        setUsers([]);
      }
    } catch (error) {
      console.error(' 데이터 불러오기 실패:', error);
      setUsers([]);
    }
    setLoading(false);
  };

  // 📌 유저 삭제 요청
  const handleDeleteUser = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`http://127.0.0.1/api/admin/usermanage/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: id }),
      });

      const result = await response.text(); // 서버에서 오는 응답 메시지 확인

      if (!response.ok) {
        throw new Error(result || `삭제 실패: ${response.status}`);
      }
      alert(' 유저가 삭제되었습니다.');
      handleSearch(); // 삭제 후 다시 검색
    } catch (error) {
      if (error.message.includes('이미 삭제된 유저')) {
        alert('이미 삭제된 유저입니다.');
      } else {
        alert('삭제 실패');
      }
    }
  };

  return (
    <>
      <Title>회원 관리</Title>

      <div></div>
      <ContentLayout>
        <SearchDiv>
          <SelectBox value={delYn} onChange={(e) => setDelYn(e.target.value)}>
            <option value="">모든 유저</option>
            <option value="Y">탈퇴유저</option>
            <option value="N">활성유저</option>
          </SelectBox>

          {/* 검색 옵션 */}
          <SelectBox value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="">검색 조건 선택</option>
            <option value="name">이름</option>
            <option value="id">아이디</option>
            <option value="nick">닉네임</option>
            <option value="email">이메일</option>
          </SelectBox>

          <SearchBar
            handleClick={handleSearch} // 검색 버튼 클릭 시 handleSearch 실행
            handleChange={handleKeywordChange} // 검색어 입력 시 keyword 업데이트
            handleClearClick={handleClearKeyword} // 검색어 초기화 버튼
            handleKeyPress={handleKeyPress}
            w={300}
            h={40}
          />
        </SearchDiv>

        <Table>
          <thead>
            <tr>
              <th>회원 번호</th>
              <th>아이디</th>
              <th>이메일</th>
              <th>닉네임</th>
              <th>가입일자</th>
              <th>탈퇴여부</th>
              <th>탈퇴</th>
            </tr>
          </thead>
          <tbody>
            {users.map((vo) => (
              <tr key={vo.no}>
                <td>{vo.no}</td>
                <td>{vo.id}</td>
                <td>{vo.email}</td>
                <td>{vo.nick}</td>
                <td>{vo.enrollDate}</td>
                <td>{vo.delYn}</td>
                <td>
                  <Btn
                    w={'50'}
                    h={'25'}
                    mt={'0'}
                    mr={'0'}
                    ml={'40'}
                    mb={'0'}
                    fs={'15'}
                    str={'삭제'}
                    c={'#FF7F50'}
                    fc={'white'}
                    f={() => {
                      handleDeleteUser(vo.id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination boardType={boardType} />
      </ContentLayout>
    </>
  );
};

export default AdminUserManage;
