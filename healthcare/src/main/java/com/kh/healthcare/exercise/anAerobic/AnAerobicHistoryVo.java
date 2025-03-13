package com.kh.healthcare.exercise.anAerobic;

import lombok.Data;

@Data
public class AnAerobicHistoryVo {

    private String no;
    private String userNo;
    private String exNo;
    private String exName;
    private String exDate;
    private String weight;
    private String reps;

    private String enrollDate;
}
