package com.kh.healthcare.diet.meal;

import lombok.Data;

@Data
public class FoodVo {
    private String no;
    private String label;
    private String unit;
    private String amount;
    private String kcal;
}
