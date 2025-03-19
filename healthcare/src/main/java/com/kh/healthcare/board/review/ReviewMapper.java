package com.kh.healthcare.board.review;

import com.kh.healthcare.board.honeyTip.SearchFilterVo;
import org.apache.ibatis.annotations.*;

import java.util.List;
@Mapper
public interface ReviewMapper {
    List<ReviewVo> list(SearchFilterVo filterVo);

    List<ReviewHospitalVo> searchHospital(SearchFilterVo filterVo);

    @Insert("""
            INSERT INTO REVIEW_BOARD
            (   
                NO
                , MEMBER_NO
                , HOSPITAL_NO
                , DEPARTMENT
                , VISIT_DATE
                , TITLE
                , CONTENT
                , RATING
            )
            VALUES
            (
                SEQ_REVIEW_BOARD.NEXTVAL
                , #{memberNo}
                , #{hospitalNo}
                , #{department}
                , TO_DATE(REPLACE(#{visitDate}, 'T', ' '), 'YYYY-MM-DD HH24:MI')
                , #{title}
                , #{content}
                , #{rating}
            )
            """)
    int write(ReviewVo vo);

    int insertAttachReview(List<ReviewAttachVo> attachVoList);

    @Select("""
            SELECT
                B.NO
                , M.NICK
                , B.MEMBER_NO
                , B.HOSPITAL_NO
                , H.NAME
                , B.TITLE
                , B.CONTENT
                , B.ENROLL_DATE
                , B.MODIFY_DATE
                , (SELECT COUNT(*) FROM REVIEW_COMMENT BC WHERE BC.REVIEW_NO = B.NO) AS COMMENT_COUNT
                , B.RATING
                , B.DEPARTMENT
                , TO_CHAR(B.VISIT_DATE , 'YYYY-MM-DD') AS VISIT_DATE
            FROM REVIEW_BOARD B
            JOIN HOSPITAL H ON ( B.HOSPITAL_NO = H.NO )
            JOIN MEMBER M ON ( B.MEMBER_NO = M.NO )
            WHERE B.NO = #{bno}
            AND B.DEL_YN = 'N'
            """)
    ReviewVo detailVo(String bno);

    @Select("""
            SELECT
                NO
                ,REVIEW_NO
                ,ORIGIN_NAME
                ,PATH
                ,UPLOAD_DATE
            FROM REVIEW_ATTACHMENT
            WHERE REVIEW_NO = #{bno}
            AND DEL_YN = 'N'
            """)
    List<ReviewAttachVo> detailAttachList(String bno);

    @Insert("""
            INSERT INTO REPORTED_REVIEW
            (
                NO
                , REPORT_TYPE
                , REVIEW_NO
                , MEMBER_NO
            )
            VALUES
            (
                SEQ_REPORTED_REVIEW.NEXTVAL
                , #{reportType}
                , #{reviewNo}
                , #{memberNo}
            )
            """)
    int reportBoard(ReviewReportVo vo);

    @Update("""
            UPDATE REVIEW_BOARD
            SET
                DEL_YN = 'Y'
            WHERE NO = #{no}
            """)
    int deleteReview(ReviewVo vo);

    @Insert("""
            INSERT INTO REVIEW_COMMENT
            (
                NO
                , MEMBER_NO
                , REVIEW_NO
                , CONTENT
            )
            VALUES
            (
                SEQ_REVIEW_COMMENT.NEXTVAL
                , #{memberNo}
                , #{reviewNo}
                , #{content}
            )
            """)
    int commentWrite(ReviewCommentVo vo);

    @Update("""
            UPDATE REVIEW_COMMENT
            SET
                DEL_YN = 'Y'
            WHERE NO = #{no}
            """)
    int commentDelete(ReviewCommentVo vo);

    @Select("""
            SELECT
                B.NO
                , B.MEMBER_NO
                , B.REVIEW_NO
                , B.CONTENT
                , M.NICK,
                CASE
                    WHEN TRUNC(B.ENROLL_DATE) = TRUNC(SYSDATE)
                    THEN TO_CHAR(B.ENROLL_DATE, 'HH24:MI')
                    ELSE TO_CHAR(B.ENROLL_DATE, 'YY.MM.DD')
                END AS ENROLL_DATE
            FROM REVIEW_COMMENT B
            JOIN MEMBER M ON ( B.MEMBER_NO = M.NO )
            WHERE B.REVIEW_NO = #{bno}
            AND B.DEL_YN = 'N'
            ORDER BY B.NO DESC
            """)
    List<ReviewCommentVo> commentList(String bno);

    @Update("""
            UPDATE REVIEW_ATTACHMENT
            SET
                DEL_YN = 'Y'
            WHERE NO = #{no}
            """)
    void deleteAttach(ReviewAttachVo deleteFile);

    @Update("""
            UPDATE REVIEW_BOARD
            SET
                TITLE = #{title}
                , CONTENT = #{content}
                , HOSPITAL_NO = #{hospitalNo}
                , VISIT_DATE = TO_DATE(REPLACE(#{visitDate}, 'T', ' '), 'YYYY-MM-DD HH24:MI')
                , DEPARTMENT = #{department}
                , RATING = #{rating}
            WHERE NO = #{no}               
            """)
    int edit(ReviewVo vo);


    @Insert("""
            INSERT INTO REVIEW_ATTACHMENT
            (
                NO
                , REVIEW_NO
                , ORIGIN_NAME
                , PATH
            )
            VALUES
            (
                SEQ_REVIEW_ATTACHMENT.NEXTVAL
                , #{bno}
                , #{attachVo.originName}
                , #{attachVo.path}
            )
            """)
    int editAttachReview(ReviewAttachVo attachVo, String bno);


    @Select("""
            SELECT
                MIN(R.NO) AS NO,
                B.TITLE,
                R.REPORT_TYPE,
                RT.NAME AS NAME,
                R.REVIEW_NO,
                R.MEMBER_NO,
                TO_CHAR(MIN(R.ENROLL_DATE), 'YYYY-MM-DD-HH24:MI') AS ENROLL_DATE,
                M.NICK,
                COUNT(*) AS REPORT_COUNT
            FROM REPORTED_REVIEW R
            JOIN REPORT_TYPE RT ON R.REPORT_TYPE = RT.NO
            JOIN REVIEW_BOARD B ON ( R.REVIEW_NO = B.NO )
            JOIN MEMBER M ON B.MEMBER_NO = M.NO
            GROUP BY R.REVIEW_NO, R.REPORT_TYPE, RT.NAME, R.MEMBER_NO, M.NICK , B.TITLE
            ORDER BY NO DESC
            """)
    List<ReviewReportVo> reportedList();

    @Delete("""
            DELETE REPORTED_REVIEW
            WHERE REVIEW_NO = #{no}
            """)
    void deleteReportedReview(ReviewVo vo);

    @Select("""
            SELECT
                MIN(RBC.NO) AS NO,
                BC.CONTENT,
                RBC.REPORT_TYPE,
                RT.NAME AS NAME,
                RBC.COMMENT_NO,
                BC.REVIEW_NO,
                RBC.MEMBER_NO,
                TO_CHAR(MIN(RBC.ENROLL_DATE), 'YYYY-MM-DD-HH24:MI') AS ENROLL_DATE,
                M.NICK,
                COUNT(*) AS REPORT_COUNT
            FROM REPORTED_REVIEW_COMMENT RBC
            JOIN REPORT_TYPE RT ON RBC.REPORT_TYPE = RT.NO
            JOIN REVIEW_COMMENT BC ON ( RBC.COMMENT_NO = BC.NO )
            JOIN MEMBER M ON BC.MEMBER_NO = M.NO
            GROUP BY RBC.COMMENT_NO, RBC.REPORT_TYPE, RT.NAME, RBC.MEMBER_NO, M.NICK , BC.CONTENT , BC.REVIEW_NO
            ORDER BY NO DESC
            """)
    List<ReviewCommentReportVo> reportedCommentList();

    @Delete("""
            DELETE REPORTED_REVIEW_COMMENT
            WHERE COMMENT_NO = #{no}
            """)
    void deleteReportedReviewComment(ReviewCommentVo vo);

    @Insert("""
            INSERT INTO REPORTED_REVIEW_COMMENT
            (
                NO
                , REPORT_TYPE
                , COMMENT_NO
                , MEMBER_NO
            )
            VALUES
            (
                SEQ_REPORTED_REVIEW_COMMENT.NEXTVAL
                , #{reportType}
                , #{commentNo}
                , #{memberNo}
            )
            """)
    int commentReport(ReviewCommentReportVo vo);
}
