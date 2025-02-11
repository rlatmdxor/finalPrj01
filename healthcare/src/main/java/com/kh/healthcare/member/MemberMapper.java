package com.kh.healthcare.member;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

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
                , #{name}
                , #{id}
                , #{pwd}
                , #{nick}
                , #{residentNum}
                , #{email}
                , #{address}
                , #{height}
                , #{weight}
                , #{profile}
                , #{gender}
                , SYSDATE
                , 'N'
            )
            """)
    int memberJoin(MemberVo vo);
}
