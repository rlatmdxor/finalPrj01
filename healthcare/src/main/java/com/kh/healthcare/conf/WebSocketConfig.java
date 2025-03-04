package com.kh.healthcare.conf;

import com.kh.healthcare.interceptor.StompChannelInterceptor;
import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtUtil jwtUtil;
    private final StompChannelInterceptor stompChannelInterceptor;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api/websocket")
                .setAllowedOriginPatterns("*") //    // ✅ 프론트엔드 도메인 허용
//                .addInterceptors(new AuthHandshakeInterceptor(jwtUtil))
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic"); // /topic으로 시작하는 주소로 메시지를 클라이언트에게 전달하는 간단한 메모리 기반 브로커를 활성화
        config.setApplicationDestinationPrefixes("/app"); // @MessageMapping으로 지정된 메서드가 기본적으로 바인딩되는 /app에 메시지 브로커를 설정
    }
    
    //인터셉터 등록
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(stompChannelInterceptor);
    }

}