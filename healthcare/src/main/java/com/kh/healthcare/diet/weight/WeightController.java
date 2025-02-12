package com.kh.healthcare.diet.weight;

import com.kh.healthcare.diet.water.WaterVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/weight")
@RequiredArgsConstructor
public class WeightController {

    private final WeightService service;

    @PostMapping("enroll")
    public String weightEnroll(@RequestBody WeightVo vo){
        try {
            service.weightEnroll(vo);
            return "WEIGHT ENROLL SUCCESS";
        }
        catch (Exception e){
            throw new IllegalStateException("[ERROR] WEIGHT ENROLL FAIL..");
        }
    }

    @PostMapping
    public String getWeightByDate(@RequestBody WeightVo vo){
        try {
            String amount = service.getWeightByDate(vo);
            return amount;
        }
        catch (Exception e){
            throw new IllegalStateException("[ERROR] WEIGHT VIEW FAIL..");
        }
    }


}
