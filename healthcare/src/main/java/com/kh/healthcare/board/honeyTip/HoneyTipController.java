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
        System.out.println("HoneyTipVoList = " + HoneyTipVoList);
        return HoneyTipVoList;

    }
    @PostMapping("write")
    public int write(
            @RequestPart("data") HoneyTipVo vo,
            @RequestHeader("Authorization") String authorization,
            @RequestPart(value = "f", required = false) List<MultipartFile> f
    ){

        List<HoneyTipAttachVo> attachVoList = new ArrayList<>();

        try {
            if (f != null && !f.isEmpty()) {
                List<String> urlList = FileUtil.uploadFileListToAwsS3(f, s3, bucket);

                for (int i = 0; i < f.size(); i++) {
                    String originName = f.get(i).getOriginalFilename();
                    HoneyTipAttachVo attachVo = new HoneyTipAttachVo();
                    attachVo.setPath(urlList.get(i));
                    attachVo.setOriginName(originName);
                    attachVoList.add(attachVo);
                }
            }

            return service.write(vo, attachVoList);
        } catch (Exception e) {
            throw new IllegalStateException("CODE [BOARD / WRITE]");
        }
    }
    @PostMapping("edit")
    public int edit(
            @RequestPart("data") HoneyTipVo vo,
            @RequestHeader("Authorization") String authorization,
            @RequestPart(value = "f", required = false) List<MultipartFile> f
    ){

        List<HoneyTipAttachVo> attachVoList = new ArrayList<>();

        try {
            if (f != null && !f.isEmpty()) {
                List<String> urlList = FileUtil.uploadFileListToAwsS3(f, s3, bucket);

                for (int i = 0; i < f.size(); i++) {
                    String originName = f.get(i).getOriginalFilename();
                    HoneyTipAttachVo attachVo = new HoneyTipAttachVo();
                    attachVo.setPath(urlList.get(i));
                    attachVo.setOriginName(originName);
                    attachVoList.add(attachVo);
                }
            }

            return service.edit(vo, attachVoList);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @GetMapping("detail")
    public Map detail(@RequestParam("bno") String bno ,@RequestParam("memberNo") String memberNo){

        try {
            Map map = service.detail(bno , memberNo);

            return map;
        }catch (Exception e){
            throw new IllegalStateException("CODE [BOARD / DETAIL]");
        }

    }
    @PostMapping("recommend")
    public int recommend(@RequestBody BoardRecommendVo vo){

        System.out.println("vo = " + vo);
        service.recommend(vo);
        return '1';
    }
    @PostMapping("countLike")
    public int countLike(@RequestBody String bno){
        return service.countLike(bno);
    }
    @PostMapping("report")
    public int report(@RequestBody HoneyTipReportVo vo){

        try{
            return service.reportBoard(vo);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }
    @PostMapping("delete")
    public int deleteHoneyTip(@RequestBody HoneyTipVo vo){
        try{
            return service.deleteHoneyTip(vo);
        } catch (Exception e) {
            throw new IllegalStateException("CODE [BOARD / DELETE / CONTROLLER");
        }
    }
    @PostMapping("comment/write")
    public int commentWrite(@RequestBody HoneyTipCommentVo vo){
        try{
            return service.commentWrite(vo);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @PostMapping("comment/delete")
    public int commentDelete(@RequestBody HoneyTipCommentVo vo){
        try{
            return service.commentDelete(vo);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    @PostMapping("comment/report")
    public int commentReport(@RequestBody HoneyTipCommentReportVo vo){
        try{
            return service.commentReport(vo);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    @GetMapping("comment/list")
    public List<HoneyTipCommentVo> commentList(@RequestParam("bno") String bno){
        try{
            return service.commentList(bno);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


}
