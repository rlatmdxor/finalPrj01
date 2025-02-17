package com.kh.healthcare.diet.meal;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

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
    void dietEnroll(DietVo vo); // TODO : 픽숨 링크 지우고 #{image} 로 바꾸기

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
                , #{label}
                , #{unit}
                , #{amount}
                , #{kcal}
            )
            """)
    void mealEnroll(MealVo vo);

    @Select("""
            SELECT 
                D.MEMBER_NO
                , D.DIET_DAY
                , D.MEAL_CODE
                , NVL(SUM(M.KCAL), 0) AS SUMMARY_KCAL
            FROM DIET D
            LEFT JOIN MEAL_LOG M ON (D.NO = M.DIET_NO)
            WHERE D.MEMBER_NO = #{memberNo}
            AND DIET_DAY = #{dietDay}
            GROUP BY MEMBER_NO, DIET_DAY, MEAL_CODE
            """)
    List<SummaryKcalVo> getMealKcalSummary(DietVo vo);
}
