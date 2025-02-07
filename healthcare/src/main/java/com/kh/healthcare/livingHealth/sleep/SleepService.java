package com.kh.healthcare.livingHealth.sleep;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SleepService {

    private final SleepMapper mapper;

    public void write(SleepVo vo) {
        System.out.println("vo = " + vo);
        mapper.write(vo);

    }

    public List<SleepVo> list() {
        return mapper.list();
    }

    public void edit(SleepVo vo) {
        mapper.edit(vo);
    }
}
