package com.kh.healthcare.diet;

import com.kh.healthcare.diet.meal.TotalKcalVo;
import com.kh.healthcare.diet.water.WaterVo;
import com.kh.healthcare.diet.weight.WeightVo;
import lombok.Data;

import java.util.List;

@Data
public class DietReportVo {
    private List<WaterVo> water;
    private List<WeightVo> weight;
    private List<TotalKcalVo> kcal;
}
