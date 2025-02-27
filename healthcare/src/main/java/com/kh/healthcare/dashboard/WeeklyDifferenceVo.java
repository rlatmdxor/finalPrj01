package com.kh.healthcare.dashboard;

import lombok.Data;

@Data
public class WeeklyDifferenceVo {
    private String maxBloodPressure;
    private String minBloodPressure;
    private String maxBloodSugar;
    private String minBloodSugar;
    private String avgSleep;
    private String countCigarette;
    private String sumAlc;
    private String avgWeight;
    private String avgKcal;
    private String avgWater;
    private String sumAerobic;
    private String countAnaerobic;
    private String sumCalConsume;
}
