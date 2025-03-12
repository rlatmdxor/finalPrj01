package com.kh.healthcare.notification;

import lombok.Data;

@Data
public class NotificationSettingsVo {

    private String no;
    private String memberNo;
    private String allPush;
    private String dietPush;
    private String waterPush;
    private String exercisePush;
    private String commentPush;
    private String bloodPressurePush;
    private String bloodSugarPush;
    private String insulinPush;

}
