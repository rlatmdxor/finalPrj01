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
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/member")
@Slf4j
public class MemberController {

    private final MemberService service;

    //아이디 중복체크
    @PostMapping("checkId")
    public String duplicateIdCheck(@RequestBody MemberVo vo){
        String msg = "";
        // 6자~20자 이하 일 때 중복체크
        if(vo.getId().length()>=6 && vo.getId().length()<=20){
            int isDuplicated = service.duplicateIdCheck(vo);
            if(isDuplicated>=1){
                msg = "사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요.";
            } else {
                msg = "사용 가능한 아이디입니다.";
            }
        } else if (vo.getId().length()<6) {
            msg = "아이디가 너무 짧습니다.";
        } else {
            msg = "아이디가 너무 깁니다.";
        }

        return msg;
    }

    //이메일 중복체크
    @PostMapping("checkEmail")
    public String duplicateEmailCheck(@RequestBody MemberVo vo){
        String msg = "";
        // 12자~40자 이하 일 때 중복체크 및 유효성 검사
        if(vo.getEmail().length()>=12 && vo.getEmail().length()<=40 && vo.getEmail().contains(".com")){
            int isDuplicated = service.duplicateEmailCheck(vo);
            if(isDuplicated<1){
                msg = "사용 가능한 이메일입니다.";
            } else {
                msg = "이미 사용중인 이메일입니다. 다른 이메일을 입력해 주세요.";
            }
        } else if (vo.getEmail().length()>=12 && vo.getEmail().length()<=40 && !vo.getEmail().contains(".com")) {
            msg = "잘못된 도메인 값입니다.";
        } else if (vo.getEmail().length()<12) {
            msg = "이메일이 너무 짧습니다.";
        } else {
            msg = "아이디가 너무 깁니다.";
        }

        return msg;
    }

    //전화번호 중복체크
    @PostMapping("checkPhone")
    public String duplicatePhoneCheck(@RequestBody MemberVo vo){
        String msg = "";
        // 입력이 11자면 중복검사
        if(vo.getPhone().length()==11 && vo.getPhone().startsWith("010")){
            int isDuplicated = service.duplicatePhoneCheck(vo.getPhone());
            if(isDuplicated<1){
                msg = "사용 가능한 전화번호입니다.";
            } else {
                msg = "이미 등록 된 전화번호입니다. 다른 전화번호를 입력해 주세요.";
            }
        } else {
            msg = "잘못된 번호입니다.";
        }

        return msg;
    }

    //회원가입
    @PostMapping("join")
    public int memberJoin(@ModelAttribute MemberVo vo , @RequestParam(value = "profileImage", required = false) MultipartFile profile) throws IOException {

        System.out.println("profile = " + profile);
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

    
    //마이페이지 정보 불러오기
    @GetMapping("mypage")
    public MemberVo getMyData(@RequestHeader ("Authorization") String token){
        System.out.println("token = " + token);
        return service.getMyData(token);
    }

    //마이페이지 프로필 변경
    @PostMapping("profileChange")
    public String profileChange(@RequestHeader ("Authorization") String token, @RequestParam("profileImage") MultipartFile profile) throws IOException {

        // AWS S3에 프로필 업로드, URL 가져오기
        String profileUrl = service.uploadProfile(profile);

        // Update DB
        service.profileChange(token, profileUrl);

        // 업데이트 된 프로필 가져오기
        return service.getProfile(token);
    }

    //마이페이지 프로필 삭제
    @PostMapping("profileDelete")
    public String profileDelete(@RequestHeader("Authorization") String token) throws IOException{
        // 삭제 시, 디폴트 값
        String profileUrl = "https://healinglog-kh.s3.ap-northeast-2.amazonaws.com/default_profile.jpg";

        // Update DB
        service.profileChange(token, profileUrl);

        // 업데이트 된 프로필 가져오기
        return service.getProfile(token);
    }

    //마이페이지 닉네임 변경
    @PostMapping("changeNick")
    public void changeNick(@RequestHeader("Authorization") String token, @RequestParam String nick){

        // Update DB
        service.nickChange(token, nick);
    }

    //마이페이지 비밀번호 변경
    @PostMapping("changePwd")
    public String changePwd(@RequestHeader("Authorization") String token, @RequestParam String currentPwd, @RequestParam String newPwd){
        String msg = "";

        // Update DB
        boolean isSuccess = service.pwdChange(token, currentPwd, newPwd);
        if(isSuccess){
            return "비밀번호 변경 완료!";
        }else{
            return "비밀번호 변경 실패...";
        }
    }

    //마이페이지 주소 변경
    @PostMapping("changeAddress")
    public void changeAddress(@RequestHeader("Authorization") String token, @RequestParam String address){

        // Update DB
        service.addressChange(token, address);
    }

    //모달용 전화번호 체크
    @PostMapping("checkPhoneForModal")
    public String duplicatePhoneCheckForModal(@RequestParam String phone){
        String msg = "";
        // 입력이 11자면 중복검사
        if(phone.length()==11 && phone.startsWith("010")){
            int isDuplicated = service.duplicatePhoneCheck(phone);
            if(isDuplicated<1){
                msg = "사용 가능한 전화번호입니다.";
            } else {
                msg = "이미 등록 된 전화번호입니다. 다른 전화번호를 입력해 주세요.";
            }
        } else {
            msg = "잘못된 번호입니다.";
        }

        return msg;
    }

    //마이페이지 전화번호 변경
    @PostMapping("changePhone")
    public void changePhone(@RequestHeader("Authorization") String token, @RequestParam String phone){

        // Update DB
        service.changePhone(token, phone);
    }
    
    //마이페이지 신체정보 변경
    @PostMapping("changePhysical")
    public void changePhysical(@RequestHeader("Authorization") String token, @RequestParam String height, @RequestParam String weight){

        // Update DB
        service.changePhysical(token, height, weight);
    }
    
    // 회원 탈퇴
    @PostMapping("withdrawal")
    public void withdrawal(@RequestHeader("Authorization") String token){

        // Update DB
        service.withdrawal(token);
    }
}
