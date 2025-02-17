package com.kh.healthcare.filter;

import com.kh.healthcare.jwt.JwtUtil;
import com.kh.healthcare.member.MemberVo;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class TokenCheckFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    public void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain) throws IOException, ServletException {

        // 헤더에서 Authorization 토큰 가져오기
        String token = req.getHeader("Authorization");
        System.out.println("token = " + token);

        String uri = req.getRequestURI();
        System.out.println("uri = " + uri);

        // 회원가입 & 로그인 요청은 필터링하지 않음
        if (uri.contains("join") || uri.contains("login")) {
            filterChain.doFilter(req, res);
            return;
        }

        //
        System.out.println("허용되지않은 url");

        // 토큰이 없거나 잘못된 형식이면 401 응답 반환
        if (token == null || !token.startsWith("Bearer ")) {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.getWriter().write("토큰이 제공되지 않았거나 올바르지 않습니다.");
            return;
        }

        // "Bearer " 접두사 제거
        token = token.replace("Bearer ", "");

        // JWT 서명 검증
        if (!jwtUtil.checkToken(token)) {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.getWriter().write("유효하지 않은 토큰입니다.");
            return;
        }

        // 토큰 만료 여부 검증
        if (jwtUtil.isExpire(token)) {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.getWriter().write("토큰이 만료되었습니다.");
            return;
        }


        // JWT에서 데이터 추출 및 세션에 저장(인증 정보 유지)
        String no = jwtUtil.getNo(token);
        String id = jwtUtil.getId(token);
//        String role = jwtUtil.getRole(token);
        MemberVo vo = new MemberVo();
        vo.setNo(no);
        vo.setId(id);

        HttpSession session = req.getSession();
        session.setAttribute("loginMemberVo", vo);


        // 필터 체인 실행 (요청을 컨트롤러로 전달)
        filterChain.doFilter(req, res);
    }
}