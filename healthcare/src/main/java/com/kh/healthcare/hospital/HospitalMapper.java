package com.kh.healthcare.hospital;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface HospitalMapper {




    @Select("""
        <script>
            SELECT NAME, TELL_NUM, POST_NUM, ADDRESS, HOSPITAL_TYPE
            FROM (
                SELECT H.*, ROW_NUMBER() OVER (ORDER BY NAME ASC) AS RN
                FROM HOSPITAL H
                WHERE 1=1

                <!-- ✅ 지역 필터 유지 -->
                <if test='city != null and city != ""'>
                    AND CITY = #{city}
                </if>
                <if test='district != null and district != ""'>
                    AND DISTRICT = #{district}
                </if>
                <if test='dong != null and dong != ""'>
                    AND DONG = #{dong}
                </if>

                <!-- ✅ 병원 유형 필터링 (과가 선택되지 않으면 필터링 X) -->
                <if test='hospitalType != null and hospitalType != ""'>
                    AND HOSPITAL_TYPE = #{hospitalType}
                </if>

                <!-- ✅ 검색 조건 적용 -->
                <if test='searchType != null and searchType != "" and keyword != null and keyword != ""'>
                    AND (
                        <choose>
                            <when test='searchType == "name"'>
                                NAME LIKE '%' || #{keyword} || '%'
                            </when>
                            <when test='searchType == "address"'>
                                ADDRESS LIKE '%' || #{keyword} || '%'
                            </when>
                            <when test='searchType == "tellNum"'>
                                TELL_NUM LIKE '%' || #{keyword} || '%'
                            </when>
                            <when test='searchType == "postNum"'>
                                POST_NUM LIKE '%' || #{keyword} || '%'
                            </when>
                        </choose>
                    )
                </if>
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
        SELECT COUNT(*)
        FROM HOSPITAL H
        WHERE 1=1

        <!-- ✅ 지역 필터 유지 -->
        <if test='city != null and city != ""'>
            AND H.CITY = #{city}
        </if>
        <if test='district != null and district != ""'>
            AND H.DISTRICT = #{district}
        </if>
        <if test='dong != null and dong != ""'>
            AND H.DONG = #{dong}
        </if>

        <!-- ✅ 병원 유형 필터링 (과가 선택되지 않으면 필터링 X) -->
        <if test='hospitalType != null and hospitalType != ""'>
            AND H.HOSPITAL_TYPE = #{hospitalType}
        </if>

        <!-- ✅ 검색 조건 적용 -->
        <if test='searchType != null and searchType != "" and keyword != null and keyword != ""'>
            AND (
                <choose>
                    <when test='searchType == "name"'>
                        H.NAME LIKE '%' || #{keyword} || '%'
                    </when>
                    <when test='searchType == "address"'>
                        H.ADDRESS LIKE '%' || #{keyword} || '%'
                    </when>
                    <when test='searchType == "tellNum"'>
                        H.TELL_NUM LIKE '%' || #{keyword} || '%'
                    </when>
                    <when test='searchType == "postNum"'>
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

}