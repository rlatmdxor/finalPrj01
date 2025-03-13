package com.kh.healthcare.notification;

import com.kh.healthcare.board.honeyTip.HoneyTipCommentVo;
import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationMapper mapper;
    private final JwtUtil jwtUtil;

    //푸시 설정 받아오기
    public NotificationSettingsVo getPushSettings(String token) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.getPushSettings(userNo);
    }

    //푸시 설정 업데이트
    public void setPushSettings(String token, NotificationSettingsVo vo) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        mapper.setPushSettings(userNo, vo);
    }

    //푸시 알림 DB에 저장
    public void saveNewPush(String userNo, String message) {
        mapper.saveNewPush(userNo, message);
    }

    //푸시 알림 리스트 가져오기
    public List<NotificationVo> getPushList(String token) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.getPushList(userNo);
    }

    //푸시 체크 처리
    public void checkPushCard(String token, NotificationVo vo) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        mapper.checkPushCard(userNo, vo);
    }

    //푸시 삭제 처리
    public void deletePushCard(String token, NotificationVo vo) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        mapper.deletePushCard(userNo, vo);
    }

    //푸시 전부 체크 처리
    public void checkPushAll(String token) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        mapper.checkPushAll(userNo);
    }

    //푸시 전부 삭제 처리
    public void deletePushAll(String token) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        mapper.deletePushAll(userNo);
    }

    //댓글 푸시 게시글 번호 가져오기
    public HoneyTipCommentVo getBoardNo(String token, String enrollDate) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.getBoardNo(userNo, enrollDate);
    }
}
