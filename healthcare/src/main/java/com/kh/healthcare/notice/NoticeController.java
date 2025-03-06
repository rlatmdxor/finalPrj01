package com.kh.healthcare.notice;

import com.amazonaws.services.s3.AmazonS3;
import com.kh.healthcare.Aws.FileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/notice")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class NoticeController {

    private final NoticeService service;
    private final AmazonS3 s3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @PostMapping("list")
    public List<NoticeVo> list(@RequestHeader("Authorization") String token, @RequestBody SearchFilterVo filterVo) {

        try{
            return service.list(filterVo , token);
        } catch (Exception e) {
            throw new IllegalStateException("CODE [ NOTICE / LIST ]");
        }

    }
    @PostMapping("write")
    public int write(
            @RequestPart("data") NoticeVo vo,
            @RequestHeader("Authorization") String token,
            @RequestPart(value = "f", required = false) List<MultipartFile> f
    ){

        List<NoticeAttachVo> attachVoList = new ArrayList<>();

        try {
            if (f != null && !f.isEmpty()) {
                List<String> urlList = FileUtil.uploadFileListToAwsS3(f, s3, bucket);

                for (int i = 0; i < f.size(); i++) {
                    String originName = f.get(i).getOriginalFilename();
                    NoticeAttachVo attachVo = new NoticeAttachVo();
                    attachVo.setPath(urlList.get(i));
                    attachVo.setOriginName(originName);
                    attachVoList.add(attachVo);
                }
            }

            return service.write(vo, attachVoList , token);
        } catch (Exception e) {
            throw new IllegalStateException("CODE [NOTICE / WRITE]");
        }
    }
    @PostMapping("edit")
    public int edit(
            @RequestPart("data") NoticeVo vo,
            @RequestPart("deleteFiles") List<NoticeAttachVo> deleteFiles,
            @RequestHeader("Authorization") String token,
            @RequestPart(value = "f", required = false) List<MultipartFile> f

    ){

        List<NoticeAttachVo> attachVoList = new ArrayList<>();

        try {
            if (f != null && !f.isEmpty()) {
                List<String> urlList = FileUtil.uploadFileListToAwsS3(f, s3, bucket);

                for (int i = 0; i < f.size(); i++) {
                    String originName = f.get(i).getOriginalFilename();
                    NoticeAttachVo attachVo = new NoticeAttachVo();
                    attachVo.setPath(urlList.get(i));
                    attachVo.setOriginName(originName);
                    attachVoList.add(attachVo);
                }
            }

            return service.edit(vo, attachVoList , deleteFiles);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    @GetMapping("detail")
    public Map detail(@RequestParam("bno") String bno , @RequestHeader("Authorization") String token){

        try {
            Map map = service.detail(bno , token);

            return map;
        }catch (Exception e){
            throw new IllegalStateException("CODE [NOTICE / DETAIL]");
        }

    }
    @PostMapping("delete")
    public int deleteNotice(@RequestBody NoticeVo vo , @RequestHeader("Authorization") String token){
        try{
            return service.deleteNotice(vo , token);
        } catch (Exception e) {
            throw new IllegalStateException("CODE [ NOTICE / DELETE / CONTROLLER ]");
        }
    }

}
