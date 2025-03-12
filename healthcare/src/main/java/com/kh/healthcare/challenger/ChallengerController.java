package com.kh.healthcare.challenger;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.lang.model.SourceVersion;
import java.time.LocalDate;
import java.time.chrono.ChronoLocalDate;
import java.time.temporal.ChronoUnit;
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
        try{
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
                if(vo.getMaxMembers()-Integer.valueOf(vo.getCountMember()) == 0){
                    vo.setStatus("완료");
                }
                vo.setRecruitmentStar(vo.getRecruitmentStart().toString().replace("T", " "));
                vo.setRecruitmentEn(vo.getRecruitmentEnd().toString().replace("T", " "));
                vo.setPerformanceStar(vo.getPerformanceStart().toString().replace("T", " "));
                vo.setPerformanceEn(vo.getPerformanceEnd().toString().replace("T", " "));
            }
            return voList;
        }catch(Exception e){
            throw new IllegalStateException("CODE [ CHALLENGER / LIST ]");
        }
    }

    @PostMapping("write")
    public int write(@RequestHeader ("Authorization") String token, @RequestBody ChallengerVo vo){
        try{
            int result = service.write(token, vo);
            return result;}
        catch(Exception e){
            throw new IllegalStateException("CODE [ CHALLENGER / WRITE ]");
        }

    }

    @PostMapping("join")
    public ResponseEntity<Integer> join(@RequestHeader ("Authorization") String token, @RequestBody ChallengerVo vo){
        try{
            int result = service.join(token, vo);
            return  ResponseEntity.ok(result);}
        catch(Exception e){
            throw new IllegalStateException("CODE [ CHALLENGER / JOIN ]");
        }


    }

    @PostMapping("myAddList")
    public List<ChallengerVo> myAddList(@RequestHeader ("Authorization") String token ){
        try{
            List<ChallengerVo> voList =service.myAddList(token);
            for (ChallengerVo chall : voList) {
                chall.setRecruitmentStar(chall.getRecruitmentStart().toString().replace("T", " "));
                chall.setRecruitmentEn(chall.getRecruitmentEnd().toString().replace("T", " "));
                chall.setPerformanceStar(chall.getPerformanceStart().toString().replace("T", " "));
                chall.setPerformanceEn(chall.getPerformanceEnd().toString().replace("T", " "));
            }

            return voList;}
        catch(Exception e){
            throw new IllegalStateException("CODE [ CHALLENGER / MYADDLIST ]");
        }

    }

    @PostMapping("joinList")
    public List<ChallengerVo> joinList(@RequestHeader ("Authorization") String token, @RequestBody ChallengerVo vo){
        try{
            List<ChallengerVo> voList =  service.joinList(token, vo);
            LocalDate today = LocalDate.now();

            for (ChallengerVo voTime : voList) {
                LocalDate startDate = voTime.getPerformanceStart().toLocalDate();
                LocalDate endDate = voTime.getPerformanceEnd().toLocalDate();
                String todayStr = today.toString();  // LocalDate → String 변환
                // 값이 null이거나 빈 문자열이면 "N" 설정
                if (voTime.getToday() == null || voTime.getToday().isEmpty()) {
                    voTime.setToday("N");
                }
                // 날짜가 today와 같다면 "Y" 설정
                else if (voTime.getToday().substring(0,10).equals(todayStr)) {
                    voTime.setToday("Y");
                }
                else {  voTime.setToday("N");

                }
                long totalDays = ChronoUnit.DAYS.between(startDate, endDate) + 1;
                voTime.setTotalDays(totalDays);

                voTime.setRecruitmentStar(voTime.getRecruitmentStart().toString().replace("T", " "));
                voTime.setRecruitmentEn(voTime.getRecruitmentEnd().toString().replace("T", " "));
                voTime.setPerformanceStar(voTime.getPerformanceStart().toString().replace("T", " "));
                voTime.setPerformanceEn(voTime.getPerformanceEnd().toString().replace("T", " "));
            }

            return voList;}
        catch(Exception e){
            throw new IllegalStateException("CODE [ CHALLENGER / JOINLIST ]");
        }

    }

    @GetMapping("postList")
    public List<ChallengerVo> postList(){
        try{
            List<ChallengerVo> voList =   service.postList();
            for(ChallengerVo change : voList){
                change.setEnrollDate(change.getEnrollDate().substring(0,19));
            }
            return voList;}
        catch(Exception e){
            throw new IllegalStateException("CODE [ CHALLENGER / POSTLIST ]");
        }
    }

    @PostMapping("postWrite")
    public int postWrite(@RequestHeader ("Authorization") String token, @RequestBody ChallengerVo vo){
        try{
            int result = service.postWrite(token, vo);
            return result;}
        catch(Exception e){
            throw new IllegalStateException("CODE [ CHALLENGER / POSTWRITE ]");
        }

    }

    @PostMapping("postTitleList")
    public List<ChallengerVo> postTitleList(@RequestHeader ("Authorization") String token){
        try{        return service.postTitleList(token);}
        catch(Exception e){

        }
        throw new IllegalStateException("CODE [ CHALLENGER / POSTTITLELIST ]");
    }

    @PostMapping("edit")
    public int edit(@RequestHeader ("Authorization") String token, @RequestBody ChallengerVo vo){
        try{
            int result = service.edit(token, vo);
            return result;
        }
        catch(Exception e){
            throw new IllegalStateException("CODE [ CHALLENGER / EDIT ]");
        }

    }
    @PostMapping("getLevel")
    public ChallengerVo getLevel(@RequestHeader ("Authorization") String token){
        try{

            return service.getLevel(token);
        }
        catch(Exception e){
            e.printStackTrace();
            throw new IllegalStateException("CODE [ CHALLENGER / GETLEVEL ]");
        }

    }

    @PostMapping("levelUp")
    public void levelUp(@RequestHeader ("Authorization") String token){
        try{
             service.levelUp(token);
        }
        catch(Exception e){
            e.printStackTrace();
            throw new IllegalStateException("CODE [ CHALLENGER / levelUp ]");
        }

    }


}
