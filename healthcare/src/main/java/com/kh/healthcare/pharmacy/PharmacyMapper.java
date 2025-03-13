package com.kh.healthcare.pharmacy;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;


@Mapper
public interface PharmacyMapper {

    @Select("""
        <script>
            SELECT NAME, TELL_NUM, POST_NUM, ADDRESS, NO , LOCATION_X , LOCATION_Y
            FROM (
                SELECT PH.*, ROW_NUMBER() OVER (ORDER BY NAME ASC) AS RN
                FROM PHARMACY PH
                WHERE 1=1
                <if test='city != null and city != ""'>
                    AND CITY = #{city}
                </if>
                <if test='district != null and district != ""'>
                    AND DISTRICT = #{district}
                </if>
                <if test='dong != null and dong != ""'>
                    AND Dong = #{dong}
                </if>
                <if test='searchType == "name"'>
                    AND NAME LIKE '%' || #{keyword} || '%'
                </if>
                <if test='searchType == "address"'>
                    AND ADDRESS LIKE '%' || #{keyword} || '%'
                </if>
                <if test='searchType == "tellNum"'>
                    AND TELL_NUM LIKE '%' || #{keyword} || '%'
                </if>
                <if test='searchType == "postNum"'>
                    AND POST_NUM LIKE '%' || #{keyword} || '%'
                </if>
            ) WHERE RN BETWEEN #{offset} + 1 AND #{offset} + #{size}
        </script>
    """)
    List<PharmacyVo> searchPharmacies(
            @Param("city") String city,
            @Param("district") String district,
            @Param("dong") String dong,
            @Param("searchType") String searchType,
            @Param("keyword") String keyword,
            @Param("size") int size,
            @Param("offset") int offset
    );

    @Select("""
        <script>
            SELECT COUNT(*)
            FROM PHARMACY
            WHERE 1=1
            <if test='city != null and city != ""'>
                AND CITY = #{city}
            </if>
            <if test='district != null and district != ""'>
                AND DISTRICT = #{district}
            </if>
            <if test='dong != null and dong != ""'>
                AND DONG = #{dong}
            </if>
            <if test='searchType == "name"'>
                AND NAME LIKE '%' || #{keyword} || '%'
            </if>
            <if test='searchType == "address"'>
                AND ADDRESS LIKE '%' || #{keyword} || '%'
            </if>
            <if test='searchType == "tellNum"'>
                AND TELL_NUM LIKE '%' || #{keyword} || '%'
            </if>
            <if test='searchType == "postNum"'>
                AND POST_NUM LIKE '%' || #{keyword} || '%'
            </if>
        </script>
    """)
    int countPharmacies(
            @Param("city") String city,
            @Param("district") String district,
            @Param("dong") String dong,
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
            FROM PHARMACY
            WHERE NO = #{no}
            """)
    PharmacyVo findByNo(String no);
}
