package com.kh.healthcare.board.review;

import com.amazonaws.services.s3.AmazonS3;
import com.kh.healthcare.Aws.FileUtil;
import com.kh.healthcare.board.honeyTip.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/review")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class ReviewController {

    private final ReviewService service;
    private final AmazonS3 s3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @PostMapping("list")
    public List<ReviewVo> list(@RequestBody SearchFilterVo filterVo) {


        try {
            List<ReviewVo> ReviewVoList = service.reviewList(filterVo);
            return ReviewVoList;
        } catch (Exception e) {
            throw new IllegalStateException("CODE [ REVIEW / LIST ]");
        }

    }
    @PostMapping("hospital/list")
    public List<ReviewHospitalVo> searchHospital(@RequestBody SearchFilterVo filterVo){
        try {
            List<ReviewHospitalVo> ReviewHospitalVoList = service.searchHospital(filterVo);
            return ReviewHospitalVoList;
        } catch (Exception e) {
            throw new IllegalStateException("CODE [ REVIEW / HOSPITAL / LIST ]");
        }
    }

    @PostMapping("write")
    public int write(
            @RequestPart("data") ReviewVo vo,
            @RequestHeader("Authorization") String token,
            @RequestPart(value = "f", required = false) List<MultipartFile> f
    ) throws IOException {

        List<ReviewAttachVo> attachVoList = new ArrayList<>();


        try {
            if (f != null && !f.isEmpty()) {
                List<String> urlList = FileUtil.uploadFileListToAwsS3(f, s3, bucket);

                for (int i = 0; i < f.size(); i++) {
                    String originName = f.get(i).getOriginalFilename();
                    ReviewAttachVo attachVo = new ReviewAttachVo();
                    attachVo.setPath(urlList.get(i));
                    attachVo.setOriginName(originName);
                    attachVoList.add(attachVo);
                }
            }

            return service.write(vo, attachVoList , token);
        } catch (Exception e) {
            throw new IllegalStateException("CODE [REVIEW / WRITE]");
        }
    }

    @PostMapping("edit")
    public int edit(
            @RequestPart("data") ReviewVo vo,
            @RequestPart("deleteFiles") List<ReviewAttachVo> deleteFiles,
            @RequestHeader("Authorization") String token,
            @RequestPart(value = "f", required = false) List<MultipartFile> f

    ){

        List<ReviewAttachVo> attachVoList = new ArrayList<>();

        try {
            if (f != null && !f.isEmpty()) {
                List<String> urlList = FileUtil.uploadFileListToAwsS3(f, s3, bucket);

                for (int i = 0; i < f.size(); i++) {
                    String originName = f.get(i).getOriginalFilename();
                    ReviewAttachVo attachVo = new ReviewAttachVo();
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
            throw new IllegalStateException("CODE [REVIEW / DETAIL]");
        }

    }
    @PostMapping("report")
    public int report(@RequestBody ReviewReportVo vo , @RequestHeader("Authorization") String token){

        try{
            return service.reportBoard(vo , token);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }
    @PostMapping("delete")
    public int deleteHoneyTip(@RequestBody ReviewVo vo , @RequestHeader("Authorization") String token){
        try{
            return service.deleteHoneyTip(vo , token);
        } catch (Exception e) {
            throw new IllegalStateException("CODE [ BOARD / DELETE / CONTROLLER ]");
        }
    }
    @PostMapping("comment/write")
    public int commentWrite(@RequestBody ReviewCommentVo vo , @RequestHeader("Authorization") String token){
        try{
            return service.commentWrite(vo , token);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    @PostMapping("comment/delete")
    public int commentDelete(@RequestBody ReviewCommentVo vo , @RequestHeader("Authorization") String token){
        try{
            return service.commentDelete(vo , token);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    @PostMapping("comment/report")
    public int commentReport(@RequestBody ReviewCommentReportVo vo , @RequestHeader("Authorization") String token){
        try{
            return service.commentReport(vo , token);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    @GetMapping("comment/list")
    public List<ReviewCommentVo> commentList(@RequestParam("bno") String bno ,  @RequestHeader("Authorization") String token){
        try{
            return service.commentList(bno , token);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    @PostMapping("reported/list")
    public List<ReviewReportVo> reportedList() {
        try{
            List<ReviewReportVo> reviewReportVoList = service.reportedList();
            return reviewReportVoList;
        } catch (Exception e) {
            throw new IllegalStateException("CODE [ REVIEW / REPORTED / LIST ]");
        }

    }
    @PostMapping("reported/delete")
    public int reportedReviewDel(@RequestBody String[] numList , @RequestHeader("Authorization") String token){
        try{
            int result = service.reportedReviewDel(numList , token);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    @PostMapping("reported/comment/list")
    public List<ReviewCommentReportVo> reportedCommentList() {
        try{
            List<ReviewCommentReportVo> reviewCommentReportVoList = service.reportedCommentList();
            return reviewCommentReportVoList;
        } catch (Exception e) {
            throw new IllegalStateException("CODE [ BOARD/ COMMENT / REPORTED / LIST ]");
        }
    }
    @PostMapping("reported/comment/delete")
    public int reportedReviewCommentDel(@RequestBody String[] numList , @RequestHeader("Authorization") String token){
        try{
            int result = service.reportedReviewCommentDel(numList , token);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
}
