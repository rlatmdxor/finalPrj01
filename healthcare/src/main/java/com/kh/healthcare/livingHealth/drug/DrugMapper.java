package com.kh.healthcare.livingHealth.drug;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface DrugMapper {


    @Select("""
            SELECT
            *
            FROM USER_MEDICATION U
            JOIN MEDICATION M ON (U.MEDICATION = M.NO)
            WHERE U.MEMBER = #{userNo}
            AND DEL_YN ='N'
            """)
    List<DrugVo> list(String userNo);

    @Select("""
            SELECT *
            FROM USER_MEDICATION U
            JOIN MEDICATION M ON (U.MEDICATION = M.NO)
            WHERE U.MEMBER = #{userNo}
            AND DEL_YN = 'Y'
            ORDER BY DEL_TIME DESC
            """)
    List<DrugVo> delList(String userNo);


    List<DrugVo> find(DrugVo vo);

    @Insert("""
            INSERT INTO USER_MEDICATION
            (
            NO
            , MEDICATION
            , MEMBER
            , NOTES
            )
            VALUES
            (
            SEQ_USER_MEDICATION.NEXTVAL
            , #{vo.no}
            , #{userNo}
            ,'zz'
            )
            """)
    int write(String userNo, DrugVo vo);

    @Select("""
            SELECT * FROM DRUG_COLOR
            """)
    List<DrugColorCategoryVo> color();

    @Select("""
            SELECT * FROM DRUG_FORM
            """)
    List<DrugFormCategoryVo> form();


    void del(String userNo, List<String> vo);

    void removeDrug(String userNo, List<String> vo);

    @Select("""
            SELECT NAME FROM MEMBER WHERE NO = ${userNo}
            """)
    String name(String userNo);
}
