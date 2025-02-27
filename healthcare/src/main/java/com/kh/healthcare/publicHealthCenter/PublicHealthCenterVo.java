package com.kh.healthcare.publicHealthCenter;

import lombok.Data;

@Data
public class PublicHealthCenterVo {
    private Long no;
    private String name;
    private String address;
    private String tellNum;
    private String postNum;
    private String openYn;
    private double locationX;
    private double locationY;
}