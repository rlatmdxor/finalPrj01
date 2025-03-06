package com.kh.healthcare.board.review;

import lombok.Data;

@Data
public class ReviewReportVo {
    private String no;
    private String reportType;
    private String reviewNo;
    private String memberNo;
    private String enrollDate;
    private String nick;
    private String title;
    private String name;
    private String reportCount;
}
