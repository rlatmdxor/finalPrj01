package com.kh.healthcare.cardiovascularManagement.bloodSugar;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Slf4j
@RequiredArgsConstructor
@Service
public class BloodSugarService {

    private final BloodSugarMapper mapper;

    public List<BloodSugarVo> list(String memberNo) {
        return mapper.list(memberNo);
    }

    public int bsWrite(BloodSugarVo vo) {
        if(vo.getSugar() == ""){
            throw new IllegalStateException("CODE [BLOODPRESSURE / WRITE / NULL SUGAR]");
        }

        double sugar = Double.parseDouble(vo.getSugar());

        if(sugar < 40 || sugar > 500){
            throw new IllegalStateException("CODE [BLOODPRESSURE / WRITE / IMPOSSIBLE SUGAR]");
        }
        return mapper.bsWrite(vo);
    }

    public int bsEdit(BloodSugarVo vo) {

        if(vo.getSugar() == ""){
            throw new IllegalStateException("CODE [BLOODPRESSURE / EDIT / NULL SUGAR]");
        }

        double sugar = Double.parseDouble(vo.getSugar());

        if(sugar < 40 || sugar > 500){
            throw new IllegalStateException("CODE [BLOODPRESSURE / EDIT / IMPOSSIBLE SUGAR]");
        }
        return mapper.bsEdit(vo);
    }

    public void bsDel(BloodSugarVo vo) {
        mapper.bsDel(vo);
    }
}
