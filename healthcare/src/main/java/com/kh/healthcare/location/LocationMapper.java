package com.kh.healthcare.location;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface LocationMapper {

    @Select("""
            SELECT NO, CITY_NAME FROM CITY ORDER BY NO
            """)
    List<CityVo> getCities(); // 모든 도시 가져오기

    @Select("""
            SELECT NO, DISTRICT_NAME, CITY_NO FROM DISTRICT WHERE CITY_NO = #{cityNo} ORDER BY DISTRICT_NAME
            """)
    List<DistrictVo> getDistrictsByCity(int cityNo ,String cityName); // 특정 도시의 구 가져오기

    @Select("""
            SELECT NO, DONG_NAME, DISTRICT_NO FROM DONG WHERE DISTRICT_NO = #{districtNo} ORDER BY DONG_NAME
            """)
    List<DongVo> getDongsByDistrict(Long districtNo ,String districtName); // 특정 구의 동 가져오기
}
