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
            NVL((SELECT MAX(SYSTOLE) FROM BLOOD_PRESSURE WHERE MEMBER_NO = #{memberNo} AND ENROLL_DATE BETWEEN #{startDate} AND #{endDate}), 0) AS MAX_BLOOD_PRESSURE, 
            NVL((SELECT MIN(SYSTOLE) FROM BLOOD_PRESSURE WHERE MEMBER_NO = #{memberNo} AND ENROLL_DATE BETWEEN #{startDate} AND #{endDate}), 0) AS MIN_BLOOD_PRESSURE,  
            NVL((SELECT MAX(SUGAR) FROM BLOOD_SUGAR WHERE MEMBER_NO = #{memberNo} AND ENROLL_DATE BETWEEN #{startDate} AND #{endDate}),0) AS MAX_BLOOD_SUGAR,                                       
            NVL((SELECT MIN(SUGAR) FROM BLOOD_SUGAR WHERE MEMBER_NO = #{memberNo} AND ENROLL_DATE BETWEEN #{startDate} AND #{endDate}), 0) AS MIN_BLOOD_SUGAR,          
            ROUND(NVL((SELECT AVG(SLEEP_DURATION) FROM SLEEP WHERE MEMBER_NO = #{memberNo} AND RECORD_DATE BETWEEN #{startDate} AND #{endDate}), 0)) AS AVG_SLEEP,            
            (SELECT
                ROUND(SUM(
                    CONSUMPTION_RATIO *
                    (LEAST(TO_DATE(#{endDate}, 'YY/MM/DD'), END_DATE) -
                     GREATEST(TO_DATE(#{startDate}, 'YY/MM/DD'), START_DATE) + 1)
                ), 2)
            FROM (
                SELECT
                    NO, MEMBER_NO, CIGARETTE, START_DATE, END_DATE,
                    (END_DATE - START_DATE + 1) AS DAYS_CONSUMED,
                    (1 / (END_DATE - START_DATE + 1)) AS CONSUMPTION_RATIO
                FROM RECORD_CIGARETTE
                WHERE MEMBER_NO = #{memberNo}
                AND (START_DATE <= TO_DATE(#{endDate}, 'YY/MM/DD'))
                AND (END_DATE >= TO_DATE(#{startDate}, 'YY/MM/DD'))
            )) AS COUNT_CIGARETTE, 
            NVL((SELECT SUM((ABV/100)*CC) FROM RECORD_ALC WHERE MEMBER_NO = #{memberNo} AND ENROLL_DATE BETWEEN #{startDate} AND #{endDate}), 0) AS SUM_ALC,             
            ROUND(NVL((SELECT AVG(AMOUNT) FROM WEIGHT_LOG WHERE MEMBER_NO = #{memberNo} AND ENROLL_DATE BETWEEN #{startDate} AND #{endDate}), 0),1) AS AVG_WEIGHT,               
            ROUND(NVL((SELECT AVG(SUM(KCAL)) FROM DIET D JOIN MEAL_LOG M ON (D.NO = M.DIET_NO) WHERE MEMBER_NO = #{memberNo} AND DIET_DAY BETWEEN #{startDate} AND #{endDate} AND DEL_YN = 'N' GROUP BY DIET_DAY), 0),1) AS AVG_KCAL,
            ROUND(NVL((SELECT AVG(AMOUNT) FROM WATER_LOG WHERE MEMBER_NO = #{memberNo} AND ENROLL_DATE BETWEEN #{startDate} AND #{endDate}),0),1) AS AVG_WATER,                 
            NVL((SELECT SUM(EX_DURATION) FROM AEROBIC_HISTORY WHERE USER_NO = #{memberNo} AND EX_DATE BETWEEN #{startDate} AND #{endDate}),0) AS SUM_AEROBIC,         
            NVL((SELECT COUNT(DISTINCT EX_DATE) FROM ANAEROBIC_HISTORY WHERE USER_NO = #{memberNo} AND EX_DATE BETWEEN #{startDate} AND #{endDate}), 0) AS COUNT_ANAEROBIC,          
            ROUND(NVL((SELECT SUM((CAL_CONSUME/60)*EX_DURATION)
            FROM AEROBIC_HISTORY H
            JOIN AEROBIC A ON (H.EX_NO = A.NO)
            WHERE USER_NO = #{memberNo}
            AND EX_DATE BETWEEN #{startDate} AND #{endDate}),0)
            +
            NVL((SELECT SUM(REPS*CAL_CONSUME)
            FROM ANAEROBIC_HISTORY H
            JOIN ANAEROBIC A ON (H.EX_NO = A.NO)
            WHERE USER_NO = #{memberNo} 
            AND EX_DATE BETWEEN #{startDate} AND #{endDate}),0),1)
            AS SUM_CAL_CONSUME 
            FROM DUAL
            """)
    WeeklyDataVo getDashboardData(String startDate, String endDate, int memberNo);

    @Select("""
            SELECT NO, NAME, VISIBLE_YN
            FROM DASHBOARD
            WHERE MEMBER_NO = #{memberNo}
            ORDER BY NO
            """)
    List<SettingVo> getDashboardSetting(int memberNo);

    @Update("""
            UPDATE DASHBOARD
            SET VISIBLE_YN = #{visibleYn}
            WHERE NO = #{no}
            """)
    void editDashboardSetting(SettingVo setting);
}
