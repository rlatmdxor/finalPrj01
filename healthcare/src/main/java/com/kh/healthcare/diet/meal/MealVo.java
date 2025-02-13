package com.kh.healthcare.diet.meal;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class MealVo {
    private String no;
    private String dietNo;

    @JsonProperty("label")
    private String name;

    private String unit;
    private String amount;
    private String kcal;
}
