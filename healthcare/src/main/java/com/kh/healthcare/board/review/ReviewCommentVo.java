package com.kh.healthcare.board.review;

import lombok.Data;

@Data
public class ReviewCommentVo {
    private String no;
    private String memberNo;
    private String reviewNo;
    private String content;
    private String enrollDate;
    private String modifyDate;
    private String delYn;
    private String nick;
}
