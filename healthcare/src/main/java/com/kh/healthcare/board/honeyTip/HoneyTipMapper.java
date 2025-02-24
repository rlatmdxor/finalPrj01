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

    int insertAttachHoneyBoard(List<HoneyTipAttachVo> attachVoList);

    @Select("""
            SELECT
                B.NO
                , B.CATEGORY_NO
                , C.NAME AS CATEGORY_NAME
                , M.NICK
                , B.MEMBER_NO
                , B.TITLE
                , B.CONTENT
                , B.RECOMMEND_COUNT
                , B.HIT
                , B.ENROLL_DATE
                , B.MODIFY_DATE
            FROM BOARD B
            JOIN CATEGORY C ON ( B.CATEGORY_NO = C.NO )
            JOIN MEMBER M ON ( B.MEMBER_NO = M.NO )
            WHERE B.NO = #{bno}
            AND B.DEL_YN = 'N'
            """)
    HoneyTipVo detailVo(String bno);

    @Select("""
            SELECT
                NO
                ,ORIGIN_NAME
                ,PATH
                ,UPLOAD_DATE
            FROM BOARD_ATTACHMENT
            WHERE BOARD_NO = #{bno}
            AND DEL_YN = 'N'
            """)
    List<HoneyTipAttachVo> detailAttachList(String bno);
}








