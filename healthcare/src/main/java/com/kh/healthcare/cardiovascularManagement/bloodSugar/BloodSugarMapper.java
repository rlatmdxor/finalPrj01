package com.kh.healthcare.cardiovascularManagement.bloodSugar;

import org.apache.ibatis.annotations.*;

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

    @Insert("""
            INSERT INTO BLOOD_SUGAR
            (
                NO
                , MEMBER_NO
                , SUGAR
                , ENROLL_DATE
                , NOTE
            )
            VALUES
            (
                SEQ_BLOOD_SUGAR.NEXTVAL
                , #{memberNo}
                , #{sugar}
                , TO_DATE(REPLACE(#{enrollDate}, 'T', ' '), 'YYYY-MM-DD HH24:MI')
                , #{note}
            )
            """)
    int bsWrite(BloodSugarVo vo);

    @Update("""
            UPDATE BLOOD_SUGAR
            SET
                SUGAR = #{sugar}
                , ENROLL_DATE = TO_DATE(REPLACE(#{enrollDate}, 'T', ' '), 'YYYY-MM-DD HH24:MI')
                , NOTE = #{note}
            WHERE NO = #{no}
            AND MEMBER_NO = #{memberNo}
            """)
    int bsEdit(BloodSugarVo vo);

    @Delete("""
            DELETE BLOOD_SUGAR
            WHERE NO = #{no}
            AND MEMBER_NO = #{memberNo}
            """)
    void bsDel(BloodSugarVo vo);
}
