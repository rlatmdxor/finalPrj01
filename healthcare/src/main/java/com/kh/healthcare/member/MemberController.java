package com.kh.healthcare.member;

import com.kh.healthcare.cardiovascularManagement.bloodPressure.BloodPressureVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/member")
@Slf4j
public class MemberController {

    private final MemberService service;
    
    //회원가입
    @PostMapping("join")
    public int memberJoin(@RequestBody MemberVo vo){
        System.out.println("Profile Length: " + vo.getProfile().length());
        return service.memberJoin(vo);
    }

}
