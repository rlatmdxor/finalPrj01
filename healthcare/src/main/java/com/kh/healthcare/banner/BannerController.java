package com.kh.healthcare.banner;

import com.amazonaws.services.s3.AmazonS3;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.healthcare.Aws.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/banner")
@RequiredArgsConstructor
public class BannerController {

    private final BannerService service;

    @PostMapping("enroll")
    public void bannerEnroll(BannerVo vo, MultipartFile f, @RequestHeader("Authorization") String token){
        try {
            service.bannerEnroll(vo, f, token);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] BANNER ENROLL FAIL..");
        }
    }

    @GetMapping
    public List<BannerVo> getBannerList(@RequestParam String showYn, @RequestParam String searchValue){
        try {
            List<BannerVo> voList = service.getBannerList(showYn, searchValue);
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] GET BANNER LIST FAIL..");
        }
    }

    @PostMapping("edit")
    public void editBanner(BannerVo vo, @RequestParam(required = false) MultipartFile f, @RequestParam(required = false) String imageUrl, @RequestHeader("Authorization") String token){
        try {
            service.bannerEdit(vo, f, imageUrl, token);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] BANNER EDIT FAIL..");
        }
    }

    @GetMapping("delete")
    public void deleteBanner(@RequestParam String no, @RequestHeader("Authorization") String token) {
        try {
            service.deleteBanner(no);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] BANNER DELETE FAIL..");
        }
    }

    @PostMapping("delete")
    public void multiDeleteBanner(@RequestBody List<String> no, @RequestHeader("Authorization") String authorization){
        try {
            service.multiDeleteBanner(no);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] BANNER MULTI DELETE FAIL..");
        }
    }

}
