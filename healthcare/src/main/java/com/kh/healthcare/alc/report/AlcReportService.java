package com.kh.healthcare.alc.report;

import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AlcReportService {

    private final AlcReportMapper mapper;
    private final JwtUtil jwtUtil;

    public List<AlcReportVo> list(String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        return mapper.list(memberNo);
    }

    public void write(String token, AlcReportVo vo) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        mapper.write(memberNo, vo);
    }

    public void update(String token, AlcReportVo vo) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        mapper.update(memberNo, vo);
    }

    public void delete(String token, AlcReportVo vo) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        String no = vo.getNo(); // 게시글 번호 추출
        mapper.delete(memberNo, no);
    }


}

