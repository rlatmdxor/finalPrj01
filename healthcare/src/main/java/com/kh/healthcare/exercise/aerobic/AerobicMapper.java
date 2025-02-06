package com.kh.healthcare.exercise.aerobic;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface AerobicMapper {

    @Select("""
            SELECT *
            FROM AEROBIC
            WHERE BOOKMARK = 'N'
            """)
    List<AerobicVo> getData();

    @Select("""
            SELECT *
            FROM AEROBIC
            WHERE BOOKMARK = 'Y'
            """)
    List<AerobicVo> getMarkedData();

    @Update("""
            UPDATE AEROBIC
            SET BOOKMARK = 'Y'
            WHERE no = #{no}
            """)
    int markData(String no);

    @Update("""
            UPDATE AEROBIC
            SET BOOKMARK = 'N'
            WHERE no = #{no}
            """)
    int unmarkData(String no);
}
