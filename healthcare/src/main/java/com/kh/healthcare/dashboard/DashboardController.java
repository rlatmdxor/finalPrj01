package com.kh.healthcare.dashboard;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService service;

    @GetMapping
    public DashboardVo getDashboardData(@RequestParam String currentMonday, @RequestParam String currentSunday, @RequestParam int memberNo, @RequestHeader("Authorization") String authorization){
        try {
            DashboardVo dashboardVo = service.getDashboardData(currentMonday, currentSunday, memberNo);
            return dashboardVo;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DASHBOARD - GET DATA FAIL..");
        }
    }

    @GetMapping("setting")
    public List<SettingVo> getDashboardSetting(@RequestParam int memberNo, @RequestHeader("Authorization") String authorization) {
        try {
            List<SettingVo> settingVo = service.getDashboardSetting(memberNo);
            return settingVo;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DASHBOARD - GET SETTING DATA FAIL..");
        }
    }

    @PostMapping("setting")
    public String editDashboardSetting(@RequestBody List<SettingVo> settings, @RequestHeader("Authorization") String authorization) {
        try {
            service.editDashboardSetting(settings);
            return "SETTING SUCCESS";
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DASHBOARD - EDIT SETTING FAIL..");
        }
    }
}
