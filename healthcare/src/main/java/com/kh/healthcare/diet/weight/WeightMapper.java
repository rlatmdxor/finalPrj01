package com.kh.healthcare.diet.weight;

import com.kh.healthcare.diet.water.WaterVo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

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
                , TO_DATE(#{enrollDate}, 'YYYY-MM-DD')
                , #{amount}
            )
            """)
    void weightEnroll(WeightVo vo);

    @Update("""
            UPDATE WEIGHT_LOG
            SET AMOUNT = #{amount}
            WHERE MEMBER_NO = #{memberNo}
            AND TRUNC(ENROLL_DATE) = TO_DATE(#{enrollDate}, 'YYYY-MM-DD')
            """)
    void weightUpdate(WeightVo vo);

    @Select("""
            SELECT AMOUNT
            FROM WEIGHT_LOG
            WHERE MEMBER_NO = #{memberNo}
            AND TRUNC(ENROLL_DATE) = TO_DATE(#{enrollDate}, 'YYYY-MM-DD')
            """)
    WeightVo getWeightByDate(WeightVo vo);

    @Select("""
            SELECT ENROLL_DATE, AMOUNT
            FROM WEIGHT_LOG
            WHERE MEMBER_NO = #{memberNo}
            ORDER BY ENROLL_DATE
            """)
    List<WaterVo> getWeightByMemberNo(int memberNo);

}
