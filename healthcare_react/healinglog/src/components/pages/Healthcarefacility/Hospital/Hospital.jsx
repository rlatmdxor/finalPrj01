import React, { useEffect, useRef, useState } from 'react';
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
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
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

const Hospital = () => {
  const dispatch = useDispatch();
  const boardType = 'hospital';

  // 상태값 정의
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [dongs, setDongs] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedDong, setSelectedDong] = useState(null);
  const [searchType, setSearchType] = useState('name');
  const [keyword, setKeyword] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [hospitalType, setHospitalType] = useState('');
  const [selectedHospitalType, setSelectedHostpitalType] = useState([]);

  const [loading, setLoading] = useState(false);

  const currentPage = useSelector((state) => state.paging[boardType]?.currentPage || 1);
  const boardLimit = useSelector((state) => state.paging[boardType]?.boardLimit || 12);

  //지도
  const [isOpen, setIsOpen] = useState(false); // ✅ 모달 상태 추가
  //지도
  const [hospitalM, setHospitalM] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedNo, setSelectedNo] = useState(null);

  // 초기 페이징 상태 리셋
  useEffect(() => {
    dispatch(resetPaging({ boardType }));
  }, []);

  useEffect(() => {
    handleSearch(); // 초기 로딩 시 검색 실행
  }, []);

  // 시 데이터 가져오기
  useEffect(() => {
    fetch(`${BASE_URL}/api/location/cities`)
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((error) => console.error('시 데이터 로드 실패:', error));
  }, []);

  // 군/구 데이터 가져오기
  useEffect(() => {
    if (selectedCity) {
      fetch(`${BASE_URL}/api/location/districts/${selectedCity}`)
        .then((res) => res.json())
        .then((data) => setDistricts(data))
        .catch((error) => console.error('구 데이터 로드 실패:', error));
    } else {
      setDistricts([]);
    }
  }, [selectedCity]);

  // 동 데이터 가져오기
  useEffect(() => {
    if (selectedDistrict) {
      fetch(`${BASE_URL}/api/location/dongs/${selectedDistrict}`)
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
      let finalHospitalType = hospitalType.trim(); // 병원과 값
      let finalSearchType = searchType.trim();

      // 검색 키워드가 없고 시/구/동도 선택되지 않았을 경우
      if (!searchKeyword && !selectedCity && !selectedDistrict && !selectedDong && finalHospitalType) {
        finalSearchType = ''; // 검색 유형을 없애고 병원과(hospitalType)만으로 검색
      }

      // 검색 키워드가 없을 경우, 시/구/동 정보를 자동으로 검색어로 설정
      if (!searchKeyword) {
        const cityName = cities.find((c) => c.no === selectedCity)?.cityName || '';
        const districtName = districts.find((d) => d.no === selectedDistrict)?.districtName || '';
        const dongName = dongs.find((d) => d.no === selectedDong)?.dongName || '';

        searchKeyword = dongName || districtName || cityName;
        finalSearchType = searchKeyword ? 'address' : ''; // 주소 검색 또는 빈 값 유지
      }

      // API 요청 URL
      const requestUrl = `${BASE_URL}/api/hospital/search?hospitalType=${encodeURIComponent(
        finalHospitalType
      )}&searchType=${finalSearchType}&keyword=${encodeURIComponent(
        searchKeyword
      )}&page=${currentPage}&size=${boardLimit}`;

      const response = await fetch(requestUrl);
      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }
      const data = await response.json();

      // 검색 결과를 상태값으로 저장
      dispatch(setTotalCount({ boardType: 'hospital', totalCount: data.totalElements || data.hospitals.length }));
      setHospitals(data.hospitals || []);
    } catch (error) {
      console.error('❌ 검색 오류:', error);
      setHospitals([]);
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
    if (selectedCity || selectedDistrict || selectedDong || hospitalType) {
      handleSearch();
    }
  }, [selectedCity, selectedDistrict, selectedDong, hospitalType]);

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
  const fetchHospitals = async (no) => {
    try {
      const response = await fetch(`${BASE_URL}/api/hospital/search/${no}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data) setHospitalM(data); // 약국 정보 저장
    } catch (error) {
      console.error('약국 데이터 불러오기 오류:', error);
    }
  };

  useEffect(() => {
    if (isOpen && selectedNo) {
      fetchHospitals(selectedNo);
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

  //  네이버 지도 생성 (hospitalM 값이 있을 때 실행)
  useEffect(() => {
    if (!hospitalM || !hospitalM.locationX || !hospitalM.locationY) {
      console.warn('위치 정보가 올바르지 않음:', hospitalM);
      return;
    }

    if (isMapLoaded && window.naver && mapRef.current) {
      const location = new window.naver.maps.LatLng(hospitalM.locationY, hospitalM.locationX);

      const map = new window.naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
      });

      new window.naver.maps.Marker({
        position: location,
        map,
      });
    }
  }, [hospitalM, isMapLoaded]);

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
            <Modal title="병원" width={700} ml={660}>
              {hospitalM ? (
                <>
                  <h4>
                    {hospitalM.name} | 별점 : {hospitalM.rating}
                  </h4>
                  <h4>{hospitalM.address}</h4>
                  <h4>
                    전화번호: {hospitalM.tellNum} | 우편번호: {hospitalM.postNum}
                  </h4>
                </>
              ) : (
                <p>병원 정보를 불러오는 중...</p>
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

          {/* 수정중임 병원종류 선택 */}
          <SelectBox value={hospitalType} onChange={(e) => setHospitalType(e.target.value)}>
            <option value="">과 선택</option>
            <option value="내과">내과</option>
            <option value="이비인후과">이비인후과</option>
            <option value="치과">치과</option>
            <option value="안과">안과</option>
            <option value="외과">외과</option>
            <option value="정형외과">정형외과</option>
            <option value="신경외과">신경외과</option>
            <option value="소아청소년과">소아청소년과</option>
            <option value="정신건강의학과">정신건강의학과</option>
            <option value="심장혈관흉부외과">심장혈관흉부외과</option>
            <option value="마취통증의학과">마취통증의학과</option>
            <option value="산부인과">산부인과</option>
            <option value="가정의학과">가정의학과</option>
            <option value="비뇨의학과">비뇨의학과</option>
            <option value="상급종합">상급종합</option>
          </SelectBox>

          <SelectBox value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="name">병원명</option>
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
              <th>병원명</th>
              <th>주소</th>
              {/* <th>진단과</th> */}
              <th>별점</th>
            </tr>
          </thead>

          <tbody style={{ fontSize: '10px', color: '#ffffff' }}>
            {hospitals.map((hospital, idx) => (
              <tr
                key={idx}
                onClick={() => {
                  setSelectedNo(hospital.no);
                  setInputData({
                    no: hospital.no,
                    name: hospital.name,
                    address: hospital.address,
                    tell_num: hospital.tell_num,
                    post_num: hospital.post_num,
                    location_x: hospital.location_x,
                    location_y: hospital.location_y,
                    rating: hospital.rating,
                  });
                  console.log(hospital.no);
                  fetchHospitals(hospital.no);
                  setIsOpen(true);
                  dispatch(open({ title: '병원', value: 'block' }));
                }}
              >
                <td width="195px">{hospital.name}</td>
                <td>{hospital.address}</td>
                {/* <td width="30px">{hospital.rating}</td> */}
                <td width="180px">
                  {[1, 2, 3, 4, 5].map((value) => {
                    const fullStar = hospital.rating >= value;
                    const halfStar = hospital.rating >= value - 0.5 && hospital.rating < value;

                    return fullStar ? (
                      <FaStar key={value} style={{ color: 'gold', fontSize: '24px', marginRight: '4px' }} />
                    ) : halfStar ? (
                      <FaStarHalfAlt key={value} style={{ color: 'gold', fontSize: '24px', marginRight: '4px' }} />
                    ) : (
                      <FaStar key={value} style={{ color: 'grey', fontSize: '24px', marginRight: '4px' }} />
                    );
                  })}
                </td>
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

export default Hospital;
