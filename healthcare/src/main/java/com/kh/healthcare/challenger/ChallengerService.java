package com.kh.healthcare.challenger;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ChallengerService {

    private final ChallengerMapper mapper;


    public List<ChallengerVo> list() {
        List<ChallengerVo> voList = mapper.list();
        System.out.println("voList = " + voList);


        return voList;

    }

    public int write(ChallengerVo vo) {
        return mapper.write(vo);
    }

    public int join(ChallengerVo vo) {
        List<ChallengerVo> memberList = mapper.memberList(vo);
        for(ChallengerVo voList : memberList){
               if(vo.getNo().equals(voList.getNo()) ){
                   return 2;
               }
        }

        return mapper.join(vo);
    }
}
