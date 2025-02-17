package com.kh.healthcare.diet.meal;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class MealVo {
    private String no;
    private String dietNo;
    private String label;
    private String unit;
    private String amount;
    private String kcal;
}
