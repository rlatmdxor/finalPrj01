package com.kh.healthcare.diet.meal;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/diet")
@RequiredArgsConstructor
public class DietMealController {

    private final DietMealService service;

    @PostMapping("enroll")
    public String dietMealEnroll(@RequestBody DietVo vo) {
        System.out.println("vo = " + vo);
        System.out.println(vo.getFoodList().size());
        try {
            service.dietMealEnroll(vo);
            return "DIET ENROLL SUCCESS";
        }
        catch (Exception e){
            throw new IllegalStateException("[ERROR] DIET ENROLL FAIL..");
        }

    }

}
