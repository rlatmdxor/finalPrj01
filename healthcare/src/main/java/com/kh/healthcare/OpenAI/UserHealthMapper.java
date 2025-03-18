package com.kh.healthcare.OpenAI;

import com.kh.healthcare.alc.report.AlcReportVo;
import com.kh.healthcare.cardiovascularManagement.bloodPressure.BloodPressureVo;
import com.kh.healthcare.cardiovascularManagement.bloodSugar.BloodSugarVo;
import com.kh.healthcare.exercise.aerobic.AerobicHistoryVo;
import com.kh.healthcare.exercise.anAerobic.AnAerobicHistoryVo;
import com.kh.healthcare.livingHealth.drug.DrugVo;
import com.kh.healthcare.livingHealth.sleep.SleepVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserHealthMapper {

    @Select("""
            SELECT
                TO_CHAR(SLEEP_START , 'HH24:MI') AS SLEEP_START
                , TO_CHAR(SLEEP_END , 'HH24:MI') AS SLEEP_END
            FROM SLEEP
            WHERE MEMBER_NO = #{memberNo}
            AND RECORD_DATE BETWEEN TO_DATE(#{startDate}, 'YYYY-MM-DD') AND TO_DATE(#{endDate}, 'YYYY-MM-DD')
            ORDER BY SLEEP_START DESC
            """)
    List<SleepVo> getSleepList(String memberNo, String startDate, String endDate);

    @Select("""
            SELECT
                ALC_TYPE
                , ABV
                , CC
                , TO_CHAR(ENROLL_DATE, 'YYYY-MM-DD') AS ENROLL_DATE
            FROM RECORD_ALC
            WHERE MEMBER_NO = #{memberNo}
            AND ENROLL_DATE BETWEEN TO_DATE(#{startDate}, 'YYYY-MM-DD') AND TO_DATE(#{endDate}, 'YYYY-MM-DD')
            ORDER BY ENROLL_DATE DESC
            """)
    List<AlcReportVo> getAlcList(String memberNo, String startDate, String endDate);

    @Select("""
            SELECT
                TO_CHAR(H.EX_DATE, 'YYYY-MM-DD') AS ENROLL_DATE,
                A.NAME AS EX_NAME,
                H.EX_DURATION AS EXERCISE_MINUTES
            FROM AEROBIC_HISTORY H
            JOIN AEROBIC A ON H.EX_NO = A.NO
            WHERE H.USER_NO = #{memberNo}
            AND H.EX_DATE BETWEEN TO_DATE(#{startDate}, 'YYYY-MM-DD') AND TO_DATE(#{endDate}, 'YYYY-MM-DD')
            ORDER BY H.EX_DATE DESC
            """)
    List<AerobicHistoryVo> getAerobicHistoryList(String memberNo, String startDate, String endDate);

    @Select("""
            SELECT
                TO_CHAR(H.EX_DATE, 'YYYY-MM-DD') AS ENROLL_DATE,
                A.NAME AS EX_NAME,
                H.WEIGHT,
                H.REPS
            FROM ANAEROBIC_HISTORY H
            JOIN ANAEROBIC A ON H.EX_NO = A.NO
            WHERE H.USER_NO = #{memberNo}
            AND H.EX_DATE BETWEEN TO_DATE(#{startDate}, 'YYYY-MM-DD') AND TO_DATE(#{endDate}, 'YYYY-MM-DD')
            ORDER BY H.EX_DATE DESC
            """)
    List<AnAerobicHistoryVo> getAnAerobicHistoryList(String memberNo, String startDate, String endDate);

    @Select("""
            SELECT M.NAME
            FROM USER_MEDICATION U
            JOIN MEDICATION M ON (U.MEDICATION = M.NO)
            WHERE U.MEMBER = #{memberNo}
            AND DEL_YN ='N'
            """)
    List<DrugVo> getDrugList(String memberNo);

    @Select("""
            SELECT
                 SYSTOLE
                , DIASTOLE
                , PULSE
                , TO_CHAR(ENROLL_DATE , 'YYYY-MM-DD') AS DAY
                , TO_CHAR(ENROLL_DATE , 'HH24:MI') AS TIME
                , NOTE
            FROM BLOOD_PRESSURE
            WHERE MEMBER_NO = #{memberNo}
            AND ENROLL_DATE BETWEEN TO_DATE(#{startDate}, 'YYYY-MM-DD') AND TO_DATE(#{endDate}, 'YYYY-MM-DD')
            ORDER BY ENROLL_DATE DESC
            """)
    List<BloodPressureVo> getbloodPressureList(String memberNo, String startDate, String endDate);

    @Select("""
            SELECT
                SUGAR
                , TO_CHAR(ENROLL_DATE , 'YYYY-MM-DD') AS DAY
                , TO_CHAR(ENROLL_DATE , 'HH24:MI') AS TIME
                , NOTE
            FROM BLOOD_SUGAR
            WHERE MEMBER_NO = #{memberNo}
            AND ENROLL_DATE BETWEEN TO_DATE(#{startDate}, 'YYYY-MM-DD') AND TO_DATE(#{endDate}, 'YYYY-MM-DD')
            ORDER BY ENROLL_DATE DESC
            """)
    List<BloodSugarVo> getbloodSugarList(String memberNo, String startDate, String endDate);
}
