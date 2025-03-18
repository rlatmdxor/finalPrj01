package com.kh.healthcare.cigarette.report;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CigaretteReportMapper {
    @Select("""
            SELECT NO
            ,MEMBER_NO
            ,TAR
            ,CIGARETTE
            ,TO_CHAR(START_DATE, 'YYYY-MM-DD') AS startDate
            ,TO_CHAR(END_DATE, 'YYYY-MM-DD') AS endDate
            FROM RECORD_CIGARETTE
            WHERE MEMBER_NO = #{memberNo}
            ORDER BY END_DATE DESC
            """)
    List<CigaretteReportVo> list(String memberNo);

    @Insert("""
            INSERT INTO RECORD_CIGARETTE (NO, MEMBER_NO, CIGARETTE, TAR, START_DATE, END_DATE)
            VALUES
            (SEQ_CIGARETTE.NEXTVAL
            ,#{memberNo}
            ,#{vo.cigarette}
            ,#{vo.tar}
            ,TO_DATE(#{vo.startDate}, 'YYYY-MM-DD')
            ,TO_DATE(#{vo.endDate}, 'YYYY-MM-DD')
            )
            """)
    void write(@Param("memberNo") String memberNo , @Param("vo") CigaretteReportVo vo);


    @Update("""
    UPDATE RECORD_CIGARETTE
    SET
       CIGARETTE = #{vo.cigarette},
       TAR = #{vo.tar},
       START_DATE = TO_DATE(#{vo.startDate}, 'YYYY-MM-DD'),
       END_DATE = TO_DATE(#{vo.endDate}, 'YYYY-MM-DD')
    WHERE NO = #{vo.no} AND MEMBER_NO = #{memberNo}
""")
    void update(@Param("memberNo") String memberNo , @Param("vo") CigaretteReportVo vo);



    @Delete("""
            DELETE FROM RECORD_CIGARETTE
            WHERE NO = #{no} AND MEMBER_NO = #{memberNo}
            """)
    void delete(@Param("memberNo") String memberNo ,@Param("no") String no);
}

