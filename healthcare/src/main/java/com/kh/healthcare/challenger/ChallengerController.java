package com.kh.healthcare.challenger;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.chrono.ChronoLocalDate;
import java.util.List;

@RestController
@RequestMapping("api/challenger")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class ChallengerController {

    private final ChallengerService service;

    @GetMapping("list")
    public List<ChallengerVo> list(){
        List<ChallengerVo> voList =  service.list();

        LocalDate today = LocalDate.now();



        for (ChallengerVo vo : voList) {
            if(today.isBefore(ChronoLocalDate.from(vo.getRecruitmentStart()))){
                vo.setStatus("대기");
            } else if (today.isAfter(ChronoLocalDate.from(vo.getRecruitmentEnd()))){
                vo.setStatus("완료");
            }else {
                vo.setStatus("진행중");
            }
            vo.setRecruitmentStar(vo.getRecruitmentStart().toString().replace("T", " "));
            vo.setRecruitmentEn(vo.getRecruitmentEnd().toString().replace("T", " "));
            vo.setPerformanceStar(vo.getPerformanceStart().toString().replace("T", " "));
            vo.setPerformanceEn(vo.getPerformanceEnd().toString().replace("T", " "));
        }

        return voList;
    }

    @PostMapping("write")
    public int write(@RequestBody ChallengerVo vo){
        int result = service.write(vo);
        return result;
    }

    @PostMapping("join")
    public ResponseEntity<Integer> join(@RequestBody ChallengerVo vo){
        int result = service.join(vo);

        return  ResponseEntity.ok(result);

    }


}
