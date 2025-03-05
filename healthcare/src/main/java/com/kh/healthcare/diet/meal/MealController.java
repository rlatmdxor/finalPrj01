package com.kh.healthcare.diet.meal;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/diet")
@RequiredArgsConstructor
public class MealController {

    private final MealService service;

    @PostMapping("enroll")
    public void dietMealEnroll(DietVo vo, String foodListArr, MultipartFile f, @RequestHeader("Authorization") String token) {
        try {
            service.dietMealEnroll(vo, foodListArr, f, token);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DIET ENROLL FAIL..");
        }
    }

    @PostMapping
    public List<DietVo> dietMealDetail(@RequestBody DietVo vo, @RequestHeader("Authorization") String token){
        try {
            List<DietVo> detailVoList = service.dietMealDetail(vo, token);
            return detailVoList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DIET MEAL DETAIL FAIL..");
        }
    }

    @PostMapping("edit")
    public void dietMealEdit(DietVo vo, String foodListArr, @RequestParam(required = false) MultipartFile f, @RequestParam(required = false) String imageUrl, @RequestHeader("Authorization") String token){
        try {
            service.dietMealEdit(vo, foodListArr, f, imageUrl, token);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DIET EDIT FAIL..");
        }
    }

    @PostMapping("delete")
    public void dietMealDelete(@RequestBody DietVo vo, @RequestHeader("Authorization") String token){
        try {
            service.dietMealDelete(vo.getNo());
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DIET DELETE FAIL..");
        }
    }

    @GetMapping("food")
    public List<FoodVo> getFoodData(@RequestHeader("Authorization") String token){
        try {
            return service.getFoodData();
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] FOOD LIST VIEW FAIL..");
        }
    }

}
