package com.kh.healthcare.board.honeyTip;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface HoneyTipMapper {

    @Select("""
            SELECT * FROM BOARD
            """)
    List<HoneyTipVo> list();
}
