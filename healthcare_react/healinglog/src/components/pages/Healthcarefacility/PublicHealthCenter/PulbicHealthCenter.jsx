import React, { useEffect, useState } from 'react';
import Title from '../../../util/Title';
import styled from 'styled-components';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';
import Table from '../../../util/Table';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../../util/SearchBar';
import Pagination from '../../../util/Pagination';
import { resetPaging, setTotalCount } from '../../../../redux/pagingSlice';

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

const PublicHealthCenter = () => {
  const dispatch = useDispatch();
  const boardType = 'phc';

  // 상태값 정의
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [dongs, setDongs] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedDong, setSelectedDong] = useState(null);
  const [searchType, setSearchType] = useState('');
  const [keyword, setKeyword] = useState('');
  const [phcs, setPhcs] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentPage = useSelector((state) => state.paging[boardType]?.currentPage || 1);
  const boardLimit = useSelector((state) => state.paging[boardType]?.boardLimit || 12);
  const totalCount = useSelector((state) => state.paging[boardType]?.totalCount || 0);
  const startPage = useSelector((state) => state.paging[boardType]?.startPage || 1);
  const endPage = useSelector((state) => state.paging[boardType]?.endPage || 5);
  const offset = (currentPage - 1) * boardLimit;

  // 📌 초기 페이징 상태 리셋
  useEffect(() => {
    dispatch(resetPaging({ boardType }));
  }, []);

  // 📌 시 데이터 가져오기
  useEffect(() => {
    fetch('http://127.0.0.1/api/location/cities')
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((error) => console.error('시 데이터 로드 실패:', error));
  }, []);

  // 📌 군/구 데이터 가져오기
  useEffect(() => {
    if (selectedCity) {
      fetch(`http://127.0.0.1/api/location/districts/${selectedCity}`)
        .then((res) => res.json())
        .then((data) => setDistricts(data))
        .catch((error) => console.error('구 데이터 로드 실패:', error));
    } else {
      setDistricts([]);
    }
  }, [selectedCity]);

  // 📌 동 데이터 가져오기
  useEffect(() => {
    if (selectedDistrict) {
      fetch(`http://127.0.0.1/api/location/dongs/${selectedDistrict}`)
        .then((res) => res.json())
        .then((data) => setDongs(data))
        .catch((error) => console.error('동 데이터 로드 실패:', error));
    } else {
      setDongs([]);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  // 📌 검색 실행
  const handleSearch = async () => {
    setLoading(true);

    try {
      let searchKeyword = keyword.trim();
      let finalSearchType = searchType;

      if (!searchKeyword) {
        const cityName = cities.find((c) => c.no === selectedCity)?.cityName || '';
        const districtName = districts.find((d) => d.no === selectedDistrict)?.districtName || '';
        const dongName = dongs.find((d) => d.no === selectedDong)?.dongName || '';

        searchKeyword = dongName || districtName || cityName;
        finalSearchType = 'address';
      }

      if (!searchKeyword) {
        searchKeyword = ''; // 전체 데이터 요청을 위한 기본값 설정
        finalSearchType = ''; // 검색 타입도 비움
      }

      const requestUrl = `http://localhost/api/phc/search?searchType=${finalSearchType}&keyword=${encodeURIComponent(
        searchKeyword
      )}&page=${currentPage}&size=${boardLimit}`;

      const response = await fetch(requestUrl);
      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }
      const data = await response.json();

      // `data.totalCount`가 존재하면 사용하고, 없으면 가져온 데이터 개수 사용
      dispatch(setTotalCount({ boardType: 'phc', totalCount: data.totalElements || data.phcs.length }));

      setPhcs(data.phcs || []);
    } catch (error) {
      console.error('❌ 검색 오류:', error);
      setPhcs([]);
    }
    setLoading(false);
  };

  // 📌 검색어 업데이트 핸들러
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // 📌 검색어 초기화 핸들러
  const handleClearKeyword = () => {
    setKeyword('');
  };

  //시군구 고르면 자동으로 검색
  useEffect(() => {
    if (selectedCity || selectedDistrict) {
      handleSearch();
    }
  }, [selectedCity, selectedDistrict]);

  return (
    <>
      <Title>의료기관 찾기</Title>
      <NaviContainer>
        <Navi target="hospital" tag={'병원'} />
        <Navi target="pharmacy" tag={'약국'} />
        <Navi target="publichealthcenter" tag={'보건소'} />
      </NaviContainer>
      <ContentLayout>
        <SearchDiv>
          <SelectBox onChange={(e) => setSelectedCity(parseInt(e.target.value, 10))}>
            <option value="">도시 선택</option>
            {cities.map((city) => (
              <option key={city.no} value={city.no}>
                {city.cityName}
              </option>
            ))}
          </SelectBox>

          <SelectBox disabled={!selectedCity} onChange={(e) => setSelectedDistrict(parseInt(e.target.value, 10))}>
            <option value="">군/구 선택</option>
            {districts.map((district) => (
              <option key={district.no} value={district.no}>
                {district.districtName}
              </option>
            ))}
          </SelectBox>

          {/* 검색 옵션 */}
          <SelectBox value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="">검색 조건 선택</option>
            <option value="name">보건소명</option>
            <option value="address">주소</option>
            <option value="tellNum">전화번호</option>
            <option value="postNum">우편번호</option>
          </SelectBox>

          {/* SearchBar */}
          <SearchBar
            handleClick={handleSearch} // 검색 버튼 클릭 시 handleSearch 실행
            handleChange={handleKeywordChange} // 검색어 입력 시 keyword 업데이트
            handleClearClick={handleClearKeyword} // 검색어 초기화 버튼
            w={300}
            h={40}
          />
        </SearchDiv>
        <Table>
          <thead>
            <tr>
              <th>약국명</th>
              <th>전화번호</th>
              <th>우편번호</th>
              <th>주소</th>
            </tr>
          </thead>
          <tbody>
            {phcs.map((phc, idx) => (
              <tr key={idx}>
                <td width="160px">{phc.name}</td>
                <td width="110px">{phc.tellNum}</td>
                <td width="60px">{phc.postNum}</td>
                <td>{phc.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination boardType={boardType} />
      </ContentLayout>
    </>
  );
};

export default PublicHealthCenter;
