package com.kh.healthcare.diet.water;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface WaterMapper {

    @Insert("""
            INSERT INTO WATER_LOG 
            ( 
                NO
                , MEMBER_NO
                , ENROLL_DATE
                , AMOUNT 
            ) 
            VALUES 
            (
                 SEQ_WATER_LOG.NEXTVAL
                 , #{memberNo}
                 , TO_DATE(#{enrollDate}, 'YYYY-MM-DD')
                 , #{amount}
            )
            """)
    void waterEnroll(WaterVo vo);

    @Update("""
            UPDATE WATER_LOG
            SET AMOUNT = #{amount}
            WHERE MEMBER_NO = #{memberNo}
            AND TRUNC(ENROLL_DATE) = TO_DATE(#{enrollDate}, 'YYYY-MM-DD')
            """)
    void waterUpdate(WaterVo vo);

    @Select("""
            SELECT AMOUNT
            FROM WATER_LOG
            WHERE MEMBER_NO = #{memberNo}
            AND TRUNC(ENROLL_DATE) = TO_DATE(#{enrollDate}, 'YYYY-MM-DD')
            """)
    WaterVo getWaterByDate(WaterVo vo);

    @Select("""
            SELECT COUNT(*)
            FROM WATER_LOG
            WHERE MEMBER_NO = #{userNo}
            AND TRUNC(ENROLL_DATE) = TRUNC(SYSDATE)
            AND EXISTS (
                    SELECT 1
                    FROM NOTIFICATION_SETTINGS NS
                    WHERE NS.MEMBER_NO = #{userNo}
                        AND NS.ALL_PUSH = 'Y'
                        AND NS.WATER_PUSH = 'Y'
                )
            """)
    int checkTodayWater(String userNo);

    @Select("""
            SELECT COUNT(*)
            FROM NOTIFICATION_SETTINGS
            WHERE
                MEMBER_NO = #{userNo}
                AND ALL_PUSH = 'Y'
                AND WATER_PUSH = 'Y'
            """)
    int isWaterPushEnabled(String userNo);
}
