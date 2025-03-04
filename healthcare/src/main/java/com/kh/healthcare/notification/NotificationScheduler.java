package com.kh.healthcare.notification;

import com.kh.healthcare.Interceptor.StompChannelInterceptor;
import com.kh.healthcare.exercise.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationScheduler {

    private final ExerciseService exerciseService;
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

}
