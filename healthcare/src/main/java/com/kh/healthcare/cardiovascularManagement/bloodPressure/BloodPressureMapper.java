package com.kh.healthcare.cardiovascularManagement.bloodPressure;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

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
            )
            VALUES
            (
                SEQ_BLOOD_PRESSURE.NEXTVAL
                , "1"
                , #{systole}
                , #{diastole}
                , #{pulse}
            )
            """)
    String bloodPressureWrite(BloodPressureVo vo);

    @Select("""
            SELECT 
                NO
                , MEMBER_NO
                , SYSTOLE
                , DIASTOLE
                , PULSE
                , TO_CHAR(ENROLL_DATE , 'YYYY-MM-DD') AS DAY
                , TO_CHAR(ENROLL_DATE , 'HH24:MI') AS TIME
                , NOTE
            FROM BLOOD_PRESSURE
            WHERE MEMBER_NO = #{memberNo}
            """)
    List<BloodPressureVo> bloodPressureList(String memberNo);

}
