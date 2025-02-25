import React, { useEffect, useState } from 'react';
import Title from '../../../util/Title';
import { setSelection } from '../../../../redux/selectSlice';
import styled, { ThemeProvider, useTheme } from 'styled-components';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';
import Table from '../../../util/Table';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../../util/SearchBar';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 400px;
  top: 20px;
  left: 40px;
  grid-template-columns: 2fr 2fr 3fr;
`;

const Wrapper = styled.div`
  display: flex;
  /* gap: 20px; */
  flex-wrap: wrap;
  /* margin-left: 100px;
  margin-right: 100px;
  padding: 30px;
  padding-left: 50px;
  padding-right: 50px; */
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

const Pharmacy = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const searchFilter = useSelector((state) => state.search); // Redux에서 검색 필터 가져오기

  const [cities, setCities] = useState([]); // 도시 리스트
  const [districts, setDistricts] = useState([]); // 선택된 도시의 구 리스트
  const [dongs, setDongs] = useState([]); // 선택된 구의 동 리스트
  const [searchType, setSearchType] = useState('name');
  const [keyword, setKeyword] = useState('');
  const [selectedCity, setSelectedCity] = useState(null); // 선택된 도시 ID
  const [selectedDistrict, setSelectedDistrict] = useState(null); // 선택된 구 ID
  const [selectedDong, setSelectedDong] = useState(null); // 선택된 동 ID

  const [pharmacies, setPharmacies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

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

  // 📌 검색어 업데이트 핸들러
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // 📌 검색 실행 핸들러
  const handleSearch = async () => {
    setLoading(true);
    try {
      let searchKeyword = keyword.trim();
      let finalSearchType = searchType;

      // 🔹 검색어가 없을 경우 시/구/동을 검색어로 사용
      if (!searchKeyword) {
        const cityName = cities.find((c) => c.no === selectedCity)?.cityName || '';
        const districtName = districts.find((d) => d.no === selectedDistrict)?.districtName || '';
        const dongName = dongs.find((d) => d.no === selectedDong)?.dongName || '';

        searchKeyword = dongName || districtName || cityName;
        finalSearchType = 'address'; // 🔹 기본 검색 타입은 주소로 설정
      }

      console.log('🔍 최종 검색어:', searchKeyword, '| 검색 타입:', finalSearchType);

      if (!searchKeyword) {
        console.warn('⚠️ 검색어가 비어 있습니다. 검색을 실행하지 않습니다.');
        setLoading(false);
        return;
      }

      const requestUrl = `http://localhost/api/pharmacy/search?searchType=${finalSearchType}&keyword=${encodeURIComponent(
        searchKeyword
      )}&page=${page}&size=12`;
      console.log('📡 API 요청 URL:', requestUrl);

      const response = await fetch(requestUrl);
      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API 응답 데이터:', data);

      setPharmacies(data.pharmacies || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('❌ 검색 오류:', error);
    }
    setLoading(false);
  };

  // 📌 검색어 초기화 핸들러
  const handleClearKeyword = () => {
    setKeyword('');
  };

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
          <SelectBox
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setSelectedCity(value);
              setSelectedDistrict('');
              setSelectedDong('');
              dispatch(setSelection({ label: 'city', value }));
            }}
          >
            <option value="">도시 선택</option>
            {cities.map((city) => (
              <option key={city.no} value={city.no}>
                {city.cityName}
              </option>
            ))}
          </SelectBox>

          <SelectBox
            disabled={!selectedCity}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setSelectedDistrict(value);
              setSelectedDong('');
              dispatch(setSelection({ label: 'district', value }));
            }}
          >
            <option value="">군/구 선택</option>
            {districts.map((district) => (
              <option key={district.no} value={district.no}>
                {district.districtName}
              </option>
            ))}
          </SelectBox>

          <SelectBox
            disabled={!selectedDistrict}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setSelectedDong(value);
              dispatch(setSelection({ label: 'dong', value }));
            }}
          >
            <option value="">동 선택</option>
            {dongs.map((dong) => (
              <option key={dong.no} value={dong.no}>
                {dong.dongName}
              </option>
            ))}
          </SelectBox>

          {/* 검색 옵션 */}
          <SelectBox value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="name">약국명</option>
            <option value="address">주소</option>
            <option value="tellNum">전화번호</option>
            <option value="postNum">우편번호</option>
          </SelectBox>

          {/* SearchBar */}
          <SearchBar
            handleClick={handleSearch} // ✅ 검색 버튼 클릭 시 handleSearch 실행
            handleChange={handleKeywordChange} // ✅ 검색어 입력 시 keyword 업데이트
            handleClearClick={handleClearKeyword} // ✅ 검색어 초기화 버튼
            w={300}
            h={40}
            mb={10}
          />
        </SearchDiv>

        {/* 검색 결과 테이블 */}
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
            {pharmacies.length > 0 ? (
              pharmacies.map((pharmacy, idx) => (
                <tr key={idx}>
                  <td>{pharmacy.name}</td>
                  <td>{pharmacy.tellNum}</td>
                  <td>{pharmacy.postNum}</td>
                  <td>{pharmacy.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">검색 결과가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </ContentLayout>
    </>
  );
};
export default Pharmacy;
