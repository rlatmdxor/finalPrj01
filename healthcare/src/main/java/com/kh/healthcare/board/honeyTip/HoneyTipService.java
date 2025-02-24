package com.kh.healthcare.board.honeyTip;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HoneyTipService {

    private final HoneyTipMapper mapper;

    public List<HoneyTipVo> list(SearchFilterVo filterVo) {
        return mapper.list(filterVo);
    }


    public int write(HoneyTipVo vo, List<HoneyTipAttachVo> attachVoList) {
        int result1 = 0;
        int result2 = 1;

        result1 = mapper.write(vo);
        if(attachVoList.size()>0){
            result2 = mapper.insertAttachHoneyBoard(attachVoList);
        }
        return result1*result2;
    }

    public Map detail(String bno) {
        Map map = new HashMap<>();
        HoneyTipVo detailVo = mapper.detailVo(bno);
        List<HoneyTipAttachVo> attachVoList = mapper.detailAttachList(bno);
        if(attachVoList.size() > 0){
            map.put("attachVoList" , attachVoList);
        }
        map.put("detailVo" , detailVo);
        return map;
    }
}


