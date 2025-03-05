package com.kh.healthcare.board.review;

import lombok.Data;

@Data
public class ReviewVo {
    private String no;
    private String nick;
    private String memberNo;
    private String hospitalNo;
    private String name;
    private String title;
    private String content;
    private String enrollDate;
    private String modifyDate;
    private String delYn;
    private String commentCount;
    private String rating;
    private String department;
    private String visitDate;
}
