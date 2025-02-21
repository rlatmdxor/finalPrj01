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

    @GetMapping("/report/day")
    public List<WeightVo> getDayWeight(@RequestParam int memberNo, @RequestParam(required = false) String month, @RequestHeader("Authorization") String authorization){
        try {
            List<WeightVo> voList = service.getDayWeight(memberNo, month);
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] GET DAY WEIGHT FAIL..");
        }
    }

    @GetMapping("/report/month")
    public List<WeightVo> getMonthAvgWeight(@RequestParam int memberNo, @RequestParam(required = false) String year, @RequestHeader("Authorization") String authorization){
        try {
            List<WeightVo> voList = service.getMonthAvgWeight(memberNo, year);
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] GET MONTH WEIGHT FAIL..");
        }
    }

    @GetMapping("/report/year")
    public List<WeightVo> getYearAvgWeight(@RequestParam int memberNo, @RequestHeader("Authorization") String authorization){
        try {
            List<WeightVo> voList = service.getYearAvgWeight(memberNo);
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] GET YEAR WEIGHT FAIL..");
        }
    }

}
