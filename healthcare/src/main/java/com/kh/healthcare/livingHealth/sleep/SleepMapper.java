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
             RECORD_DATE
             )
             VALUES
             (
             SEQ_SLEEP.NEXTVAL
             ,#{userNo}
             , TO_DATE((TO_DATE(#{vo.recordDate}) || #{vo.sleepStart} ), 'YYYY-MM-DD HH24:MI')
             , TO_DATE((TO_DATE(#{vo.recordDate}) || #{vo.sleepEnd} ), 'YYYY-MM-DD HH24:MI')
             , #{vo.sleepDuration}
             , TO_DATE(#{vo.recordDate})
             )
            
            """)
    void write(String userNo, SleepVo vo);

    @Select("""
            SELECT NO
            , MEMBER_NO
            , TO_CHAR(SLEEP_START , 'HH24:MI') AS STARTTIME
            , TO_CHAR(SLEEP_END , 'HH24:MI') AS ENDTIME
            , SLEEP_DURATION
            , TO_CHAR(RECORD_DATE , 'YYYY-MM-DD') AS DAY
            FROM SLEEP
            WHERE MEMBER_NO = #{userNo}
            ORDER BY SLEEP_START DESC
            """)
    List<SleepVo> list(String userNo);

    @Update("""
            UPDATE SLEEP
                SET
                    SLEEP_START = TO_DATE((TO_DATE(#{vo.recordDate}) || #{vo.sleepStart} ), 'YYYY-MM-DD HH24:MI'),
                    SLEEP_END =TO_DATE((TO_DATE(#{vo.recordDate}) || #{vo.sleepEnd} ), 'YYYY-MM-DD HH24:MI'),
                    SLEEP_DURATION =#{vo.sleepDuration},
                    RECORD_DATE = TO_DATE(#{vo.recordDate})
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
