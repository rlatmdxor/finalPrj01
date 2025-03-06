package com.kh.healthcare.notice;

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
public class NoticeService {

    private final NoticeMapper mapper;
    private final JwtUtil jwtUtil;

    public List<NoticeVo> list(SearchFilterVo filterVo, String token) {
        token = token.replace("Bearer ", "");


        return mapper.list(filterVo);
    }

    public int write(NoticeVo vo, List<NoticeAttachVo> attachVoList, String token) {
        token = token.replace("Bearer ", "");
        String writer = jwtUtil.getNo(token);
        vo.setWriter(writer);

        int result1 = 0;
        int result2 = 1;

        if(vo.getTitle() == null || vo.getTitle().equals("")){
            throw new IllegalStateException("CODE [ NOTICE / WRITE / DISABLE TITLE");
        }
        if(vo.getContent() == null || vo.getContent().equals("")){
            throw new IllegalStateException("CODE [ NOTICE / WRITE / DISABLE CONTENT");
        }

        result1 = mapper.write(vo);
        if(attachVoList.size()>0){
            result2 = mapper.insertAttachNotice(attachVoList);
        }
        return result1*result2;
    }

    public Map detail(String bno, String token) {
        token = token.replace("Bearer ", "");


        Map map = new HashMap<>();
        mapper.increaseHit(bno);
        NoticeVo detailVo = mapper.detailVo(bno);
        List<NoticeAttachVo> attachVoList = mapper.detailAttachList(bno);
        if(attachVoList.size() > 0){
            map.put("attachVoList" , attachVoList);
        }
        map.put("detailVo" , detailVo);
        return map;
    }

    public int deleteNotice(NoticeVo vo, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setWriter(memberNo);

        int result = mapper.deleteNotice(vo);
        if (result != 1){
            throw new IllegalStateException("CODE [BOARD / DELETE / SERVICE]");
        }
        return result;
    }

    public int edit(NoticeVo vo, List<NoticeAttachVo> attachVoList, List<NoticeAttachVo> deleteFiles) {
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
            for (NoticeAttachVo deleteFile : deleteFiles) {
                mapper.deleteAttach(deleteFile);
            }
        }

        result1 = mapper.edit(vo);
        if(attachVoList.size()>0){
            for (NoticeAttachVo attachVo : attachVoList) {
                result2 = mapper.editAttachNotice(attachVo, bno);
            }
        }
        return result1*result2;
    }
}
