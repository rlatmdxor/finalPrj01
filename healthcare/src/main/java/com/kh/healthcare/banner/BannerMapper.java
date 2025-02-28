package com.kh.healthcare.banner;

import com.kh.healthcare.diet.meal.DietVo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface BannerMapper {

    @Insert("""
            INSERT INTO BANNER
            (
                NO
                , WRITER
                , TITLE
                , IMAGE_URL
                , SHOW_YN
            )
            VALUES
            (
                SEQ_BANNER.NEXTVAL
                , #{writer}
                , #{title}
                , 'https://picsum.photos/1380/500'
                , #{showYn}
            )
            """)
    void bannerEnroll(BannerVo vo);

    @Select("""
            SELECT
                B.NO
                , B.WRITER
                , A.NICK
                , B.TITLE
                , B.IMAGE_URL
                , B.SHOW_YN
                , B.ENROLL_DATE
                , B.MODIFY_DATE
                , B.DEL_YN
            FROM BANNER B
            JOIN ADMIN A ON (B.WRITER = A.NO)
            WHERE B.DEL_YN = 'N'
            ORDER BY B.NO DESC
            """)
    List<BannerVo> getBannerList();

    @Update("""
            UPDATE BANNER
            SET TITLE = #{title}
                , SHOW_YN = #{showYn}
                , IMAGE_URL = 'https://picsum.photos/1380/500'
                , MODIFY_DATE = SYSDATE
            WHERE NO = #{no}
            AND DEL_YN = 'N'
            """)
    void bannerEdit(BannerVo vo);

    @Update("""
            UPDATE BANNER
            SET DEL_YN = 'Y'
                , MODIFY_DATE = SYSDATE
            WHERE NO = #{no}
            """)
    void deleteBanner(String no);
}
