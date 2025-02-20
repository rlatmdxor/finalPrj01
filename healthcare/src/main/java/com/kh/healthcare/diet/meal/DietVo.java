package com.kh.healthcare.diet.meal;

import lombok.Data;

import java.util.List;

@Data
public class DietVo {
    private String no;
    private String memberNo;
    private String dietDay;
    private String mealCode;
    private List<MealVo> foodList;
    private String sumKcal;
    private String memo;
    private String image;
    private String enrollDate;
    private String modifyDate;
}
