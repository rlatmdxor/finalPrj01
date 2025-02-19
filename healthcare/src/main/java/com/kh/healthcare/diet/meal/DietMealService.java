package com.kh.healthcare.diet.meal;

import lombok.RequiredArgsConstructor;
import org.eclipse.jdt.internal.compiler.env.ISourceMethod;
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
            mapper.mealEnroll(mealVo);
        }

    }

    public List<DietVo> dietMealDetail(DietVo vo) {

        List<DietVo> voList = mapper.getDietDetail(vo);

        for (DietVo dietVo : voList) {
            String sumKcal = mapper.getSumKcal(dietVo);
            dietVo.setSumKcal(sumKcal);

            List<MealVo> mealVoList = mapper.getFoodList(dietVo);
            dietVo.setFoodList(mealVoList);
        }

        return voList;

    }

    public void dietMealEdit(DietVo vo) {
        mapper.dietEdit(vo);

        mapper.deleteMealList(vo);

        List<MealVo> mealVoList = vo.getFoodList();
        for (MealVo mealVo : mealVoList) {
            mealVo.setDietNo(vo.getNo());
            mapper.mealEdit(mealVo);
        }
    }

    public void dietMealDelete(String no) {
        mapper.dietMealDelete(no);
    }

    public List<FoodVo> getFoodData() {
        return mapper.getFoodData();
    }
}
