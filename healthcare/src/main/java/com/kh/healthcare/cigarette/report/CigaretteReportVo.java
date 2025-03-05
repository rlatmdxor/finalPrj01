package com.kh.healthcare.cigarette.report;

import lombok.Data;

@Data
public class CigaretteReportVo {
    private String no;
    private String memberNo;
    private String cigarette;
    private String startDate;
    private String endDate;
    private String packDuration;
    private Long tar;
}
