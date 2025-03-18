package com.kh.healthcare.alc.report;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AlcReportMapper {
    @Select("""
            SELECT NO
            , MEMBER_NO
            , ALC_TYPE
            , ABV
            , CC
            , TO_CHAR(ENROLL_DATE, 'YYYY-MM-DD') AS enrollDate
            FROM RECORD_ALC
            WHERE MEMBER_NO = #{memberNo}
            ORDER BY ENROLL_DATE DESC
            """)
    List<AlcReportVo> list(String memberNo);

    @Insert("""
    INSERT INTO RECORD_ALC (NO, MEMBER_NO, ALC_TYPE, ABV, CC, ENROLL_DATE)
    VALUES (SEQ_RECORD_ALC.NEXTVAL,
            #{memberNo},
            #{vo.alcType},
            #{vo.abv},
            #{vo.cc},
            TO_DATE(#{vo.enrollDate}, 'YYYY-MM-DD'))
    """)
    void write(@Param("memberNo") String memberNo, @Param("vo") AlcReportVo vo);


    @Update("""
        UPDATE RECORD_ALC
        SET
            ALC_TYPE = #{vo.alcType},
            ABV = #{vo.abv},
            CC = #{vo.cc},
            ENROLL_DATE = TO_DATE(#{vo.enrollDate}, 'YYYY-MM-DD')
        WHERE NO = #{vo.no} AND MEMBER_NO = #{memberNo}
    """)
    void update(@Param("memberNo") String memberNo, @Param("vo") AlcReportVo vo);

    @Delete("""
        DELETE FROM RECORD_ALC
        WHERE NO = #{no} AND MEMBER_NO = #{memberNo}
    """)
    void delete(@Param("memberNo") String memberNo, @Param("no") String no);


}
