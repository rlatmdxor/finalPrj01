package com.kh.healthcare.member;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

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
                , RESIDENT_NUM
                , EMAIL
                , ADDRESS
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
                , #{vo.residentNum}
                , #{vo.email}
                , #{vo.address}
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
                , DEL_YN
            FROM
                MEMBER
            WHERE
                ID = #{id}
                AND DEL_YN = 'N'
            """)
    MemberVo findUserById(String id);
}
