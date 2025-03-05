package com.kh.healthcare.home;

import com.kh.healthcare.banner.BannerVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface HomeMapper {

    @Select("""
SELECT * FROM (
                SELECT
                    B.NO,
                    B.CATEGORY_NO,
                    C.NAME AS CATEGORY_NAME,
                    B.MEMBER_NO,
                    M.NICK,
                    M.PROFILE,
                    B.TITLE,
                    B.CONTENT,
                    NVL(R.RECOMMEND_COUNT, 0) AS RECOMMEND_COUNT,
                    B.ENROLL_DATE
                FROM BOARD B
                JOIN CATEGORY C ON (B.CATEGORY_NO = C.NO)
                JOIN MEMBER M ON (B.MEMBER_NO = M.NO)
                LEFT JOIN (
                    SELECT BOARD_NO, COUNT(*) AS RECOMMEND_COUNT
                    FROM BOARD_RECOMMEND
                    GROUP BY BOARD_NO
                ) R ON B.NO = R.BOARD_NO
                WHERE B.DEL_YN = 'N'
                AND B.ENROLL_DATE >= SYSDATE - 7
                ORDER BY RECOMMEND_COUNT DESC, B.ENROLL_DATE DESC
            )
            WHERE ROWNUM <= 3
            
            UNION ALL
            
            SELECT * FROM (
                SELECT
                    B.NO,
                    B.CATEGORY_NO,
                    C.NAME AS CATEGORY_NAME,
                    B.MEMBER_NO,
                    M.NICK,
                    M.PROFILE,
                    B.TITLE,
                    B.CONTENT,
                    NVL(R.RECOMMEND_COUNT, 0) AS RECOMMEND_COUNT,
                    B.ENROLL_DATE
                FROM BOARD B
                JOIN CATEGORY C ON (B.CATEGORY_NO = C.NO)
                JOIN MEMBER M ON (B.MEMBER_NO = M.NO)
                LEFT JOIN (
                    SELECT BOARD_NO, COUNT(*) AS RECOMMEND_COUNT
                    FROM BOARD_RECOMMEND
                    GROUP BY BOARD_NO
                ) R ON (B.NO = R.BOARD_NO)
                WHERE B.DEL_YN = 'N'
                ORDER BY B.ENROLL_DATE DESC
            )
            WHERE ROWNUM <= 3
            """)
    List<BoardVo> getHoneyTipBoardList();

    @Select("""
            SELECT * FROM (
                SELECT N.NO, N.WRITER, A.NICK, N.TITLE, N.HIT, N.ENROLL_DATE
                FROM NOTICE N
                JOIN ADMIN A ON (N.WRITER = A.NO)
                WHERE DEL_YN = 'N'
                ORDER BY ENROLL_DATE DESC
            )
            WHERE ROWNUM <=3
            """)
    List<NoticeVo> getNoticeList();

    @Select("""
            SELECT * FROM (
                SELECT
                    R.NO,
                    R.MEMBER_NO,
                    M.NICK,
                    M.PROFILE,
                    R.HOSPITAL_NO,
                    H.NAME,
                    R.TITLE,
                    R.RATING,
                    H.CITY,
                    H.DISTRICT,
                    R.ENROLL_DATE
                FROM REVIEW_BOARD R
                JOIN MEMBER M ON (R.MEMBER_NO = M.NO)
                JOIN HOSPITAL H ON (R.HOSPITAL_NO = H.NO)
                WHERE R.DEL_YN = 'N'
                AND R.ENROLL_DATE >= SYSDATE - 7
                ORDER BY R.RATING DESC, R.ENROLL_DATE DESC
            )
            WHERE ROWNUM <= 4
            
            UNION ALL
            
            SELECT * FROM (
                SELECT
                    R.NO,
                    R.MEMBER_NO,
                    M.NICK,
                    M.PROFILE,
                    R.HOSPITAL_NO,
                    H.NAME,
                    R.TITLE,
                    R.RATING,
                    H.CITY,
                    H.DISTRICT,
                    R.ENROLL_DATE
                FROM  REVIEW_BOARD R
                JOIN MEMBER M ON (R.MEMBER_NO = M.NO)
                    JOIN HOSPITAL H ON (R.HOSPITAL_NO = H.NO)
                WHERE R.DEL_YN = 'N'
                ORDER BY R.ENROLL_DATE DESC
            )
            WHERE ROWNUM <= 4
            """)
    List<ReviewVo> getReviewList();

    @Select("""
            SELECT IMAGE_URL
            FROM BANNER
            WHERE SHOW_YN = 'Y'
            AND DEL_YN = 'N'
            ORDER BY NO DESC
            """)
    List<BannerVo> getBannerList();
}
