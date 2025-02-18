package com.kh.healthcare.cigarette.report;

import lombok.Data;

@Data
public class CigaretteReportVo {
    private Long no;
    private Long memberNo;
    private String cigarette;
    private String startDate;
    private String endDate;
    private String packDuration;
    private Long tar;
}
