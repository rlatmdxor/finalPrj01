package com.kh.healthcare.board.honeyTip;

import com.amazonaws.services.s3.AmazonS3;
import com.kh.healthcare.Aws.FileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/board/honeytip")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class HoneyTipController {

    private final HoneyTipService service;
    private final AmazonS3 s3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @PostMapping("list")
    public List<HoneyTipVo> list(@RequestBody SearchFilterVo filterVo) {

        List<HoneyTipVo> HoneyTipVoList = service.list(filterVo);
        return HoneyTipVoList;

    }
    @PostMapping("write")
    public int write(
            @RequestPart("data") HoneyTipVo vo,  // JSON 데이터 받기
            @RequestHeader("Authorization") String authorization,  // 토큰 받기
            @RequestPart(value = "f", required = false) List<MultipartFile> f // 파일 리스트 받기
    ){

        List<HoneyTipAttachVo> attachVoList = new ArrayList<>();

        try {
            if (f != null && !f.isEmpty()) { // 파일이 존재할 경우 처리
                List<String> urlList = FileUtil.uploadFileListToAwsS3(f, s3, bucket);

                for (int i = 0; i < f.size(); i++) {
                    String originName = f.get(i).getOriginalFilename();
                    HoneyTipAttachVo attachVo = new HoneyTipAttachVo(); // 객체 새로 생성
                    attachVo.setPath(urlList.get(i));
                    attachVo.setOriginName(originName);
                    attachVoList.add(attachVo);
                }
            }

            return service.write(vo, attachVoList);
        } catch (Exception e) {
            log.error("[GALLERY-WRITE] FAIL: " + e.getMessage());
            throw new IllegalStateException("[GALLERY-WRITE] FAIL...");
        }
    }

    @GetMapping("detail")
    public Map detail(@RequestParam("bno") String bno){
        System.out.println("HoneyTipController.detail");

        Map map = service.detail(bno);
        System.out.println("map = " + map);

        return map;

    }

}
