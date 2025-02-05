package com.kh.healthcare.exercise.aerobic;

import com.kh.healthcare.cardiovascularManagement.bloodPressure.BloodPressureVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AerobicService {

    private final AerobicDao dao;

    public List<AerobicVo> getData() {
        return dao.getData();
    }

    public List<AerobicVo> getMarkedData() {
        return dao.getMarkedData();
    }

    public int markData(String no) {
        return dao.markData(no);
    }

    public int unmarkData(String no) {
        return dao.unmarkData(no);
    }
}
