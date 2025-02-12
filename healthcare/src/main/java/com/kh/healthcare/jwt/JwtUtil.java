package com.kh.healthcare.jwt;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    private SecretKey secretKey;

    public JwtUtil(@Value("${healinglog.jwt.secret}") String str){
        byte[] bytes = str.getBytes(StandardCharsets.UTF_8);
        this.secretKey = new SecretKeySpec(bytes, "HmacSHA256");
    }

    // login service 클래스에서 사용할 거임
    public String createJwtToken(String no, String id, String nick, String role){
        return Jwts.builder()
                .claim("no", no)
                .claim("id", id)
                .claim("nick", nick)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + (1000*60*60*24)))
                .signWith(secretKey)
                .compact();
    }

    //토큰 검증 (서명 검증)
    public boolean checkToken(String token) {
        try {
            Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    //토큰 만료 검증
    public boolean isExpire(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }

    //토큰에서 값 꺼내기(넘버)
    public String getNo(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("no", String.class);
    }

    //토큰에서 값 꺼내기(아이디)
    public String getId(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("id" , String.class);
    }

    //토큰에서 값 꺼내기(닉네임)
    public String getNick(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("nick" , String.class);
    }

    //토큰에서 값 꺼내기(역할)
    public String getRole(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role" , String.class);
    }

}
