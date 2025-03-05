package com.kh.healthcare.alc.report;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/alc/report")
@RequiredArgsConstructor
public class AlcReportController {

    private final AlcReportService service;

    @GetMapping("list")
    public List<AlcReportVo> list(@RequestHeader ("Authorization") String token) {
        return service.list(token);
    }

    @PostMapping("write")
    public void write(@RequestHeader ("Authorization") String token, @RequestBody AlcReportVo vo) {
        service.write(token,vo);
    }

    @PostMapping("update")
    public ResponseEntity<String> update(@RequestHeader("Authorization") String token, @RequestBody AlcReportVo vo) {
        service.update(token, vo);
        return ResponseEntity.ok("Update Success");
    }

    @DeleteMapping("delete")
    public ResponseEntity<String> delete(@RequestHeader("Authorization") String token, @RequestBody AlcReportVo vo) {
        service.delete(token, vo);
        return ResponseEntity.ok("Delete Success");
    }
}
