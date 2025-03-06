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

    @GetMapping("getCalories")
    public ResponseEntity<List<Map<String, Object>>> getCalories(
            @RequestHeader("Authorization") String token
            , @RequestParam int year
            , @RequestParam(required = false) Integer month
            , @RequestParam String rangeType) {

        try {
            List<Map<String, Object>> data = service.getCalories(token, rangeType, year, month);
            return ResponseEntity.ok(data);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("getDuration")
    public ResponseEntity<List<Map<String, Object>>> getDuration(@RequestHeader("Authorization") String token
            , @RequestParam int year
            , @RequestParam(required = false) Integer month
            , @RequestParam String rangeType) {

        try {
            List<Map<String, Object>> data = service.getDuration(token, rangeType, year, month);
            return ResponseEntity.ok(data);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("getMonthlyMaxWeight")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyMaxWeight(@RequestHeader("Authorization") String token) {

        try {
            List<Map<String, Object>> data = service.getMonthlyMaxWeight(token);
            return ResponseEntity.ok(data);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    @GetMapping("getTypeCount")
    public ResponseEntity<List<Map<String, Object>>> getTypeCount(@RequestHeader("Authorization") String token
            , @RequestParam String rangeType
            , @RequestParam int year
            , @RequestParam(required = false) Integer month) {

        try {
            List<Map<String, Object>> result = service.getTypeCount(token, rangeType, year, month);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }


    @GetMapping("getCategoryCount")
    public ResponseEntity<List<Map<String, Object>>> getCategoryCount(@RequestHeader("Authorization") String token
            , @RequestParam String rangeType
            , @RequestParam int year
            , @RequestParam(required = false) Integer month
    ) {

        try {
            List<Map<String, Object>> result = service.getCategoryCount(token, rangeType, year, month);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("getHistory")
    public ResponseEntity<Map<String, List<List<String>>>> getExerciseHistory(@RequestHeader("Authorization") String token
            , @RequestParam String type) {

        try {
            Map<String, List<List<String>>> events = service.getExerciseHistory(token, type);
            return ResponseEntity.ok(events);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
