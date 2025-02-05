package com.kh.healthcare.exercise.anAerobic;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class AnAerobicDao {

    private final AnAerobicMapper mapper;

    public List<AnAerobicVo> getMarkedData() {
        return mapper.getMarkedData();
    }

    public int unmarkData(String no) {
        return mapper.unmarkData(no);
    }

    public List<AnAerobicVo> getArmData() {
        return mapper.getArmData();
    }

    public int markArmData(String no) {
        return mapper.markArmData(no);
    }

    public List<AnAerobicVo> getCoreData() {
        return mapper.getCoreData();
    }

    public int markCoreData(String no) {
        return mapper.markCoreData(no);
    }

    public List<AnAerobicVo> getLegData() {
        return mapper.getLegData();
    }

    public int markLegData(String no) {
        return mapper.markLegData(no);
    }

    public List<AnAerobicVo> getChestData() {
        return mapper.getChestData();
    }

    public int markChestData(String no) {
        return mapper.markChestData(no);
    }

    public List<AnAerobicVo> getShoulderData() {
        return mapper.getShoulderData();
    }

    public int markShoulderData(String no) {
        return mapper.markShoulderData(no);
    }

    public List<AnAerobicVo> getEtcData() {
        return mapper.getEtcData();
    }

    public int markEtcData(String no) {
        return mapper.markEtcData(no);
    }
}
