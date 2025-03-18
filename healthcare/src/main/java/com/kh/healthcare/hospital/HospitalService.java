package com.kh.healthcare.hospital;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HospitalService {

    private final HospitalMapper mapper;


    public Map<String, Object> searchHospitals(String city, String district, String dong, String hospitalType, String searchType, String keyword, int page, int size) {
        int offset = (page - 1) * size; // OFFSET 계산

        // 검색어가 없을 경우, 동 → 구 → 시를 자동 검색어로 설정
        if ((keyword == null || keyword.isEmpty())) {
            if (searchType == null || searchType.isEmpty()) {
                searchType = "address"; // 기본 검색 유형
            }
            keyword = (dong != null && !dong.isEmpty()) ? dong
                    : (district != null && !district.isEmpty()) ? district
                    : (city != null && !city.isEmpty()) ? city
                    : "";
        }

        // 병원 목록 조회 (과 선택이 없어도 지역 필터 유지)
        List<HospitalVo> hospitals = mapper.searchHospitals(city, district, dong, hospitalType, searchType, keyword, size, offset);

        // 전체 데이터 개수 조회
        int totalElements = mapper.countHospitals(city, district, dong, hospitalType, searchType, keyword);

        // 응답 데이터 구성
        Map<String, Object> response = new HashMap<>();
        response.put("totalElements", totalElements);
        response.put("totalCount", (int) Math.ceil((double) totalElements / size));
        response.put("currentPage", page);
        response.put("pageSize", size);
        response.put("hospitals", hospitals);
        return response;
    }

    public HospitalVo getService(String no) {
        return mapper.findByNo(no);
    }
}