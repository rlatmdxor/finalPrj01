package com.kh.healthcare.cigarette.report;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ReportMapper {
    

    @Select("SELECT rc.NO," +
            " rc.MEMBER_NO," +
            " c.TAR, " +
            " rc.CIGARETTE, c.NAME AS cigaretteName, " +
            "TO_CHAR(rc.START_DATE, 'YYYY-MM-DD') AS startDate, " +
            "TO_CHAR(rc.END_DATE, 'YYYY-MM-DD') AS endDate, " +
            "rc.PACK_DURATION " +
            "FROM RECORD_CIGARETTE rc " +
            "JOIN CIGARETTE c ON rc.CIGARETTE = c.NO " +
            "WHERE rc.MEMBER_NO = #{memberNo}" +
            " ORDER BY rc.END_DATE DESC"
    )
    List<ReportVo> getCigaretteReport(Long memberNo);


}

