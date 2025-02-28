package com.kh.healthcare.home;

import com.kh.healthcare.banner.BannerVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/main")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService service;

    @GetMapping("banner")
    public List<BannerVo> getBannerList(@RequestHeader("Authorization") String authorization){
        try {
            List<BannerVo> voList = service.getBannerList();
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] MAIN - BANNER LIST FAIL..");
        }
    }

    @GetMapping("board")
    public List<BoardVo> getHoneyTipBoardList(@RequestHeader("Authorization") String authorization){
        try {
            List<BoardVo> voList = service.getHoneyTipBoardList();
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] MAIN - BOARD LIST FAIL..");
        }
    }

    @GetMapping("notice")
    public List<NoticeVo> getNoticeList(@RequestHeader("Authorization") String authorization){
        try {
            List<NoticeVo> voList = service.getNoticeList();
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] MAIN - NOTICE LIST FAIL..");
        }
    }

    @GetMapping("review")
    public List<ReviewVo> getReviewList(@RequestHeader("Authorization") String authorization){
        try {
            List<ReviewVo> voList = service.getReviewList();
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] MAIN - REVIEW LIST FAIL..");
        }
    }

}
