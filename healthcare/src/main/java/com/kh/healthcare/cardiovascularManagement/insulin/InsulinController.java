package com.kh.healthcare.cardiovascularManagement.insulin;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
@RequestMapping("api/insulin")
public class InsulinController {

    private final InsulinService service;

    @GetMapping("list")
    public HashMap insulinList(@RequestHeader("Authorization") String token){
        try{
            HashMap map = service.insulinList(token);
            return map;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    @PostMapping("write")
    public int insulinInsert(@RequestBody InsulinVo vo , @RequestHeader("Authorization") String token){

        try{
            return service.insulinInsert(vo , token);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    @PostMapping("delete")
    public int insulinDel(@RequestBody String[] numList , @RequestHeader("Authorization") String token){

        try{
            int result = service.insulinDel(numList , token);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
}
