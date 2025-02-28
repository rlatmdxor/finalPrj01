package com.kh.healthcare.cigarette.report;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/cigarette/report")
@RequiredArgsConstructor
public class CigaretteReportController {

    private final CigaretteReportService service;


    @PostMapping("list")
    public List<CigaretteReportVo> CigaretteReportVoList(@RequestBody CigaretteReportVo vo){
        return service.list(vo.getMemberNo());

    }

    @PostMapping("write")
    public String write(@RequestBody CigaretteReportVo vo) {
        try {
        service.write(vo);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "write";
    }

    @PostMapping("update")
    public String update(@RequestBody CigaretteReportVo vo){
        try {
        service.update(vo);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "update";
    }

    @DeleteMapping("delete")
    public String delete(@RequestBody CigaretteReportVo vo){
        try {
        service.delete(vo);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "delete";
    }


}
