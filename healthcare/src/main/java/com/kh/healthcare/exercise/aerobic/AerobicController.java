package com.kh.healthcare.exercise.aerobic;

import com.kh.healthcare.cardiovascularManagement.bloodPressure.BloodPressureVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/aerobic")
public class AerobicController {

    private final AerobicService service;

    // Aerobic 리스트 데이터 조회
    @GetMapping("list")
    public List<AerobicVo> getData() {
        return service.getData();
    }
    
    // Aerobic 즐겨찾기 데이터 조회
    @GetMapping("favlist")
    public List<AerobicVo> getMarkedData() {
        return service.getMarkedData();
    }

    // Aerobic 리스트에서 북마크 처리
    @PostMapping("mark")
    public int markData(@RequestBody AerobicVo vo){
        return service.markData(vo.getNo());
    }
    
    // Aerobic 즐겨찾기에서 북마크 해제
    @PostMapping("unmark")
    public int unmarkData(@RequestBody AerobicVo vo){
        return service.unmarkData(vo.getNo());
    }

}
