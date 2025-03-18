package com.kh.healthcare.livingHealth.sleep;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;


import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;


@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("api/sleep")
@CrossOrigin
public class SleepController {

    private final SleepService service;
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");

    @PostMapping("write")
    public String write(@RequestHeader ("Authorization") String token, @RequestBody  SleepVo vo){
        try {
            System.out.println("##### SleepController.write1");
            LocalTime sleepStart = LocalTime.parse(vo.getSleepStart(), formatter);
            System.out.println("##### SleepController.write2");
            LocalTime sleepEnd = LocalTime.parse(vo.getSleepEnd(), formatter);
            System.out.println("##### SleepController.write3");
            long betweenTime = ChronoUnit.MINUTES.between(sleepStart, sleepEnd);
            System.out.println("##### SleepController.write4");
            if(betweenTime < 0 ){
                System.out.println("##### SleepController.write5");
                betweenTime = betweenTime+1440;
            }

            System.out.println("##### SleepController.write6");
            long betwennHours = betweenTime / 60; // 몫 = 시간
            System.out.println("##### SleepController.write7");
            long betwennMinutes = betweenTime % 60; // 나머지 = 분
            System.out.println("##### SleepController.write8");

            // "X시간 Y분" 형식으로 변환
            String sleepDurationHours = String.format("%d시간 %d분", betwennHours, betwennMinutes);
            vo.setSleepDurationHour(sleepDurationHours);
            System.out.println("##### SleepController.write9");

            String sleepMinutes = String.valueOf(betweenTime);
            vo.setSleepDuration(sleepMinutes);
            System.out.println("##### SleepController.write10");
            System.out.println("token = " + token);
            System.out.println("vo = " + vo);

            service.write(token, vo);

            System.out.println("##### SleepController.write11");
            return "write ok~~~";
        }catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("CODE [ SLEEP / WRITE ]");
        }

    }

    @PostMapping("list")
    public List<SleepVo> list (@RequestHeader ("Authorization") String token){
        try {
            List<SleepVo> voList =  service.list(token);
            return voList;
        }catch (Exception e){
            throw new IllegalStateException("CODE [ SLEEP / LIST ]");
        }

    }

    @PostMapping("edit")
    public String edit(@RequestHeader ("Authorization") String token, @RequestBody SleepVo vo){
        try {
            LocalTime sleepStart = LocalTime.parse(vo.getSleepStart(), formatter);
            LocalTime sleepEnd = LocalTime.parse(vo.getSleepEnd(), formatter);

            long betweenTime = ChronoUnit.MINUTES.between(sleepStart, sleepEnd);
            if(betweenTime < 0 ){
                betweenTime = betweenTime+1440;
            }

            long betwennHours = betweenTime / 60; // 몫 = 시간
            long betwennMinutes = betweenTime % 60; // 나머지 = 분

            // "X시간 Y분" 형식으로 변환
            String sleepDurationHours = String.format("%d시간 %d분", betwennHours, betwennMinutes);
            vo.setSleepDurationHour(sleepDurationHours);

            String sleepMinutes = String.valueOf(betweenTime);


            vo.setSleepDuration(sleepMinutes);
            service.edit(token, vo);
            return "edit ok ~~~";
        }catch (Exception e){
            throw new IllegalStateException("CODE [ SLEEP / EDIT ]");
        }

    }
    @PostMapping("del")
    public String del(@RequestHeader ("Authorization") String token, @RequestBody SleepVo vo){
        try {
            service.del(token, vo);
            return "del ok ~~~";
        }catch (Exception e){
            throw new IllegalStateException("CODE [ SLEEP / DEL ]");
        }

    }
}
