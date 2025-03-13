package com.kh.healthcare.pharmacy;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PharmacyService {

    private final PharmacyMapper mapper;

    public Map<String, Object> searchPharmacies(String city, String district,String dong, String searchType, String keyword, int page, int size) {
        int offset = (page - 1) * size; // OFFSET 계산

        // 약국 목록 조회
        List<PharmacyVo> pharmacies = mapper.searchPharmacies(city, district, dong, searchType, keyword, size, offset);

        // 전체 데이터 개수 조회
        int totalElements = mapper.countPharmacies(city, district, dong, searchType, keyword);

        // 응답 데이터 구성
        Map<String, Object> response = new HashMap<>();
        response.put("totalElements", totalElements); // 전체 개수
        response.put("totalCount", (int) Math.ceil((double) totalElements / size)); // 총 페이지 수
        response.put("currentPage", page); // 현재 페이지
        response.put("pageSize", size); // 한 페이지당 개수
        response.put("pharmacies", pharmacies); // 약국 리스트
        return response;
    }

    public PharmacyVo getService(String no){
        return mapper.findByNo(no);
    }

}
