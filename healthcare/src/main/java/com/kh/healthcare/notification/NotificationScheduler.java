package com.kh.healthcare.notification;

import com.kh.healthcare.diet.meal.MealService;
import com.kh.healthcare.diet.water.WaterService;
import com.kh.healthcare.interceptor.StompChannelInterceptor;
import com.kh.healthcare.exercise.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationScheduler {

    private final ExerciseService exerciseService;
    private final MealService dietService;
    private final WaterService waterService;
    private final SimpMessagingTemplate messagingTemplate;

    //13시, 19시에 동작
    @Scheduled(cron = "0 0 13,19 * * *")
    public void sendExerciseNotification() {
        // 각 사용자에게 알림 메시지 전송
        StompChannelInterceptor.getAllUserSessions().forEach(userInfo -> {
            String userNo = userInfo.getUserNo();
//            String userId = userInfo.getUserId();
//            String userNick = userInfo.getUserNick();
//            String userRole = userInfo.getUserRole();
            String message = exerciseService.checkTodayExercise(userNo);
            System.out.println("message = " + message);
            if(message.equals("오늘 등록된 운동내역이 없습니다. 운동 내역을 등록해주세요!")){
                messagingTemplate.convertAndSend("/topic/notifications", message);
            }
        });
    }

    //14시에 동작
    @Scheduled(cron = "0 0 14 * * *")
    public void sendDietNotification() {
        // 각 사용자에게 알림 메시지 전송
        StompChannelInterceptor.getAllUserSessions().forEach(userInfo -> {
            String userNo = userInfo.getUserNo();
//            String userId = userInfo.getUserId();
//            String userNick = userInfo.getUserNick();
//            String userRole = userInfo.getUserRole();
            String message = dietService.checkTodayDiet(userNo);
//            System.out.println("message = " + message);
            if(message.equals("오늘 등록된 식단내역이 없습니다. 식단 내역을 등록해주세요!")){
                messagingTemplate.convertAndSend("/topic/notifications", message);
            }
        });
    }

    //15시에 동작
    @Scheduled(cron = "0 0 15 * * *")
    public void sendWaterNotification() {
        // 각 사용자에게 알림 메시지 전송
        StompChannelInterceptor.getAllUserSessions().forEach(userInfo -> {
            String userNo = userInfo.getUserNo();
//            String userId = userInfo.getUserId();
//            String userNick = userInfo.getUserNick();
//            String userRole = userInfo.getUserRole();
            String message = waterService.checkTodayWater(userNo);
//            System.out.println("message = " + message);
            if(message.equals("오늘 물을 마시지 않았어요. 건강을 위해 충분한 물을 섭취해주세요!")){
                messagingTemplate.convertAndSend("/topic/notifications", message);
            }
        });
    }

}
