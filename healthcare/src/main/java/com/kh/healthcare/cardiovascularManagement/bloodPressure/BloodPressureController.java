package com.kh.healthcare.cardiovascularManagement.bloodPressure;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("api/bloodPressure")
@CrossOrigin
public class BloodPressureController {

    private final BloodPressureService service;

    @PostMapping("write")
    public String bloodPressureWrite(@RequestBody BloodPressureVo vo){
        return service.bloodPressureWrite(vo);
    }

    @PostMapping("list")
    public List<BloodPressureVo> bloodPressureList(@RequestBody BloodPressureVo vo){
        return service.bloodPressureList(vo.getMemberNo());
    }
}
