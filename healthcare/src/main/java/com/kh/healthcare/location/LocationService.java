package com.kh.healthcare.location;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationMapper mapper;


    public List<DistrictVo> getDistrictsByCity(int cityNo, String cityName) {
        return mapper.getDistrictsByCity(cityNo, cityName);
    }

    public List<DongVo> getDongsByDistrict(Long districtNo, String districtName) {
        return mapper.getDongsByDistrict(districtNo , districtName);
    }

    public List<CityVo> getCities() {
        List<CityVo> cities = mapper.getCities();
        return cities;
    }

}
