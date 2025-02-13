package com.kh.healthcare.diet.meal;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DietMealMapper {

    @Insert("""
            INSERT INTO DIET
            (
                NO
                , MEMBER_NO
                , MEAL_CODE
                , DIET_DAY
                , MEMO
                , IMAGE
                , ENROLL_DATE
            )
            VALUES
            (
                SEQ_DIET.NEXTVAL
                , #{memberNo}
                , #{mealCode}
                , #{dietDay}
                , #{memo}
                , 'https://picsum.photos/300/300'
                , SYSDATE
            )
            """)
    void dietEnroll(DietVo vo);

    @Insert("""
            INSERT INTO MEAL_LOG 
            (
                NO
                , DIET_NO
                , NAME
                , UNIT
                , AMOUNT
                , KCAL
            ) 
            VALUES 
            (
                SEQ_MEAL_LOG.NEXTVAL
                , SEQ_DIET.CURRVAL
                , #{name}
                , #{unit}
                , #{amount}
                , #{kcal}
            )
            """)
    void mealEnroll(MealVo vo);
}
