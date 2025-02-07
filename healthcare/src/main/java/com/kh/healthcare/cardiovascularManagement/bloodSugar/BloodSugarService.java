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
}
