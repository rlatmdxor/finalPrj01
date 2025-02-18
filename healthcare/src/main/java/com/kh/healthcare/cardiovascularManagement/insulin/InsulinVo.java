package com.kh.healthcare.cardiovascularManagement.insulin;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class InsulinVo {

    private String no;
    private String memberNo;
    private String point;
    private String enrollDate;
    private String ableDate;
    private String day;
    private String time;
    private String note;
}
