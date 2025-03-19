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
    public int bloodPressureWrite(@RequestBody BloodPressureVo vo , @RequestHeader("Authorization") String token){
        try{
            return service.bloodPressureWrite(vo , token);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    @GetMapping("list")
    public List<BloodPressureVo> bloodPressureList(@RequestHeader("Authorization") String token){

        try{
            List<BloodPressureVo> result = service.bloodPressureList(token);
            return result;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }

    }

    @PostMapping("edit")
    public int bloodPressureEdit(@RequestBody BloodPressureVo vo , @RequestHeader("Authorization") String token){

        try{
            return service.bloodPressureEdit(vo , token);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }

    }
    @PostMapping("delete")
    public int bloodPressureDelete(@RequestBody BloodPressureVo vo , @RequestHeader("Authorization") String token){
        try{
            return service.bloodPressureDelete(vo , token);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }
}
