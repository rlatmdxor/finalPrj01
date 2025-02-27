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
    public String waterIntakeEnroll(@RequestBody WaterVo vo, @RequestHeader("Authorization") String authorization){
        try {
            service.waterIntakeEnroll(vo);
            return "WATER ENROLL SUCCESS";
        }
        catch (Exception e){
            throw new IllegalStateException("[ERROR] WATER ENROLL FAIL..");
        }
    }

    @PostMapping
    public String getWaterIntakeByDate(@RequestBody WaterVo vo, @RequestHeader("Authorization") String authorization){
        try {
            String amount = service.getWaterIntakeByDate(vo);
            return amount;
        }
        catch (Exception e){
            throw new IllegalStateException("[ERROR] GET WATER BY DATE FAIL..");
        }
    }

    @GetMapping("/report/day")
    public List<WaterVo> getDayWater(@RequestParam int memberNo, @RequestParam(required = false) String month, @RequestHeader("Authorization") String authorization){
        try {
            List<WaterVo> voList = service.getDayWater(memberNo, month);
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] GET DAY WATER FAIL..");
        }
    }

    @GetMapping("/report/month")
    public List<WaterVo> getMonthAvgWater(@RequestParam int memberNo, @RequestParam(required = false) String year, @RequestHeader("Authorization") String authorization){
        try {
            List<WaterVo> voList = service.getMonthAvgWater(memberNo, year);
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] GET MONTH WATER FAIL..");
        }
    }

    @GetMapping("/report/year")
    public List<WaterVo> getYearAvgWater(@RequestParam int memberNo, @RequestHeader("Authorization") String authorization){
        try {
            List<WaterVo> voList = service.getYearAvgWater(memberNo);
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] GET YEAR WATER FAIL..");
        }
    }

}
