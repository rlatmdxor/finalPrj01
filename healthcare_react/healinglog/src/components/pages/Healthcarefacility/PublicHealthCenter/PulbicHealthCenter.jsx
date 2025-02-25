import React, { useEffect, useState, useRef } from 'react';
import Title from '../../../util/Title';
import { setSelection } from '../../../../redux/selectSlice';
import styled, { ThemeProvider, useTheme } from 'styled-components';
import Btn from '../../../util/Btn';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';
import Table from '../../../util/Table';
import { useDispatch, useSelector } from 'react-redux';
import { resetPaging, setTotalCount } from '../../../../redux/pagingSlice';
import SearchBar from '../../../util/SearchBar';
import Pagination from '../../../util/Pagination';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 400px;
  top: 20px;
  left: 40px;
  grid-template-columns: 2fr 2fr 3fr;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: end;

  margin-bottom: 35px;
  pointer-events: auto; /* ✅ 버튼 클릭을 활성화 */
  z-index: 10;
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

const PulbicHealthCenter = () => {
  const dispatch = useDispatch();

  const url = 'http://127.0.0.1/api/phc/list';

  const [fullData, setFullData] = useState([]); // 전체 데이터 저장
  const [pagedData, setPagedData] = useState([]); // 페이징된 데이터

  const boardType = 'phc';

  const [dataVoList, setVoList] = useState([]);
  const currentPage = useSelector((state) => state.paging[boardType]?.currentPage || 1);
  const boardLimit = useSelector((state) => state.paging[boardType]?.boardLimit || 12);
  const offset = (currentPage - 1) * boardLimit;

  const [cities, setCities] = useState([]); // 도시 리스트
  const [districts, setDistricts] = useState([]); // 선택된 도시의 구 리스트
  const [dongs, setDongs] = useState([]); // 선택된 구의 동 리스트

  const [selectedCity, setSelectedCity] = useState(null); // 선택된 도시 ID
  const [selectedCityNo, setSelectedCityNo] = useState(null); // 도시 번호 (숫자)
  const [selectedDistrict, setSelectedDistrict] = useState(null); // 선택된 구 ID
  const [selectedDistrictNo, setSelectedDistrictNo] = useState(null); // 선택된 구 ID
  const [selectedDong, setSelectedDong] = useState(null); // 선택된 동 ID

  const [searchField, setSearchField] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const theme = useTheme();
  const searchValueRef = useRef(''); // ✅ 최신 검색어 저장용

  // 공통 fetch 함수
  const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`2HTTP 오류 발생! 상태 코드: ${response.status}`);
      }

      const data = await response.json();

      setData([...data]); // ✅ 새로운 배열을 생성해서 상태 변경 강제 적용
    } catch (error) {
      setData([]); // 오류 발생 시 빈 배열 반환
    }
  };

  // 1. CITY 데이터 가져오기
  useEffect(() => {
    fetchData('http://127.0.0.1:80/api/location/cities', setCities);
  }, []);

  // 2. 선택된 CITY에 따라 DISTRICT 데이터 가져오기
  useEffect(() => {
    if (selectedCity) {
      fetchData(`http://127.0.0.1:80/api/location/districts/${selectedCity}`, setDistricts);
      setDongs([]); // 도시 변경 시 동 초기화
    } else {
      setDistricts([]);
      setDongs([]);
    }
  }, [selectedCity]);

  // 3. 선택된 DISTRICT에 따라 DONG 데이터 가져오기
  useEffect(() => {
    if (selectedDistrict) {
      fetchData(`http://127.0.0.1:80/api/location/dongs/${selectedDistrict}`, setDongs);
    } else {
      setDongs([]);
    }
  }, [selectedDistrict]);

  //실험

  useEffect(() => {
    fetchData(url, setFullData);
  }, []);

  useEffect(() => {
    if (selectedCityNo) {
      const requestUrl = `http://127.0.0.1:80/api/location/districts/${selectedCityNo}`;
      fetchData(requestUrl, setDistricts);
      setDongs([]); // ✅ 도시 변경 시 동 초기화
    } else {
      setDistricts([]);
      setDongs([]);
    }
  }, [selectedCityNo]);

  useEffect(() => {
    if (selectedCity) {
      const searchUrl = `http://127.0.0.1:80/api/phc/search?city=${encodeURIComponent(selectedCity)}`;

      fetch(searchUrl)
        .then((res) => res.json())
        .then((data) => {
          dispatch(resetPaging({ boardType }));
          setPagedData(data.slice(0, 12));
          console.log('시티시티시티', data);
        })
        .catch((error) => console.error('3데이터 가져오기 오류:', error));
    } else {
      setPagedData([]);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      // const searchUrl = `http://127.0.0.1:80/api/phc/search?district=${encodeURIComponent(selectedDistrict)}`;
      const searchUrl = `http://127.0.0.1:80/api/phc/search?district=${encodeURIComponent(
        selectedDistrict
      )}&page=${currentPage}&limit=${boardLimit}`;
      fetch(searchUrl)
        .then((res) => res.json())
        .then((data) => {
          setPagedData(data);
          dispatch(setTotalCount({ boardType, totalCount: data.totalCount }));
          console.log('비둘기비둘기비둘기비둘기', data);
        })
        .catch((error) => console.error('4데이터 가져오기 오류:', error));
    } else {
      setPagedData([]);
    }
  }, [selectedDistrict, currentPage, boardLimit]);

  useEffect(() => {
    if (searchField && searchValue) {
      const searchUrl = `http://127.0.0.1:80/api/phc/search?searchField=${encodeURIComponent(
        searchField
      )}&searchValue=${encodeURIComponent(searchValue)}`;

      fetch(searchUrl)
        .then((res) => res.json())
        .then((data) => {
          setPagedData(data);
        })
        .catch((error) => console.error('📌 데이터 가져오기 오류:', error));
    } else {
      setPagedData([]); // 검색 조건이 없으면 데이터 초기화
    }
  }, [searchField, searchValue]); // ✅ `searchField`와 `searchValue`가 변경될 때 실행

  const handleSearch = (query) => {
    const trimmedValue = query.trim();

    if (!trimmedValue) {
      console.warn('🚨 검색어를 입력하세요!');
      return;
    }

    const searchUrl = `http://127.0.0.1:80/api/phc/search?searchField=${encodeURIComponent(
      searchField
    )}&searchValue=${encodeURIComponent(trimmedValue)}`;

    console.log('🔎 최종 검색 URL:', searchUrl);

    fetch(searchUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log('✅ 검색 결과 데이터:', data);
        setPagedData(data); // ✅ 검색 결과 업데이트
      })
      .catch((error) => {
        console.error('🚨 검색 데이터 가져오기 오류:', error);
        setPagedData([]);
      });
  };

  // 테이블 페이징 처리
  useEffect(() => {
    setPagedData(fullData.slice(offset, offset + boardLimit));
  }, [fullData, currentPage, boardLimit]);

  useEffect(() => {
    dispatch(resetPaging({ boardType }));
  }, []);

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length > 0) {
          dispatch(setTotalCount({ boardType, totalCount: data.length }));
          const pagedData = data.slice(offset, offset + boardLimit);
          setVoList(pagedData);
        } else {
          dispatch(resetPaging({ boardType }));
          setVoList([]); // 데이터가 없을 경우 초기화
        }
      })
      .catch((error) => console.error('데이터 불러오기 실패:', error));
  }, [currentPage, boardLimit]); // currentPage, boardLimit 변경 시 실행

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
            width="130px"
            onChange={(e) => {
              const selectedCityNo = parseInt(e.target.value, 10); // ✅ 숫자로 변환
              const selectedCityObj = cities.find((city) => city.no === selectedCityNo);
              const selectedCityName = selectedCityObj ? selectedCityObj.cityName : '';

              setSelectedCity(selectedCityName); // ✅ "서울특별시" 저장
              setSelectedCityNo(selectedCityNo); // ✅ 11 저장
              setSelectedDistrict(null); // ✅ 군/구 초기화
              setSelectedDistrictNo(null);
              setSelectedDong(null); // ✅ 동 초기화
              setDongs([]); // ✅ 동 데이터 초기화
              dispatch(setSelection({ label: 'city', value: selectedCityNo }));
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
            width="130px"
            disabled={!selectedCityNo} // ✅ 도시 선택 후 활성화
            onChange={(e) => {
              const selectedDistrictNo = parseInt(e.target.value, 10);
              const selectedDistrictObj = districts.find((district) => district.no === selectedDistrictNo);
              const selectedDistrictName = selectedDistrictObj ? selectedDistrictObj.districtName : '';
              setSelectedDistrict(selectedDistrictName);
              setSelectedDistrictNo(selectedDistrictNo);
              setSelectedDong(null); // ✅ 군/구 변경 시 동 초기화
              dispatch(setSelection({ label: 'district', value: selectedDistrictNo }));
            }}
          >
            <option value="">군/구 선택</option>
            {districts.map((district, idx) => (
              <option key={idx} value={district.no}>
                {district.districtName}
              </option>
            ))}
          </SelectBox>
          <SelectBox onChange={(e) => setSearchField(e.target.value)}>
            <option value="">검색 조건 선택</option>
            <option value="name">이름</option>
            <option value="address">주소</option>
            <option value="tellNum">전화번호</option>
            <option value="postNum">우편번호</option>
          </SelectBox>

          <SearchBar
            w={300}
            h={40}
            mb={10}
            onSearch={(query) => {
              console.log('🔍 SearchBar에서 검색 실행됨:', query); // ✅ 입력된 검색어 확인
              setSearchValue(query); // ✅ 상태 업데이트
              searchValueRef.current = query; // ✅ 최신 검색어 저장
            }}
          />

          {/* <BtnContainer>
            <Btn
              mt={'50'}
              mr={'50'}
              mb={'20'}
              str={'검색'}
              c={'#FF7F50'}
              fc={'white'}
              f={() => {
                console.log('🔎 버튼 클릭 시 검색어:', searchValue); // ✅ 버튼 클릭 시 최신 검색어 출력
                handleSearch(searchValueRef.current);
              }}
            />
          </BtnContainer> */}
        </SearchDiv>

        <Table>
          <thead>
            <tr>
              <th>보건소명</th>
              <th>전화번호</th>
              <th>우편번호</th>
              <th>주소</th>
            </tr>
          </thead>
          <tbody>
            {/* 여기에 API에서 불러온 데이터를 넣어야 함 */}
            {pagedData.map((vo, index) => {
              return (
                <tr key={vo.no || index}>
                  <td>{vo.name}</td>
                  <td>{vo.tellNum}</td>
                  <td>{vo.postNum}</td>
                  <td>{vo.address}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div>
          <Pagination boardType={boardType} />
        </div>
      </ContentLayout>
    </>
  );
};
export default PulbicHealthCenter;
