package com.kh.healthcare.exercise;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface ExerciseMapper {

    @Select("""
        SELECT PERIOD, SUM(TOTAL_AEROBIC_DURATION) AS TOTAL_AEROBIC_DURATION
        FROM (
            SELECT 
                AH.USER_NO, 
                CASE 
                    WHEN #{rangeType} = '일' THEN TO_CHAR(AH.EX_DATE, 'YYYY-MM-DD')
                    WHEN #{rangeType} = '주' THEN TO_CHAR(AH.EX_DATE, 'IYYY-IW')
                    ELSE TO_CHAR(AH.EX_DATE, 'YYYY-MM')
                END AS PERIOD, 
                SUM(AH.EX_DURATION) AS TOTAL_AEROBIC_DURATION
            FROM AEROBIC_HISTORY AH
            WHERE AH.EX_DATE BETWEEN ADD_MONTHS(TRUNC(SYSDATE, 'MM'), -11) AND SYSDATE
            GROUP BY AH.USER_NO, AH.EX_DATE
        ) DURATION_DATA
        WHERE USER_NO = #{userNo}
        GROUP BY PERIOD
        ORDER BY PERIOD
        """)
    List<Map<String, Object>> getDuration(String userNo, String rangeType);

    @Select("""
        SELECT
            PERIOD,
            SUM(TOTAL_AEROBIC_CALORIES) AS TOTAL_AEROBIC_CALORIES,
            SUM(TOTAL_ANAEROBIC_CALORIES) AS TOTAL_ANAEROBIC_CALORIES,
            SUM(TOTAL_AEROBIC_CALORIES + TOTAL_ANAEROBIC_CALORIES) AS TOTAL_CALORIES
        FROM (
            -- 유산소 운동 칼로리 소모량
            SELECT
                AH.USER_NO,
                CASE
                    WHEN #{rangeType} = '일' THEN TO_CHAR(AH.EX_DATE, 'YYYY-MM-DD')
                    WHEN #{rangeType} = '주' THEN TO_CHAR(AH.EX_DATE, 'IYYY-IW') -- ISO 주차
                    ELSE TO_CHAR(AH.EX_DATE, 'YYYY-MM')
                END AS PERIOD,
                (AH.EX_DURATION / 60) * A.CAL_CONSUME AS TOTAL_AEROBIC_CALORIES,
                0 AS TOTAL_ANAEROBIC_CALORIES
            FROM AEROBIC_HISTORY AH
            JOIN AEROBIC A ON AH.EX_NO = A.NO
            WHERE AH.EX_DATE BETWEEN TRUNC(SYSDATE, 'MM') - INTERVAL '11' MONTH AND SYSDATE

            UNION ALL

            -- 무산소 운동 칼로리 소모량
            SELECT
                ANH.USER_NO,
                CASE
                    WHEN #{rangeType} = '일' THEN TO_CHAR(ANH.EX_DATE, 'YYYY-MM-DD')
                    WHEN #{rangeType} = '주' THEN TO_CHAR(ANH.EX_DATE, 'IYYY-IW')
                    ELSE TO_CHAR(ANH.EX_DATE, 'YYYY-MM')
                END AS PERIOD,
                0 AS TOTAL_AEROBIC_CALORIES,
                (ANH.REPS * ANAEROBIC.CAL_CONSUME) AS TOTAL_ANAEROBIC_CALORIES
            FROM ANAEROBIC_HISTORY ANH
            JOIN ANAEROBIC ON ANH.EX_NO = ANAEROBIC.NO
            WHERE ANH.EX_DATE BETWEEN TRUNC(SYSDATE, 'MM') - INTERVAL '11' MONTH AND SYSDATE
        ) CALORIE_DATA
        WHERE USER_NO = #{userNo}
        GROUP BY PERIOD
        ORDER BY PERIOD
        """)
    List<Map<String, Object>> getCalories(String userNo, String rangeType);

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
