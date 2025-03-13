package com.kh.healthcare.hospital;

import lombok.Data;

@Data
public class HospitalVo {
    private Long no;
    private String name;
    private String tellNum;
    private String postNum;
    private String address;
    private String hospitalType;
    private double locationX;
    private double locationY;
    private int totalCount;


    private double rating;
}
