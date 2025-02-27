package com.kh.healthcare.publicHealthCenter;

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
@RequestMapping("/api/phc")
@Slf4j
public class PublicHealthCenterController {

    private final PublicHealthCenterService service;

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchPhcs(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String dong,
            @RequestParam String searchType,
            @RequestParam String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "200") int size) {




        Map<String, Object> result = service.searchPhcs(city, district, dong, searchType, keyword, page, size);
        return ResponseEntity.ok(result);
    }





}
