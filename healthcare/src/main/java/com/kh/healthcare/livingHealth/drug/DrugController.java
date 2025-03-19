package com.kh.healthcare.livingHealth.drug;

import com.kh.healthcare.member.MemberVo;
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
        try {
            List<DrugVo> voList = service.list(token);
            return  voList;
        }catch (Exception e){
            throw new IllegalStateException("CODE [ DRUG / LIST ]");
        }

    }

    @PostMapping("delList")
    public List<DrugVo>  delList(@RequestHeader ("Authorization") String token){
        try {
            List<DrugVo> voList = service.delList(token);
            return  voList;
        }catch (Exception e){
            throw new IllegalStateException("CODE [ DRUG / DELLIST ]");
        }

    }

    @PostMapping("find")
    public List<DrugVo> find(@RequestBody DrugVo vo){
        try {
            List<DrugVo> voList = service.find(vo);
            return voList;
        }catch (Exception e){
            throw new IllegalStateException("CODE [ DRUG / FIND ]");
        }

    }

    @PostMapping("write")
    public int write(@RequestHeader ("Authorization") String token, @RequestBody DrugVo vo){
        try {
            int result =  service.write(token,vo);
            return result;
        }catch (Exception e){
            throw new IllegalStateException("CODE [ DRUG / WRITE ]");
        }

    }

    @GetMapping("color")
    public List<DrugColorCategoryVo> color(){
        try {
            List<DrugColorCategoryVo> result =  service.color();
            return result;
        }catch (Exception e){
            throw new IllegalStateException("CODE [ DRUG / COLOR ]");
        }

    }
    @GetMapping("form")
    public List<DrugFormCategoryVo> form(){
        try {
            List<DrugFormCategoryVo> result = service.form();
            return result;
        }catch (Exception e){
            throw new IllegalStateException("CODE [ DRUG / FORM ]");
        }

    }
    @PostMapping("get/name")
    public String name(@RequestHeader ("Authorization") String token){
        try {
            String name = service.name(token);
            return name;
        }catch (Exception e){
            throw new IllegalStateException("CODE [ DRUG / NAME ]");
        }

    }

    @PostMapping("del")
    public void del(@RequestHeader ("Authorization") String token, @RequestBody List<String> vo ){
        try {
            service.del(token,vo);
        }catch (Exception e){
            throw new IllegalStateException("CODE [ DRUG / DEL ]");
        }

    }
    @PostMapping("removeDrug")
    public void removeDrug(@RequestHeader ("Authorization") String token, @RequestBody List<String> vo ){
        try {
            service.removeDrug(token, vo);
        }catch (Exception e){
            throw new IllegalStateException("CODE [ DRUG / REMOVEDRUG ]");
        }

    }

}
