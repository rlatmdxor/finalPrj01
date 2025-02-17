package com.kh.healthcare.alc.calender;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/alc")
@RequiredArgsConstructor
public class AlcCalenderController {

    private final AlcCalenderService service;

    @PostMapping("list")
    public List<AlcCalenderVo> alcCalenderVoList(@RequestBody AlcCalenderVo vo) {
        System.out.println("vo = " + vo);

        return service.list(vo.getMemberNo());
    }

    @PostMapping("write")
    public String write(@RequestBody AlcCalenderVo vo) {
        service.write(vo);
        System.out.println("vo = " + vo);
        return "write";
    }

    @PostMapping("update")
    public String update(@RequestBody AlcCalenderVo vo) {
        service.update(vo);
        return "update";
    }

    @DeleteMapping("delete")
    public String delete(@RequestBody AlcCalenderVo vo) {
        service.delete(vo);
        return "delete";
    }



}
