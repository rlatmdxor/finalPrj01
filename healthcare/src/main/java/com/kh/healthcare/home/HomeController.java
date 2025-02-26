package com.kh.healthcare.home;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/main")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService service;

    @GetMapping("board")
    public List<HomeBoardVo> getHoneyTipBoardList(){
        try {
            List<HomeBoardVo> voList = service.getHoneyTipBoardList();
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] MAIN - BOARD LIST FAIL..");
        }
    }

    @GetMapping("notice")
    public List<HomeNoticeVo> getNoticeList(){
        try {
            List<HomeNoticeVo> voList = service.getNoticeList();
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] MAIN - NOTICE LIST FAIL..");
        }
    }

    @GetMapping("review")
    public List<HomeReviewVo> getReviewList(){
        try {
            List<HomeReviewVo> voList = service.getReviewList();
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] MAIN - REVIEW LIST FAIL..");
        }
    }

}
