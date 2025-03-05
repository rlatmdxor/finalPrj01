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
        try{
        service.write(vo);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "write";
    }

    @PostMapping("update")
    public String update(@RequestBody CigaretteCalenderVo vo) {
        try{
        service.update(vo);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "update";
    }

    @DeleteMapping("delete")
    public String delete(@RequestBody CigaretteCalenderVo vo) {
        try {
        service.delete(vo);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "delete";
    }


}