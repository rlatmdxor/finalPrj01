package com.kh.healthcare.board.honeyTip;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface HoneyTipMapper {


    List<HoneyTipVo> list(SearchFilterVo filterVo);

    @Insert("""
            INSERT INTO BOARD
            (   
                NO
                ,CATEGORY_NO
                ,MEMBER_NO
                ,TITLE
                ,CONTENT
            )
            VALUES
            (
                SEQ_BOARD.NEXTVAL
                , #{categoryNo}
                , #{memberNo}
                , #{title}
                , #{content}
            )
            """)
    int write(HoneyTipVo vo);

    int insertAttachHoneyBoard(List<HoneyTipAttachVo> attachVoList);

    @Select("""
            SELECT
                B.NO
                , B.CATEGORY_NO
                , C.NAME AS CATEGORY_NAME
                , M.NICK
                , B.MEMBER_NO
                , B.TITLE
                , B.CONTENT
                , (SELECT COUNT(*) FROM BOARD_RECOMMEND R WHERE R.BOARD_NO = B.NO) AS RECOMMEND_COUNT
                , B.HIT
                , B.ENROLL_DATE
                , B.MODIFY_DATE
            FROM BOARD B
            JOIN CATEGORY C ON ( B.CATEGORY_NO = C.NO )
            JOIN MEMBER M ON ( B.MEMBER_NO = M.NO )
            WHERE B.NO = #{bno}
            AND B.DEL_YN = 'N'
            """)
    HoneyTipVo detailVo(String bno);

    @Select("""
            SELECT
                NO
                ,ORIGIN_NAME
                ,PATH
                ,UPLOAD_DATE
            FROM BOARD_ATTACHMENT
            WHERE BOARD_NO = #{bno}
            AND DEL_YN = 'N'
            """)
    List<HoneyTipAttachVo> detailAttachList(String bno);

    @Select("""
            SELECT COUNT( * )
            FROM BOARD_RECOMMEND
            WHERE MEMBER_NO = #{memberNo}
            AND BOARD_NO = #{bno}
            """)
    int isRecommend(String bno , String memberNo);

    @Insert("""
            INSERT INTO BOARD_RECOMMEND
            (
                BOARD_NO
                , MEMBER_NO
            )
            VALUES
            (
                #{bno}
                ,#{memberNo}
            )
            """)
    void thumbsUp(BoardRecommendVo vo);

    @Delete("""
            DELETE FROM BOARD_RECOMMEND
            WHERE BOARD_NO = #{bno}
            AND MEMBER_NO = #{memberNo}
            """)
    void thumbsDown(BoardRecommendVo vo);

    @Select("""
            SELECT COUNT(*) FROM BOARD_RECOMMEND WHERE BOARD_NO = #{bno}
            """)
    int getCountLike(String bno);

    @Update("""
            UPDATE BOARD
            SET
                HIT = HIT+1
            WHERE NO = #{bno}
            AND DEL_YN = 'N'
            """)
    void increaseHit(String bno);

    @Insert("""
            INSERT INTO REPORTED_HONEY_TIP
            (
                NO
                , REPORT_TYPE
                , BOARD_NO
                , MEMBER_NO
            )
            VALUES
            (
                SEQ_REPORTED_HONEY_TIP.NEXTVAL
                , #{reportType}
                , #{boardNo}
                , #{memberNo}
            )
            """)
    int reportBoard(HoneyTipReportVo vo);

    @Update("""
            UPDATE BOARD
            SET
                DEL_YN = 'Y'
            WHERE NO = #{no}
            AND MEMBER_NO = #{memberNo}
            """)
    int deleteHoneyTip(HoneyTipVo vo);

    @Insert("""
            INSERT INTO BOARD_COMMENT
            (
                NO
                , MEMBER_NO
                , BOARD_NO
                , CONTENT
            )
            VALUES
            (
                SEQ_BOARD_COMMENT.NEXTVAL
                , #{memberNo}
                , #{boardNo}
                , #{content}
            )
            """)
    int commentWrite(HoneyTipCommentVo vo);

    @Update("""
            UPDATE BOARD_COMMENT
            SET
                DEL_YN = 'Y'
            WHERE NO = #{no}
            AND MEMBER_NO = #{memberNo}
            AND BOARD_NO = #{boardNo}
            """)
    int commentDelete(HoneyTipCommentVo vo);


    @Insert("""
            INSERT INTO REPORTED_BOARD_COMMENT
            (
                NO
                , REPORT_TYPE
                , COMMENT_NO
                , MEMBER
            )
            VALUES
            (
                SEQ_REPORTED_BOARD_COMMENT.NEXTVAL
                , #{reportType}
                , #{commentNo}
                , #{memberNo}
            )
            """)
    int commentReport(HoneyTipCommentReportVo vo);

    @Select("""
            SELECT
                B.NO
                , B.MEMBER_NO
                , B.BOARD_NO
                , B.CONTENT
                , B.ENROLL_DATE
                , M.NICK
            FROM BOARD_COMMENT B
            JOIN MEMBER M ON ( B.MEMBER_NO = M.NO )
            WHERE B.BOARD_NO = #{bno}
            AND B.DEL_YN = 'N'
            """)
    List<HoneyTipCommentVo> commentList(String bno);
}








