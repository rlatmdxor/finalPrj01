package com.kh.healthcare.dashboard;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;
import java.util.Map;

@Mapper
public interface DashboardMapper {

    @Select("""
            SELECT
    NVL((SELECT MAX(SYSTOLE) 
         FROM BLOOD_PRESSURE 
         WHERE MEMBER_NO = #{memberNo} 
         AND ENROLL_DATE BETWEEN TO_DATE(#{startDate}, 'YYYY-MM-DD') 
                           AND TO_DATE(#{endDate}, 'YYYY-MM-DD')), 0) 
    AS MAX_BLOOD_PRESSURE, 

    NVL((SELECT MIN(SYSTOLE) 
         FROM BLOOD_PRESSURE 
         WHERE MEMBER_NO = #{memberNo} 
         AND ENROLL_DATE BETWEEN TO_DATE(#{startDate}, 'YYYY-MM-DD') 
                           AND TO_DATE(#{endDate}, 'YYYY-MM-DD')), 0) 
    AS MIN_BLOOD_PRESSURE,  

    NVL((SELECT MAX(SUGAR) 
         FROM BLOOD_SUGAR 
         WHERE MEMBER_NO = #{memberNo} 
         AND ENROLL_DATE BETWEEN TO_DATE(#{startDate}, 'YYYY-MM-DD') 
                           AND TO_DATE(#{endDate}, 'YYYY-MM-DD')), 0) 
    AS MAX_BLOOD_SUGAR,                                       

    NVL((SELECT MIN(SUGAR) 
         FROM BLOOD_SUGAR 
         WHERE MEMBER_NO = #{memberNo} 
         AND ENROLL_DATE BETWEEN TO_DATE(#{startDate}, 'YYYY-MM-DD') 
                           AND TO_DATE(#{endDate}, 'YYYY-MM-DD')), 0) 
    AS MIN_BLOOD_SUGAR,  

    ROUND(NVL((SELECT AVG(SLEEP_DURATION) 
               FROM SLEEP 
               WHERE MEMBER_NO = #{memberNo} 
               AND RECORD_DATE BETWEEN TO_DATE(#{startDate}, 'YYYY-MM-DD') 
                                AND TO_DATE(#{endDate}, 'YYYY-MM-DD')), 0)) 
    AS AVG_SLEEP,            

    ROUND(NVL((SELECT AVG(KCAL) 
               FROM (SELECT SUM(KCAL) AS KCAL 
                     FROM DIET D 
                     JOIN MEAL_LOG M ON (D.NO = M.DIET_NO) 
                     WHERE MEMBER_NO = #{memberNo} 
                     AND DIET_DAY BETWEEN TO_DATE(#{startDate}, 'YYYY-MM-DD') 
                                     AND TO_DATE(#{endDate}, 'YYYY-MM-DD') 
                     AND DEL_YN = 'N' 
                     GROUP BY DIET_DAY) 
               ), 0), 1) 
    AS AVG_KCAL,

    ROUND(NVL((SELECT AVG(AMOUNT) 
               FROM WATER_LOG 
               WHERE MEMBER_NO = #{memberNo} 
               AND ENROLL_DATE BETWEEN TO_DATE(#{startDate}, 'YYYY-MM-DD') 
                                 AND TO_DATE(#{endDate}, 'YYYY-MM-DD')), 0), 1) 
    AS AVG_WATER,                 

    NVL((SELECT SUM(EX_DURATION) 
         FROM AEROBIC_HISTORY 
         WHERE USER_NO = #{memberNo} 
         AND EX_DATE BETWEEN TO_DATE(#{startDate}, 'YYYY-MM-DD') 
                        AND TO_DATE(#{endDate}, 'YYYY-MM-DD')), 0) 
    AS SUM_AEROBIC,         

    NVL((SELECT COUNT(DISTINCT EX_DATE) 
         FROM ANAEROBIC_HISTORY 
         WHERE USER_NO = #{memberNo} 
         AND EX_DATE BETWEEN TO_DATE(#{startDate}, 'YYYY-MM-DD') 
                        AND TO_DATE(#{endDate}, 'YYYY-MM-DD')), 0) 
    AS COUNT_ANAEROBIC,          

    ROUND(
        NVL((SELECT SUM((CAL_CONSUME / 60) * EX_DURATION) 
             FROM AEROBIC_HISTORY H 
             JOIN AEROBIC A ON H.EX_NO = A.NO 
             WHERE USER_NO = #{memberNo} 
             AND EX_DATE BETWEEN TO_DATE(#{startDate}, 'YYYY-MM-DD') 
                            AND TO_DATE(#{endDate}, 'YYYY-MM-DD')), 0) 
        +
        NVL((SELECT SUM(REPS * CAL_CONSUME) 
             FROM ANAEROBIC_HISTORY H 
             JOIN ANAEROBIC A ON H.EX_NO = A.NO 
             WHERE USER_NO = #{memberNo} 
             AND EX_DATE BETWEEN TO_DATE(#{startDate}, 'YYYY-MM-DD') 
                            AND TO_DATE(#{endDate}, 'YYYY-MM-DD')), 0), 
        1
    ) AS SUM_CAL_CONSUME 
FROM DUAL
            """)
    WeeklyDataVo getDashboardData(String startDate, String endDate, String memberNo);

    @Select("""
            SELECT NO, NAME, VISIBLE_YN
            FROM DASHBOARD
            WHERE MEMBER_NO = #{memberNo}
            ORDER BY NO
            """)
    List<SettingVo> getDashboardSetting(String memberNo);

    @Update("""
            UPDATE DASHBOARD
            SET VISIBLE_YN = #{visibleYn}
            WHERE NO = #{no}
            """)
    void editDashboardSetting(SettingVo setting);
}
