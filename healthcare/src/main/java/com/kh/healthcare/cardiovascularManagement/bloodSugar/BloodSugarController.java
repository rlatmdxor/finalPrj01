package com.kh.healthcare.cardiovascularManagement.bloodSugar;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("api/bloodSugar")
@CrossOrigin
public class BloodSugarController {

    private final BloodSugarService service;

    @PostMapping("list")
    public List<BloodSugarVo> list(@RequestBody BloodSugarVo vo , @RequestHeader("Authorization") String authorization ){

        return service.list(vo.getMemberNo());
    }

    @PostMapping("write")
    public int bsWrite(@RequestBody BloodSugarVo vo , @RequestHeader("Authorization") String authorization ){

        try{
            return service.bsWrite(vo);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }

    }

    @PostMapping("edit")
    public int bsEdit(@RequestBody BloodSugarVo vo , @RequestHeader("Authorization") String authorization ){

        try{
            return service.bsEdit(vo);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }

    }
    @PostMapping("delete")
    public String bsDel(@RequestBody BloodSugarVo vo, @RequestHeader("Authorization") String authorization ){
        service.bsDel(vo);
        return "1";
    }
}
