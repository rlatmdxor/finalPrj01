package com.kh.healthcare.board.honeyTip;

import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class HoneyTipService {

    private final HoneyTipMapper mapper;
    private final JwtUtil jwtUtil;

    public List<HoneyTipVo> list(SearchFilterVo filterVo) {
        return  mapper.list(filterVo);
    }


    public int write(HoneyTipVo vo, List<HoneyTipAttachVo> attachVoList, String token) {

        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);

        int result1 = 0;
        int result2 = 1;

        if(vo.getTitle() == null || vo.getTitle().equals("")){
            throw new IllegalStateException("CODE [ BOARD / WRITE / DISABLE TITLE");
        }
        if(vo.getContent() == null || vo.getContent().equals("")){
            throw new IllegalStateException("CODE [ BOARD / WRITE / DISABLE CONTENT");
        }

        result1 = mapper.write(vo);
        if(attachVoList.size()>0){
            result2 = mapper.insertAttachHoneyBoard(attachVoList);
        }
        return result1*result2;
    }
    public int edit(HoneyTipVo vo, List<HoneyTipAttachVo> attachVoList, List<HoneyTipAttachVo> deleteFiles) {

        int result1 = 0;
        int result2 = 1;

        String bno = vo.getNo();

        if(vo.getTitle() == null || vo.getTitle().equals("")){
            throw new IllegalStateException("CODE [ BOARD / EDIT / DISABLE TITLE");
        }
        if(vo.getContent() == null || vo.getContent().equals("")){
            throw new IllegalStateException("CODE [ BOARD / EDIT / DISABLE CONTENT");
        }
        if(deleteFiles.size()>0){
            for (HoneyTipAttachVo deleteFile : deleteFiles) {
                mapper.deleteAttach(deleteFile);
            }
        }

        result1 = mapper.edit(vo);
        if(attachVoList.size()>0){
            for (HoneyTipAttachVo attachVo : attachVoList) {
                result2 = mapper.editAttachHoneyBoard(attachVo, bno);
            }
        }
        return result1*result2;



    }

    public Map detail(String bno , String token) {

        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);

        Map map = new HashMap<>();
        mapper.increaseHit(bno);
        HoneyTipVo detailVo = mapper.detailVo(bno);
        List<HoneyTipAttachVo> attachVoList = mapper.detailAttachList(bno);
        if(attachVoList.size() > 0){
            map.put("attachVoList" , attachVoList);
        }
        int isRecommend = mapper.isRecommend(bno , memberNo);
        map.put("userNo" , memberNo);
        map.put("detailVo" , detailVo);
        map.put("isRecommend" , isRecommend);
        return map;
    }

    public void recommend(BoardRecommendVo vo, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);

        int isRecommend = mapper.isRecommend(vo.getBno() , vo.getMemberNo());

        if(vo.getIsLike() == true && isRecommend != 1){
            mapper.thumbsUp(vo);
        }else {
            mapper.thumbsDown(vo);
        }
    }

    public int countLike(String bno) {
        return mapper.getCountLike(bno);
    }

    public int reportBoard(HoneyTipReportVo vo, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);

        int type = Integer.parseInt(vo.getReportType());
        if (type < 1 || type > 9) {
            throw new IllegalStateException("CODE [ BOARD / HONEY_TIP / REPORT ]");
        }
        return mapper.reportBoard(vo);
    }

    public int deleteHoneyTip(HoneyTipVo vo, String token) {

        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);
        mapper.deleteReportedHoneyTip(vo);
        List<HoneyTipCommentVo> commentVoList = mapper.commentList(vo.getNo());
        for (HoneyTipCommentVo honeyTipCommentVo : commentVoList) {
            mapper.deleteReportedHoneyTipComment(honeyTipCommentVo);
        }
        int result = mapper.deleteHoneyTip(vo);
        if (result != 1){
            throw new IllegalStateException("CODE [BOARD / DELETE / SERVICE]");
        }
        return result;
    }

    public int commentWrite(HoneyTipCommentVo vo, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);

        if(vo.getContent() == null || vo.getContent().equals("")){
            throw new IllegalStateException("CODE [ BOARD / COMMENT / WRITE ]");
        }

        return mapper.commentWrite(vo);
    }



    public int commentDelete(HoneyTipCommentVo vo, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);
        int result = mapper.commentDelete(vo);
        if(result != 1){
            throw new IllegalStateException("CODE [ BOARD / COMMENT / DELETE ]");
        }
        return result;
    }

    public int commentReport(HoneyTipCommentReportVo vo, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);
        int type = Integer.parseInt(vo.getReportType());
        if (type < 1 || type > 9) {
            throw new IllegalStateException("CODE [ BOARD / COMMENT / REPORT ]");
        }
        return mapper.commentReport(vo);
    }

    public List<HoneyTipCommentVo> commentList(String bno, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);

        if(bno == null || bno.equals("")){
            throw new IllegalStateException("CODE [ BOARD / COMMENT / LIST / BNO ERROR ]");
        }

        return mapper.commentList(bno);
    }





    // 신규 댓글 확인
    public String checkNewComment(String userNo) {
        int isEnabled = mapper.isCommentPushEnabled(userNo);

        if(isEnabled>=1){
            int count = mapper.checkNewComment(userNo);
            if (count == 0) {
                return "신규 댓글 없음";
            } else {
                return "회원님의 게시글에 새로운 댓글이 있습니다.";
            }
        } else {
            return  "푸시 설정 OFF";
        }

    }

    public List<HoneyTipReportVo> reportedList() {
        return mapper.reportedList();
    }

    public int reportedHoneyTipDel(String[] numList, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);

        if(numList.length < 1){
            throw new IllegalStateException("CODE [REPORTED / HONEYTIP / DELETE ]");
        }
        HoneyTipVo vo = new HoneyTipVo();


        int result = 0;
        for (String no : numList) {
            vo.setNo(no);
            mapper.deleteHoneyTip(vo);
            mapper.deleteReportedHoneyTip(vo);
            result++;
        }
        return result;
    }

    public List<HoneyTipCommentReportVo> reportedCommentList() {
        return mapper.reportedCommentList();
    }

    public int reportedHoneyTipCommentDel(String[] numList, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);

        if(numList.length < 1){
            throw new IllegalStateException("CODE [REPORTED / HONEYTIP / COMMENT / DELETE ]");
        }
        HoneyTipCommentVo vo = new HoneyTipCommentVo();


        int result = 0;
        for (String no : numList) {
            vo.setNo(no);
            mapper.commentDelete(vo);
            mapper.deleteReportedHoneyTipComment(vo);
            result++;
        }
        return result;
    }

    public void markCommentsAsNotified(String userNo) {
        mapper.markCommentsAsNotified(userNo);
    }
}


