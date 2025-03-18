package com.kh.healthcare.conf;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://localhost:3000"
                        , "http://dhc0mhvzf0wlm.cloudfront.net"
                        , "http://healinglog-react.s3.ap-northeast-2.amazonaws.com"
                        , "http://d3e15pchphfv7e.cloudfront.net"
                )
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
                ;
    }
}
