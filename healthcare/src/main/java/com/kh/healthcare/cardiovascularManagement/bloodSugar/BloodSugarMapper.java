package com.kh.healthcare.cardiovascularManagement.bloodSugar;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BloodSugarMapper {

    @Select("""
            SELECT 
                NO
                , MEMBER_NO
                , SUGAR
                , TO_CHAR(ENROLL_DATE , 'YYYY-MM-DD') AS DAY
                , TO_CHAR(ENROLL_DATE , 'HH24:MI') AS TIME
                , TO_CHAR(ENROLL_DATE , 'YYYY-MM-DD-HH24:MI') AS ENROLL_DATE
                , NOTE
            FROM BLOOD_SUGAR
            WHERE MEMBER_NO = #{memberNo}
            ORDER BY ENROLL_DATE DESC
            """)
    List<BloodSugarVo> list(String memberNo);
}
