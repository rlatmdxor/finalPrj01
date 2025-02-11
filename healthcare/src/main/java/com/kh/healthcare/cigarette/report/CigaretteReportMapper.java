package com.kh.healthcare.cigarette.report;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CigaretteReportMapper {

    @Select("SELECT NO, " +
            "MEMBER_NO, " +
            "TAR, " +
            "CIGARETTE, " +
            "TO_CHAR(START_DATE, 'YYYY-MM-DD') AS startDate, " +
            "TO_CHAR(END_DATE, 'YYYY-MM-DD') AS endDate, " +
            "PACK_DURATION " +
            "FROM RECORD_CIGARETTE " +
            "WHERE MEMBER_NO = #{memberNo} " +
            "ORDER BY END_DATE DESC")
    List<CigaretteReportVo> getCigaretteReport(Long memberNo);

    @Insert("""
            INSERT INTO RECORD_CIGARETTE (NO, MEMBER_NO, CIGARETTE, TAR, START_DATE, END_DATE)
            VALUES
            (SEQ_CIGARETTE.NEXTVAL
            ,'1'
            ,#{cigarette}
            ,#{tar}
            ,#{startDate}
            ,#{endDate}
            )
            """)
    void write(CigaretteReportVo vo);

    @Update("""
            UPDATE RECORD_CIGARETTE
            SET
               CIGARETTE = #{cigarette},
               TAR = #{tar},
               START_DATE = #{startDate},
               END_DATE = #{endDate}
            WHERE NO = #{no}
            """)
    void update(CigaretteReportVo vo);


    @Delete("""
            DELETE RECORD_CIGARETTE
            WHERE NO = #{no}
            """)
    void delete(CigaretteReportVo vo);
}

