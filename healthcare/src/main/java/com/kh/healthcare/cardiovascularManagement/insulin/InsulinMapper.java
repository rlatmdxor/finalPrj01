package com.kh.healthcare.cardiovascularManagement.insulin;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface InsulinMapper {

    @Select("""
            SELECT 
                NO
                , MEMBER_NO
                , POINT
                , TO_CHAR(ENROLL_DATE , 'YYYY-MM-DD') AS DAY
                , TO_CHAR(ENROLL_DATE , 'HH24:MI') AS TIME
                , TO_CHAR(ENROLL_DATE , 'YYYY-MM-DD-HH24:MI') AS ENROLL_DATE
                , TO_CHAR(ABLE_DATE , 'YYYY-MM-DD') AS ABLE_DATE
                , NOTE
            FROM INSULIN
            WHERE MEMBER_NO = #{memberNo}
            ORDER BY ENROLL_DATE DESC
            """)
    List<InsulinVo> insulinList(InsulinVo vo);


    @Insert("""
            INSERT INTO INSULIN
            (
                NO
                , MEMBER_NO
                , POINT
                , ENROLL_DATE
                , ABLE_DATE
                , NOTE    
            )
            VALUES
            (
                SEQ_INSULIN.NEXTVAL
                , #{memberNo}
                , #{point}
                , TO_DATE(REPLACE(#{enrollDate}, 'T', ' '), 'YYYY-MM-DD HH24:MI')
                , TO_DATE(REPLACE(#{ableDate}, 'T', ' '), 'YYYY-MM-DD HH24:MI')
                , #{note}
            )
            """)
    int insulinInsert(InsulinVo vo);

    @Delete("""
            DELETE INSULIN
            WHERE NO = #{no}
            """)
    void insulinDel(String no);

    @Select("""
            SELECT *
            FROM INSULIN
            WHERE MEMBER_NO = #{memberNo}
            AND POINT = #{isAblePoint} 
            AND TRUNC(ABLE_DATE) > TRUNC(CURRENT_DATE)
            """)
    List<InsulinVo> checkAbleDate(String isAblePoint, String memberNo);

    @Select("""
            SELECT
                POINT
            FROM INSULIN
            WHERE MEMBER_NO = #{memberNo}
            AND TRUNC(ABLE_DATE) > TRUNC(CURRENT_DATE)
            """)
    String[] findDisablePointList(InsulinVo vo);

//    @Update("""
//            UPDATE INSULIN
//            SET
//                ENROLL_DATE = #{enrollDate}
//                , ABLE_DATE = #{ableDate}
//                , POINT = #{point}
//                , NOTE = #{note}
//            WHERE MEMBER_NO = #{memberNo}
//            AND NO = #{no}
//            """)
//    void insulinEdit(InsulinVo vo);
}
