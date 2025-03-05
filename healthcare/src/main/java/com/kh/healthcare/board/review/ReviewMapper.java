package com.kh.healthcare.board.review;

import com.kh.healthcare.board.honeyTip.SearchFilterVo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

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
            AND MEMBER_NO = #{memberNo}
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
            AND MEMBER_NO = #{memberNo}
            AND REVIEW_NO = #{reviewNo}
            """)
    int commentDelete(ReviewCommentVo vo);

    @Select("""
            SELECT
                B.NO
                , B.MEMBER_NO
                , B.REVIEW_NO
                , B.CONTENT
                , B.ENROLL_DATE
                , M.NICK
            FROM REVIEW_COMMENT B
            JOIN MEMBER M ON ( B.MEMBER_NO = M.NO )
            WHERE B.REVIEW_NO = #{bno}
            AND B.DEL_YN = 'N'
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
}
