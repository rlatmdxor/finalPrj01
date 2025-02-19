package com.kh.healthcare.diet.calendar;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DietCalService {

    private final DietCalMapper mapper;

    public List<DietCalVo> getDietCalData(String memberNo) {

        return mapper.getDietCalData(memberNo);
    }
}
