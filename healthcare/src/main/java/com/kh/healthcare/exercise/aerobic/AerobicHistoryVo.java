package com.kh.healthcare.exercise.aerobic;

import lombok.Data;

@Data
public class AerobicHistoryVo {

    private String no;
    private String userNo;
    private String exNo;
    private String exName;
    private String exDate;
    private String exDuration;
    private String startTime;
    private String endTime;

    private String exerciseMinutes;
    private String enrollDate;

}
