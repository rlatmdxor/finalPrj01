package com.kh.healthcare.diet.meal;

import org.apache.ibatis.annotations.*;

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
            )
            VALUES
            (
                SEQ_DIET.NEXTVAL
                , #{memberNo}
                , #{mealCode}
                , #{dietDay}
                , #{memo}
                , #{image}
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
                , #{label}
                , #{unit}
                , #{amount}
                , #{kcal}
            )
            """)
    void mealEnroll(MealVo vo);


    @Select("""
            SELECT
                NO
                , MEMBER_NO
                , MEAL_CODE
                , DIET_DAY, MEMO
                , IMAGE
                , ENROLL_DATE
                , MODIFY_DATE
                , DEL_YN
            FROM DIET
            WHERE MEMBER_NO = #{memberNo}
            AND DIET_DAY = #{dietDay}
            AND DEL_YN = 'N'
            """)
    List<DietVo> getDietDetail(DietVo vo);

    @Select("""
            SELECT NVL(SUM(KCAL), 0) AS SUM_KCAL
            FROM MEAL_LOG
            WHERE DIET_NO = #{no}
            """)
    String getSumKcal (DietVo vo);

    @Select("""
            SELECT 
                NO
                , DIET_NO
                , NAME AS LABEL
                , UNIT
                , AMOUNT
                , KCAL
            FROM MEAL_LOG
            WHERE DIET_NO = #{no}
            """)
    List<MealVo> getFoodList(DietVo vo);

    @Update("""
            UPDATE DIET
            SET MEMO = #{memo}
                , IMAGE = #{image}
                , MODIFY_DATE = SYSDATE
            WHERE NO = #{no}
            AND DEL_YN = 'N'
            """)
    void dietEdit(DietVo vo);

    @Delete("""
            DELETE FROM MEAL_LOG
            WHERE DIET_NO = #{no}
            """)
    void deleteMealList(DietVo vo);

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
                , #{dietNo}
                , #{label}
                , #{unit}
                , #{amount}
                , #{kcal}
            )
            """)
    void mealEdit(MealVo mealVo);

    @Update("""
            UPDATE DIET
            SET DEL_YN = 'Y'
            WHERE NO = #{no}
            """)
    void dietMealDelete(String no);

    @Select("""
            SELECT 
                NO
                , NAME AS LABEL
                , UNIT
                , AMOUNT
                , KCAL
            FROM FOOD
            ORDER BY LABEL 
            """)
    List<FoodVo> getFoodData();

    @Select("""
            SELECT DIET_DAY, SUM(M.KCAL) AS TOTAL_KCAL
            FROM DIET D
            LEFT JOIN MEAL_LOG M ON (D.NO = M.DIET_NO)
            WHERE D.MEMBER_NO = #{memberNo}
            AND TO_CHAR(D.DIET_DAY, 'YYYY-MM') = #{month}
            AND D.DEL_YN = 'N'
            GROUP BY D.MEMBER_NO, D.DIET_DAY
            ORDER BY D.DIET_DAY
            """)
    List<TotalKcalVo> getDayKcal(int memberNo, String month);

    @Select("""
            SELECT TO_CHAR(D.DIET_DAY, 'YYYY-MM') AS DIET_DAY, ROUND(SUM(M.KCAL)/COUNT(DISTINCT D.DIET_DAY),0) AS TOTAL_KCAL
            FROM DIET D
            LEFT JOIN MEAL_LOG M ON (D.NO = M.DIET_NO)
            WHERE D.MEMBER_NO = #{memberNo}
            AND TO_CHAR(D.DIET_DAY, 'YYYY') = #{year}
            AND D.DEL_YN = 'N'
            GROUP BY D.MEMBER_NO, TO_CHAR(D.DIET_DAY, 'YYYY-MM')
            ORDER BY DIET_DAY
            """)
    List<TotalKcalVo> getMonthAvgKcal(int memberNo, String year);

    @Select("""
            SELECT TO_CHAR(D.DIET_DAY, 'YYYY') AS DIET_DAY, ROUND(SUM(M.KCAL)/COUNT(DISTINCT D.DIET_DAY),0) AS TOTAL_KCAL
            FROM DIET D
            LEFT JOIN MEAL_LOG M ON (D.NO = M.DIET_NO)
            WHERE D.MEMBER_NO = #{memberNo}
            AND D.DEL_YN = 'N'
            GROUP BY D.MEMBER_NO, TO_CHAR(D.DIET_DAY, 'YYYY')
            ORDER BY DIET_DAY
            """)
    List<TotalKcalVo> getYearAvgKcal(int memberNo);

    @Select("""
            SELECT COUNT(*)
            FROM DIET
            WHERE MEMBER_NO = #{userNo}
            AND TRUNC(DIET_DAY) = TRUNC(SYSDATE)
            AND DEL_YN = 'N'
            """)
    int checkTodayDiet(String userNo);
}
