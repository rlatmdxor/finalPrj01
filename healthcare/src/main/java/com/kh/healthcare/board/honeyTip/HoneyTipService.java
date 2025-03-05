package com.kh.healthcare.board.honeyTip;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HoneyTipService {

    private final HoneyTipMapper mapper;

    public List<HoneyTipVo> list(SearchFilterVo filterVo) {
        return mapper.list(filterVo);
    }


    public int write(HoneyTipVo vo, List<HoneyTipAttachVo> attachVoList) {
        int result1 = 0;
        int result2 = 1;
        if(vo.getTitle().length() < 1){
            throw new IllegalStateException("CODE [ BOARD / WRITE / DISABLE TITLE");
        }
        if(vo.getContent().length() < 1){
            throw new IllegalStateException("CODE [ BOARD / WRITE / DISABLE CONTENT");
        }
//        if(vo.getCategoryNo())

        result1 = mapper.write(vo);
        if(attachVoList.size()>0){
            result2 = mapper.insertAttachHoneyBoard(attachVoList);
        }
        return result1*result2;
    }
    public int edit(HoneyTipVo vo, List<HoneyTipAttachVo> attachVoList) {
        return 0;
    }

    public Map detail(String bno , String memberNo) {
        Map map = new HashMap<>();
        mapper.increaseHit(bno);
        HoneyTipVo detailVo = mapper.detailVo(bno);
        List<HoneyTipAttachVo> attachVoList = mapper.detailAttachList(bno);
        if(attachVoList.size() > 0){
            map.put("attachVoList" , attachVoList);
        }
        int isRecommend = mapper.isRecommend(bno , memberNo);

        map.put("detailVo" , detailVo);
        map.put("isRecommend" , isRecommend);
        return map;
    }

    public void recommend(BoardRecommendVo vo) {

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

    public int reportBoard(HoneyTipReportVo vo) {
        int type = Integer.parseInt(vo.getReportType());
        if (type < 1 || type > 9) {
            throw new IllegalStateException("CODE [ BOARD / COMMENT / REPORT ]");
        }
        return mapper.reportBoard(vo);
    }

    public int deleteHoneyTip(HoneyTipVo vo) {

        int result = mapper.deleteHoneyTip(vo);
        if (result != 1){
            throw new IllegalStateException("CODE [BOARD / DELETE / SERVICE]");
        }
        return result;
    }

    public int commentWrite(HoneyTipCommentVo vo) {

        if(vo.getContent() == null || vo.getContent().equals("")){
            throw new IllegalStateException("CODE [ BOARD / COMMENT / WRITE ]");
        }

        return mapper.commentWrite(vo);
    }



    public int commentDelete(HoneyTipCommentVo vo) {
        int result = mapper.commentDelete(vo);
        if(result != 1){
            throw new IllegalStateException("CODE [ BOARD / COMMENT / DELETE ]");
        }
        return result;
    }

    public int commentReport(HoneyTipCommentReportVo vo) {
        int type = Integer.parseInt(vo.getReportType());
        if (type < 1 || type > 9) {
            throw new IllegalStateException("CODE [ BOARD / COMMENT / REPORT ]");
        }
        return mapper.commentReport(vo);
    }

    public List<HoneyTipCommentVo> commentList(String bno) {

        if(bno == null || bno.equals("")){
            throw new IllegalStateException("CODE [ BOARD / COMMENT / LIST / BNO ERROR ]");
        }

        return mapper.commentList(bno);
    }

    // 신규 댓글 확인
    public String checkNewComment(String userNo) {
        int count = mapper.checkNewComment(userNo);
        if (count == 0) {
            return "신규 댓글 없음";
        } else {
            return "회원님의 게시글에 새로운 댓글이 있습니다.";
        }
    }
}


