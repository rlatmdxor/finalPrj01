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
                SEQ_MEMBER.NEXTVAL
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
                LOWER(ID) = LOWER(#{id})
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
    int duplicatePhoneCheck(String phone);

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

    @Update("""
            UPDATE
                MEMBER
            SET
                NICK = #{nick}
            WHERE
                ID = #{id}
            """)
    void nickChange(String id, String nick);

    @Update("""
            UPDATE
                MEMBER
            SET
                ADDRESS = #{address}
            WHERE
                ID = #{id}
            """)
    void addressChange(String id, String address);

    @Update("""
            UPDATE
                MEMBER
            SET
                PHONE = #{phone}
            WHERE
                ID = #{id}
            """)
    void phoneChange(String id, String phone);

    @Select("""
            SELECT
                PWD
            FROM
                MEMBER
            WHERE
                ID = #{id}
            """)
    String getPwd(String id);

    @Update("""
            UPDATE
                MEMBER
            SET
                PWD = #{encodedPwd}
            WHERE
                ID = #{id}
            """)
    void updatePwd(String encodedPwd, String id);

    @Update("""
            UPDATE
                MEMBER
            SET
                HEIGHT = #{height},
                WEIGHT = #{weight}
            WHERE
                ID = #{id}
            """)
    void physicalChange(String id, String height, String weight);

    @Update("""
            UPDATE
                MEMBER
            SET
                DEL_YN = 'Y'
            WHERE
                ID = #{id}
            """)
    void withdrawal(String id);

    @Insert("""
             INSERT INTO DASHBOARD (
                NO
                , MEMBER_NO
                , NAME
            )
            VALUES
            (
                SEQ_DASHBOARD.NEXTVAL
                , SEQ_MEMBER.CURRVAL
                , #{name}
            )
            """)
    void createMemberDashboard(String name);

    @Select("""
            SELECT ID
            FROM MEMBER
            WHERE
                NAME = #{userName}
                AND PHONE = #{userPhone}
            """)
    String findId(String userName, String userPhone);

    @Select("""
            SELECT NO, ID
            FROM MEMBER
            WHERE
                ID = #{id}
                AND EMAIL = #{email}
            """)
    MemberVo findByEmail(String id, String email);
}
