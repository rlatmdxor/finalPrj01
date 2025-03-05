package com.kh.healthcare.board.review;

import lombok.Data;

@Data
public class ReviewCommentReportVo {
    private String no;
    private String reportType;
    private String commentNo;
    private String memberNo;
    private String enrollDate;
}
