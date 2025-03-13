package com.kh.healthcare.pharmacy;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


        Map<String, Object> result = service.searchPharmacies(city, district, dong, searchType, keyword, page, size);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search/{no}")
    public PharmacyVo pharmacyVo (@PathVariable String no){
        return service.getService(no);
    }

}
