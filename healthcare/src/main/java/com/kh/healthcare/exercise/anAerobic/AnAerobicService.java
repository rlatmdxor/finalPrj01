package com.kh.healthcare.exercise.anAerobic;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AnAerobicService {

    private final AnAerobicDao dao;

    public List<AnAerobicVo> getMarkedData() {
        return dao.getMarkedData();
    }

    public int unmarkData(String no) {
        return dao.unmarkData(no);
    }

    public List<AnAerobicVo> getArmData() {
        return dao.getArmData();
    }

    public int markArmData(String no) {
        return dao.markArmData(no);
    }

    public List<AnAerobicVo> getCoreData() {
        return dao.getCoreData();
    }

    public int markCoreData(String no) {
        return dao.markCoreData(no);
    }

    public List<AnAerobicVo> getLegData() {
        return dao.getLegData();
    }

    public int markLegData(String no) {
        return dao.markLegData(no);
    }

    public List<AnAerobicVo> getChestData() {
        return dao.getChestData();
    }

    public int markChestData(String no) {
        return dao.markChestData(no);
    }

    public List<AnAerobicVo> getShoulderData() {
        return dao.getShoulderData();
    }

    public int markShoulderData(String no) {
        return dao.markShoulderData(no);
    }

    public List<AnAerobicVo> getEtcData() {
        return dao.getEtcData();
    }

    public int markEtcData(String no) {
        return dao.markEtcData(no);
    }
}
