package com.kh.healthcare.livingHealth.drug;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/drug")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class DrugController {

    private final DrugService service;

    @PostMapping("list")
    public List<DrugVo>  list(@RequestHeader ("Authorization") String token){
        List<DrugVo> voList = service.list(token);
        return  voList;
    }

    @PostMapping("delList")
    public List<DrugVo>  delList(@RequestHeader ("Authorization") String token){
        List<DrugVo> voList = service.delList(token);
        return  voList;
    }

    @PostMapping("find")
    public List<DrugVo> find(@RequestBody DrugVo vo){
        List<DrugVo> voList = service.find(vo);
        return voList;
    }

    @PostMapping("write")
    public int write(@RequestHeader ("Authorization") String token, @RequestBody DrugVo vo){
       int result =  service.write(token,vo);
        return result;
    }

    @GetMapping("color")
    public List<DrugColorCategoryVo> color(){
       List<DrugColorCategoryVo> result =  service.color();
       return result;
    }

    @GetMapping("form")
    public List<DrugFormCategoryVo> form(){
        List<DrugFormCategoryVo> result = service.form();
        return result;
    }

    @PostMapping("del")
    public void del(@RequestHeader ("Authorization") String token, @RequestBody List<String> vo ){
        service.del(token,vo);
    }
    @PostMapping("removeDrug")
    public void removeDrug(@RequestHeader ("Authorization") String token, @RequestBody List<String> vo ){
        service.removeDrug(token, vo);
    }

}
