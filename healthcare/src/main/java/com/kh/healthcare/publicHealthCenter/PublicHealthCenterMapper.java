package com.kh.healthcare.publicHealthCenter;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface PublicHealthCenterMapper {

    @Select("""
    <script>
        SELECT NAME, TELL_NUM, POST_NUM, ADDRESS , NO , LOCATION_X , LOCATION_Y
        FROM (
            SELECT PH.*, ROW_NUMBER() OVER (ORDER BY NAME ASC) AS RN
            FROM PUBLIC_HEALTH_CENTER PH
            WHERE 1=1
            
            <!-- 시/구 검색 (필수가 아님) -->
            <if test='city != null and city != ""'>
                AND CITY = #{city}
            </if>
            <if test='district != null and district != ""'>
                AND DISTRICT = #{district}
            </if>

            <!-- 검색어가 없을 경우, 시/구 정보를 자동 검색어로 설정 -->
            <if test='(searchType == null or searchType == "") and (keyword == null or keyword == "")'>
                <choose>
                    <when test='district != null and district != ""'>
                        AND ADDRESS LIKE '%' || #{district} || '%'
                    </when>
                    <when test='city != null and city != ""'>
                        AND ADDRESS LIKE '%' || #{city} || '%'
                    </when>
                </choose>
            </if>

            <!-- 검색 조건 적용 -->
            <if test='searchType != null and searchType != "" and keyword != null and keyword != ""'>
                <choose>
                    <when test='searchType == "name"'>
                        AND NAME LIKE '%' || #{keyword} || '%'
                    </when>
                    <when test='searchType == "address"'>
                        AND ADDRESS LIKE '%' || #{keyword} || '%'
                    </when>
                    <when test='searchType == "tellNum"'>
                        AND TELL_NUM LIKE '%' || #{keyword} || '%'
                    </when>
                    <when test='searchType == "postNum"'>
                        AND POST_NUM LIKE '%' || #{keyword} || '%'
                    </when>
                </choose>
            </if>
        ) 
        WHERE RN BETWEEN #{offset} + 1 AND #{offset} + #{size}
    </script>
""")
    List<PublicHealthCenterVo> searchPhcs(
            @Param("city") String city,
            @Param("district") String district,
            @Param("searchType") String searchType,
            @Param("keyword") String keyword,
            @Param("size") int size,
            @Param("offset") int offset
    );


    @Select("""
    <script>
        SELECT COUNT(*)
        FROM PUBLIC_HEALTH_CENTER
        WHERE 1=1
        
        <!-- 시/구 검색 (필수가 아님) -->
        <if test='city != null and city != ""'>
            AND CITY = #{city}
        </if>
        <if test='district != null and district != ""'>
            AND DISTRICT = #{district}
        </if>

        <!-- 검색어가 없을 경우, 시/구 정보를 자동 검색어로 설정 -->
        <if test='(searchType == null or searchType == "") and (keyword == null or keyword == "")'>
            <choose>
                <when test='district != null and district != ""'>
                    AND ADDRESS LIKE '%' || #{district} || '%'
                </when>
                <when test='city != null and city != ""'>
                    AND ADDRESS LIKE '%' || #{city} || '%'
                </when>
            </choose>
        </if>

        <!-- 검색 조건 적용 -->
        <if test='searchType != null and searchType != "" and keyword != null and keyword != ""'>
            <choose>
                <when test='searchType == "name"'>
                    AND NAME LIKE '%' || #{keyword} || '%'
                </when>
                <when test='searchType == "address"'>
                    AND ADDRESS LIKE '%' || #{keyword} || '%'
                </when>
                <when test='searchType == "tellNum"'>
                    AND TELL_NUM LIKE '%' || #{keyword} || '%'
                </when>
                <when test='searchType == "postNum"'>
                    AND POST_NUM LIKE '%' || #{keyword} || '%'
                </when>
            </choose>
        </if>
    </script>
""")
    int countPhcs(
            @Param("city") String city,
            @Param("district") String district,
            @Param("searchType") String searchType,
            @Param("keyword") String keyword
    );



    @Select("""
            SELECT
            NO
            ,NAME
            ,CITY
            ,DISTRICT
            ,DONG
            ,ADDRESS
            ,TELL_NUM
            ,POST_NUM
            ,LOCATION_X
            ,LOCATION_Y
            FROM PUBLIC_HEALTH_CENTER
            WHERE NO = #{no}
            """)
    PublicHealthCenterVo findByNo(String no);
}