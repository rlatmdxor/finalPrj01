package com.kh.healthcare.diet.weight;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/weight")
@RequiredArgsConstructor
public class WeightController {

    private final WeightService service;

    @PostMapping("enroll")
    public String weightEnroll(@RequestBody WeightVo vo, @RequestHeader("Authorization") String authorization){
        try {
            service.weightEnroll(vo);
            return "WEIGHT ENROLL SUCCESS";
        }
        catch (Exception e){
            throw new IllegalStateException("[ERROR] WEIGHT ENROLL FAIL..");
        }
    }

    @PostMapping
    public String getWeightByDate(@RequestBody WeightVo vo, @RequestHeader("Authorization") String authorization){
        try {
            String amount = service.getWeightByDate(vo);
            return amount;
        }
        catch (Exception e){
            throw new IllegalStateException("[ERROR] WEIGHT VIEW FAIL..");
        }
    }


}
