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
            AND (
                CITY = #{city}
                OR (REGEXP_SUBSTR(ADDRESS, '([가-힣]+시)') IS NOT NULL AND REGEXP_SUBSTR(ADDRESS, '([가-힣]+시)') = #{city})
                OR (REGEXP_SUBSTR(ADDRESS, '([가-힣]+도)') IS NOT NULL AND REGEXP_SUBSTR(ADDRESS, '([가-힣]+도)') = #{city})
            )
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
            <if test="searchField != null and searchValue != null and searchValue != ''">
                AND
                <choose>
                    <when test="searchField == 'name'">
                        NAME LIKE '%' || #{searchValue} || '%'
                    </when>
                    <when test="searchField == 'address'">
                        ADDRESS LIKE '%' || #{searchValue} || '%'
                    </when>
                    <when test="searchField == 'tellNum'">
                        TELL_NUM LIKE '%' || #{searchValue} || '%'
                    </when>
                    <when test="searchField == 'postNum'">
                        POST_NUM LIKE '%' || #{searchValue} || '%'
                    </when>
                    <otherwise>
                        -- 검색 필드가 잘못 입력되었거나 없을 경우 필터링 없이 실행
                    </otherwise>
                </choose>
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