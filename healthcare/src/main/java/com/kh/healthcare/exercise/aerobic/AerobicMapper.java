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
            VALUES (AEROBIC_BOOKMARK_SEQ.NEXTVAL, #{userNo}, #{no})
            """)
    void mark(String userNo, String no);

    //상세정보 가저오기
    @Select("""
            SELECT NO, NAME, DESCRIPTION, IMAGE_URL, GUIDE, CAL_CONSUME
            FROM AEROBIC
            WHERE NAME = #{name}
            """)
    AerobicVo findExByName(String name);
}
