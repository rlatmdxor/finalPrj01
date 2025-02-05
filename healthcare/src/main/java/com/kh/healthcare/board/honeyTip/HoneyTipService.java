package com.kh.healthcare.board.honeyTip;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HoneyTipService {

    private final HoneyTipMapper mapper;

    public List<HoneyTipVo> list() {
        return mapper.list();
    }
}
