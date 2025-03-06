package com.kh.healthcare.diet;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/diet")
@RequiredArgsConstructor
public class DietController {

    private final DietService service;

    @GetMapping("cal")
    public List<DietCalVo> getDietCalData(@RequestHeader("Authorization") String token){
        try {
            List<DietCalVo> voList = service.getDietCalData(token);
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DIET CALENDAR FAIL..");
        }
    }

    @GetMapping("report/day")
    public DietReportVo getDietDayReport(@RequestParam String month, @RequestHeader("Authorization") String token){
        try {
            DietReportVo voList = service.getDietDayReport(month, token);
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DIET DAY REPORT FAIL..");
        }
    }

    @GetMapping("report/month")
    public DietReportVo getDietMonthReport(@RequestParam String year, @RequestHeader("Authorization") String token){
        try {
            DietReportVo voList = service.getDietMonthReport(year, token);
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DIET MONTH REPORT FAIL..");
        }
    }

    @GetMapping("report/year")
    public DietReportVo getDietYearReport(@RequestHeader("Authorization") String token){
        try {
            DietReportVo voList = service.getDietYearReport(token);
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DIET YEAR REPORT FAIL..");
        }
    }
}
