package com.kh.healthcare.hospital;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface HospitalMapper {
    @Select("""
    <script>
        SELECT NAME, TELL_NUM, POST_NUM, ADDRESS, HOSPITAL_TYPE, NO, LOCATION_X, LOCATION_Y, RATING
        FROM (
            SELECT H.NO, H.NAME, H.HOSPITAL_TYPE, H.CITY, H.DISTRICT, H.DONG, H.ADDRESS, 
                   H.TELL_NUM, H.POST_NUM, H.LOCATION_X, H.LOCATION_Y, 
                   NVL(AVG(RB.RATING), 0) AS RATING,  -- 병원별 평균 평점 (없으면 0)
                   ROW_NUMBER() OVER (ORDER BY H.NAME ASC) AS RN
            FROM HOSPITAL H
            LEFT JOIN REVIEW_BOARD RB ON H.NO = RB.HOSPITAL_NO
            WHERE 1=1
            
            <!-- 지역 필터 유지 -->
            <if test='city != null and city != ""'>
                AND H.CITY = #{city}
            </if>
            <if test='district != null and district != ""'>
                AND H.DISTRICT = #{district}
            </if>
            <if test='dong != null and dong != ""'>
                AND H.DONG = #{dong}
            </if>

            <!-- 병원 유형 필터링 -->
            <if test='hospitalType != null and hospitalType != ""'>
                AND H.HOSPITAL_TYPE = #{hospitalType}
            </if>

            <!-- 검색 조건 적용 -->
            <if test='searchType != null and searchType != "" and keyword != null and keyword != ""'>
                AND (
                    <choose>
                        <when test='searchType == "name"' >
                            H.NAME LIKE '%' || #{keyword} || '%'
                        </when>
                        <when test='searchType == "address"' >
                            H.ADDRESS LIKE '%' || #{keyword} || '%'
                        </when>
                        <when test='searchType == "tellNum"' >
                            H.TELL_NUM LIKE '%' || #{keyword} || '%'
                        </when>
                        <when test='searchType == "postNum"' >
                            H.POST_NUM LIKE '%' || #{keyword} || '%'
                        </when>
                    </choose>
                )
            </if>
            GROUP BY H.NO, H.NAME, H.HOSPITAL_TYPE, H.CITY, H.DISTRICT, H.DONG, H.ADDRESS, 
                     H.TELL_NUM, H.POST_NUM, H.LOCATION_X, H.LOCATION_Y
        )
        WHERE RN BETWEEN #{offset} + 1 AND #{offset} + #{size}
    </script>
""")
    List<HospitalVo> searchHospitals(
            @Param("city") String city,
            @Param("district") String district,
            @Param("dong") String dong,
            @Param("hospitalType") String hospitalType,
            @Param("searchType") String searchType,
            @Param("keyword") String keyword,
            @Param("size") int size,
            @Param("offset") int offset
    );


    @Select("""
    <script>
        SELECT COUNT(DISTINCT H.NO)  -- DISTINCT 추가하여 중복 카운트 방지
        FROM HOSPITAL H
        LEFT JOIN REVIEW_BOARD RB ON H.NO = RB.HOSPITAL_NO
        WHERE 1=1


        <if test='city != null and city != ""'>
            AND H.CITY = #{city}
        </if>
        <if test='district != null and district != ""'>
            AND H.DISTRICT = #{district}
        </if>
        <if test='dong != null and dong != ""'>
            AND H.DONG = #{dong}
        </if>

        <!-- 병원 유형 필터링 -->
        <if test='hospitalType != null and hospitalType != ""'>
            AND H.HOSPITAL_TYPE = #{hospitalType}
        </if>

        <!-- 검색 조건 적용 -->
        <if test='searchType != null and searchType != "" and keyword != null and keyword != ""'>
            AND (
                <choose>
                    <when test='searchType == "name"' >
                        H.NAME LIKE '%' || #{keyword} || '%'
                    </when>
                    <when test='searchType == "address"' >
                        H.ADDRESS LIKE '%' || #{keyword} || '%'
                    </when>
                    <when test='searchType == "tellNum"' >
                        H.TELL_NUM LIKE '%' || #{keyword} || '%'
                    </when>
                    <when test='searchType == "postNum"' >
                        H.POST_NUM LIKE '%' || #{keyword} || '%'
                    </when>
                </choose>
            )
        </if>
    </script>
""")
    int countHospitals(
            @Param("city") String city,
            @Param("district") String district,
            @Param("dong") String dong,
            @Param("hospitalType") String hospitalType,
            @Param("searchType") String searchType,
            @Param("keyword") String keyword
    );



    @Select("""
    SELECT H.NO, H.NAME, H.CITY, H.DISTRICT, H.DONG, H.ADDRESS, 
           H.TELL_NUM, H.POST_NUM, H.LOCATION_X, H.LOCATION_Y,
           ROUND(NVL(AVG(RB.RATING), 0), 2) AS RATING  -- 병원별 평균 별점 (없으면 0)
    FROM HOSPITAL H
    LEFT JOIN REVIEW_BOARD RB ON H.NO = RB.HOSPITAL_NO
    WHERE H.NO = #{no}
    GROUP BY H.NO, H.NAME, H.CITY, H.DISTRICT, H.DONG, H.ADDRESS, 
             H.TELL_NUM, H.POST_NUM, H.LOCATION_X, H.LOCATION_Y
""")
    HospitalVo findByNo(String no);
}