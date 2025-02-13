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
            """)
    List<AlcReportVo> getAlcReport(Long memberNo);

    @Insert("""
            INSERT INTO RECORD_ALC 
            (NO,
             ,MEMBER_NO
             ,ALC_TYPE
             ,ABV
             ,CC
             ,ENROLL_DATE)
            VALUES
            (
            SEQ_RECORD_ALC.NEXTVAL
            ,#{memberNo}
            ,#{alcType}
            ,#{abv}
            ,#{cc}
            ,#{enrollDate}
            )
            """)
    void write(AlcReportVo vo);


    @Update("""
            UPDATE RECORD_ALC
            SET
                ALC_TYPE = #{alcType},
                ABV= #{abv},
                CC=#{cc},
                ENROLL_DATE =#{enrollDate}
            """)
    void update(AlcReportVo vo);

    @Delete("""
            DELETE RECORD_ALC
            WHERE NO = #{NO}
            """)
    void delete(AlcReportVo vo);
}
