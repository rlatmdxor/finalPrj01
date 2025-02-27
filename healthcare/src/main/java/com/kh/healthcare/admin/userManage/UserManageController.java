package com.kh.healthcare.admin.userManage;

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

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchUsers(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String searchType,
            @RequestParam(required = false) String delYn,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int size) {

        Map<String, Object> result = service.searchUsers(keyword, searchType, delYn, page, size);
        return ResponseEntity.ok(result);
    }




    @DeleteMapping("/delete")
    public String delete(@RequestBody UserManageVo vo) {
        service.delete(vo);
        System.out.println("vo = " + vo);
        return "delete";
    }
}
