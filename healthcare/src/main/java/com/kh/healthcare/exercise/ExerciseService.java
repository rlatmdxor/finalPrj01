package com.kh.healthcare.exercise;

import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseMapper mapper;
    private final JwtUtil jwtUtil;

    public List<Map<String, Object>> getMonthlyDuration(String token) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.getMonthlyDuration(userNo);
    }

    public List<Map<String, Object>> getMonthlyCalories(String token) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.getMonthlyCalories(userNo);
    }

    public List<Map<String, Object>> getMonthlyMaxWeight(String token) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.getMonthlyMaxWeight(userNo);
    }
}
