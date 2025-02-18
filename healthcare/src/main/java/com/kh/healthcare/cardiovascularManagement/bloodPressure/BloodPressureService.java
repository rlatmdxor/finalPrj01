package com.kh.healthcare.cardiovascularManagement.bloodPressure;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class BloodPressureService {

    private final BloodPressureDao dao;

    public int bloodPressureWrite(BloodPressureVo vo) {

        int pulse = 0;
        if(vo.getSystole() == "" || vo.getDiastole() == ""){
            throw new IllegalStateException("CODE [BLOODPRESSURE / WRITE / NULL PRESSURE]");
        }
        if(vo.getPulse() != ""){
            pulse = Integer.parseInt(vo.getPulse());
        }
        double systole = Double.parseDouble(vo.getSystole());
        double diastole = Double.parseDouble(vo.getDiastole());

        if(systole < 10 || systole > 300){
            throw new IllegalStateException("CODE [BLOODPRESSURE / WRITE / IMPOSSIBLE SYSTOlE]");
        }else if (diastole < 9 || diastole > 200){
            throw new IllegalStateException("CODE [BLOODPRESSURE / WRITE / IMPOSSIBLE DIASTOLE]");
        } else if (pulse > 300) {
            throw new IllegalStateException("CODE [BLOODPRESSURE / WRITE / IMPOSSIBLE PULSE]");
        } else if (systole < diastole) {
            throw new IllegalStateException("CODE [BLOODPRESSURE / WRITE / IMPOSSIBLE DATA]");
        }

        return dao.bloodPressureWrite(vo);
    }

    public List<BloodPressureVo> bloodPressureList(String memberNo) {
        return dao.bloodPressureList(memberNo);
    }

    public int bloodPressureEdit(BloodPressureVo vo) {

        int pulse = 0;
        if(vo.getSystole() == "" || vo.getDiastole() == ""){
            throw new IllegalStateException("CODE [BLOODPRESSURE / EDIT / NULL PRESSURE]");
        }
        if(vo.getPulse() != ""){
            pulse = Integer.parseInt(vo.getPulse());
        }
        double systole = Double.parseDouble(vo.getSystole());
        double diastole = Double.parseDouble(vo.getDiastole());

        if(systole < 10 || systole > 300){
            throw new IllegalStateException("CODE [BLOODPRESSURE / EDIT / IMPOSSIBLE SYSTOlE]");
        }else if (diastole < 9 || diastole > 200){
            throw new IllegalStateException("CODE [BLOODPRESSURE / EDIT / IMPOSSIBLE DIASTOLE]");
        } else if (pulse > 300) {
            throw new IllegalStateException("CODE [BLOODPRESSURE / EDIT / IMPOSSIBLE PULSE]");
        } else if (systole < diastole) {
            throw new IllegalStateException("CODE [BLOODPRESSURE / WRITE / IMPOSSIBLE DATA]");
        }
        return dao.bloodPressureEdit(vo);
    }

    public void bloodPressureDelete(BloodPressureVo vo) {
        dao.bloodPressureDelete(vo);
    }
}
