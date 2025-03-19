import React, { useEffect, useState, useRef } from 'react';
import Title from '../../../util/Title';
import { setSelection } from '../../../../redux/selectSlice';
import styled from 'styled-components';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';
import Table from '../../../util/Table';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../../util/SearchBar';
import Pagination from '../../../util/Pagination';
import { resetPaging, setTotalCount } from '../../../../redux/pagingSlice';
import { BASE_URL } from '../../../services/config';
import Modal from '../../../util/Modal';

import { close, open } from '../../../../redux/modalSlice';

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

const BottomDiv = styled.div`
  margin-top: 25px;
  margin-bottom: 35px;
`;

//모달 위치 조절용
const ModalTt = styled.div`
  margin-left: -120px;
  margin-top: -100px;
`;

const Pharmacy = () => {
  const dispatch = useDispatch();
  const boardType = 'pharmacy';

  // 상태값 정의
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [dongs, setDongs] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedDong, setSelectedDong] = useState(null);
  const [searchType, setSearchType] = useState('');
  const [keyword, setKeyword] = useState('');
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentPage = useSelector((state) => state.paging[boardType]?.currentPage || 1);
  const boardLimit = useSelector((state) => state.paging[boardType]?.boardLimit || 12);

  //지도
  const [isOpen, setIsOpen] = useState(false);
  //지도
  const [pharmacyM, setPharmacyM] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedNo, setSelectedNo] = useState(null);

  // 초기 페이징 상태 리셋
  useEffect(() => {
    dispatch(resetPaging({ boardType }));
  }, []);

  useEffect(() => {
    handleSearch(); // 초기 로딩 시 검색 실행
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/api/location/cities`)
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetch(`${BASE_URL}/api/location/districts/${selectedCity}`)
        .then((res) => res.json())
        .then((data) => setDistricts(data))
        .catch(() => {});
    } else {
      setDistricts([]);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`${BASE_URL}/api/location/dongs/${selectedDistrict}`)
        .then((res) => res.json())
        .then((data) => setDongs(data))
        .catch(() => {});
    } else {
      setDongs([]);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  // 검색 실행
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

      const requestUrl = `${BASE_URL}/api/pharmacy/search?searchType=${finalSearchType}&keyword=${encodeURIComponent(
        searchKeyword
      )}&page=${currentPage}&size=${boardLimit}`;

      const response = await fetch(requestUrl);
      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }
      const data = await response.json();

      // `data.totalCount`가 존재하면 사용하고, 없으면 가져온 데이터 개수 사용
      dispatch(setTotalCount({ boardType: 'pharmacy', totalCount: data.totalElements || data.pharmacies.length }));

      setPharmacies(data.pharmacies || []);
    } catch (error) {
      setPharmacies([]);
    }
    setLoading(false);
  };

  // 검색어 업데이트 핸들러
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // 검색어 초기화 핸들러
  const handleClearKeyword = () => {
    setKeyword('');
  };

  //시군구 고르면 자동으로 검색
  useEffect(() => {
    if (selectedCity || selectedDistrict || selectedDong) {
      handleSearch();
    }
  }, [selectedCity, selectedDistrict, selectedDong]);

  const handleChange = (e) => {
    setInputData((props) => {
      return {
        ...props,
        [e.target.name]: e.target.value,
      };
    });
  };
  const initialInputData = {
    no: '',
    name: '',
    address: '',
    tell_num: '',
    post_num: '',
    location_x: '',
    location_y: '',
  };

  const [inputData, setInputData] = useState(initialInputData);
  const mapRef = useRef(null);
  const fetchPharmacys = async (no) => {
    try {
      const response = await fetch(`${BASE_URL}/api/pharmacy/search/${no}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data) setPharmacyM(data); // 약국 정보 저장
    } catch (error) {}
  };

  useEffect(() => {
    if (isOpen && selectedNo) {
      fetchPharmacys(selectedNo);
    }
  }, [isOpen, selectedNo]);

  // 네이버 지도 API 로드
  useEffect(() => {
    if (!window.naver) {
      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_API_ID}`;
      script.async = true;
      script.onload = () => {
        setIsMapLoaded(true);
      };
      document.head.appendChild(script);
    } else {
      setIsMapLoaded(true);
    }
  }, []);

  // 네이버 지도 생성 (pharmacyM 값이 있을 때 실행)
  useEffect(() => {
    if (!pharmacyM || !pharmacyM.locationX || !pharmacyM.locationY) {
      return;
    }

    if (isMapLoaded && window.naver && mapRef.current) {
      const location = new window.naver.maps.LatLng(pharmacyM.locationY, pharmacyM.locationX);

      const map = new window.naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
      });

      new window.naver.maps.Marker({
        position: location,
        map,
      });
    }
  }, [pharmacyM, isMapLoaded]);

  return (
    <>
      <Title>의료기관 찾기</Title>
      <NaviContainer>
        <Navi target="hospital" tag={'병원'} />
        <Navi target="pharmacy" tag={'약국'} />
        <Navi target="publichealthcenter" tag={'보건소'} />
      </NaviContainer>

      <ContentLayout>
        <ModalTt>
          <>
            <Modal title="약국" width={700} ml={660}>
              {pharmacyM ? (
                <>
                  <h4>{pharmacyM.name} </h4>
                  <h4>{pharmacyM.address}</h4>
                  <h4>
                    전화번호: {pharmacyM.tellNum} | 우편번호: {pharmacyM.postNum}
                  </h4>
                </>
              ) : (
                <p>약국 정보를 불러오는 중...</p>
              )}
              <div
                ref={mapRef}
                style={{
                  width: '600px',
                  height: '400px',
                  marginBottom: '30px',
                  marginLeft: '15px',
                  background: '#eee',
                }}
              ></div>
            </Modal>
          </>
        </ModalTt>
        <SearchDiv>
          <SelectBox width="120px" onChange={(e) => setSelectedCity(parseInt(e.target.value, 10))}>
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

          {/* 동 선택 */}
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

          <SelectBox value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="">검색 조건 선택</option>
            <option value="name">약국명</option>
            <option value="address">주소</option>
            <option value="tellNum">전화번호</option>
            <option value="postNum">우편번호</option>
          </SelectBox>

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
            {pharmacies.map((pharmacy, idx) => (
              <tr
                key={idx}
                onClick={() => {
                  setSelectedNo(pharmacy.no);
                  setInputData({
                    no: pharmacy.no,
                    name: pharmacy.name,
                    address: pharmacy.address,
                    tell_num: pharmacy.tell_num,
                    post_num: pharmacy.post_num,
                    location_x: pharmacy.location_x,
                    location_y: pharmacy.location_y,
                  });
                  fetchPharmacys(pharmacy.no);
                  setIsOpen(true);
                  dispatch(open({ title: '약국', value: 'block' }));
                }}
              >
                <td width="150px">{pharmacy.name}</td>
                <td width="110px">{pharmacy.tellNum}</td>
                <td width="60px">{pharmacy.postNum}</td>
                <td>{pharmacy.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <BottomDiv>
          <Pagination boardType={boardType}></Pagination>
        </BottomDiv>
      </ContentLayout>
    </>
  );
};

export default Pharmacy;
