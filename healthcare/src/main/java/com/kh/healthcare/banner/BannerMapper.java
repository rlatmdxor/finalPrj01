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
    void bannerEnroll(BannerVo vo); // TODO : 픽숨 링크 지우고 #{imageUrl} 로 변경하기

    List<BannerVo> getBannerList(String showYn, String searchValue);

    @Update("""
            UPDATE BANNER
            SET TITLE = #{title}
                , SHOW_YN = #{showYn}
                , IMAGE_URL = 'https://picsum.photos/1380/500'
                , MODIFY_DATE = SYSDATE
            WHERE NO = #{no}
            AND DEL_YN = 'N'
            """)
    void bannerEdit(BannerVo vo); // TODO : 픽숨 링크 지우고 #{imageUrl} 로 변경하기

    @Update("""
            UPDATE BANNER
            SET DEL_YN = 'Y'
                , MODIFY_DATE = SYSDATE
            WHERE NO = #{no}
            """)
    void deleteBanner(String no);

    void multiDeleteBanner(List<String> no);
}
