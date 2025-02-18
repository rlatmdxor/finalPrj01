package com.kh.healthcare.cardiovascularManagement.bloodPressure;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("api/bloodPressure")
@CrossOrigin
public class BloodPressureController {

    private final BloodPressureService service;

    @PostMapping("write")
    public int bloodPressureWrite(@RequestBody BloodPressureVo vo , @RequestHeader("Authorization") String authorization){

        try{
            return service.bloodPressureWrite(vo);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    @PostMapping("list")
    public List<BloodPressureVo> bloodPressureList(@RequestBody BloodPressureVo vo , @RequestHeader("Authorization") String authorization){
        return service.bloodPressureList(vo.getMemberNo());
    }

    @PostMapping("edit")
    public int bloodPressureEdit(@RequestBody BloodPressureVo vo , @RequestHeader("Authorization") String authorization){

        try{
            return service.bloodPressureEdit(vo);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }

    }
    @PostMapping("delete")
    public String bloodPressureDelete(@RequestBody BloodPressureVo vo , @RequestHeader("Authorization") String authorization){
        service.bloodPressureDelete(vo);
        return "1";
    }
}
