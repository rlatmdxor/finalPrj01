package com.kh.healthcare.livingHealth.drug;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class DrugService {

    private final DrugMapper mapper;

    public List<DrugVo> list() {
        return mapper.list() ;
    }


    public List<DrugVo> delList() {
        return mapper.delList();
    }


    public List<DrugVo> find(DrugVo vo) {
        return mapper.find(vo);
    }

    public int write(DrugVo vo) {
        return mapper.write(vo);
    }

    public List<DrugColorCategoryVo> color() {
        return mapper.color();
    }

    public List<DrugFormCategoryVo> form() {
        return mapper.form();
    }

    public void del(List<String>  vo) {
        mapper.del(vo);
    }

    public void removeDrug(List<String> vo) {
        mapper.removeDrug(vo);
    }
}
