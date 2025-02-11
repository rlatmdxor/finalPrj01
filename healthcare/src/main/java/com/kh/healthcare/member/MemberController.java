package com.kh.healthcare.member;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.kh.healthcare.Aws.FileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/member")
@Slf4j
public class MemberController {

    private final MemberService service;

    //회원가입
    @PostMapping("join")
    public int memberJoin(MemberVo vo , @RequestParam(value = "profile", required = false) MultipartFile profile) throws IOException {
        System.out.println("vo = " + vo);

        // AWS S3에 프로필 업로드, URL 가져오기
        String profileUrl = service.uploadProfile(profile);

        // insert into DB
        return service.memberJoin(vo, profileUrl);

    }

    //로그인
    @PostMapping("login")
    public String login(@RequestBody MemberVo vo){
        try{
            return service.login(vo);
        }catch (Exception e) {
            throw new IllegalStateException("[MEMBER-LOGIN] LOGIN FAIL ...");
        }
    }
}
