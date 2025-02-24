package com.kh.healthcare.exercise.anAerobic;

import com.kh.healthcare.member.MemberVo;
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
            VALUES (ANAEROBIC_BOOKMARK_SEQ.NEXTVAL, #{userNo}, #{no})
            """)
    void mark(String userNo, String no);

    //상세정보 가저오기
    @Select("""
            SELECT NO, NAME, DESCRIPTION, IMAGE_URL, GUIDE, CAL_CONSUME, EX_PART
            FROM ANAEROBIC
            WHERE NAME = #{name}
            """)
    AnAerobicVo findExByName(String name);
}
