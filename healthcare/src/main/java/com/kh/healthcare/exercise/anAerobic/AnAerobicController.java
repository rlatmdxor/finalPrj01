package com.kh.healthcare.exercise.anAerobic;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/anaerobic")
@CrossOrigin
public class AnAerobicController {

    private final AnAerobicService service;

    // AnAerobic 즐겨찾기 데이터 조회
    @GetMapping("favlist")
    public List<AnAerobicVo> getMarkedData() {
        return service.getMarkedData();
    }

    // AnAerobic 즐겨찾기에서 북마크 해제
    @PostMapping("unmark")
    public int unmarkData(@RequestBody AnAerobicVo vo){
        return service.unmarkData(vo.getNo());
    }

    // Arm 운동 리스트 데이터 조회
    @GetMapping("armlist")
    public List<AnAerobicVo> getArmData(){
        return service.getArmData();
    }

    // Arm 리스트에서 북마크 처리
    @PostMapping("markarm")
    public int markArmData(@RequestBody AnAerobicVo vo){
        return service.markArmData(vo.getNo());
    }

    // Core 운동 리스트 데이터 조회
    @GetMapping("corelist")
    public List<AnAerobicVo> getCoreData(){
        return service.getCoreData();
    }

    // Core 리스트에서 북마크 처리
    @PostMapping("markcore")
    public int markCoreData(@RequestBody AnAerobicVo vo){
        return service.markCoreData(vo.getNo());
    }

    // Leg 운동 리스트 데이터 조회
    @GetMapping("leglist")
    public List<AnAerobicVo> getLegData(){
        return service.getLegData();
    }

    // Leg 리스트에서 북마크 처리
    @PostMapping("markleg")
    public int markLegData(@RequestBody AnAerobicVo vo){
        return service.markLegData(vo.getNo());
    }

    // Chest 운동 리스트 데이터 조회
    @GetMapping("chestlist")
    public List<AnAerobicVo> getChestData(){
        return service.getChestData();
    }

    // Chest 리스트에서 북마크 처리
    @PostMapping("markchest")
    public int markChestData(@RequestBody AnAerobicVo vo){
        return service.markChestData(vo.getNo());
    }

    // Shoulder 운동 리스트 데이터 조회
    @GetMapping("shoulderlist")
    public List<AnAerobicVo> getShoulderData(){
        return service.getShoulderData();
    }

    // Shoulder 리스트에서 북마크 처리
    @PostMapping("markshoulder")
    public int markShoulderData(@RequestBody AnAerobicVo vo){
        return service.markShoulderData(vo.getNo());
    }

    // Etc 운동 리스트 데이터 조회
    @GetMapping("etclist")
    public List<AnAerobicVo> getEtcData(){
        return service.getEtcData();
    }

    // Etc 리스트에서 북마크 처리
    @PostMapping("marketc")
    public int markEtcData(@RequestBody AnAerobicVo vo){
        return service.markEtcData(vo.getNo());
    }
}
