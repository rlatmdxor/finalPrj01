package com.kh.healthcare.diet.calendar;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DietCalMapper {

    @Select("""
            SELECT
                DT.ENROLL_DATE AS DIET_DAY
                , DT.MEMBER_NO
                , NVL(WT.AMOUNT, 0) AS WATER_AMOUNT
                , NVL(WG.AMOUNT, 0) AS WEIGHT_AMOUNT
                , NVL(SUM_KCAL, 0) AS SUM_KCAL
            FROM
                (SELECT MEMBER_NO, ENROLL_DATE FROM WATER_LOG
                UNION
                SELECT MEMBER_NO, ENROLL_DATE FROM WEIGHT_LOG
                UNION
                SELECT MEMBER_NO, DIET_DAY FROM DIET) DT
            LEFT JOIN WATER_LOG WT ON (DT.ENROLL_DATE = WT.ENROLL_DATE AND DT.MEMBER_NO = WT.MEMBER_NO)
            LEFT JOIN WEIGHT_LOG WG ON (DT.ENROLL_DATE = WG.ENROLL_DATE AND DT.MEMBER_NO = WG.MEMBER_NO)
            LEFT JOIN (
                SELECT D.MEMBER_NO, D.DIET_DAY, SUM(M.KCAL) AS SUM_KCAL
                FROM DIET D
                LEFT JOIN MEAL_LOG M ON D.NO = M.DIET_NO
                WHERE D.DEL_YN = 'N'
                GROUP BY D.MEMBER_NO, D.DIET_DAY
            ) DIET_SUM ON (DT.ENROLL_DATE = DIET_SUM.DIET_DAY AND DT.MEMBER_NO = DIET_SUM.MEMBER_NO)
            WHERE DT.MEMBER_NO = #{memberNo}
            ORDER BY DIET_DAY
            """)
    List<DietCalVo> getDietCalData(String memberNo);
}
