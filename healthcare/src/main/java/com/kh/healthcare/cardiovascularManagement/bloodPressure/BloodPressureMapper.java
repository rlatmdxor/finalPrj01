package com.kh.healthcare.cardiovascularManagement.bloodPressure;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BloodPressureMapper {

    @Insert("""
            INSERT INTO BLOOD_PRESSURE
            (
               	NO
                , MEMBER_NO
                , SYSTOLE	
                , DIASTOLE	
                , PULSE
                , ENROLL_DATE
                , NOTE
            )
            VALUES
            (
                SEQ_BLOOD_PRESSURE.NEXTVAL
                , '1'
                , #{systole}
                , #{diastole}
                , #{pulse}
                , TO_DATE(REPLACE(#{enrollDate}, 'T', ' '), 'YYYY-MM-DD HH24:MI')
                , #{note}
            )
            """)
    int bloodPressureWrite(BloodPressureVo vo);

    @Select("""
            SELECT 
                NO
                , MEMBER_NO
                , SYSTOLE
                , DIASTOLE
                , PULSE
                , TO_CHAR(ENROLL_DATE , 'YYYY-MM-DD') AS DAY
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
    void bloodPressureDelete(BloodPressureVo vo);

}
