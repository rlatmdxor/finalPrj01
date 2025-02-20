package com.kh.healthcare.board.honeyTip;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/board/honeytip")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class HoneyTipController {

    private final HoneyTipService service;

    @PostMapping("list")
    public List<HoneyTipVo> list(@RequestBody SearchFilterVo filterVo) {
        System.out.println("filterVo = " + filterVo);

        List<HoneyTipVo> HoneyTipVoList = service.list(filterVo);
        System.out.println("HoneyTipVoList = " + HoneyTipVoList);
        return HoneyTipVoList;

    }
    @PostMapping("write")
    public int write(@RequestBody HoneyTipVo vo , @RequestHeader("Authorization") String authorization){
        System.out.println("vo = " + vo);
        return service.write(vo);
    }

}
