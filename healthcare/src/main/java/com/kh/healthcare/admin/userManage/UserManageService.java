package com.kh.healthcare.admin.userManage;


import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor

public class UserManageService {

    private final UserManageMapper mapper;
    private final JwtUtil jwtUtil;

    public void delete(UserManageVo vo) {
        // 삭제 처리
        mapper.delete(vo);
    }

    public Map<String, Object> searchUsers(String authorization, String keyword, String searchType, String delYn, int page, int size) {

        int offset = (page - 1) * size; // OFFSET 계산


        if (delYn != null && delYn.isEmpty()) {
            delYn = null;
        }

        if ((searchType == null || searchType.isEmpty()) || (keyword == null || keyword.isEmpty())) {
            searchType = null;
            keyword = null;
        }

        // ✅ 유저 목록 조회
        List<UserManageVo> users = mapper.searchUsers(keyword, searchType, delYn, size, offset);

        // ✅ 전체 데이터 개수 조회
        int totalElements = mapper.countUsers(keyword, searchType, delYn);

        Map<String, Object> response = new HashMap<>();
        response.put("totalElements", totalElements); // 전체 개수
        response.put("totalPages", (int) Math.ceil((double) totalElements / size)); // 총 페이지 수
        response.put("currentPage", page); // 현재 페이지
        response.put("pageSize", size); // 한 페이지당 개수
        response.put("users", users); // 유저 리스트
        return response;
    }

}