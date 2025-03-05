package com.kh.healthcare.alc.report;

import lombok.Data;

@Data
public class AlcReportVo {
    private String no;
    private String memberNo;
    private String alcType;
    private Long abv;
    private Long cc;
    private String enrollDate;
}
