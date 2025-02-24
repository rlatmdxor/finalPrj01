package com.kh.healthcare.exercise.aerobic;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/aerobic")
public class AerobicController {

    private final AerobicService service;

    //일반 리스트
    @GetMapping("getList")
    public List<AerobicVo> getList(@RequestHeader ("Authorization") String token){
        return service.getList(token);
    }

    //북마크 리스트
    @GetMapping("getBookmarkList")
    public List<AerobicVo> getBookmarkList(@RequestHeader ("Authorization") String token){
        return service.getBookmarkList(token);
    }

    //북마크 해제
    @DeleteMapping("unmark")
    public ResponseEntity<String> unmark(@RequestHeader ("Authorization") String token, @RequestBody String no){
        service.unmark(token, no);
        return ResponseEntity.ok("북마크 해제 완료");
    }

    //북마크 등록
    @PostMapping("mark")
    public ResponseEntity<String> mark(@RequestHeader ("Authorization") String token, @RequestBody String no){
        String msg = service.mark(token, no);
        if(msg.equals("실패")){
            return ResponseEntity.ok("즐겨찾기는 3개까지만 등록가능합니다.");
        } else{
            return ResponseEntity.ok("북마크 등록 완료");
        }
    }

}
