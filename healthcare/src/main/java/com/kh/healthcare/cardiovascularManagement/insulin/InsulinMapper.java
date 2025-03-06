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
    List<InsulinVo> insulinList(String vo);


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
            AND MEMBER_NO = #{memberNo}
            """)
    void insulinDel(String no, String memberNo);

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
    String[] findDisablePointList(String vo);

    @Select("""
            SELECT COUNT(*)
            FROM NOTIFICATION_SETTINGS
            WHERE
                MEMBER_NO = #{userNo}
                AND ALL_PUSH = 'Y'
                AND INSULIN_PUSH = 'Y'
            """)
    int isInsulinPushEnabled(String userNo);

    @Select("""
            SELECT COUNT(*)
            FROM INSULIN
            WHERE MEMBER_NO = #{userNo}
            AND TRUNC(ENROLL_DATE) = TRUNC(SYSDATE)
            AND EXISTS (
                    SELECT 1
                    FROM NOTIFICATION_SETTINGS NS
                    WHERE NS.MEMBER_NO = #{userNo}
                        AND NS.ALL_PUSH = 'Y'
                        AND NS.INSULIN_PUSH = 'Y'
                )
            """)
    int checkTodayInsulin(String userNo);

}
