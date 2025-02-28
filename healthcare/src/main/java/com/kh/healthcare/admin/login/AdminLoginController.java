package com.kh.healthcare.admin.login;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/admin")
@Slf4j
public class AdminLoginController {

    private final AdminLoginService service;

    @PostMapping("login")
    public String login(@RequestBody AdminLoginVo vo){
        try{
            return service.login(vo);
        } catch (Exception e) {
            System.out.println("e = " + e);
            System.out.println("vo = " + vo);
            System.out.println("AdminLoginController.login");
            throw new IllegalStateException("[ADMIN-LOGIN] LOGIN FAIL ...");
        }
    }
}
