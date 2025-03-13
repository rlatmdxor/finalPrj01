package com.kh.healthcare.notification;

import com.kh.healthcare.board.honeyTip.HoneyTipCommentVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService service;

    @GetMapping("getPushSettings")
    public NotificationSettingsVo getPushSettings(@RequestHeader("Authorization") String token){

        try {
            return service.getPushSettings(token);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("setPushSettings")
    public void setPushSettings(@RequestHeader("Authorization") String token, @RequestBody NotificationSettingsVo vo){

        try {
            service.setPushSettings(token, vo);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    //푸시 리스트 받아오기
    @GetMapping("getPushList")
    public List<NotificationVo> getPushList(@RequestHeader("Authorization") String token){
        try {
            return service.getPushList(token);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //푸시 체크 처리
    @PostMapping("checkPushCard")
    public void checkPushCard(@RequestHeader("Authorization") String token, @RequestBody NotificationVo vo){
        try {
            service.checkPushCard(token, vo);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //푸시 삭제 처리
    @PostMapping("deletePushCard")
    public void deletePushCard(@RequestHeader("Authorization") String token, @RequestBody NotificationVo vo){
        try {
            service.deletePushCard(token, vo);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //푸시 전부 체크 처리
    @PostMapping("checkPushAll")
    public void checkPushAll(@RequestHeader("Authorization") String token){
        try {
            service.checkPushAll(token);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //푸시 전부 삭제 처리
    @PostMapping("deletePushAll")
    public void deletePushAll(@RequestHeader("Authorization") String token){
        try {
            service.deletePushAll(token);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //댓글 푸시 게시글 번호 가져오기
    @GetMapping("getBoardNo")
    public HoneyTipCommentVo getBoardNo(@RequestHeader("Authorization") String token, @RequestParam("enrollDate")String enrollDate){
        try{
            return service.getBoardNo(token, enrollDate);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
