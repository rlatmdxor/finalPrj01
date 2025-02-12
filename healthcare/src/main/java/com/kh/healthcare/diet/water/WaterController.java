package com.kh.healthcare.diet.water;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/water")
@RequiredArgsConstructor
public class WaterController {

    private final WaterService service;

    @PostMapping("enroll")
    public String waterIntakeEnroll(@RequestBody WaterVo vo){
        try {
            service.waterIntakeEnroll(vo);
            return "WATER ENROLL SUCCESS";
        }
        catch (Exception e){
            throw new IllegalStateException("[ERROR] WATER ENROLL FAIL..");
        }
    }

    @PostMapping
    public String getWaterIntakeByDate(@RequestBody WaterVo vo){
        try {
            String amount = service.getWaterIntakeByDate(vo);
            return amount;
        }
        catch (Exception e){
            throw new IllegalStateException("[ERROR] WATER VIEW FAIL..");
        }
    }

}
