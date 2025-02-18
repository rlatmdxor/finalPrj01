package com.kh.healthcare.cigarette.calender;

import lombok.Data;

@Data
public class CigaretteCalenderVo {
    private Long no;
    private Long memberNo;
    private String cigarette;
    private String startDate;
    private String endDate;
    private String packDuration;
    private Long tar;

}
