package com.kh.healthcare.exercise.aerobic;

import com.kh.healthcare.exercise.anAerobic.AnAerobicVo;
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

        try {
            return service.getList(token);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //북마크 리스트
    @GetMapping("getBookmarkList")
    public List<AerobicVo> getBookmarkList(@RequestHeader ("Authorization") String token){

        try {
            return service.getBookmarkList(token);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //북마크 해제
    @DeleteMapping("unmark")
    public ResponseEntity<String> unmark(@RequestHeader ("Authorization") String token, @RequestBody String no){

        try {
            service.unmark(token, no);
            return ResponseEntity.ok("북마크 해제 완료");

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //북마크 등록
    @PostMapping("mark")
    public ResponseEntity<String> mark(@RequestHeader ("Authorization") String token, @RequestBody String no){

        try {
            String msg = service.mark(token, no);
            if(msg.equals("실패")){
                return ResponseEntity.ok("즐겨찾기는 3개까지만 등록가능합니다.");
            } else{
                return ResponseEntity.ok("북마크 등록 완료");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //상세정보 가져오기
    @GetMapping("getDetail")
    public AerobicVo getDetail(@RequestParam String name) {

        try {
            AerobicVo exercise = service.findExByName(name);
            return exercise;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    //운동 내역 기록
    @PostMapping("record")
    public String record(@RequestHeader ("Authorization") String token, @RequestBody AerobicHistoryVo vo){

        try{
            return service.record(token,vo);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    //운동 내역 수정
    @PostMapping("updateAerobic")
    public String updateAerobic(@RequestHeader ("Authorization") String token, @RequestBody AerobicHistoryVo vo){

        try {
            return service.updateAerobic(token,vo);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //운동 내역 삭제
    @DeleteMapping("deleteAerobic")
    public String deleteAerobic(@RequestHeader ("Authorization") String token, @RequestBody AerobicHistoryVo vo){

        try {
            return service.deleteAerobic(token,vo);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
