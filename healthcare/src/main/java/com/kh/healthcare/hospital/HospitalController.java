package com.kh.healthcare.hospital;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
            @RequestParam(required = false) String hospitalType,
            @RequestParam(required = false) String searchType,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int size) {

        log.info("🔍 검색 요청: city={}, district={}, dong={}, hospitalType={}, searchType={}, keyword={}, page={}, size={}",
                city, district, dong, hospitalType, searchType, keyword, page, size);

        Map<String ,Object> result = service.searchHospitals(city, district, dong, hospitalType, searchType, keyword, page, size);

        log.info("🔍 검색 결과: {}", result);
        return ResponseEntity.ok(result);
    }
}