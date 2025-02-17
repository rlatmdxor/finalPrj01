package com.kh.healthcare.member;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class MemberVo {

    private String no;
    private String name;
    private String id;
    private String pwd;
    private String nick;
    private String email;
    private String address;
    private String gender;
    private String height;
    private String weight;
    private String profile;
    private String enrollDate;
    private String phone;
    private String delYn;
}
