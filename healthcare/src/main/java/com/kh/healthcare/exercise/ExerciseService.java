package com.kh.healthcare.exercise;

import com.kh.healthcare.exercise.aerobic.AerobicMapper;
import com.kh.healthcare.exercise.anAerobic.AnAerobicMapper;
import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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

    //운동 종류별 카운트
    public List<Map<String, Object>> getCategoryCount(String token, String rangeType, int year, Integer month) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.getCategoryCount(rangeType, year, month, userNo);
    }

    //운동 내역 가져오기
    public Map<String, List<List<String>>> getExerciseHistory(String token, String type) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);

        Map<String, List<List<String>>> events = new HashMap<>();
        List<Map<String, Object>> historyList;

        if(type.equals("aerobic")){
            historyList = mapper.getAerobicHistory(userNo);

            //Map에 가져온 유산소 데이터 채워넣기
            for (Map<String, Object> history : historyList) {
                String historyNo = history.get("NO").toString();
                String date = history.get("EX_DATE").toString();
                String duration = history.get("EX_DURATION") != null ? history.get("EX_DURATION").toString() + "분" : "시간 정보 없음";
                String name = history.get("NAME") != null ? history.get("NAME").toString() : "운동 정보 없음";

                events.putIfAbsent(date, new ArrayList<>()); // 날짜 추가
                events.get(date).add(Arrays.asList(historyNo, duration, name)); // 운동 기록 추가
            }

        } else if(type.equals("anaerobic")){
            historyList = mapper.getAnAerobicHistory(userNo);

            //Map에 가져온 무산소 데이터 채워넣기
            for (Map<String, Object> history : historyList) {
                String historyNo = history.get("NO").toString();
                String date = history.get("EX_DATE").toString();
                String weight = history.get("WEIGHT") != null ? history.get("WEIGHT").toString() + "kg" : "";
                String reps = history.get("REPS") != null ? history.get("REPS").toString() + "회" : "횟수 정보 없음";
                String weightAndReps = weight + " " + reps;
                String name = history.get("NAME") != null ? history.get("NAME").toString() : "운동 정보 없음";

                events.putIfAbsent(date, new ArrayList<>()); // 날짜 추가
                events.get(date).add(Arrays.asList(historyNo, weightAndReps, name)); // 운동 기록 추가
            }

        } else { throw new IllegalStateException("Invalid exercise type: " + type); }

        return events;
    }

    //오늘 운동내역 체크하고 메시지 반환
    public String checkTodayExercise(String userNo) {
        int isEnabled = mapper.isExercisePushEnabled(userNo);

        if(isEnabled>=1){
            int count = mapper.checkTodayExercise(userNo);
            if (count == 0) {
                // 두 테이블 모두 기록이 없으면
                return "오늘 등록된 운동내역이 없습니다. 운동 내역을 등록해주세요!";
            } else {
                // 하나라도 기록이 있으면
                return "운동 기록이 존재합니다.";
            }
        } else {
            return "푸시 설정 OFF";
        }

    }

}
