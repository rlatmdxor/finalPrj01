package com.kh.healthcare.exercise.anAerobic;

import com.kh.healthcare.exercise.aerobic.AerobicHistoryVo;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AnAerobicMapper {

    //북마크가 아닌 운동 리스트 조회
    @Select("""
            SELECT NO, NAME, EX_PART
            FROM ANAEROBIC
            WHERE NO NOT IN (
                SELECT EX_NO FROM ANAEROBIC_BOOKMARK WHERE USER_NO = #{no}
            )
            ORDER BY NO ASC
            """)
    List<AnAerobicVo> getList(String no);

    //북마크 된 리스트 조회
    @Select("""
            SELECT A.NO, A.NAME, A.EX_PART
            FROM ANAEROBIC A
            JOIN ANAEROBIC_BOOKMARK B ON A.NO = B.EX_NO
            WHERE B.USER_NO = #{no}
            ORDER BY NO ASC
            """)
    List<AnAerobicVo> getBookmarkList(String no);

    //북마크 해제
    @Delete("""
            DELETE FROM ANAEROBIC_BOOKMARK
            WHERE USER_NO = #{userNo}
            AND EX_NO = #{no}
            """)
    void unmark(String userNo, String no);

    //북마크 등록
    @Insert("""
            INSERT INTO ANAEROBIC_BOOKMARK (NO, USER_NO, EX_NO)
            VALUES (SEQ_ANAEROBIC_BOOKMARK.NEXTVAL, #{userNo}, #{no})
            """)
    void mark(String userNo, String no);

    //상세정보 가저오기
    @Select("""
            SELECT NO, NAME, DESCRIPTION, IMAGE_URL, GUIDE, CAL_CONSUME, EX_PART
            FROM ANAEROBIC
            WHERE NAME = #{name}
            """)
    AnAerobicVo findExByName(String name);

    //운동 번호 가져오기
    @Select("""
            SELECT NO
            FROM ANAEROBIC
            WHERE NAME = #{name}
            """)
    AnAerobicVo findExNoByName(String name);

    //운동 내역 겹치는지 확인
    @Select("""
            SELECT COUNT(*) FROM ANAEROBIC_HISTORY
            WHERE USER_NO = #{userNo}
                AND EX_DATE = TO_DATE(#{vo.exDate}, 'YYYY-MM-DD')
                AND EX_NO = #{exNo}
            """)
    int countOverlappingRecords(String userNo, AnAerobicHistoryVo vo, String exNo);

    //운동 내역 기록
    @Insert("""
            INSERT INTO ANAEROBIC_HISTORY
            (NO, USER_NO, EX_NO, EX_DATE, WEIGHT, REPS)
            VALUES (
                SEQ_ANAEROBIC_HISTORY.NEXTVAL,
                #{userNo}, #{exNo},
                TO_DATE(#{vo.exDate}, 'YYYY-MM-DD'),
                #{vo.weight},
                #{vo.reps}
            )
            """)
    void record(String userNo, String exNo, AnAerobicHistoryVo vo);

    //수정하려는 내역의 날짜 가져오기
    @Select("""
            SELECT TO_CHAR(EX_DATE, 'YYYY-MM-DD') AS EX_DATE
            FROM ANAEROBIC_HISTORY
            WHERE
                USER_NO = #{userNo}
                AND NO = #{vo.no}
            """)
    String getDate(String userNo, AnAerobicHistoryVo vo);

    //운동 내역 업데이트
    @Update("""
            UPDATE ANAEROBIC_HISTORY
            SET
                EX_DATE = TO_DATE(#{vo.exDate}, 'YYYY-MM-DD'),
                WEIGHT = #{vo.weight},
                REPS = #{vo.reps}
            WHERE
                USER_NO = #{userNo}
                AND NO = #{vo.no}
            """)
    void updateAnAerobic(String userNo, AnAerobicHistoryVo vo);

    //운동 내역 삭제
    @Delete("""
            DELETE FROM ANAEROBIC_HISTORY
            WHERE USER_NO = #{userNo}
            AND NO = #{vo.no}
            """)
    boolean deleteAnAerobic(String userNo, AnAerobicHistoryVo vo);

}
