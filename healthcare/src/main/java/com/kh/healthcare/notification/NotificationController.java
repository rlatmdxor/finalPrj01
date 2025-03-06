package com.kh.healthcare.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService service;

    @GetMapping("getPushSettings")
    public NotificationVo getPushSettings(@RequestHeader("Authorization") String token){

        try {
            return service.getPushSettings(token);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("setPushSettings")
    public void setPushSettings(@RequestHeader("Authorization") String token, @RequestBody NotificationVo vo){

        try {
            service.setPushSettings(token, vo);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
