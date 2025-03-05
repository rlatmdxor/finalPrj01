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

    @GetMapping("list")
    public List<BloodSugarVo> list(@RequestHeader("Authorization") String token ){

        return service.list(token);
    }

    @PostMapping("write")
    public int bsWrite(@RequestBody BloodSugarVo vo , @RequestHeader("Authorization") String token ){
        try{
            return service.bsWrite(vo , token);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }

    }

    @PostMapping("edit")
    public int bsEdit(@RequestBody BloodSugarVo vo , @RequestHeader("Authorization") String token ){

        try{
            return service.bsEdit(vo , token);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }

    }
    @PostMapping("delete")
    public int bsDel(@RequestBody BloodSugarVo vo, @RequestHeader("Authorization") String token ){

        try{
            return service.bsDel(vo , token);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }

    }
}
