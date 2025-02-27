package com.kh.healthcare.dashboard;

import lombok.Data;

@Data
public class WeeklyDataVo {
    private double maxBloodPressure;
    private double minBloodPressure;
    private double maxBloodSugar;
    private double minBloodSugar;
    private double avgSleep;
    private double countCigarette;
    private double sumAlc;
    private double avgWeight;
    private double avgKcal;
    private double avgWater;
    private double sumAerobic;
    private double countAnaerobic;
    private double sumCalConsume;
}
