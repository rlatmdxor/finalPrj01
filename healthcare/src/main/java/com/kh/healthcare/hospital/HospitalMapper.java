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
                  SELECT H.NAME, H.TELL_NUM, H.POST_NUM, H.ADDRESS, H.HOSPITAL_TYPE,
                         ROW_NUMBER() OVER (ORDER BY H.NAME ASC) AS RN
                  FROM HOSPITAL H
                  WHERE 1=1
                  <!-- 시/구/동 검색 (없어도 검색 가능하도록 수정) -->
                  <if test="(city != null and city != '') or (district != null and district != '') or (dong != null and dong != '')">
                      <if test="city != null and city != ''">
                          AND H.CITY = #{city}
                      </if>
                      <if test="district != null and district != ''">
                          AND H.DISTRICT = #{district}
                      </if>
                      <if test="dong != null and dong != ''">
                          AND H.DONG = #{dong}
                      </if>
                  </if>

                  <!-- 병원과 검색 (시/구/동 없이도 검색 가능) -->
                  <if test="hospitalType != null and hospitalType != ''">
                      AND H.HOSPITAL_TYPE = #{hospitalType}
                  </if>

                  <!-- 검색 조건 추가 -->
                  <if test="searchType != null and searchType != '' and keyword != null and keyword != ''">
                      <choose>
                          <when test="searchType == 'name'">
                              AND H.NAME LIKE '%' || #{keyword} || '%'
                          </when>
                          <when test="searchType == 'address'">
                              AND H.ADDRESS LIKE '%' || #{keyword} || '%'
                          </when>
                          <when test="searchType == 'tellNum'">
                              AND H.TELL_NUM LIKE '%' || #{keyword} || '%'
                          </when>
                          <when test="searchType == 'postNum'">
                              AND H.POST_NUM LIKE '%' || #{keyword} || '%'
                          </when>
                      </choose>
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

            <!-- 시/구/동 검색 -->
            <if test='city != null and city != ""'>
                AND H.CITY = #{city}
            </if>
            <if test='district != null and district != ""'>
                AND H.DISTRICT = #{district}
            </if>
            <if test='dong != null and dong != ""'>
                AND H.DONG = #{dong}
            </if>

            <!-- 병원과 검색 -->
            <if test='hospitalType != null and hospitalType != ""'>
                AND H.HOSPITAL_TYPE = #{hospitalType}
            </if>

            <!-- 검색 조건 추가 -->
            <if test='searchType != null and searchType != "" and keyword != null and keyword != ""'>
                <choose>
                    <when test='searchType == "name"'>
                        AND H.NAME LIKE '%' || #{keyword} || '%'
                    </when>
                    <when test='searchType == "address"'>
                        AND H.ADDRESS LIKE '%' || #{keyword} || '%'
                    </when>
                    <when test='searchType == "tellNum"'>
                        AND H.TELL_NUM LIKE '%' || #{keyword} || '%'
                    </when>
                    <when test='searchType == "postNum"'>
                        AND H.POST_NUM LIKE '%' || #{keyword} || '%'
                    </when>
                </choose>
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