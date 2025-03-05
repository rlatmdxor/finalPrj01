package com.kh.healthcare.notice;

import lombok.Data;

@Data
public class NoticeVo {
    private String no;
    private String nick;
    private String writer;
    private String title;
    private String content;
    private String hit;
    private String enrollDate;
    private String modifyDate;
    private String delYn;
}
