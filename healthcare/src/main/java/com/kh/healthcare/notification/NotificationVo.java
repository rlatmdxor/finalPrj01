package com.kh.healthcare.notification;

import lombok.Data;

@Data
public class NotificationVo {

    private String no;
    private String memberNo;
    private String content;
    private String checkYn;
    private String delYn;
    private String enrollDate;

}
