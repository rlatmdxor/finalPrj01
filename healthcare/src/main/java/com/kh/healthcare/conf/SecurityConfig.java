package com.kh.healthcare.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        //csrf 끄기
        http.csrf(AbstractHttpConfigurer::disable);

        //api로 시작하는 요청만 허용(나중엔 인증하게 바꿀거임)
        http.authorizeHttpRequests(auth->auth
                //admin관련해서 주석쳐진부분은 실테스트시 주석 해제 요망
//                .requestMatchers("/api/admin/login").permitAll()
                .requestMatchers("/api/**").permitAll()
//                .requestMatchers("/api/admin/**").hasRole("ADMIN")
//                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()

//                .anyRequest().permitAll()
        );

        //cors 문제 해결하기
        http.cors( corsConfig -> corsConfig.configurationSource(request -> {
            CorsConfiguration conf = new CorsConfiguration();
            conf.addAllowedOriginPattern("http://localhost:3000");
            conf.addAllowedOriginPattern("http://healinglog-react.s3.ap-northeast-2.amazonaws.com");
            conf.addAllowedOriginPattern("http://dgp308zgwxy9o.cloudfront.net");
            conf.addAllowedOriginPattern("http://healinglog.store");
            conf.addAllowedOriginPattern("https://healinglog.store");
            conf.addAllowedOriginPattern("https://spring.healinglog.store");
            conf.addAllowedMethod("*");
            conf.addAllowedHeader("*");
            conf.setAllowCredentials(true); // 웹소켓 때문에 해놈
            return conf;
        } ) );

        return http.build();
    }

}
