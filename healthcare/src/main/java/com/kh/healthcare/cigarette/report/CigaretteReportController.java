package com.kh.healthcare.cigarette.report;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/cigarette/report")
@RequiredArgsConstructor
public class CigaretteReportController {

    private final CigaretteReportService service;

    @GetMapping("list")
    public List<CigaretteReportVo> list(@RequestHeader ("Authorization") String token){
        return service.list(token);
    }

    @PostMapping("write")
    public void write(@RequestHeader("Authorization") String token, @RequestBody CigaretteReportVo vo){
        service.write(token,vo);
    }

    @PostMapping("update")
    public ResponseEntity<String> update(@RequestHeader("Authorization") String token, @RequestBody CigaretteReportVo vo) {
        service.update(token, vo);
        return ResponseEntity.ok("Update Success");
    }

    @DeleteMapping("delete")
    public ResponseEntity<String> delete(@RequestHeader("Authorization") String token, @RequestBody CigaretteReportVo vo){
        service.delete(token , vo);
        return ResponseEntity.ok("Delete");
    }

}
