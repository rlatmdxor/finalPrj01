package com.kh.healthcare.conf;

import com.kh.healthcare.filter.TokenCheckFilter;
import com.kh.healthcare.jwt.JwtUtil;
import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class BeanConfig {

    private final JwtUtil jwtUtil;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    //커스텀 필터 등록(TokenCheckFilter) 나중에 발표할 때, 활성화 하십쇼
//    @Bean
//    public FilterRegistrationBean filterRegistrationBean(){
//        FilterRegistrationBean<Filter> x = new FilterRegistrationBean<>(new TokenCheckFilter(bCryptPasswordEncoder(),jwtUtil));
//        x.addUrlPatterns("/*");
//
//        return x;
//    }

}
