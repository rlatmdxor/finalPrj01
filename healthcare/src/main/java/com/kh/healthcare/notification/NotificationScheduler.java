package com.kh.healthcare.notification;

import com.kh.healthcare.diet.meal.MealService;
import com.kh.healthcare.board.honeyTip.HoneyTipService;
import com.kh.healthcare.cardiovascularManagement.bloodPressure.BloodPressureService;
import com.kh.healthcare.cardiovascularManagement.bloodSugar.BloodSugarService;
import com.kh.healthcare.cardiovascularManagement.insulin.InsulinService;
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

    private final NotificationService notificationService;
    private final ExerciseService exerciseService;
    private final MealService dietService;
    private final HoneyTipService honeyTipService;
    private final InsulinService insulinService;
    private final BloodPressureService bloodPressureService;
    private final BloodSugarService bloodSugarService;
    private final WaterService waterService;
    private final SimpMessagingTemplate messagingTemplate;

    //14시, 18시, 22시에 동작
    @Scheduled(cron = "0 0 14,18,22 * * *")
    public void sendExerciseNotification() {
        // 각 사용자에게 알림 메시지 전송
        StompChannelInterceptor.getAllUserSessions().forEach(userInfo -> {
            String userNo = userInfo.getUserNo();
            String message = exerciseService.checkTodayExercise(userNo);
            if(message.equals("오늘 등록된 운동내역이 없습니다. 운동 내역을 등록해주세요!")){
                messagingTemplate.convertAndSend("/topic/notifications", message);
                notificationService.saveNewPush(userNo,message);
            }
        });
    }

    //30초마다 새로운 댓글이 있는지 확인
    @Scheduled(fixedRate = 30000)
    public void sendCommentNotification() {
        // 각 사용자에게 알림 메시지 전송
        StompChannelInterceptor.getAllUserSessions().forEach(userInfo -> {
            String userNo = userInfo.getUserNo();
            String message = honeyTipService.checkNewComment(userNo);
            if(message.equals("회원님의 게시글에 새로운 댓글이 있습니다.")){
                messagingTemplate.convertAndSend("/topic/notifications", message);
                notificationService.saveNewPush(userNo,message);
                honeyTipService.markCommentsAsNotified(userNo);
            }
        });
    }

    //14시에 동작
    @Scheduled(cron = "0 0 14 * * *")
    public void sendDietNotification() {
        // 각 사용자에게 알림 메시지 전송
        StompChannelInterceptor.getAllUserSessions().forEach(userInfo -> {
            String userNo = userInfo.getUserNo();
            String message = dietService.checkTodayDiet(userNo);
            if(message.equals("오늘 등록된 식단내역이 없습니다. 식단 내역을 등록해주세요!")){
                messagingTemplate.convertAndSend("/topic/notifications", message);
                notificationService.saveNewPush(userNo,message);
            }
        });
    }

    @Scheduled(cron = "0 0 14,18,22 * * *")
    public void sendInsulinNotification() {
        // 각 사용자에게 알림 메시지 전송
        StompChannelInterceptor.getAllUserSessions().forEach(userInfo -> {
            String userNo = userInfo.getUserNo();
            String message = insulinService.checkTodayInsulin(userNo);
            if(message.equals("오늘 등록된 투약 내역이 없습니다. 인슐린 투약 내역을 등록해주세요!")){
                messagingTemplate.convertAndSend("/topic/notifications", message);
                notificationService.saveNewPush(userNo,message);
            } else if(message.equals("오늘 투약할 인슐린이 남아 있습니다. 인슐린 투약 내역을 등록해주세요!")){
                messagingTemplate.convertAndSend("/topic/notifications", message);
                notificationService.saveNewPush(userNo,message);
            }
        });
    }

    @Scheduled(cron = "0 0 18,22 * * *")
    public void sendBloodPressureNotification() {
        // 각 사용자에게 알림 메시지 전송
        StompChannelInterceptor.getAllUserSessions().forEach(userInfo -> {
            String userNo = userInfo.getUserNo();
            String message = bloodPressureService.checkTodayBloodPressure(userNo);
            if(message.equals("오늘 혈압 측정 내역이 없습니다. 혈압 측정 내역을 기록해주세요!")){
                messagingTemplate.convertAndSend("/topic/notifications", message);
                notificationService.saveNewPush(userNo,message);
            }
        });
    }

    @Scheduled(cron = "0 0 18,22 * * *")
    public void sendBloodSugarNotification() {
        // 각 사용자에게 알림 메시지 전송
        StompChannelInterceptor.getAllUserSessions().forEach(userInfo -> {
            String userNo = userInfo.getUserNo();
            String message = bloodSugarService.checkTodayBloodSugar(userNo);
            if(message.equals("오늘 혈당 측정 내역이 없습니다. 혈당 측정 내역을 기록해주세요!")){
              messagingTemplate.convertAndSend("/topic/notifications", message);
              notificationService.saveNewPush(userNo,message);
            }
        });
    }

    //15시에 동작
    @Scheduled(cron = "0 0 15 * * *")
    public void sendWaterNotification() {
        // 각 사용자에게 알림 메시지 전송
        StompChannelInterceptor.getAllUserSessions().forEach(userInfo -> {
            String userNo = userInfo.getUserNo();
            String message = waterService.checkTodayWater(userNo);
            if(message.equals("오늘 물을 마시지 않았어요. 건강을 위해 충분한 물을 섭취해주세요!")){
                messagingTemplate.convertAndSend("/topic/notifications", message);
                notificationService.saveNewPush(userNo,message);
            }
        });
    }

}
