package com.kh.healthcare.cardiovascularManagement.bloodPressure;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BloodPressureMapper {


    int bloodPressureWrite(BloodPressureVo vo);

    @Select("""
            SELECT 
                NO
                , MEMBER_NO
                , SYSTOLE
                , DIASTOLE
                , PULSE
                , TO_CHAR(ENROLL_DATE , 'YYYY-MM-DD') AS DAY
                , TO_CHAR(ENROLL_DATE , 'MM-DD-HH24:MI') AS MDAY
                , TO_CHAR(ENROLL_DATE , 'HH24:MI') AS TIME
                , TO_CHAR(ENROLL_DATE , 'YYYY-MM-DD-HH24:MI') AS ENROLL_DATE
                , NOTE
            FROM BLOOD_PRESSURE
            WHERE MEMBER_NO = #{memberNo}
            ORDER BY ENROLL_DATE DESC
            """)
    List<BloodPressureVo> bloodPressureList(String memberNo);

    @Update("""
            UPDATE BLOOD_PRESSURE
                SET
                    ENROLL_DATE = TO_DATE(REPLACE(#{enrollDate}, 'T', ' '), 'YYYY-MM-DD HH24:MI')
                    , SYSTOLE = #{systole}
                    , DIASTOLE = #{diastole}
                    , PULSE = #{pulse}
                    , NOTE = #{note}
                WHERE NO = #{no}
            """)
    int bloodPressureEdit(BloodPressureVo vo);

    @Delete("""
            DELETE BLOOD_PRESSURE
            WHERE NO = #{no}
            AND MEMBER_NO = #{memberNo}
            """)
    int bloodPressureDelete(BloodPressureVo vo);

    @Select("""
            SELECT COUNT(*)
            FROM BLOOD_PRESSURE
            WHERE MEMBER_NO = #{userNo}
            AND TRUNC(ENROLL_DATE) = TRUNC(SYSDATE)
            """)
    int checkTodayBloodPressure(String userNo);

    @Select("""
            SELECT COUNT(*)
            FROM NOTIFICATION_SETTINGS
            WHERE
                MEMBER_NO = #{userNo}
                AND ALL_PUSH = 'Y'
                AND BLOOD_PRESSURE_PUSH = 'Y'
            """)
    int isBloodPressurePushEnabled(String userNo);
}
