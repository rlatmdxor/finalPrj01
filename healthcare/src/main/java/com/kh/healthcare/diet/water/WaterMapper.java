package com.kh.healthcare.diet.water;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface WaterMapper {

    @Insert("""
            INSERT INTO WATER_LOG 
            ( 
                NO
                , MEMBER_NO
                , ENROLL_DATE
                , AMOUNT 
            ) 
            VALUES 
            (
                 SEQ_WATER_LOG.NEXTVAL
                 , #{memberNo}
                 , #{enrollDate}
                 , #{amount}
            )
            """)
    void waterIntakeEnroll(WaterVo vo);

    @Update("""
            UPDATE WATER_LOG
            SET AMOUNT = #{amount}
            WHERE MEMBER_NO = #{memberNo}
            AND TRUNC(ENROLL_DATE) = #{enrollDate}
            """)
    void waterIntakeUpdate(WaterVo vo);

    @Select("""
            SELECT AMOUNT
            FROM WATER_LOG
            WHERE MEMBER_NO = #{memberNo}
            AND TRUNC(ENROLL_DATE) = #{enrollDate}
            """)
    String getWaterIntakeByDate(WaterVo vo);


}
