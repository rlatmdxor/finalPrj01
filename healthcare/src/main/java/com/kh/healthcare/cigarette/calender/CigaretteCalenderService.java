package com.kh.healthcare.cigarette.calender;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CigaretteCalenderService {

    private final CigaretteCalenderMapper mapper;

    public List<CigaretteCalenderVo> list(Long memberNo) {
        System.out.println("memberNo = " + memberNo);

        return mapper.getCigaretteCalender(memberNo);
    }

    public void write(CigaretteCalenderVo vo) {
        mapper.write(vo);
    }

    public void update(CigaretteCalenderVo vo) {
        mapper.update(vo);
    }

    public void delete(CigaretteCalenderVo vo) {
        mapper.delete(vo);
    }
}
