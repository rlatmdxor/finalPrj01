package com.kh.healthcare.notification;

import com.kh.healthcare.board.honeyTip.HoneyTipCommentVo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface NotificationMapper {

    @Select("""
            SELECT *
            FROM NOTIFICATION_SETTINGS
            WHERE MEMBER_NO = #{userNo}
            """)
    NotificationSettingsVo getPushSettings(String userNo);

    @Update("""
            UPDATE NOTIFICATION_SETTINGS
            SET
                ALL_PUSH = #{vo.allPush},
                DIET_PUSH = #{vo.dietPush},
                WATER_PUSH = #{vo.waterPush},
                EXERCISE_PUSH = #{vo.exercisePush},
                COMMENT_PUSH = #{vo.commentPush},
                BLOOD_PRESSURE_PUSH = #{vo.bloodPressurePush},
                BLOOD_SUGAR_PUSH = #{vo.bloodSugarPush},
                INSULIN_PUSH = #{vo.insulinPush}
            WHERE
                MEMBER_NO = #{userNo}
            """)
    void setPushSettings(String userNo, NotificationSettingsVo vo);

    @Insert("""
            INSERT INTO NOTIFICATION
            (
                NO,
                MEMBER_NO,
                CONTENT
            )
            VALUES
            (
                SEQ_NOTIFICATION.NEXTVAL,
                #{userNo},
                #{message}
            )
            """)
    void saveNewPush(String userNo, String message);

    @Select("""
            SELECT *
            FROM NOTIFICATION
            WHERE
                MEMBER_NO = #{userNo}
                AND DEL_YN = 'N'
            ORDER BY NO DESC
            """)
    List<NotificationVo> getPushList(String userNo);

    @Update("""
            UPDATE NOTIFICATION
            SET CHECK_YN = 'Y'
            WHERE
                MEMBER_NO = #{userNo}
                AND NO = #{vo.no}
            """)
    void checkPushCard(String userNo, NotificationVo vo);

    @Update("""
            UPDATE NOTIFICATION
            SET DEL_YN = 'Y'
            WHERE
                MEMBER_NO = #{userNo}
                AND NO = #{vo.no}
            """)
    void deletePushCard(String userNo, NotificationVo vo);

    @Update("""
            UPDATE NOTIFICATION
            SET CHECK_YN = 'Y'
            WHERE
                MEMBER_NO = #{userNo}
            """)
    void checkPushAll(String userNo);

    @Update("""
            UPDATE NOTIFICATION
            SET DEL_YN = 'Y'
            WHERE
                MEMBER_NO = #{userNo}
            """)
    void deletePushAll(String userNo);

    @Select("""
            SELECT BOARD_NO FROM (
              SELECT BOARD_NO
              FROM BOARD_COMMENT
              WHERE
                  MEMBER_NO = #{userNo}
                  AND ENROLL_DATE >= TO_DATE(#{enrollDate}, 'YYYY-MM-DD HH24:MI:SS') - INTERVAL '30' SECOND
              ORDER BY ENROLL_DATE ASC
            )
            WHERE ROWNUM = 1
            """)
    HoneyTipCommentVo getBoardNo(String userNo, String enrollDate);
}
