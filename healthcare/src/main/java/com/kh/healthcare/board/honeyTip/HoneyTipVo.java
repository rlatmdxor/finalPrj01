package com.kh.healthcare.board.honeyTip;

import lombok.Data;

@Data
public class HoneyTipVo {
    private Long no;
    private String categoryNo;
    private String memberNo;
    private String title;
    private String content;
    private String recommendCount;
    private String hit;
    private String enrollDate;
    private String modifyDate;
    private String delYn;
}
