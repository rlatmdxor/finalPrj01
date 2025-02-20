package com.kh.healthcare.livingHealth.sleep;


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
             , '1'
             , TO_DATE((TO_DATE(#{recordDate}) || #{sleepStart} ), 'YYYY-MM-DD HH24:MI')
             , TO_DATE((TO_DATE(#{recordDate}) || #{sleepEnd} ), 'YYYY-MM-DD HH24:MI')
             , #{sleepDuration}
             , TO_DATE(#{recordDate})
             )
            
            """)
    void write(SleepVo vo);

    @Select("""
            SELECT NO
            , MEMBER_NO
            , TO_CHAR(SLEEP_START , 'HH24:MI') AS STARTTIME
            , TO_CHAR(SLEEP_END , 'HH24:MI') AS ENDTIME
            , SLEEP_DURATION
            , TO_CHAR(RECORD_DATE , 'YYYY-MM-DD') AS DAY
            FROM SLEEP
            ORDER BY SLEEP_START DESC
            """)
    List<SleepVo> list();

    @Update("""
            UPDATE SLEEP
                SET
                    SLEEP_START = TO_DATE((TO_DATE(#{recordDate}) || #{sleepStart} ), 'YYYY-MM-DD HH24:MI'),
                    SLEEP_END =TO_DATE((TO_DATE(#{recordDate}) || #{sleepEnd} ), 'YYYY-MM-DD HH24:MI'),
                    SLEEP_DURATION =#{sleepDuration},
                    RECORD_DATE = TO_DATE(#{recordDate})
            WHERE MEMBER_NO = '1'
            AND NO =#{no}
            """)
    void edit(SleepVo vo);
}
