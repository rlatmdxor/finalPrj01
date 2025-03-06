package com.kh.healthcare.notification;

import com.kh.healthcare.exercise.ExerciseMapper;
import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationMapper mapper;
    private final JwtUtil jwtUtil;

    //푸시 설정 받아오기
    public NotificationVo getPushSettings(String token) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.getPushSettings(userNo);
    }

    //푸시 설정 업데이트
    public void setPushSettings(String token, NotificationVo vo) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        mapper.setPushSettings(userNo, vo);
    }
}
