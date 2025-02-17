package com.kh.healthcare.alc.calender;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AlcCalenderService {

    private final AlcCalenderMapper mapper;

    public List<AlcCalenderVo> list(Long memberNo) {
        return mapper.getAlcCalenderReport(memberNo);
    }

    public void write(AlcCalenderVo vo) {
        mapper.write(vo);
    }

    public void update(AlcCalenderVo vo) {

        mapper.update(vo);
    }

    public void delete(AlcCalenderVo vo) {
        mapper.delete(vo);
    }
}
