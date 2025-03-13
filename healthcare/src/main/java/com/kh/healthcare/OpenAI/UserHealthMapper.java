package com.kh.healthcare.OpenAI;

import com.kh.healthcare.alc.report.AlcReportVo;
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
            AND RECORD_DATE BETWEEN #{startDate} AND #{endDate}
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
            AND ENROLL_DATE BETWEEN #{startDate} AND #{endDate}
            ORDER BY ENROLL_DATE DESC
            """)
    List<AlcReportVo> getAlcList(String memberNo, String startDate, String endDate);
}
