package com.kh.healthcare.exercise.aerobic;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AerobicService {

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
