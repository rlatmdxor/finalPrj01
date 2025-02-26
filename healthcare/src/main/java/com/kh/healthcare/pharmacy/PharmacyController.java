package com.kh.healthcare.pharmacy;

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
@RequestMapping("api/pharmacy")
@Slf4j
public class PharmacyController {

    private final PharmacyService service;

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchPharmacies(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String dong,
            @RequestParam String searchType,
            @RequestParam String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "200") int size) {

        System.out.println("📡 받은 페이지: " + page);
        System.out.println("📡 받은 데이터 크기: " + size);


        Map<String, Object> result = service.searchPharmacies(city, district, dong, searchType, keyword, page, size);
        return ResponseEntity.ok(result);
    }


}
