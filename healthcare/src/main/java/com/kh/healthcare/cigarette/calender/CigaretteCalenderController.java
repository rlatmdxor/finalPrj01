package com.kh.healthcare.cigarette.calender;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/cigarette")
@RequiredArgsConstructor

public class CigaretteCalenderController {

    private final CigaretteCalenderService service;

    @PostMapping("list")
    public List<CigaretteCalenderVo> CigaretteCalenderVoList(@RequestBody CigaretteCalenderVo vo){

    return service.list(vo.getMemberNo());

    }

    @PostMapping("write")
    public String write(@RequestBody CigaretteCalenderVo vo){
        service.write(vo);
        System.out.println("vo = " + vo);
        return "write";
    }

    @PostMapping("update")
    public String update(@RequestBody CigaretteCalenderVo vo) {
        service.update(vo);
        return "update";
    }

    @DeleteMapping("delete")
    public String delete(@RequestBody CigaretteCalenderVo vo) {
        service.delete(vo);
        return "delete";
    }


}
