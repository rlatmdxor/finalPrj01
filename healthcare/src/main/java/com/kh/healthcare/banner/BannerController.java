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
    private final AmazonS3 s3;
    private final ObjectMapper objectMapper;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @PostMapping("enroll")
    public void bannerEnroll(BannerVo vo, MultipartFile f, @RequestHeader("Authorization") String authorization){
        try {
            if (f != null) {
                String url = FileUtil.uploadFileToAwsS3(f , s3 , bucket);
                System.out.println("url = " + url);
                vo.setImageUrl(url);
            }
            service.bannerEnroll(vo);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] BANNER ENROLL FAIL..");
        }
    }

    @GetMapping
    public List<BannerVo> getBannerList(@RequestParam String showYn, @RequestParam String searchValue){
        System.out.println("showYn = " + showYn);
        System.out.println("searchValue = " + searchValue);
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
    public void editBanner(BannerVo vo, MultipartFile f, @RequestHeader("Authorization") String authorization){
        try {
            if (f != null) {
                String url = FileUtil.uploadFileToAwsS3(f , s3 , bucket);
                System.out.println("url = " + url);
                vo.setImageUrl(url);
            }
            service.bannerEdit(vo);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] BANNER EDIT FAIL..");
        }
    }

    @GetMapping("delete")
    public void deleteBanner(@RequestParam String no, @RequestHeader("Authorization") String authorization) {
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
        System.out.println("noList = " + no);
        try {
            service.multiDeleteBanner(no);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] BANNER MULTI DELETE FAIL..");
        }
    }

}
