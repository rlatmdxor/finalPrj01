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
            WHERE U.MEMBER = 1
            AND DEL_YN ='N'
            """)
    List<DrugVo> list();

    @Select("""
            SELECT *
            FROM USER_MEDICATION U
            JOIN MEDICATION M ON (U.MEDICATION = M.NO)
            WHERE U.MEMBER = 1
            AND DEL_YN = 'Y'
            ORDER BY DEL_TIME DESC
            """)
    List<DrugVo> delList();


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
            , #{no}
            , 1
            ,'zz'
            )
            """)
    int write(DrugVo vo);

    @Select("""
            SELECT * FROM DRUG_COLOR
            """)
    List<DrugColorCategoryVo> color();

    @Select("""
            SELECT * FROM DRUG_FORM
            """)
    List<DrugFormCategoryVo> form();


    void del(List<String> vo);

    void removeDrug(List<String> vo);


}
