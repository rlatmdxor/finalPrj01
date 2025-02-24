package com.kh.healthcare.publicHealthCenter;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface PublicHealthCenterMapper {

    @Select("""
            SELECT * FROM PUBLIC_HEALTH_CENTER
            """)
    List<PublicHealthCenterVo> list();

    @Select("""
    <script>
        SELECT * FROM PUBLIC_HEALTH_CENTER
        WHERE 1=1
        <if test="city != null and city != ''">
            AND CITY = #{city}
        </if>
        <if test="district != null and district != ''">
            AND (
                DISTRICT = #{district}
                OR (REGEXP_SUBSTR(ADDRESS, '([가-힣]+구)') IS NOT NULL AND REGEXP_SUBSTR(ADDRESS, '([가-힣]+구)') = #{district})
            )
        </if>
        <if test="dong != null and dong != ''">
            AND (
                REGEXP_SUBSTR(ADDRESS, '([가-힣]+동)') = #{dong}
                OR REGEXP_REPLACE(REGEXP_SUBSTR(ADDRESS, '(([^,]*동)'), '[()]', '') = #{dong}
            )
        </if>
    </script>
""")
    List<PublicHealthCenterVo> searchPublicHealthCenters(
            @Param("city") String city,
            @Param("district") String district,
            @Param("dong") String dong,
            @Param("searchField") String searchField,
            @Param("searchValue") String searchValue
    );

}

//        <if test="dong != null and dong != ''">
//            AND REGEXP_REPLACE(REGEXP_SUBSTR(ADDRESS, '\(([^,]*동)'), '[()]', '') = #{dong}
//        </if>

