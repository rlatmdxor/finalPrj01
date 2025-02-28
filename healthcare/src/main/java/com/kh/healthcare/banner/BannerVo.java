package com.kh.healthcare.banner;

import lombok.Data;

@Data
public class BannerVo {
    private String no;
    private String writer;
    private String nick;
    private String title;
    private String imageUrl;
    private String showYn;
    private String enrollDate;
    private String ModifyDate;
    private String delYn;
}
