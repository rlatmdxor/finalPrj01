package com.kh.healthcare.challenger;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface ChallengerMapper {

    @Select("""
            SELECT
             C.NO
             , C.TITLE
             , C.CONTENT
             , C.WRITER
             , C.RECRUITMENT_START
             , C.RECRUITMENT_END
             , C.PERFORMANCE_START
             , C.PERFORMANCE_END
             , C.MAX_MEMBERS
             , C.STATUS
             , C.ENROLL_DATE
             , (SELECT COUNT(*)
                     FROM CHALLENGER_MEMBER M
                     WHERE M.CHALLENGER_NO = C.NO) AS countMember
             FROM CHALLENGER C
            """)
    List<ChallengerVo> list();


    @Insert("""
        INSERT INTO CHALLENGER (
            NO
            , TITLE
            , CONTENT
            , WRITER
            , RECRUITMENT_START
            , RECRUITMENT_END
            , PERFORMANCE_START
            , PERFORMANCE_END
            , MAX_MEMBERS
            , ENROLL_DATE
        )
        VALUES
        (
            SEQ_CHALLENGER.NEXTVAL
            , #{vo.title}
            , #{vo.content}
            , #{userNo}
            , #{vo.recruitmentStart}
            , #{vo.recruitmentEnd}
            , #{vo.performanceStart}
            , #{vo.performanceEnd}
            , #{vo.maxMembers}
            , SYSTIMESTAMP
        )
        """)
    int write(String userNo, ChallengerVo vo);


    @Insert("""
            INSERT INTO CHALLENGER_MEMBER
            (
            NO
            ,MEMBER_NO
            ,CHALLENGER_NO
            )
            VALUES
            (
            SEQ_CHALLENGER_MEMBER.NEXTVAL
            , #{userNo}
            , #{vo.no}
            )
            """)
    int join(String userNo, ChallengerVo vo);



    @Select("""
            SELECT
            CHALLENGER_NO AS NO
            , MEMBER_NO
            FROM CHALLENGER_MEMBER
            WHERE MEMBER_NO =  #{userNo}
            """)
    List<ChallengerVo> memberList(String userNo, ChallengerVo vo);

    @Select("""
            SELECT
            COUNT(MEMBER_NO) AS countMember
            , CHALLENGER_NO AS no
            FROM CHALLENGER_MEMBER
            GROUP BY CHALLENGER_NO
            """)
    List<ChallengerVo> countMember();


    @Select("""
             SELECT
                 C.NO,
                 C.TITLE,
                 C.WRITER,
                 C.RECRUITMENT_START,
                 C.RECRUITMENT_END,
                 C.PERFORMANCE_START,
                 C.PERFORMANCE_END,
                 C.MAX_MEMBERS,
                 C.STATUS,
                 C.ENROLL_DATE,
                 M.ATTAINMENT_RATE,
                 M.COMPLETED_DAYS,
                 MAX(P.ENROLL_DATE) AS TODAY
             FROM CHALLENGER C
             JOIN CHALLENGER_MEMBER M
                 ON C.NO = M.CHALLENGER_NO
                 AND M.MEMBER_NO = #{userNo}
             LEFT JOIN CHALLENGER_POST P
                 ON C.NO = P.CHALLENGER_NO
                 AND P.MEMBER_NO = #{userNo}
             GROUP BY
                 C.NO, C.TITLE, C.WRITER, C.RECRUITMENT_START, C.RECRUITMENT_END,
                 C.PERFORMANCE_START, C.PERFORMANCE_END, C.MAX_MEMBERS, C.STATUS, C.ENROLL_DATE,
                 M.ATTAINMENT_RATE, M.COMPLETED_DAYS
            """)
    List<ChallengerVo> joinList(String userNo, ChallengerVo vo);


    @Select("""
            SELECT
            P.NO
            , P.CHALLENGER_NO
            , P.TITLE
            , P.CONTENT
            , P.ENROLL_DATE
            , P.MEMBER_NO
            , P.IMAGE_URL
            , M.NICK
            , C.TITLE as challengerName
            FROM CHALLENGER_POST P
            JOIN MEMBER M ON (P.MEMBER_NO = M.NO)
            JOIN CHALLENGER C ON (P.CHALLENGER_NO = C.NO)
            ORDER BY P.NO DESC
            """)
    List<ChallengerVo> postList();


    @Insert("""
            INSERT INTO CHALLENGER_POST (NO, CHALLENGER_NO, MEMBER_NO , TITLE, CONTENT) VALUES (SEQ_CHALLENGER_POST.NEXTVAL , #{vo.no} ,#{userNo},  #{vo.title}, #{vo.content})
            """)
    void postWrite(String userNo,ChallengerVo vo);

    @Select("""
            SELECT C.NO, C.TITLE FROM CHALLENGER_MEMBER M
            JOIN CHALLENGER C ON (M.CHALLENGER_NO = C.NO)
            WHERE MEMBER_NO =#{userNo}
            """)
    List<ChallengerVo> postTitleList(String userNo);

    @Update("""
            UPDATE CHALLENGER_MEMBER
            SET COMPLETED_DAYS = COMPLETED_DAYS + 1
            WHERE CHALLENGER_NO = #{vo.no}
            AND MEMBER_NO =#{userNo}
            """)
    void countPost(String userNo,ChallengerVo vo);


    ChallengerVo checkOpenAndCheckPost(String userNo, ChallengerVo vo);

    @Select("""
            SELECT
            C.*
            , (SELECT COUNT(*)
               FROM CHALLENGER_MEMBER M
               WHERE M.CHALLENGER_NO = C.NO) AS countMember
            FROM CHALLENGER C WHERE WRITER = #{userNo}
            """)
    List<ChallengerVo> myAddList(String userNo);


    @Update("""
            UPDATE CHALLENGER
                SET
                    TITLE   = #{vo.title}
                     , CONTENT = #{vo.content}
                     , RECRUITMENT_START = #{vo.recruitmentStart}
                     , RECRUITMENT_END = #{vo.recruitmentEnd}
                     , PERFORMANCE_START = #{vo.performanceStart}
                     , PERFORMANCE_END =#{vo.performanceEnd}
                     , MAX_MEMBERS = #{vo.maxMembers}
            WHERE NO = #{vo.no}
            AND WRITER = #{userNo}
            """)
    int edit(String userNo, ChallengerVo vo);

    @Select("""
            SELECT M."LEVEL"
            , M.EXP
            , (SELECT REQUIRED_EXP
                    FROM "LEVEL"
                    WHERE "LEVEL"= M."LEVEL"+1) AS REQUIRED_EXP
            FROM MEMBER M
            JOIN "LEVEL" L ON (M."LEVEL" = L."LEVEL")
            WHERE NO = #{userNo}
            """)
    ChallengerVo getLevel(String userNo);

    @Update("""
            UPDATE MEMBER
                SET EXP = EXP+10
            WHERE NO = #{userNo}
            """)
    void countExp(String userNo);

    @Update("""
            UPDATE MEMBER
                SET 
                    "LEVEL" = "LEVEL"+1,
                    EXP = 0 
            WHERE NO = #{userNo}
            """)
    void levelUp(String userNo);
}
