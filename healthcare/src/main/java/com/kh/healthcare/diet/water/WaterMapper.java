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
                 , #{enrollDate}
                 , #{amount}
            )
            """)
    void waterEnroll(WaterVo vo);

    @Update("""
            UPDATE WATER_LOG
            SET AMOUNT = #{amount}
            WHERE MEMBER_NO = #{memberNo}
            AND TRUNC(ENROLL_DATE) = #{enrollDate}
            """)
    void waterUpdate(WaterVo vo);

    @Select("""
            SELECT AMOUNT
            FROM WATER_LOG
            WHERE MEMBER_NO = #{memberNo}
            AND TRUNC(ENROLL_DATE) = #{enrollDate}
            """)
    WaterVo getWaterByDate(WaterVo vo);

    @Select("""
            SELECT COUNT(*)
            FROM WATER_LOG
            WHERE MEMBER_NO = #{userNo}
            AND TRUNC(ENROLL_DATE) = TRUNC(SYSDATE)
            """)
    int checkTodayWater(String userNo);
}
