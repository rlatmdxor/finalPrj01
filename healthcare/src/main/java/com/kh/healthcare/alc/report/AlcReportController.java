package com.kh.healthcare.alc.report;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/alc/report")
@RequiredArgsConstructor
public class AlcReportController {

    private final AlcReportService service;

    @PostMapping("list")
    public List<AlcReportVo> alcReportVoList(@RequestBody AlcReportVo vo) {
        System.out.println("vo = " + vo);

        return service.list(vo.getMemberNo());
    }

    @PostMapping("write")
    public String write(@RequestBody AlcReportVo vo) {
        service.write(vo);
        return "write";
    }

    @PostMapping("update")
    public String update(@RequestBody AlcReportVo vo) {
        service.update(vo);
        return "update";
    }

    @DeleteMapping("delete")
    public String delete(@RequestBody AlcReportVo vo) {
        service.delete(vo);
        return "delete";
    }
}
