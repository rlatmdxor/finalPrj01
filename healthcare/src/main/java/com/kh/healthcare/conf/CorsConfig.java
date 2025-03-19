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
                        , "http://dgp308zgwxy9o.cloudfront.net"
                        , "http://healinglog-react.s3.ap-northeast-2.amazonaws.com"
                        , "http://healinglog.store"
                        , "https://healinglog.store"
                        , "https://spring.healinglog.store"
                )
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
                ;
    }
}
