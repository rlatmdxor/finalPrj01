package com.kh.healthcare.exercise.anAerobic;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface AnAerobicMapper {

    @Select("""
            SELECT *
            FROM ANAEROBIC
            WHERE BOOKMARK = 'Y'
            """)
    List<AnAerobicVo> getMarkedData();

    @Update("""
            UPDATE ANAEROBIC
            SET BOOKMARK = 'N'
            WHERE no = #{no}
            """)
    int unmarkData(String no);

    @Select("""
            SELECT *
            FROM ANAEROBIC
            WHERE BOOKMARK = 'N'
            AND PART = '팔'
            """)
    List<AnAerobicVo> getArmData();

    @Update("""
            UPDATE ANAEROBIC
            SET BOOKMARK = 'Y'
            WHERE no = #{no}
            AND PART = '팔'
            """)
    int markArmData(String no);

    @Select("""
            SELECT *
            FROM ANAEROBIC
            WHERE BOOKMARK = 'N'
            AND PART = '코어'
            """)
    List<AnAerobicVo> getCoreData();

    @Update("""
            UPDATE ANAEROBIC
            SET BOOKMARK = 'Y'
            WHERE no = #{no}
            AND PART = '코어'
            """)
    int markCoreData(String no);

    @Select("""
            SELECT *
            FROM ANAEROBIC
            WHERE BOOKMARK = 'N'
            AND PART = '다리'
            """)
    List<AnAerobicVo> getLegData();

    @Update("""
            UPDATE ANAEROBIC
            SET BOOKMARK = 'Y'
            WHERE no = #{no}
            AND PART = '다리'
            """)
    int markLegData(String no);

    @Select("""
            SELECT *
            FROM ANAEROBIC
            WHERE BOOKMARK = 'N'
            AND PART = '가슴'
            """)
    List<AnAerobicVo> getChestData();

    @Update("""
            UPDATE ANAEROBIC
            SET BOOKMARK = 'Y'
            WHERE no = #{no}
            AND PART = '가슴'
            """)
    int markChestData(String no);

    @Select("""
            SELECT *
            FROM ANAEROBIC
            WHERE BOOKMARK = 'N'
            AND PART = '어깨'
            """)
    List<AnAerobicVo> getShoulderData();

    @Update("""
            UPDATE ANAEROBIC
            SET BOOKMARK = 'Y'
            WHERE no = #{no}
            AND PART = '어깨'
            """)
    int markShoulderData(String no);

    @Select("""
            SELECT *
            FROM ANAEROBIC
            WHERE BOOKMARK = 'N'
            AND PART = '기타'
            """)
    List<AnAerobicVo> getEtcData();

    @Update("""
            UPDATE ANAEROBIC
            SET BOOKMARK = 'Y'
            WHERE no = #{no}
            AND PART = '기타'
            """)
    int markEtcData(String no);
}
