package com.kh.healthcare.cigarette.report;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/cigarette")
@RequiredArgsConstructor
@CrossOrigin
public class CigaretteReportController {

    private final CigaretteReportService service;


    @PostMapping("list")
    public List<CigaretteReportVo> CigaretteReportVoList(@RequestBody CigaretteReportVo vo){


        return service.list(vo.getMemberNo());
    }

    @PostMapping("write")
    public String write(@RequestBody CigaretteReportVo vo) {
        service.write(vo);
        return "write";
    }

    @PostMapping("update")
    public String update(@RequestBody CigaretteReportVo vo){
        service.update(vo);
        System.out.println("vo = " + vo);
        return "update";
    }

    @DeleteMapping("delete")
    public String delete(@RequestBody CigaretteReportVo vo){
        service.delete(vo);
        return "delete";
    }


}
