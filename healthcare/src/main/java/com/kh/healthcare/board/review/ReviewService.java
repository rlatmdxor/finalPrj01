package com.kh.healthcare.board.review;

import com.kh.healthcare.board.honeyTip.HoneyTipAttachVo;
import com.kh.healthcare.board.honeyTip.HoneyTipCommentVo;
import com.kh.healthcare.board.honeyTip.HoneyTipVo;
import com.kh.healthcare.board.honeyTip.SearchFilterVo;
import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewMapper mapper;
    private final JwtUtil jwtUtil;

    public List<ReviewVo> reviewList(SearchFilterVo filterVo) {
        return mapper.list(filterVo);
    }



    public List<ReviewHospitalVo> searchHospital(SearchFilterVo filterVo) {
        return mapper.searchHospital(filterVo);
    }

    public int write(ReviewVo vo, List<ReviewAttachVo> attachVoList, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);

        int result1 = 0;
        int result2 = 1;

        if(vo.getTitle() == null || vo.getTitle().equals("")){
            throw new IllegalStateException("CODE [ REVIEW / WRITE / DISABLE TITLE");
        }
        if(vo.getContent() == null || vo.getContent().equals("")){
            throw new IllegalStateException("CODE [ REVIEW / WRITE / DISABLE CONTENT");
        }
        if(vo.getVisitDate() == null || vo.getVisitDate().equals("")){
            vo.setVisitDate(null);
        }
        if(vo.getDepartment() == null || vo.getDepartment().equals("")){
            vo.setDepartment(null);
        }

        result1 = mapper.write(vo);
        if(attachVoList.size()>0){
            result2 = mapper.insertAttachReview(attachVoList);
        }
        return result1*result2;
    }

    public Map detail(String bno, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);

        Map map = new HashMap<>();
        ReviewVo detailVo = mapper.detailVo(bno);
        List<ReviewAttachVo> attachVoList = mapper.detailAttachList(bno);
        if(attachVoList.size() > 0){
            map.put("attachVoList" , attachVoList);
        }
        map.put("userNo" , memberNo);
        map.put("detailVo" , detailVo);
        return map;
    }

    public int reportBoard(ReviewReportVo vo, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);

        int type = Integer.parseInt(vo.getReportType());
        if (type < 1 || type > 9) {
            throw new IllegalStateException("CODE [ REVIEW / REPORT ]");
        }
        return mapper.reportBoard(vo);
    }

    public int deleteHoneyTip(ReviewVo vo, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);
        List<ReviewCommentVo> commentVoList = mapper.commentList(vo.getNo());
        for (ReviewCommentVo reviewCommentVo : commentVoList) {
            mapper.deleteReportedReviewComment(reviewCommentVo);
        }

        int result = mapper.deleteReview(vo);
        if (result != 1){
            throw new IllegalStateException("CODE [REVIEW / DELETE / SERVICE]");
        }
        return result;
    }

    public int commentWrite(ReviewCommentVo vo, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);

        if(vo.getContent() == null || vo.getContent().equals("")){
            throw new IllegalStateException("CODE [ REVIEW / COMMENT / WRITE ]");
        }

        return mapper.commentWrite(vo);
    }

    public int commentDelete(ReviewCommentVo vo, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);
        int result = mapper.commentDelete(vo);
        if(result != 1){
            throw new IllegalStateException("CODE [ REVIEW / COMMENT / DELETE ]");
        }
        return result;
    }

    public List<ReviewCommentVo> commentList(String bno, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);

        if(bno == null || bno.equals("")){
            throw new IllegalStateException("CODE [ REVIEW / COMMENT / LIST / BNO ERROR ]");
        }

        return mapper.commentList(bno);
    }

    public int edit(ReviewVo vo, List<ReviewAttachVo> attachVoList, List<ReviewAttachVo> deleteFiles) {
        int result1 = 0;
        int result2 = 1;

        String bno = vo.getNo();

        if(vo.getTitle() == null || vo.getTitle().equals("")){
            throw new IllegalStateException("CODE [ REVIEW / EDIT / DISABLE TITLE");
        }
        if(vo.getContent() == null || vo.getContent().equals("")){
            throw new IllegalStateException("CODE [ REVIEW / EDIT / DISABLE CONTENT");
        }
        if(vo.getVisitDate() == null || vo.getVisitDate().equals("")){
            vo.setVisitDate(null);
        }
        if(vo.getDepartment() == null || vo.getDepartment().equals("")){
            vo.setDepartment(null);
        }
        if(deleteFiles.size()>0){
            for (ReviewAttachVo deleteFile : deleteFiles) {
                mapper.deleteAttach(deleteFile);
            }
        }

        result1 = mapper.edit(vo);
        if(attachVoList.size()>0){
            for (ReviewAttachVo attachVo : attachVoList) {
                result2 = mapper.editAttachReview(attachVo, bno);
            }
        }
        return result1*result2;
    }

    public List<ReviewReportVo> reportedList() {
        return mapper.reportedList();
    }

    public int reportedReviewDel(String[] numList, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);

        if(numList.length < 1){
            throw new IllegalStateException("CODE [REPORTED / REVIEW / DELETE ]");
        }
        ReviewVo vo = new ReviewVo();


        int result = 0;
        for (String no : numList) {
            vo.setNo(no);
            mapper.deleteReview(vo);
            mapper.deleteReportedReview(vo);
            result++;
        }
        return result;
    }

    public List<ReviewCommentReportVo> reportedCommentList() {
        return mapper.reportedCommentList();
    }

    public int reportedReviewCommentDel(String[] numList, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);

        if(numList.length < 1){
            throw new IllegalStateException("CODE [REPORTED / REVIEW / COMMENT / DELETE ]");
        }
        ReviewCommentVo vo = new ReviewCommentVo();


        int result = 0;
        for (String no : numList) {
            vo.setNo(no);
            mapper.commentDelete(vo);
            mapper.deleteReportedReviewComment(vo);
            result++;
        }
        return result;
    }

    public int commentReport(ReviewCommentReportVo vo, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);
        int type = Integer.parseInt(vo.getReportType());
        if (type < 1 || type > 9) {
            throw new IllegalStateException("CODE [ REVIEW / COMMENT / REPORT ]");
        }
        return mapper.commentReport(vo);
    }
}
