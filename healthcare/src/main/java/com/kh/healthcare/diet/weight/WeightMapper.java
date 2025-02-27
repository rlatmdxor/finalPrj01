package com.kh.healthcare.diet.weight;

import com.kh.healthcare.diet.water.WaterVo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface WeightMapper {

    @Insert("""
            INSERT INTO WEIGHT_LOG
            (
                NO
                , MEMBER_NO
                , ENROLL_DATE
                , AMOUNT 
            ) 
            VALUES 
            (
                SEQ_WEIGHT_LOG.NEXTVAL
                , #{memberNo}
                , #{enrollDate}
                , #{amount}
            )
            """)
    void weightEnroll(WeightVo vo);

    @Update("""
            UPDATE WEIGHT_LOG
            SET AMOUNT = #{amount}
            WHERE MEMBER_NO = #{memberNo}
            AND TRUNC(ENROLL_DATE) = #{enrollDate}
            """)
    void weightUpdate(WeightVo vo);

    @Select("""
            SELECT AMOUNT
            FROM WEIGHT_LOG
            WHERE MEMBER_NO = #{memberNo}
            AND TRUNC(ENROLL_DATE) = #{enrollDate}
            """)
    String getWeightByDate(WeightVo vo);


    @Select("""
            SELECT ENROLL_DATE, AMOUNT
            FROM WEIGHT_LOG
            WHERE MEMBER_NO = #{memberNo}
            ORDER BY ENROLL_DATE
            """)
    List<WaterVo> getWeightByMemberNo(int memberNo);

    @Select("""
            SELECT ENROLL_DATE, AMOUNT
            FROM WEIGHT_LOG
            WHERE MEMBER_NO = #{memberNo}
            AND TO_CHAR(ENROLL_DATE, 'YYYY-MM') = #{month}
            ORDER BY ENROLL_DATE
            """)
    List<WeightVo> getDayWeight(int memberNo, String month);

    @Select("""
            SELECT TO_CHAR(ENROLL_DATE, 'YYYY-MM') AS ENROLL_DATE,  ROUND(AVG(AMOUNT)) AS AMOUNT
            FROM WEIGHT_LOG
            WHERE MEMBER_NO = #{memberNo}
            AND TO_CHAR(ENROLL_DATE, 'YYYY') = #{year}
            GROUP BY TO_CHAR(ENROLL_DATE, 'YYYY-MM')
            ORDER BY ENROLL_DATE
            """)
    List<WeightVo> getMonthAvgWeight(int memberNo, String year);

    @Select("""
            SELECT TO_CHAR(ENROLL_DATE, 'YYYY') AS ENROLL_DATE,  ROUND(AVG(AMOUNT)) AS AMOUNT
            FROM WEIGHT_LOG
            WHERE MEMBER_NO = #{memberNo}
            GROUP BY TO_CHAR(ENROLL_DATE, 'YYYY')
            ORDER BY ENROLL_DATE
            """)
    List<WeightVo> getYearAvgWeight(int memberNo);
}
