package com.kh.healthcare.cardiovascularManagement.bloodPressure;

import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
public class BloodPressureVo {

    private String no;
    private String memberNo;
    private String systole;
    private String diastole;
    private String pulse;
    private String enrollDate;
    private String day;
    private String time;
    private String nick;
    private String note;



}


