package com.kh.healthcare.diet.meal;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DietMealService {

    private final DietMealMapper mapper;

    public void dietMealEnroll(DietVo vo) {
        mapper.dietEnroll(vo);

        List<MealVo> mealVoList = vo.getFoodList();
        for (MealVo mealVo : mealVoList) {
            System.out.println("mealVo = " + mealVo);
            mapper.mealEnroll(mealVo);
        }

    }
}
