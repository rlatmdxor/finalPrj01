package com.kh.healthcare.home;

import lombok.Data;

@Data
public class BoardVo {
    private String no;
    private String categoryNo;
    private String categoryName;
    private String memberNo;
    private String nick;
    private String profile;
    private String title;
    private String content;
    private String recommendCount;
    private String enrollDate;
}
