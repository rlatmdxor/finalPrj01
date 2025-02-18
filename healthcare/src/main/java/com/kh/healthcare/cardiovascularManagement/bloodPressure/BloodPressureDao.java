package com.kh.healthcare.cardiovascularManagement.bloodPressure;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
@RequiredArgsConstructor
public class BloodPressureDao {

    private final BloodPressureMapper mapper;

    public int bloodPressureWrite(BloodPressureVo vo) {
        return mapper.bloodPressureWrite(vo);
    }

    public List<BloodPressureVo> bloodPressureList(String memberNo) {

        List<BloodPressureVo> voList = mapper.bloodPressureList(memberNo);
        return voList;
    }

    public int bloodPressureEdit(BloodPressureVo vo) {

        return mapper.bloodPressureEdit(vo);
    }

    public void bloodPressureDelete(BloodPressureVo vo) {
        mapper.bloodPressureDelete(vo);
    }
}
