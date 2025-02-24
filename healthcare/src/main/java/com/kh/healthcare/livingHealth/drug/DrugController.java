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

    @GetMapping("list")
    public List<DrugVo>  list(){
        List<DrugVo> voList = service.list();
        return  voList;
    }

    @GetMapping("delList")
    public List<DrugVo>  delList(){
        System.out.println("DrugController.delList");
        List<DrugVo> voList = service.delList();
        return  voList;
    }

    @PostMapping("find")
    public List<DrugVo> find(@RequestBody DrugVo vo){
        List<DrugVo> voList = service.find(vo);
        return voList;
    }

    @PostMapping("write")
    public int write(@RequestBody DrugVo vo){
       int result =  service.write(vo);
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
    public void del(@RequestBody List<String> vo ){

        service.del(vo);
    }
    @PostMapping("removeDrug")
    public void removeDrug(@RequestBody List<String> vo ){
        System.out.println("vo = " + vo);
        service.removeDrug(vo);
    }

}
