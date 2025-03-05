package com.kh.healthcare.admin.userManage;

import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/admin/usermanage")
@Slf4j
public class UserManageController {
    private final UserManageService service;
    private final JwtUtil jwtUtil;

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchUsers(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String searchType,
            @RequestParam(required = false) String delYn,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int size) {

        // JWT 검증 추가
        validateAdminRole(authorization);

        Map<String, Object> result = service.searchUsers(authorization, keyword, searchType, delYn, page, size);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete")
    public String delete(@RequestHeader(value = "Authorization", required = false) String authorization,
                         @RequestBody UserManageVo vo) {

        // JWT 검증 추가
        validateAdminRole(authorization);

        service.delete(vo);
        return "delete";
    }

    // JWT 검증 후 ADMIN이 아닌 경우 요청 차단
    private void validateAdminRole(String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new IllegalStateException("인증 토큰이 필요합니다.");
        }

        String token = authorization.substring(7); // "Bearer " 제거 후 토큰만 추출
        String role = jwtUtil.getRole(token); // JWT에서 역할(role) 가져오기

        if (!"ROLE_ADMIN".equals(role)) {
            throw new IllegalStateException("관리자 권한이 필요합니다.");
        }
    }
}
