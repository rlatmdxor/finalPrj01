package com.kh.healthcare.notification;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface NotificationMapper {

    @Select("""
            SELECT *
            FROM NOTIFICATION_SETTINGS
            WHERE MEMBER_NO = #{userNo}
            """)
    NotificationVo getPushSettings(String userNo);

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
    void setPushSettings(String userNo, NotificationVo vo);
}
