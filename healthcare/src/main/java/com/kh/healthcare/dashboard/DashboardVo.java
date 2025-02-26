package com.kh.healthcare.dashboard;

import lombok.Data;

@Data
public class DashboardVo {
    private WeeklyDataVo currentWeek;
    private WeeklyDataVo previousWeek;
    private WeeklyDifferenceVo difference;
}
