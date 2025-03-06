package com.kh.healthcare.notice;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;
@Mapper
public interface NoticeMapper {



    List<NoticeVo> list(SearchFilterVo filterVo);

    @Insert("""
            INSERT INTO NOTICE
            (   
                NO
                ,WRITER
                ,TITLE
                ,CONTENT
            )
            VALUES
            (
                SEQ_NOTICE.NEXTVAL
                , #{writer}
                , #{title}
                , #{content}
            )
            """)
    int write(NoticeVo vo);

    int insertAttachNotice(List<NoticeAttachVo> attachVoList);

    @Update("""
            UPDATE NOTICE
            SET
                HIT = HIT+1
            WHERE NO = #{bno}
            AND DEL_YN = 'N'
            """)
    void increaseHit(String bno);

    @Select("""
            SELECT
                N.NO
                , A.NICK
                , N.WRITER
                , N.TITLE
                , N.CONTENT
                , N.HIT
                , N.ENROLL_DATE
                , N.MODIFY_DATE
            FROM NOTICE N
            JOIN ADMIN A ON ( N.WRITER = A.NO )
            WHERE N.NO = #{bno}
            AND N.DEL_YN = 'N'
            """)
    NoticeVo detailVo(String bno);

    @Select("""
            SELECT
                NO
                ,NOTICE_NO
                ,ORIGIN_NAME
                ,PATH
                ,UPLOAD_DATE
            FROM NOTICE_ATTACHMENT
            WHERE NOTICE_NO = #{bno}
            AND DEL_YN = 'N'
            """)
    List<NoticeAttachVo> detailAttachList(String bno);

    @Update("""
            UPDATE NOTICE
            SET
                DEL_YN = 'Y'
            WHERE NO = #{no}
            """)
    int deleteNotice(NoticeVo vo);

    @Update("""
            UPDATE NOTICE_ATTACHMENT
            SET
                DEL_YN = 'Y'
            WHERE NO = #{no}
            """)
    void deleteAttach(NoticeAttachVo deleteFile);

    @Update("""
            UPDATE NOTICE
            SET
                TITLE = #{title}
                , CONTENT = #{content}
            WHERE NO = #{no}               
            """)
    int edit(NoticeVo vo);

    @Insert("""
            INSERT INTO NOTICE_ATTACHMENT
            (
                NO
                , NOTICE_NO
                , ORIGIN_NAME
                , PATH
            )
            VALUES
            (
                SEQ_NOTICE_ATTACHMENT.NEXTVAL
                , #{bno}
                , #{attachVo.originName}
                , #{attachVo.path}
            )
            """)
    int editAttachNotice(NoticeAttachVo attachVo, String bno);
}
