package com.kh.healthcare.exercise.aerobic;

import com.kh.healthcare.exercise.anAerobic.AnAerobicVo;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AerobicMapper {

    //북마크가 아닌 운동 리스트 조회
    @Select("""
            SELECT NO, NAME
            FROM AEROBIC
            WHERE NO NOT IN (
                SELECT EX_NO FROM AEROBIC_BOOKMARK WHERE USER_NO = #{no}
            )
            ORDER BY NO ASC
            """)
    List<AerobicVo> getList(String no);

    //북마크 된 리스트 조회
    @Select("""
            SELECT A.NO, A.NAME
            FROM AEROBIC A
            JOIN AEROBIC_BOOKMARK B ON A.NO = B.EX_NO
            WHERE B.USER_NO = #{no}
            ORDER BY NO ASC
            """)
    List<AerobicVo> getBookmarkList(String no);

    //북마크 해제
    @Delete("""
            DELETE FROM AEROBIC_BOOKMARK
            WHERE USER_NO = #{userNo}
            AND EX_NO = #{no}
            """)
    void unmark(String userNo, String no);

    //북마크 등록
    @Insert("""
            INSERT INTO AEROBIC_BOOKMARK (NO, USER_NO, EX_NO)
            VALUES (SEQ_AEROBIC_BOOKMARK.NEXTVAL, #{userNo}, #{no})
            """)
    void mark(String userNo, String no);

    //상세정보 가저오기
    @Select("""
            SELECT NO, NAME, DESCRIPTION, IMAGE_URL, GUIDE, CAL_CONSUME
            FROM AEROBIC
            WHERE NAME = #{name}
            """)
    AerobicVo findExByName(String name);

    //운동 번호 가져오기
    @Select("""
            SELECT NO
            FROM AEROBIC
            WHERE NAME = #{name}
            """)
    AerobicVo findExNoByName(String name);

    //운동 내역 겹치는지 확인
    @Select("""
            SELECT COUNT(*) FROM AEROBIC_HISTORY
            WHERE USER_NO = #{userNo}
              AND EX_DATE = TO_DATE(#{vo.exDate}, 'YYYY-MM-DD')
              AND (
                   (START_TIME <= TO_TIMESTAMP(#{vo.exDate} || ' ' || #{vo.startTime}, 'YYYY-MM-DD HH24:MI')
                   AND END_TIME > TO_TIMESTAMP(#{vo.exDate} || ' ' || #{vo.startTime}, 'YYYY-MM-DD HH24:MI'))
                   OR
                   (START_TIME < TO_TIMESTAMP(#{vo.exDate} || ' ' || #{vo.endTime}, 'YYYY-MM-DD HH24:MI')
                   AND END_TIME >= TO_TIMESTAMP(#{vo.exDate} || ' ' || #{vo.endTime}, 'YYYY-MM-DD HH24:MI'))
                   OR
                   (START_TIME >= TO_TIMESTAMP(#{vo.exDate} || ' ' || #{vo.startTime}, 'YYYY-MM-DD HH24:MI')
                   AND END_TIME <= TO_TIMESTAMP(#{vo.exDate} || ' ' || #{vo.endTime}, 'YYYY-MM-DD HH24:MI'))
              )
            """)
    int countOverlappingRecords(@Param("userNo") String userNo, @Param("vo") AerobicHistoryVo vo);

    //운동 내역 기록
    @Insert("""
            INSERT INTO AEROBIC_HISTORY
            (NO, USER_NO, EX_NO, EX_DATE, EX_DURATION, START_TIME, END_TIME)
            VALUES (
                SEQ_AEROBIC_HISTORY.NEXTVAL,
                #{userNo}, #{exNo},
                TO_DATE(#{vo.exDate}, 'YYYY-MM-DD'),
                #{vo.exDuration},
                TO_TIMESTAMP(#{vo.exDate} || ' ' || #{vo.startTime}, 'YYYY-MM-DD HH24:MI'),
                TO_TIMESTAMP(#{vo.exDate} || ' ' || #{vo.endTime}, 'YYYY-MM-DD HH24:MI')
            )
            """)
    void record(String userNo, String exNo, AerobicHistoryVo vo);

    //수정하려는 내역의 날짜 가져오기
    @Select("""
            SELECT TO_CHAR(EX_DATE, 'YYYY-MM-DD') AS EX_DATE
            FROM AEROBIC_HISTORY
            WHERE
                USER_NO = #{userNo}
                AND NO = #{vo.no}
            """)
    String getDate(String userNo, AerobicHistoryVo vo);
    
    //운동 내역 업데이트
    @Update("""
            UPDATE AEROBIC_HISTORY
            SET
                EX_DATE = TO_DATE(#{vo.exDate}, 'YYYY-MM-DD'),
                EX_DURATION = #{vo.exDuration},
                START_TIME = TO_TIMESTAMP(#{vo.exDate} || ' ' || #{vo.startTime}, 'YYYY-MM-DD HH24:MI'),
                END_TIME = TO_TIMESTAMP(#{vo.exDate} || ' ' || #{vo.endTime}, 'YYYY-MM-DD HH24:MI')
            WHERE
                USER_NO = #{userNo}
                AND NO = #{vo.no}
            """)
    void updateAerobic(String userNo, AerobicHistoryVo vo);

    //운동 내역 삭제
    @Delete("""
            DELETE FROM AEROBIC_HISTORY
            WHERE USER_NO = #{userNo}
            AND NO = #{vo.no}
            """)
    boolean deleteAerobic(String userNo, AerobicHistoryVo vo);

}
