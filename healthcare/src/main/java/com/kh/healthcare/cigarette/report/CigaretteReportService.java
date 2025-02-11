package com.kh.healthcare.cigarette.report;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CigaretteReportService {

    private final CigaretteReportMapper mapper;


    public List<CigaretteReportVo> list(Long memberNo) {
        System.out.println("memberNo = " + memberNo);

        return mapper.getCigaretteReport(memberNo);
    }

    public void write(CigaretteReportVo vo) {
        mapper.write(vo);
    }

    public void update(CigaretteReportVo vo) {
        mapper.update(vo);
    }

    public void delete(CigaretteReportVo vo) {
        mapper.delete(vo);
    }
}
