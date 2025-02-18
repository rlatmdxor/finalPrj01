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
    public String write(@RequestBody  SleepVo vo){
        LocalTime sleepStart = LocalTime.parse(vo.getSleepStart(), formatter);
        LocalTime sleepEnd = LocalTime.parse(vo.getSleepEnd(), formatter);
        long betweenTime = ChronoUnit.MINUTES.between(sleepStart, sleepEnd);
        if(betweenTime < 0 ){
            betweenTime = betweenTime+1440;
        }
        String sleepMinutes = String.valueOf(betweenTime);
        vo.setSleepDuration(sleepMinutes);
        service.write(vo);
        return "write ok~~~";
    }

    @PostMapping("list")
    public List<SleepVo> list (){
       List<SleepVo> voList =  service.list();

        return voList;
    }

    @PostMapping("edit")
    public String edit(@RequestBody SleepVo vo){
        System.out.println("vo = " + vo);
        LocalTime sleepStart = LocalTime.parse(vo.getSleepStart(), formatter);
        LocalTime sleepEnd = LocalTime.parse(vo.getSleepEnd(), formatter);

        long betweenTime = ChronoUnit.MINUTES.between(sleepStart, sleepEnd);
        if(betweenTime < 0 ){
            betweenTime = betweenTime+1440;
        }
        String sleepMinutes = String.valueOf(betweenTime);


        vo.setSleepDuration(sleepMinutes);
        System.out.println("vo = " + vo);
        service.edit(vo);
        return "edit ok ~~~";
    }



}
