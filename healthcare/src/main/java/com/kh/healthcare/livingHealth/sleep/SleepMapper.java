package com.kh.healthcare.livingHealth.sleep;


import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface SleepMapper {

    @Insert("""
            INSERT INTO SLEEP
             (NO,
             MEMBER_NO,
             SLEEP_START,
             SLEEP_END,
             SLEEP_DURATION,
             SLEEP_DURATION_HOUR,
             RECORD_DATE
             )
             VALUES
             (
             SEQ_SLEEP.NEXTVAL
             ,#{userNo}
             , TO_DATE(TO_CHAR(TO_DATE(#{vo.recordDate}, 'YYYY-MM-DD'), 'YYYY-MM-DD') || #{vo.sleepStart}, 'YYYY-MM-DD HH24:MI')
             , TO_DATE(TO_CHAR(TO_DATE(#{vo.recordDate}, 'YYYY-MM-DD'), 'YYYY-MM-DD') || #{vo.sleepEnd}, 'YYYY-MM-DD HH24:MI')
             , #{vo.sleepDuration}
             , #{vo.sleepDurationHour}
             , TO_DATE(#{vo.recordDate}, 'YYYY-MM-DD')
             )
            """)
    void write(String userNo, SleepVo vo);

    @Select("""
            SELECT NO
            , MEMBER_NO
            , TO_CHAR(SLEEP_START , 'HH24:MI') AS STARTTIME
            , TO_CHAR(SLEEP_END , 'HH24:MI') AS ENDTIME
            , SLEEP_DURATION
            , SLEEP_DURATION_HOUR
            , TO_CHAR(RECORD_DATE , 'YYYY-MM-DD') AS DAY
            FROM SLEEP
            WHERE MEMBER_NO = #{userNo}
            ORDER BY SLEEP_START DESC
            """)
    List<SleepVo> list(String userNo);

    @Update("""
            UPDATE SLEEP
                SET
                    SLEEP_START = TO_DATE(TO_CHAR(TO_DATE(#{vo.recordDate}, 'YYYY-MM-DD'), 'YYYY-MM-DD') || #{vo.sleepStart}, 'YYYY-MM-DD HH24:MI'),
                    SLEEP_END = TO_DATE(TO_CHAR(TO_DATE(#{vo.recordDate}, 'YYYY-MM-DD'), 'YYYY-MM-DD') || #{vo.sleepEnd}, 'YYYY-MM-DD HH24:MI'),
                    SLEEP_DURATION =#{vo.sleepDuration},
                    SLEEP_DURATION_HOUR = #{vo.sleepDurationHour},
                    RECORD_DATE = TO_DATE(#{vo.recordDate}, 'YYYY-MM-DD')
            WHERE MEMBER_NO = #{userNo}
            AND NO =#{vo.no}
            """)
    void edit(String userNo, SleepVo vo);

    @Delete("""
            DELETE SLEEP
            WHERE MEMBER_NO = #{userNo}
            AND NO =#{vo.no}
            """)
    void del(String userNo, SleepVo vo);
}
