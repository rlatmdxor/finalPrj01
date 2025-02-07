package com.kh.healthcare.cigarette.report;

import lombok.Data;

@Data
public class ReportVo {
    private Long no;
    private Long memberNo;
    private Long cigarette;
    private String startDate;
    private String endDate;
    private String packDuration;


    private String cigaretteName;
    private Long tar;
}
