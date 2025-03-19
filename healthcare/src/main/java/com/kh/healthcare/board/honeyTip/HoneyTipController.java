package com.kh.healthcare.board.honeyTip;

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
        try{
            List<HoneyTipVo> HoneyTipVoList = service.list(filterVo);
            return HoneyTipVoList;
        } catch (Exception e) {
            throw new IllegalStateException("CODE [ BOARD / LIST ]");
        }

    }
    @PostMapping("write")
    public int write(
            @RequestPart("data") HoneyTipVo vo,
            @RequestHeader("Authorization") String token,
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

            return service.write(vo, attachVoList , token);
        } catch (Exception e) {
            throw new IllegalStateException("CODE [BOARD / WRITE]");
        }
    }
    @PostMapping("edit")
    public int edit(
            @RequestPart("data") HoneyTipVo vo,
            @RequestPart("deleteFiles") List<HoneyTipAttachVo> deleteFiles,
            @RequestHeader("Authorization") String token,
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

            return service.edit(vo, attachVoList , deleteFiles);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }


    @GetMapping("detail")
    public Map detail(@RequestParam("bno") String bno ,@RequestHeader("Authorization") String token){

        try {
            Map map = service.detail(bno , token);

            return map;
        }catch (Exception e){
            throw new IllegalStateException("CODE [BOARD / DETAIL]");
        }

    }
    @PostMapping("recommend")
    public int recommend(@RequestBody BoardRecommendVo vo , @RequestHeader("Authorization") String token){

        service.recommend(vo , token);
        return '1';
    }
    @PostMapping("countLike")
    public int countLike(@RequestBody String bno){
        return service.countLike(bno);
    }
    @PostMapping("report")
    public int report(@RequestBody HoneyTipReportVo vo ,@RequestHeader("Authorization") String token){

        try{
            return service.reportBoard(vo , token);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }
    @PostMapping("delete")
    public int deleteHoneyTip(@RequestBody HoneyTipVo vo , @RequestHeader("Authorization") String token){
        try{
            return service.deleteHoneyTip(vo , token);
        } catch (Exception e) {
            throw new IllegalStateException("CODE [ BOARD / DELETE / CONTROLLER ]");
        }
    }
    @PostMapping("comment/write")
    public int commentWrite(@RequestBody HoneyTipCommentVo vo ,@RequestHeader("Authorization") String token){
        try{
            return service.commentWrite(vo , token);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @PostMapping("comment/delete")
    public int commentDelete(@RequestBody HoneyTipCommentVo vo , @RequestHeader("Authorization") String token){
        try{
            return service.commentDelete(vo , token);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    @PostMapping("comment/report")
    public int commentReport(@RequestBody HoneyTipCommentReportVo vo , @RequestHeader("Authorization") String token){
        try{
            return service.commentReport(vo , token);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    @GetMapping("comment/list")
    public List<HoneyTipCommentVo> commentList(@RequestParam("bno") String bno ,  @RequestHeader("Authorization") String token){
        try{
            return service.commentList(bno , token);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    @PostMapping("reported/list")
    public List<HoneyTipReportVo> reportedList() {
        try{
            List<HoneyTipReportVo> honeyTipReportVoList = service.reportedList();
            return honeyTipReportVoList;
        } catch (Exception e) {
            throw new IllegalStateException("CODE [ BOARD / REPORTED / LIST ]");
        }
    }
    @PostMapping("reported/delete")
    public int reportedHoneyTipDel(@RequestBody String[] numList , @RequestHeader("Authorization") String token){
        try{
            int result = service.reportedHoneyTipDel(numList , token);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @PostMapping("reported/comment/list")
    public List<HoneyTipCommentReportVo> reportedCommentList() {
        try{
            List<HoneyTipCommentReportVo> honeyTipCommentReportVoList = service.reportedCommentList();
            return honeyTipCommentReportVoList;
        } catch (Exception e) {
            throw new IllegalStateException("CODE [ BOARD/ COMMENT / REPORTED / LIST ]");
        }
    }
    @PostMapping("reported/comment/delete")
    public int reportedHoneyTipCommentDel(@RequestBody String[] numList , @RequestHeader("Authorization") String token){
        try{
            int result = service.reportedHoneyTipCommentDel(numList , token);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }



}
