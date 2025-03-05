package com.kh.healthcare.diet.weight;
import com.kh.healthcare.diet.water.WaterVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/weight")
@RequiredArgsConstructor
public class WeightController {

    private final WeightService service;

    @PostMapping("enroll")
    public void weightEnroll(@RequestBody WeightVo vo, @RequestHeader("Authorization") String token){
        try {
            service.weightEnroll(vo, token);
        }
        catch (Exception e){
            throw new IllegalStateException("[ERROR] WEIGHT ENROLL FAIL..");
        }
    }

    @PostMapping
    public WeightVo getWeightByDate(@RequestBody WeightVo vo, @RequestHeader("Authorization") String token){
        try {
            WeightVo weightVo = service.getWeightByDate(vo, token);
            return weightVo;
        }
        catch (Exception e){
            throw new IllegalStateException("[ERROR] WEIGHT VIEW FAIL..");
        }
    }

}
