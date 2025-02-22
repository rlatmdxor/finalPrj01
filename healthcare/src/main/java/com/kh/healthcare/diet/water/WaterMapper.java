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
    void waterIntakeEnroll(WaterVo vo);

    @Update("""
            UPDATE WATER_LOG
            SET AMOUNT = #{amount}
            WHERE MEMBER_NO = #{memberNo}
            AND TRUNC(ENROLL_DATE) = #{enrollDate}
            """)
    void waterIntakeUpdate(WaterVo vo);

    @Select("""
            SELECT AMOUNT
            FROM WATER_LOG
            WHERE MEMBER_NO = #{memberNo}
            AND TRUNC(ENROLL_DATE) = #{enrollDate}
            """)
    String getWaterIntakeByDate(WaterVo vo);

    @Select("""
            SELECT ENROLL_DATE, AMOUNT
            FROM WATER_LOG
            WHERE MEMBER_NO = #{memberNo}
            AND TO_CHAR(ENROLL_DATE, 'YYYY-MM') = #{month}
            ORDER BY ENROLL_DATE
            """)
    List<WaterVo> getDayWater(int memberNo, String month);

    @Select("""
            SELECT TO_CHAR(ENROLL_DATE, 'YYYY-MM') AS ENROLL_DATE,  ROUND(AVG(AMOUNT)) AS AMOUNT
            FROM WATER_LOG
            WHERE MEMBER_NO = #{memberNo}
            AND TO_CHAR(ENROLL_DATE, 'YYYY') = #{year}
            GROUP BY TO_CHAR(ENROLL_DATE, 'YYYY-MM')
            ORDER BY ENROLL_DATE
            """)
    List<WaterVo> getMonthAvgWater(int memberNo, String year);

    @Select("""
            SELECT TO_CHAR(ENROLL_DATE, 'YYYY') AS ENROLL_DATE,  ROUND(AVG(AMOUNT)) AS AMOUNT
            FROM WATER_LOG
            WHERE MEMBER_NO = #{memberNo}
            GROUP BY TO_CHAR(ENROLL_DATE, 'YYYY')
            ORDER BY ENROLL_DATE
            """)
    List<WaterVo> getYearAvgWater(int memberNo);
}
