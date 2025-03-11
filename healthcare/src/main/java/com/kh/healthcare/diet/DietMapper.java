package com.kh.healthcare.diet;

import com.kh.healthcare.diet.meal.TotalKcalVo;
import com.kh.healthcare.diet.water.WaterVo;
import com.kh.healthcare.diet.weight.WeightVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DietMapper {

//    @Select("""
//            SELECT
//                DT.ENROLL_DATE AS DIET_DAY
//                , DT.MEMBER_NO
//                , NVL(WT.AMOUNT, 0) AS WATER_AMOUNT
//                , NVL(WG.AMOUNT, 0) AS WEIGHT_AMOUNT
//                , NVL(SUM_KCAL, 0) AS SUM_KCAL
//            FROM
//                (SELECT MEMBER_NO, ENROLL_DATE FROM WATER_LOG
//                UNION
//                SELECT MEMBER_NO, ENROLL_DATE FROM WEIGHT_LOG
//                UNION
//                SELECT MEMBER_NO, DIET_DAY FROM DIET) DT
//            LEFT JOIN WATER_LOG WT ON (DT.ENROLL_DATE = WT.ENROLL_DATE AND DT.MEMBER_NO = WT.MEMBER_NO)
//            LEFT JOIN WEIGHT_LOG WG ON (DT.ENROLL_DATE = WG.ENROLL_DATE AND DT.MEMBER_NO = WG.MEMBER_NO)
//            LEFT JOIN (
//                SELECT D.MEMBER_NO, D.DIET_DAY, SUM(M.KCAL) AS SUM_KCAL
//                FROM DIET D
//                LEFT JOIN MEAL_LOG M ON D.NO = M.DIET_NO
//                WHERE D.DEL_YN = 'N'
//                GROUP BY D.MEMBER_NO, D.DIET_DAY
//            ) DIET_SUM ON (DT.ENROLL_DATE = DIET_SUM.DIET_DAY AND DT.MEMBER_NO = DIET_SUM.MEMBER_NO)
//            WHERE DT.MEMBER_NO = #{memberNo}
//            ORDER BY DIET_DAY
//            """)
//    DietReportVo getDietCalData(String memberNo);

    @Select("""
            SELECT ENROLL_DATE, AMOUNT
            FROM WATER_LOG
            WHERE MEMBER_NO = #{memberNo}
            """)
    List<WaterVo> getWaterList(String memberNo);

    @Select("""
            SELECT ENROLL_DATE, AMOUNT
            FROM WEIGHT_LOG
            WHERE MEMBER_NO = #{memberNo}
            """)
    List<WeightVo> getWeightList(String memberNo);

    @Select("""
            SELECT D.DIET_DAY, SUM(M.KCAL) AS TotalKcal
            FROM DIET D
            LEFT JOIN MEAL_LOG M ON D.NO = M.DIET_NO
            WHERE D.DEL_YN = 'N'
            AND D.MEMBER_NO = #{memberNo}
            GROUP BY D.MEMBER_NO, D.DIET_DAY
            """)
    List<TotalKcalVo> getKcalList(String memberNo);

    @Select("""
            SELECT ENROLL_DATE, AMOUNT
            FROM WATER_LOG
            WHERE MEMBER_NO = #{memberNo}
            AND TO_CHAR(ENROLL_DATE, 'YYYY-MM') = #{month}
            ORDER BY ENROLL_DATE
            """)
    List<WaterVo> getDayWater(String memberNo, String month);

    @Select("""
            SELECT ENROLL_DATE, AMOUNT
            FROM WEIGHT_LOG
            WHERE MEMBER_NO = #{memberNo}
            AND TO_CHAR(ENROLL_DATE, 'YYYY-MM') = #{month}
            ORDER BY ENROLL_DATE
            """)
    List<WeightVo> getDayWeight(String memberNo, String month);

    @Select("""
            SELECT DIET_DAY, SUM(M.KCAL) AS TOTAL_KCAL
            FROM DIET D
            LEFT JOIN MEAL_LOG M ON (D.NO = M.DIET_NO)
            WHERE D.MEMBER_NO = #{memberNo}
            AND TO_CHAR(D.DIET_DAY, 'YYYY-MM') = #{month}
            AND D.DEL_YN = 'N'
            GROUP BY D.MEMBER_NO, D.DIET_DAY
            ORDER BY D.DIET_DAY
            """)
    List<TotalKcalVo> getDayKcal(String memberNo, String month);

    @Select("""
            SELECT
                TO_CHAR(ENROLL_DATE, 'IW') AS ENROLL_DATE,
                ROUND(AVG(AMOUNT)) AS AMOUNT
            FROM WATER_LOG
            WHERE MEMBER_NO = #{memberNo}
              AND TO_CHAR(ENROLL_DATE, 'YYYY') = #{year}
            GROUP BY TO_CHAR(ENROLL_DATE, 'IW')
            ORDER BY ENROLL_DATE
            """)
    List<WaterVo> getWeekWater(String memberNo, String year);

    @Select("""
            SELECT
                TO_CHAR(ENROLL_DATE, 'IW') AS ENROLL_DATE,
                ROUND(AVG(AMOUNT)) AS AMOUNT
            FROM WEIGHT_LOG
            WHERE MEMBER_NO = #{memberNo}
              AND TO_CHAR(ENROLL_DATE, 'YYYY') = #{year}
            GROUP BY TO_CHAR(ENROLL_DATE, 'IW')
            ORDER BY ENROLL_DATE
            """)
    List<WeightVo> getWeekWeight(String memberNo, String year);

    @Select("""
            SELECT
                TO_CHAR(D.DIET_DAY, 'IW') AS DIET_DAY,
                ROUND(SUM(M.KCAL) / COUNT(DISTINCT D.DIET_DAY)) AS TOTAL_KCAL
            FROM DIET D
            LEFT JOIN MEAL_LOG M ON (D.NO = M.DIET_NO)
            WHERE D.MEMBER_NO = #{memberNo}
              AND TO_CHAR(D.DIET_DAY, 'YYYY') = #{year}
              AND D.DEL_YN = 'N'
            GROUP BY TO_CHAR(D.DIET_DAY, 'IW')
            ORDER BY DIET_DAY
            """)
    List<TotalKcalVo> getWeekKcal(String memberNo, String year);

    @Select("""
            SELECT TO_CHAR(ENROLL_DATE, 'YYYY-MM') AS ENROLL_DATE, ROUND(AVG(AMOUNT)) AS AMOUNT
            FROM WATER_LOG
            WHERE MEMBER_NO = #{memberNo}
            AND TO_CHAR(ENROLL_DATE, 'YYYY') = #{year}
            GROUP BY TO_CHAR(ENROLL_DATE, 'YYYY-MM')
            ORDER BY ENROLL_DATE
            """)
    List<WaterVo> getMonthWater(String memberNo, String year);

    @Select("""
            SELECT TO_CHAR(ENROLL_DATE, 'YYYY-MM') AS ENROLL_DATE, ROUND(AVG(AMOUNT)) AS AMOUNT
            FROM WEIGHT_LOG
            WHERE MEMBER_NO = #{memberNo}
            AND TO_CHAR(ENROLL_DATE, 'YYYY') = #{year}
            GROUP BY TO_CHAR(ENROLL_DATE, 'YYYY-MM')
            ORDER BY ENROLL_DATE
            """)
    List<WeightVo> getMonthWeight(String memberNo, String year);

    @Select("""
            SELECT TO_CHAR(D.DIET_DAY, 'YYYY-MM') AS DIET_DAY, ROUND(SUM(M.KCAL)/COUNT(DISTINCT D.DIET_DAY)) AS TOTAL_KCAL
            FROM DIET D
            LEFT JOIN MEAL_LOG M ON (D.NO = M.DIET_NO)
            WHERE D.MEMBER_NO = #{memberNo}
            AND TO_CHAR(D.DIET_DAY, 'YYYY') = #{year}
            AND D.DEL_YN = 'N'
            GROUP BY D.MEMBER_NO, TO_CHAR(D.DIET_DAY, 'YYYY-MM')
            ORDER BY DIET_DAY
            """)
    List<TotalKcalVo> getMonthKcal(String memberNo, String year);




}
