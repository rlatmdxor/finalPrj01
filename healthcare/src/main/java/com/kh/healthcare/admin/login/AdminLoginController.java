package com.kh.healthcare.admin.login;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/admin")
@Slf4j
public class AdminLoginController {

    private final AdminLoginService service;

    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody AdminLoginVo vo){
        try{
            String token = service.login(vo); // JWT 생성
            return ResponseEntity.ok(token); // 토큰 반환
        } catch (Exception e) {

            throw new IllegalStateException("[ADMIN-LOGIN] LOGIN FAIL ...");
        }
    }
}
