package com.kh.healthcare.conf;

import com.kh.healthcare.filter.TokenCheckFilter;
import com.kh.healthcare.jwt.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtUtil jwtUtil;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        //csrf 끄기
        http.csrf(AbstractHttpConfigurer::disable);

        //api로 시작하는 요청만 허용(나중엔 인증하게 바꿀거임)
        http.authorizeHttpRequests(auth->auth
                .requestMatchers("/api/**").permitAll()
                .requestMatchers("/login", "/join", "/join2").permitAll()
                .anyRequest().authenticated()
//                .anyRequest().permitAll()
        );

        //필터 추가(대체)
//        http.addFilterAt(new TokenCheckFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);

        //cors 문제 해결하기
        http.cors( corsConfig -> corsConfig.configurationSource(request -> {
            CorsConfiguration conf = new CorsConfiguration();
            conf.addAllowedOriginPattern("http://localhost:3000");
            conf.addAllowedMethod("GET");
            conf.addAllowedMethod("POST");
            conf.addAllowedMethod("DELETE");
            conf.addAllowedMethod("PUT");
            conf.addAllowedHeader("*");
            return conf;
        } ) );

        return http.build();
    }

}
