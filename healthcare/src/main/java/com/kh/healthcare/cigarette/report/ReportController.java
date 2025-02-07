package com.kh.healthcare.cigarette.report;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/cigarette")
@RequiredArgsConstructor
@CrossOrigin
public class ReportController {

    private final ReportService service;


    @PostMapping("list")
    public List<ReportVo> reportVoList(@RequestBody ReportVo vo){
        System.out.println("vo = " + vo);
        System.out.println("service = " + service);

        return service.list(vo.getMemberNo());
    }
}
