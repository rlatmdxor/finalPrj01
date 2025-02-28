package com.kh.healthcare.challenger;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class ChallengerVo {
    private String no;
    private String title;
    private String content;
    private String writer;
    private LocalDateTime recruitmentEnd;
    private String recruitmentEn;
    private LocalDateTime recruitmentStart;
    private String recruitmentStar;
    private LocalDateTime performanceStart;
    private String performanceStar;
    private LocalDateTime performanceEnd;
    private String performanceEn;
    private String condition;
    private Integer  maxMembers;
    private String status;
    private String enrollDate;
    private String memberNo;
    private String countMember;


}
