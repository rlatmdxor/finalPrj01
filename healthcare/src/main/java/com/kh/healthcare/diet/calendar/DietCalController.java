package com.kh.healthcare.diet.calendar;
import com.kh.healthcare.diet.meal.DietVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Member;
import java.util.List;

@RestController
@RequestMapping("api/dietcal")
@RequiredArgsConstructor
public class DietCalController {

    private final DietCalService service;

    @PostMapping
    public List<DietCalVo> getDietCalData(@RequestBody DietCalVo vo, @RequestHeader("Authorization") String authorization){
        System.out.println("memberNo = " + vo);
        try {
            List<DietCalVo> voList = service.getDietCalData(vo.getMemberNo());
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DIET CALENDAR FAIL..");
        }
    }
}
