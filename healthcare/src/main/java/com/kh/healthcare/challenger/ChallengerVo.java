package com.kh.healthcare.challenger;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class ChallengerVo {
    private String no;
    private String title;
    private String content;
    private String writer;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "[yyyy-MM-dd HH:mm][yyyy-MM-dd'T'HH:mm]")
    private LocalDateTime recruitmentEnd;
    private String recruitmentEn;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "[yyyy-MM-dd HH:mm][yyyy-MM-dd'T'HH:mm]")
    private LocalDateTime recruitmentStart;
    private String recruitmentStar;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "[yyyy-MM-dd HH:mm][yyyy-MM-dd'T'HH:mm]")
    private LocalDateTime performanceStart;
    private String performanceStar;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "[yyyy-MM-dd HH:mm][yyyy-MM-dd'T'HH:mm]")
    private LocalDateTime performanceEnd;
    private String performanceEn;
    private String condition;
    private Integer  maxMembers;
    private String status;
    private String enrollDate;
    private String memberNo;
    private String countMember;
    private String today;
    private long totalDays;
    private String completedDays;
    private String nick;
    private String url;
    private String challengerNo;
    private String challengerName;
    private String level;
    private long exp;
    private long requiredExp;


}
