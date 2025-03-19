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
                ,BOARD_NO
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
            """)
    int commentDelete(HoneyTipCommentVo vo);


    @Insert("""
            INSERT INTO REPORTED_BOARD_COMMENT
            (
                NO
                , REPORT_TYPE
                , COMMENT_NO
                , MEMBER_NO
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
                , M.NICK,
                CASE
                    WHEN TRUNC(B.ENROLL_DATE) = TRUNC(SYSDATE)
                    THEN TO_CHAR(B.ENROLL_DATE, 'HH24:MI')
                    ELSE TO_CHAR(B.ENROLL_DATE, 'YY.MM.DD')
                END AS ENROLL_DATE
            FROM BOARD_COMMENT B
            JOIN MEMBER M ON ( B.MEMBER_NO = M.NO )
            WHERE B.BOARD_NO = #{bno}
            AND B.DEL_YN = 'N'
            ORDER BY B.NO DESC
            """)
    List<HoneyTipCommentVo> commentList(String bno);



    @Update("""
            UPDATE BOARD
            SET
                TITLE = #{title}
                , CONTENT = #{content}
                , CATEGORY_NO = #{categoryNo}
            WHERE NO = #{no}               
            """)
    int edit(HoneyTipVo vo);



    @Update("""
            UPDATE BOARD_ATTACHMENT
            SET
                DEL_YN = 'Y'
            WHERE NO = #{no}
            """)
    void deleteAttach(HoneyTipAttachVo vo);

    @Insert("""
            INSERT INTO BOARD_ATTACHMENT
            (
                NO
                , BOARD_NO
                , ORIGIN_NAME
                , PATH
            )
            VALUES
            (
                SEQ_BOARD_ATTACHMENT.NEXTVAL
                , #{bno}
                , #{attachVo.originName}
                , #{attachVo.path}
            )
            """)
    int editAttachHoneyBoard(HoneyTipAttachVo attachVo, String bno);

    @Select("""
            SELECT COUNT(*)
            FROM NOTIFICATION_SETTINGS
            WHERE
                MEMBER_NO = #{userNo}
                AND ALL_PUSH = 'Y'
                AND COMMENT_PUSH = 'Y'
            """)
    int isCommentPushEnabled(String userNo);

    @Select("""
            SELECT COUNT(*)
            FROM BOARD_COMMENT
            WHERE BOARD_NO IN (
                SELECT NO
                FROM BOARD
                WHERE MEMBER_NO = #{userNo}
            )
            AND DEL_YN = 'N'
            AND NOTIFIED_YN = 'N'
            """)
    int checkNewComment(String userNo);
//            AND ENROLL_DATE > SYSDATE - INTERVAL '1' MINUTE

    @Select("""
            SELECT
                MIN(R.NO) AS NO,
                B.TITLE,
                R.REPORT_TYPE,
                RT.NAME AS NAME,
                R.BOARD_NO,
                R.MEMBER_NO,
                TO_CHAR(MIN(R.ENROLL_DATE), 'YYYY-MM-DD-HH24:MI') AS ENROLL_DATE,
                M.NICK,
                COUNT(*) AS REPORT_COUNT
            FROM REPORTED_HONEY_TIP R
            JOIN REPORT_TYPE RT ON R.REPORT_TYPE = RT.NO
            JOIN BOARD B ON ( R.BOARD_NO = B.NO )
            JOIN MEMBER M ON B.MEMBER_NO = M.NO
            GROUP BY R.BOARD_NO, R.REPORT_TYPE, RT.NAME, R.MEMBER_NO, M.NICK , B.TITLE
            ORDER BY NO DESC
            """)
    List<HoneyTipReportVo> reportedList();

    @Delete("""
            DELETE REPORTED_HONEY_TIP
            WHERE BOARD_NO = #{no}
            """)
    void deleteReportedHoneyTip(HoneyTipVo vo);


    @Select("""
            SELECT
                MIN(RBC.NO) AS NO,
                BC.CONTENT,
                RBC.REPORT_TYPE,
                RT.NAME AS NAME,
                RBC.COMMENT_NO,
                BC.BOARD_NO,
                RBC.MEMBER_NO,
                TO_CHAR(MIN(RBC.ENROLL_DATE), 'YYYY-MM-DD-HH24:MI') AS ENROLL_DATE,
                M.NICK,
                COUNT(*) AS REPORT_COUNT
            FROM REPORTED_BOARD_COMMENT RBC
            JOIN REPORT_TYPE RT ON RBC.REPORT_TYPE = RT.NO
            JOIN BOARD_COMMENT BC ON ( RBC.COMMENT_NO = BC.NO )
            JOIN MEMBER M ON BC.MEMBER_NO = M.NO
            GROUP BY RBC.COMMENT_NO, RBC.REPORT_TYPE, RT.NAME, RBC.MEMBER_NO, M.NICK , BC.CONTENT , BC.BOARD_NO
            ORDER BY NO DESC
            """)
    List<HoneyTipCommentReportVo> reportedCommentList();

    @Delete("""
            DELETE REPORTED_BOARD_COMMENT
            WHERE COMMENT_NO = #{no}
            """)
    void deleteReportedHoneyTipComment(HoneyTipCommentVo vo);

    @Delete("""
            DELETE REPORTED_BOARD_COMMENT
            WHERE BOARD_NO = #{no}
            """)
    void deleteReportedHoneyTipCommentByHoneyTipNo(HoneyTipVo vo);

    @Update("""
            UPDATE BOARD_COMMENT
            SET
                NOTIFIED_YN = 'Y'
            WHERE
                MEMBER_NO = #{userNo}
            """)
    void markCommentsAsNotified(String userNo);
}








