package com.kh.healthcare.exercise;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/exercise")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService service;

    @GetMapping("getMonthlyDuration")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyDuration(@RequestHeader("Authorization") String token) {

        List<Map<String, Object>> data = service.getMonthlyDuration(token);
        return ResponseEntity.ok(data);
    }

    @GetMapping("getMonthlyCalories")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyCalories(@RequestHeader("Authorization") String token) {

        List<Map<String, Object>> data = service.getMonthlyCalories(token);
        return ResponseEntity.ok(data);
    }

    @GetMapping("getMonthlyMaxWeight")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyMaxWeight(@RequestHeader("Authorization") String token) {

        List<Map<String, Object>> data = service.getMonthlyMaxWeight(token);
        return ResponseEntity.ok(data);
    }

}
