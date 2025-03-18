package com.kh.healthcare.hospital;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/hospital")
@Slf4j
public class HospitalController {

    private final HospitalService service;


    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchHospitals(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String dong,
            @RequestParam(required = false) String hospitalType, // 병원 유형 선택 가능
            @RequestParam(required = false) String searchType,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "200") int size) {

        // 기존 검색어가 없을 경우, 동/시/구 정보를 자동 검색어로 설정
        if ((keyword == null || keyword.isEmpty()) && (searchType == null || searchType.isEmpty())) {
            keyword = (dong != null && !dong.isEmpty()) ? dong
                    : (district != null && !district.isEmpty()) ? district
                    : (city != null && !city.isEmpty()) ? city
                    : null;
            searchType = "address"; // 기본 검색 타입을 "주소"로 설정
        }

        Map<String, Object> result = service.searchHospitals(city, district, dong, hospitalType, searchType, keyword, page, size);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search/{no}")
    public HospitalVo hospitalVo (@PathVariable String no){
        return service.getService(no);
    }

}