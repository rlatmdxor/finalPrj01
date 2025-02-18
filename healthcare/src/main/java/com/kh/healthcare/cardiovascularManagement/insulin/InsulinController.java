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

    @PostMapping("list")
    public HashMap insulinList(@RequestBody InsulinVo vo , @RequestHeader("Authorization") String authorization){
        HashMap map = service.insulinList(vo);
        System.out.println("map = " + map);
        return map;
    }

    @PostMapping("write")
    public int insulinInsert(@RequestBody InsulinVo vo , @RequestHeader("Authorization") String authorization){

        try{
            return service.insulinInsert(vo);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    @PostMapping("delete")
    public int insulinDel(@RequestBody String[] numList , @RequestHeader("Authorization") String authorization){

        try{
            int result = service.insulinDel(numList);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
}
