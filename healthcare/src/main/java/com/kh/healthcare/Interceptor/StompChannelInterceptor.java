package com.kh.healthcare.interceptor;

import com.kh.healthcare.jwt.JwtUtil;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Component
@RequiredArgsConstructor
public class StompChannelInterceptor implements ChannelInterceptor {

    private final JwtUtil jwtUtil;

    // static 저장소: 세션 ID를 키로 사용자 정보를 저장
    private static final ConcurrentMap<String, UserInfo> userSessions = new ConcurrentHashMap<>();

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String authHeader = accessor.getFirstNativeHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.replace("Bearer ", "");
                try {
                    jwtUtil.checkToken(token);
                    // 사용자 정보 생성 및 static 저장소에 저장
                    UserInfo userInfo = new UserInfo(
                            jwtUtil.getId(token),
                            jwtUtil.getNo(token),
                            jwtUtil.getNick(token),
                            jwtUtil.getRole(token)
                    );
                    String sessionId = accessor.getSessionId();
                    userSessions.put(sessionId, userInfo);
                } catch (Exception e) {
                    throw new IllegalArgumentException("Invalid token");
                }
            }
        }
        return message;
    }

    // 외부에서 호출하여 저장된 모든 사용자 정보를 조회
    public static Collection<UserInfo> getAllUserSessions() {
        return userSessions.values();
    }

    // 내부 클래스로 사용자 정보 정의
    @Data
    public static class UserInfo {
        private final String userId;
        private final String userNo;
        private final String userNick;
        private final String userRole;
    }
}

