package com.kh.healthcare.home;

import lombok.Data;

@Data
public class HomeNoticeVo {
    private String no;
    private String writer;
    private String nick;
    private String title;
    private String content;
    private String enrollDate;
}
