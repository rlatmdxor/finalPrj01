package com.kh.healthcare.pharmacy;

import lombok.Data;

@Data
public class PharmacyVo {
    private Long no;
    private String name;
    private String tellNum;
    private String postNum;
    private String address;
    private int totalCount;
    private String openYn;
    private double locationX;
    private double locationY;
}
