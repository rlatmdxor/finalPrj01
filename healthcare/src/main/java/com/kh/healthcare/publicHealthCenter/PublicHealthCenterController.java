package com.kh.healthcare.publicHealthCenter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/phc")
@Slf4j
public class PublicHealthCenterController {

    private final PublicHealthCenterService service;

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchPhcs(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String searchType,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "200") int size) {

        // ✅ 검색어가 없을 경우, "시/구" 정보를 자동 검색어로 설정
        if ((searchType == null || searchType.isEmpty()) || (keyword == null || keyword.isEmpty())) {
            keyword = (district != null && !district.isEmpty()) ? district
                    : (city != null && !city.isEmpty()) ? city
                    : null;
            searchType = "address"; // 기본 검색 타입을 "주소"로 설정
        }

        Map<String, Object> result = service.searchPhcs(city, district, searchType, keyword, page, size);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search/{no}")
    public PublicHealthCenterVo publicHealthCenterVo (@PathVariable String no){
        return service.getService(no);

    }



}
