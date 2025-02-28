package com.kh.healthcare.challenger;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

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
            , STATUS
            , ENROLL_DATE
        )
        VALUES
        (
            SEQ_CHALLENGER.NEXTVAL
            , #{title}
            , #{content}
            , '1'
            , #{recruitmentStart}
            , #{recruitmentEnd}
            , #{performanceStart}
            , #{performanceEnd}
            , #{maxMembers}
            , 'OPEN'
            , SYSTIMESTAMP
        )
        """)
    int write(ChallengerVo vo);


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
            , #{memberNo}
            , #{no}
            )
            """)
    int join(ChallengerVo vo);



    @Select("""
            SELECT
            CHALLENGER_NO AS NO
            , MEMBER_NO
            FROM CHALLENGER_MEMBER
            WHERE MEMBER_NO =  #{memberNo}
            """)
    List<ChallengerVo> memberList(ChallengerVo vo);

    @Select("""
            SELECT
            COUNT(MEMBER_NO) AS countMember
            , CHALLENGER_NO AS no
            FROM CHALLENGER_MEMBER
            GROUP BY CHALLENGER_NO
            """)
    List<ChallengerVo> countMember();
}
