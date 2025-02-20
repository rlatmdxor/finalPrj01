package com.kh.healthcare.board.honeyTip;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface HoneyTipMapper {


    List<HoneyTipVo> list(SearchFilterVo filterVo);

    @Insert("""
            INSERT INTO BOARD
            (   
                NO
                ,CATEGORY_NO
                ,MEMBER_NO
                ,TITLE
                ,CONTENT
            )
            VALUES
            (
                SEQ_BOARD.NEXTVAL
                , #{categoryNo}
                , #{memberNo}
                , #{title}
                , #{content}
            )
            """)
    int write(HoneyTipVo vo);
}
