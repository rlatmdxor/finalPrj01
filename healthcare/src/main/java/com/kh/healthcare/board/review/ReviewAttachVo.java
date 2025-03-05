package com.kh.healthcare.board.review;

import lombok.Data;

@Data
public class ReviewAttachVo {
    private String no;
    private String reviewNo;
    private String originName;
    private String path;
    private String uploadDate;
    private String delYn;
}
