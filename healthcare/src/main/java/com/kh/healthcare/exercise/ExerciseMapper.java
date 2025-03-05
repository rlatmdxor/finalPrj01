package com.kh.healthcare.exercise;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface ExerciseMapper {

    @Select("""
        SELECT PERIOD, SUM(TOTAL_AEROBIC_CALORIES) AS TOTAL_AEROBIC_CALORIES, 
               SUM(TOTAL_ANAEROBIC_CALORIES) AS TOTAL_ANAEROBIC_CALORIES,
               SUM(TOTAL_AEROBIC_CALORIES + TOTAL_ANAEROBIC_CALORIES) AS TOTAL_CALORIES
        FROM (
            SELECT 
                CASE 
                    WHEN #{rangeType} = '일' THEN TO_CHAR(AH.EX_DATE, 'YYYY-MM-DD') 
                    WHEN #{rangeType} = '주' THEN TO_CHAR(AH.EX_DATE, 'IYYY-IW')
                    ELSE TO_CHAR(AH.EX_DATE, 'YYYY-MM')
                END AS PERIOD,
                (AH.EX_DURATION / 60) * A.CAL_CONSUME AS TOTAL_AEROBIC_CALORIES,
                0 AS TOTAL_ANAEROBIC_CALORIES
            FROM AEROBIC_HISTORY AH
            JOIN AEROBIC A ON AH.EX_NO = A.NO
            WHERE AH.USER_NO = #{userNo}
            AND EXTRACT(YEAR FROM AH.EX_DATE) = #{year}
            AND (#{rangeType} != '일' OR EXTRACT(MONTH FROM AH.EX_DATE) = #{month})

            UNION ALL

            SELECT 
                CASE 
                    WHEN #{rangeType} = '일' THEN TO_CHAR(ANH.EX_DATE, 'YYYY-MM-DD') 
                    WHEN #{rangeType} = '주' THEN TO_CHAR(ANH.EX_DATE, 'IYYY-IW')
                    ELSE TO_CHAR(ANH.EX_DATE, 'YYYY-MM')
                END AS PERIOD,
                0 AS TOTAL_AEROBIC_CALORIES,
                (ANH.REPS * ANAEROBIC.CAL_CONSUME) AS TOTAL_ANAEROBIC_CALORIES
            FROM ANAEROBIC_HISTORY ANH
            JOIN ANAEROBIC ON ANH.EX_NO = ANAEROBIC.NO
            WHERE ANH.USER_NO = #{userNo}
            AND EXTRACT(YEAR FROM ANH.EX_DATE) = #{year}
            AND (#{rangeType} != '일' OR EXTRACT(MONTH FROM ANH.EX_DATE) = #{month})
        ) CALORIE_DATA
        GROUP BY PERIOD
        ORDER BY PERIOD
    """)
    List<Map<String, Object>> getCalories(String userNo, String rangeType, int year, Integer month);

    @Select("""
        SELECT PERIOD, SUM(TOTAL_AEROBIC_DURATION) AS TOTAL_AEROBIC_DURATION
        FROM (
            SELECT 
                CASE 
                    WHEN #{rangeType} = '일' THEN TO_CHAR(AH.EX_DATE, 'YYYY-MM-DD') 
                    WHEN #{rangeType} = '주' THEN TO_CHAR(AH.EX_DATE, 'IYYY-IW')
                    ELSE TO_CHAR(AH.EX_DATE, 'YYYY-MM')
                END AS PERIOD,
                AH.EX_DURATION AS TOTAL_AEROBIC_DURATION
            FROM AEROBIC_HISTORY AH
            WHERE AH.USER_NO = #{userNo}
            AND EXTRACT(YEAR FROM AH.EX_DATE) = #{year}
            AND (#{rangeType} != '일' OR EXTRACT(MONTH FROM AH.EX_DATE) = #{month})
        ) DURATION_DATA
        GROUP BY PERIOD
        ORDER BY PERIOD
    """)
    List<Map<String, Object>> getDuration(String userNo, String rangeType, int year, Integer month);

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

    @Select("""
            SELECT PERIOD, COUNT(*) AS TOTAL_COUNT
            FROM (
                SELECT 
                    CASE 
                        WHEN #{rangeType} = '월' THEN TO_CHAR(AH.EX_DATE, 'YYYY-MM') 
                        ELSE TO_CHAR(AH.EX_DATE, 'YYYY') 
                    END AS PERIOD
                FROM AEROBIC_HISTORY AH
                WHERE AH.USER_NO = #{userNo}
                AND EXTRACT(YEAR FROM AH.EX_DATE) = #{year}
                AND (#{month} IS NULL OR EXTRACT(MONTH FROM AH.EX_DATE) = #{month})
            ) TEMP
            GROUP BY PERIOD
            ORDER BY PERIOD
            """)
    List<Map<String, Object>> getTypeCountAerobic(String rangeType, int year, Integer month, String userNo);

    @Select("""
            SELECT PERIOD, COUNT(*) AS TOTAL_COUNT
            FROM (
                SELECT 
                    CASE 
                        WHEN #{rangeType} = '월' THEN TO_CHAR(ANH.EX_DATE, 'YYYY-MM') 
                        ELSE TO_CHAR(ANH.EX_DATE, 'YYYY') 
                    END AS PERIOD
                FROM ANAEROBIC_HISTORY ANH
                WHERE ANH.USER_NO = #{userNo}
                AND EXTRACT(YEAR FROM ANH.EX_DATE) = #{year}
                AND (#{month} IS NULL OR EXTRACT(MONTH FROM ANH.EX_DATE) = #{month})
            ) TEMP
            GROUP BY PERIOD
            ORDER BY PERIOD
            """)
    List<Map<String, Object>> getTypeCountAnAerobic(String rangeType, int year, Integer month, String userNo);

    @Select("""
            SELECT PERIOD, EX_NO, COUNT(*) AS EXERCISE_COUNT
            FROM (
                SELECT
                    TO_CHAR(ANH.EX_DATE,
                        CASE
                            WHEN #{rangeType} = '월' THEN 'YYYY-MM'
                            ELSE 'YYYY'
                        END
                    ) AS PERIOD,
                    ANH.EX_NO
                FROM ANAEROBIC_HISTORY ANH
                WHERE ANH.USER_NO = #{userNo}
                AND EXTRACT(YEAR FROM ANH.EX_DATE) = #{year}
                AND (#{month} IS NULL OR EXTRACT(MONTH FROM ANH.EX_DATE) = #{month})
            ) TEMP
            GROUP BY PERIOD, EX_NO
            ORDER BY PERIOD, EX_NO
            """)
    List<Map<String, Object>> getCategoryCount(String rangeType, int year, Integer month, String userNo);

    @Select("""
            SELECT AH.NO, TO_CHAR(AH.EX_DATE, 'YYYY-MM-DD') AS EX_DATE, AH.EX_DURATION, A.NAME
            FROM AEROBIC_HISTORY AH
            LEFT JOIN AEROBIC A ON AH.EX_NO = A.NO
            WHERE AH.USER_NO = #{userNo}
            """)
    List<Map<String, Object>> getAerobicHistory(String userNo);

    @Select("""
            SELECT AH.NO, TO_CHAR(AH.EX_DATE, 'YYYY-MM-DD') AS EX_DATE, AH.WEIGHT, AH.REPS, AA.NAME
            FROM ANAEROBIC_HISTORY AH
            LEFT JOIN ANAEROBIC AA ON AH.EX_NO = AA.NO
            WHERE AH.USER_NO = #{userNo}
            """)
    List<Map<String, Object>> getAnAerobicHistory(String userNo);

    @Select("""
            SELECT COUNT(*)
            FROM NOTIFICATION_SETTINGS
            WHERE
                MEMBER_NO = #{userNo}
                AND ALL_PUSH = 'Y'
                AND EXERCISE_PUSH = 'Y'
            """)
    int isExercisePushEnabled(String userNo);

    @Select("""
            SELECT COUNT(*)
              FROM (
                    SELECT AH.NO
                      FROM AEROBIC_HISTORY AH
                     WHERE AH.USER_NO = #{userNo}
                       AND TRUNC(AH.EX_DATE) = TRUNC(SYSDATE)
        
                    UNION ALL
        
                    SELECT NAH.NO
                      FROM ANAEROBIC_HISTORY NAH
                     WHERE NAH.USER_NO = #{userNo}
                       AND TRUNC(NAH.EX_DATE) = TRUNC(SYSDATE)
                    )
            """)
    int checkTodayExercise(String userNo);


}
