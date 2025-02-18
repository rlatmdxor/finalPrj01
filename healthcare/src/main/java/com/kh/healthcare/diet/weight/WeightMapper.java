package com.kh.healthcare.diet.weight;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface WeightMapper {

    @Insert("""
            INSERT INTO WEIGHT_LOG
            (
                NO
                , MEMBER_NO
                , ENROLL_DATE
                , AMOUNT 
            ) 
            VALUES 
            (
                SEQ_WEIGHT_LOG.NEXTVAL
                , #{memberNo}
                , #{enrollDate}
                , #{amount}
            )
            """)
    void weightEnroll(WeightVo vo);

    @Update("""
            UPDATE WEIGHT_LOG
            SET AMOUNT = #{amount}
            WHERE MEMBER_NO = #{memberNo}
            AND TRUNC(ENROLL_DATE) = #{enrollDate}
            """)
    void weightUpdate(WeightVo vo);

    @Select("""
            SELECT AMOUNT
            FROM WEIGHT_LOG
            WHERE MEMBER_NO = #{memberNo}
            AND TRUNC(ENROLL_DATE) = #{enrollDate}
            """)
    String getWeightByDate(WeightVo vo);


}
