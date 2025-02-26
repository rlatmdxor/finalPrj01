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

        // 병원 목록 조회
        List<HospitalVo> hospitals = mapper.searchHospitals(city, district, dong, hospitalType, searchType, keyword, size, offset);

        // 전체 데이터 개수 조회
        int totalElements = mapper.countHospitals(city, district, dong, hospitalType, searchType, keyword);

        // 응답 데이터 구성
        Map<String, Object> response = new HashMap<>();
        response.put("totalElements", totalElements); // 전체 개수
        response.put("totalCount", (int) Math.ceil((double) totalElements / size)); // 총 페이지 수
        response.put("currentPage", page); // 현재 페이지
        response.put("pageSize", size); // 한 페이지당 개수
        response.put("hospitals", hospitals); // 병원 리스트
        return response;
    }
}