package com.kh.healthcare.alc.calender;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AlcCalenderMapper {

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
    List<AlcCalenderVo> getAlcCalenderReport(Long memberNo);

    @Insert("""
            INSERT INTO RECORD_ALC
            (NO
             ,MEMBER_NO
             ,ALC_TYPE
             ,ABV
             ,CC
             ,ENROLL_DATE)
            VALUES
            (
            SEQ_RECORD_ALC.NEXTVAL
            ,'1'
            ,#{alcType}
            ,#{abv}
            ,#{cc}
            ,#{enrollDate}
            )
           """)
    void write(AlcCalenderVo vo);

    @Update("""
            UPDATE RECORD_ALC
            SET
                ALC_TYPE = #{alcType},
                ABV= #{abv},
                CC=#{cc},
                ENROLL_DATE =#{enrollDate}
            WHERE NO = #{no}
            """)
    void update(AlcCalenderVo vo);

    @Delete("""
            DELETE RECORD_ALC
            WHERE NO = #{no}
            """)
    void delete(AlcCalenderVo vo);
}
