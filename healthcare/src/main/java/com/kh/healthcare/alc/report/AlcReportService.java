package com.kh.healthcare.alc.report;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AlcReportService {


    private final AlcReportMapper mapper;


    public List<AlcReportVo> list(Long memberNo) {
        return mapper.getAlcReport(memberNo);
    }

    public void write(AlcReportVo vo) {
        mapper.write(vo);
    }

    public void update(AlcReportVo vo) {
        mapper.update(vo);
    }

    public void delete(AlcReportVo vo) {
        mapper.delete(vo);
    }


}
