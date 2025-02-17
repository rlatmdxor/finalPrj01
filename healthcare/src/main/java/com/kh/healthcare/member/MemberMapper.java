package com.kh.healthcare.member;

import org.apache.ibatis.annotations.*;

@Mapper
public interface MemberMapper {

    @Insert("""
            INSERT INTO MEMBER
            (
                NO
                , NAME
                , ID
                , PWD
                , NICK
                , EMAIL
                , ADDRESS
                , PHONE
                , HEIGHT
                , WEIGHT
                , PROFILE
                , GENDER
                , ENROLL_DATE
                , DEL_YN
            )
            VALUES
            (
                MEMBER_SEQ.NEXTVAL
                , #{vo.name}
                , #{vo.id}
                , #{vo.pwd}
                , #{vo.nick}
                , #{vo.email}
                , #{vo.address}
                , #{vo.phone}
                , #{vo.height}
                , #{vo.weight}
                , #{profileUrl}
                , #{vo.gender}
                , SYSDATE
                , 'N'
            )
            """)
    int memberJoin(@Param("vo") MemberVo vo, @Param("profileUrl") String profileUrl);

    @Select("""
            SELECT
                NO
                , NAME
                , ID
                , PWD
                , NICK
                , RESIDENT_NUM
                , EMAIL
                , ADDRESS
                , HEIGHT
                , WEIGHT
                , PROFILE
                , GENDER
                , ENROLL_DATE
                , PHONE
                , DEL_YN
            FROM
                MEMBER
            WHERE
                ID = #{id}
                AND DEL_YN = 'N'
            """)
    MemberVo findUserById(String id);

    @Select("""
            SELECT
                COUNT(*)
            FROM
                MEMBER
            WHERE
                ID = #{id}
            """)
    int duplicateIdCheck(MemberVo vo);

    @Select("""
            SELECT
                COUNT(*)
            FROM
                MEMBER
            WHERE
                EMAIL = #{email}
            """)
    int duplicateEmailCheck(MemberVo vo);

    @Select("""
            SELECT
                COUNT(*)
            FROM
                MEMBER
            WHERE
                PHONE = #{phone}
            """)
    int duplicatePhoneCheck(MemberVo vo);

    @Update("""
            UPDATE
                MEMBER
            SET
                PROFILE = #{profileUrl}
            WHERE
                ID = #{id}
            """)
    void profileChange(@Param("id") String id, @Param("profileUrl") String profileUrl);

    @Select("""
            SELECT
                PROFILE
            FROM
                MEMBER
            WHERE
                ID = #{id}
            """)
    String getProfile(String id);
}
