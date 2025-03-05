package com.kh.healthcare.cigarette.report;

import com.kh.healthcare.alc.report.AlcReportVo;
import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CigaretteReportService {

    private final CigaretteReportMapper mapper;
    private final JwtUtil jwtUtil;


    public List<CigaretteReportVo> list(String token)
    {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        return mapper.list(memberNo);
    }

    public void write(String token, CigaretteReportVo vo) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        mapper.write(memberNo, vo);
    }

    public void update(String token, CigaretteReportVo vo) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        mapper.update(memberNo, vo);
    }

    public void delete(String token, CigaretteReportVo vo) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        String no = vo.getNo(); // 게시글 번호 추출
        mapper.delete(memberNo, no);
    }
}
