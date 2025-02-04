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

    public String bloodPressureWrite(BloodPressureVo vo) {
        return dao.bloodPressureWrite(vo);
    }

    public List<BloodPressureVo> bloodPressureList(String memberNo) {
        System.out.println("memberNo = " + memberNo);
        return dao.bloodPressureList(memberNo);
    }
}
