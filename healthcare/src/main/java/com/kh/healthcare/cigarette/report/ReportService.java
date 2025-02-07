package com.kh.healthcare.cigarette.report;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportService {

    private final ReportMapper mapper;


    public List<ReportVo> list(Long memberNo) {
        System.out.println("memberNo = " + memberNo);
        System.out.println("mapper = " + mapper);

        return mapper.getCigaretteReport(memberNo);
    }
}
