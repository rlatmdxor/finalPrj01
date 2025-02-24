package com.kh.healthcare.board.honeyTip;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HoneyTipService {

    private final HoneyTipMapper mapper;

    public List<HoneyTipVo> list(SearchFilterVo filterVo) {
        return mapper.list(filterVo);
    }

    public int write(HoneyTipVo vo) {
        return mapper.write(vo);
    }
}
