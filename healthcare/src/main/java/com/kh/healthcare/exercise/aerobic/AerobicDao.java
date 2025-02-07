package com.kh.healthcare.exercise.aerobic;

import com.kh.healthcare.cardiovascularManagement.bloodPressure.BloodPressureVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class AerobicDao {

    private final AerobicMapper mapper;

    public List<AerobicVo> getData() {
        return mapper.getData();
    }

    public List<AerobicVo> getMarkedData() {
        return mapper.getMarkedData();
    }

    public int markData(String no) {
        return mapper.markData(no);
    }

    public int unmarkData(String no) {
        return mapper.unmarkData(no);
    }
}
