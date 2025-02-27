package com.kh.healthcare.location;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/location")
public class LocationController {

    private final LocationService service;

    @GetMapping("/cities")
    public ResponseEntity<List<CityVo>> getCities() {
        return ResponseEntity.ok(service.getCities());
    }

    @GetMapping("/districts/{cityNo}")
    public ResponseEntity<List<DistrictVo>> getDistrictsByCity(@PathVariable int cityNo,String cityName) {
        return ResponseEntity.ok(service.getDistrictsByCity(cityNo, cityName));
    }

    @GetMapping("/dongs/{districtNo}")
    public ResponseEntity<List<DongVo>> getDongsByDistrict(@PathVariable Long districtNo ,String districtName) {
        return ResponseEntity.ok(service.getDongsByDistrict(districtNo ,districtName));
    }

}
