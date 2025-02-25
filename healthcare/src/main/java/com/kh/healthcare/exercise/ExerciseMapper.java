package com.kh.healthcare.exercise;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface ExerciseMapper {

    @Select("""
            SELECT
                TO_CHAR(EX_DATE, 'YYYY-MM') AS MONTH,
                SUM(EX_DURATION) AS TOTAL_DURATION
            FROM AEROBIC_HISTORY
            WHERE USER_NO = #{userNo}
              AND EX_DATE >= ADD_MONTHS(TRUNC(SYSDATE, 'MM'), -11)
              AND EX_DATE <= SYSDATE
            GROUP BY TO_CHAR(EX_DATE, 'YYYY-MM')
            ORDER BY MONTH
            """)
    List<Map<String, Object>> getMonthlyDuration(String userNo);

    @Select("""
            SELECT
                TO_CHAR(EX_DATE, 'YYYY-MM') AS MONTH,
                SUM(TOTAL_AEROBIC_CALORIES) AS TOTAL_AEROBIC_CALORIES,
                SUM(TOTAL_ANAEROBIC_CALORIES) AS TOTAL_ANAEROBIC_CALORIES,
                SUM(TOTAL_AEROBIC_CALORIES + TOTAL_ANAEROBIC_CALORIES) AS TOTAL_CALORIES
            FROM (
                SELECT
                    AH.USER_NO,
                    AH.EX_DATE,
                    (AH.EX_DURATION / 60) * A.CAL_CONSUME AS TOTAL_AEROBIC_CALORIES,
                    0 AS TOTAL_ANAEROBIC_CALORIES
                FROM AEROBIC_HISTORY AH
                JOIN AEROBIC A ON AH.EX_NO = A.NO
                WHERE AH.EX_DATE >= ADD_MONTHS(TRUNC(SYSDATE, 'MM'), -11)
                  AND AH.EX_DATE <= SYSDATE
        
                UNION ALL
        
                SELECT
                    ANH.USER_NO,
                    ANH.EX_DATE,
                    0 AS TOTAL_AEROBIC_CALORIES,
                    (ANH.REPS * ANAEROBIC.CAL_CONSUME) AS TOTAL_ANAEROBIC_CALORIES
                FROM ANAEROBIC_HISTORY ANH
                JOIN ANAEROBIC ON ANH.EX_NO = ANAEROBIC.NO
                WHERE ANH.EX_DATE >= ADD_MONTHS(TRUNC(SYSDATE, 'MM'), -11)
                  AND ANH.EX_DATE <= SYSDATE
            ) CALORIE_DATA
            WHERE USER_NO = #{userNo}
            GROUP BY TO_CHAR(EX_DATE, 'YYYY-MM')
            ORDER BY MONTH
            """)
    List<Map<String, Object>> getMonthlyCalories(String userNo);

    @Select("""
            SELECT
                TO_CHAR(AH.EX_DATE, 'YYYY-MM') AS MONTH,
                ANAEROBIC.NAME AS EXERCISE_NAME,
                MAX(AH.WEIGHT) AS MAX_WEIGHT
            FROM ANAEROBIC_HISTORY AH
            JOIN ANAEROBIC_BOOKMARK AB ON AH.USER_NO = AB.USER_NO AND AH.EX_NO = AB.EX_NO
            JOIN ANAEROBIC ON AH.EX_NO = ANAEROBIC.NO
            WHERE AH.USER_NO = #{userNo}
              AND AH.EX_DATE >= ADD_MONTHS(TRUNC(SYSDATE, 'MM'), -11)
              AND AH.EX_DATE <= SYSDATE
            GROUP BY TO_CHAR(AH.EX_DATE, 'YYYY-MM'), ANAEROBIC.NAME
            ORDER BY MONTH, EXERCISE_NAME
            """)
    List<Map<String, Object>> getMonthlyMaxWeight(String userNo);

}
