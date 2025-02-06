package com.kh.healthcare.board.honeyTip;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("board/honeytip")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class HoneyTipController {

    private final HoneyTipService service;

    @GetMapping
    public List<HoneyTipVo> list() {

        List<HoneyTipVo> HoneyTipVoList = service.list();
        return HoneyTipVoList;

    }

}
