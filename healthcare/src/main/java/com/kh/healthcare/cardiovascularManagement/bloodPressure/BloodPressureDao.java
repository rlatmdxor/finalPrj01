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

    public String bloodPressureWrite(BloodPressureVo vo) {
        return mapper.bloodPressureWrite(vo);
    }

    public List<BloodPressureVo> bloodPressureList(String memberNo) {

        List<BloodPressureVo> voList = mapper.bloodPressureList(memberNo);
        System.out.println("voList = " + voList);
        return voList;
    }
}
