package com.kh.healthcare.livingHealth.sleep;


import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SleepService {

    private final SleepMapper mapper;
    private final JwtUtil jwtUtil;

    public void write(String token, SleepVo vo) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        mapper.write(userNo, vo);
    }

    public List<SleepVo> list(String token) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.list(userNo);
    }

    public void edit(String token, SleepVo vo) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        mapper.edit(userNo, vo);
    }
    public void del(String token, SleepVo vo) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        mapper.del(userNo, vo);
    }
}
