package com.kh.healthcare.exercise;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/exercise")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService service;

    @GetMapping("getDuration")
    public ResponseEntity<List<Map<String, Object>>> getDuration(@RequestHeader("Authorization") String token, @RequestParam String rangeType) {

        List<Map<String, Object>> data = service.getDuration(token, rangeType);
        return ResponseEntity.ok(data);
    }

    @GetMapping("getCalories")
    public ResponseEntity<List<Map<String, Object>>> getCalories(@RequestHeader("Authorization") String token, @RequestParam String rangeType) {

        List<Map<String, Object>> data = service.getCalories(token, rangeType);
        return ResponseEntity.ok(data);
    }

    @GetMapping("getMonthlyMaxWeight")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyMaxWeight(@RequestHeader("Authorization") String token) {

        List<Map<String, Object>> data = service.getMonthlyMaxWeight(token);
        return ResponseEntity.ok(data);
    }

}
