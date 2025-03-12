package com.kh.healthcare.challenger;

import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ChallengerService {

    private final ChallengerMapper mapper;
    private final JwtUtil jwtUtil;


    public List<ChallengerVo> list() {
        List<ChallengerVo> voList = mapper.list();
        return voList;

    }

    public int write(String token, ChallengerVo vo) {
        int result = 0;
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        LocalDateTime now = LocalDateTime.now();
        if (vo.getRecruitmentStart().isBefore(now)) {
            return result = 2;
        } else if (vo.getRecruitmentEnd().isBefore(vo.getRecruitmentStart())) {
            return result = 3;
        } else if (vo.getPerformanceStart().isBefore(vo.getRecruitmentEnd())) {
            return result = 4;
        } else if (vo.getPerformanceEnd().isBefore(vo.getPerformanceStart())) {
            return result = 5;
        } else {
            if(vo.getMaxMembers() == null){
                vo.setMaxMembers(1);
                result = mapper.write(userNo, vo);

            }
            else{
                result = mapper.write(userNo, vo);

            }
        }
        return result;
    }

    public int join(String token, ChallengerVo vo) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        List<ChallengerVo> memberList = mapper.memberList(userNo, vo);

        for(ChallengerVo voList : memberList){
               if(vo.getNo().equals(voList.getNo()) ){
                   return 2;
               }
        }

        return mapper.join(userNo, vo);
    }

    public List<ChallengerVo> joinList(String token, ChallengerVo vo) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.joinList(userNo, vo);
    }

    public List<ChallengerVo> postList() {
        return mapper.postList();
    }

    public int postWrite(String token, ChallengerVo vo){
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        LocalDate today = LocalDate.now();
        LocalDateTime now = LocalDateTime.now();
        int result = 0;
        ChallengerVo checkOpen = mapper.checkOpenAndCheckPost(userNo, vo);

        if (now.isBefore(checkOpen.getPerformanceStart()) || now.isAfter(checkOpen.getPerformanceEnd())) {
           result = 3;
           return result;
        }

        String check = checkOpen.getToday();
        if(check == null) {
            mapper.postWrite(userNo, vo);
            mapper.countPost(userNo, vo);
            mapper.countExp(userNo);
           result = 1;
        }
        if(check != null){
            String check1 = check.substring(0, 10);  // yyyy-MM-dd 추출
            LocalDate checkDate = LocalDate.parse(check1);  // String → LocalDate 변환
            if (!checkDate.equals(today)) {  // LocalDate 끼리 비교
                mapper.postWrite(userNo, vo);
                mapper.countPost(userNo, vo);
                mapper.countExp(userNo);
                result = 1;
            }
            if(checkDate.equals(today)){
                result = 2;
            }
        }
        return result;

    }


    public List<ChallengerVo> postTitleList(String token) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.postTitleList(userNo);
    }


    public List<ChallengerVo> myAddList(String token) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.myAddList(userNo);
    }

    public int edit(String token, ChallengerVo vo) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        int result = 0;

        if(vo.getCountMember() != null || vo.getCountMember() != ""){
            return  result = 5;
        }

        if (vo.getPerformanceEnd().isBefore(vo.getPerformanceStart())) {
            return result = 2;
        } else if (vo.getRecruitmentEnd().isBefore(vo.getRecruitmentStart())) {
            return result = 3;
        } else if (vo.getPerformanceStart().isBefore(vo.getRecruitmentEnd())) {
            return result = 4;
        } else {
            if(vo.getMaxMembers() == null){
                vo.setMaxMembers(1);
                result = mapper.edit(userNo, vo);
            }
            else {
                result = mapper.edit(userNo, vo);
            }
        }
        return result;


    }

    public ChallengerVo getLevel(String token) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.getLevel(userNo);
    }

    public void levelUp(String token) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        ChallengerVo challengerVo = mapper.getLevel(userNo);

        if(challengerVo.getExp() == challengerVo.getRequiredExp() || challengerVo.getExp() > challengerVo.getRequiredExp()){
            mapper.levelUp(userNo);

        }


    }
}

