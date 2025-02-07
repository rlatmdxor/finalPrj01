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
    public List<BloodSugarVo> list(@RequestBody BloodSugarVo vo){
        return service.list(vo.getMemberNo());
    }
}
