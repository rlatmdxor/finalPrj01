package com.kh.healthcare.exercise;

import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseMapper mapper;
    private final JwtUtil jwtUtil;

    public List<Map<String, Object>> getCalories(String token, String rangeType, int year, Integer month) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.getCalories(userNo, rangeType, year, month);
    }

    public List<Map<String, Object>> getDuration(String token, String rangeType, int year, Integer month) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.getDuration(userNo, rangeType, year, month);
    }

    public List<Map<String, Object>> getMonthlyMaxWeight(String token) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.getMonthlyMaxWeight(userNo);
    }

    public List<Map<String, Object>> getTypeCount(String token, String rangeType, int year, Integer month) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);

        // 유산소 운동 횟수 조회
        List<Map<String, Object>> aerobicData = mapper.getTypeCountAerobic(rangeType, year, month, userNo);

        // 무산소 운동 횟수 조회
        List<Map<String, Object>> anaerobicData = mapper.getTypeCountAnAerobic(rangeType, year, month, userNo);

        // 두 리스트를 합치는 로직
        Map<String, Map<String, Object>> mergedData = new HashMap<>();

        // 유산소 데이터 먼저 추가
        for (Map<String, Object> entry : aerobicData) {
            String period = (String) entry.get("PERIOD");
            int count = ((Number) entry.get("TOTAL_COUNT")).intValue();

            mergedData.putIfAbsent(period, new HashMap<>());
            mergedData.get(period).put("PERIOD", period);
            mergedData.get(period).put("AEROBIC_COUNT", count);
            mergedData.get(period).put("ANAEROBIC_COUNT", 0); // 초기값 설정
        }

        // 무산소 데이터 추가
        for (Map<String, Object> entry : anaerobicData) {
            String period = (String) entry.get("PERIOD");
            int count = ((Number) entry.get("TOTAL_COUNT")).intValue();

            mergedData.putIfAbsent(period, new HashMap<>());
            mergedData.get(period).put("PERIOD", period);
            mergedData.get(period).put("ANAEROBIC_COUNT", count);
            mergedData.get(period).putIfAbsent("AEROBIC_COUNT", 0); // 초기값 설정
        }

        // 최종 리스트 변환
        return new ArrayList<>(mergedData.values());
    }


    public List<Map<String, Object>> getCategoryCount(String token, String rangeType, int year, Integer month) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        List<Map<String, Object>> ancc = mapper.getCategoryCount(rangeType, year, month, userNo);
        System.out.println("ancc = " + ancc);
        return ancc;
    }

}
