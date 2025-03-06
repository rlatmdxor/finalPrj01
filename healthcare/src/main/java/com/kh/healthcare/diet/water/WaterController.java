package com.kh.healthcare.diet.water;

import com.kh.healthcare.diet.meal.TotalKcalVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/water")
@RequiredArgsConstructor
public class WaterController {

    private final WaterService service;

    @PostMapping("enroll")
    public void waterEnroll(@RequestBody WaterVo vo, @RequestHeader("Authorization") String token){
        try {
            service.waterEnroll(vo, token);
        }
        catch (Exception e){
            throw new IllegalStateException("[ERROR] WATER ENROLL FAIL..");
        }
    }

    @PostMapping
    public WaterVo getWaterByDate(@RequestBody WaterVo vo, @RequestHeader("Authorization") String token){
        try {
            WaterVo waterVo = service.getWaterByDate(vo, token);
            return waterVo;
        }
        catch (Exception e){
            throw new IllegalStateException("[ERROR] GET WATER BY DATE FAIL..");
        }
    }

}
