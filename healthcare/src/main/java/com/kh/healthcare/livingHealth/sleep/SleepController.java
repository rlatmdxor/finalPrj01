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

            service.write(token, vo);

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
