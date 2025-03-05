package com.kh.healthcare.board.review;

import lombok.Data;

@Data
public class ReviewHospitalVo {
    private String no;
    private String name;
    private String hospitalType;
    private String city;
    private String district;
    private String dong;
    private String address;
    private String tellNum;
    private String postNum;
    private String openYn;
}
