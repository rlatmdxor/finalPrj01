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
    public DashboardVo getDashboardData(@RequestParam String currentMonday, @RequestParam String currentSunday, @RequestHeader("Authorization") String token){
        try {
            DashboardVo dashboardVo = service.getDashboardData(currentMonday, currentSunday, token);
            return dashboardVo;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DASHBOARD - GET DASHBOARD DATA FAIL..");
        }
    }

    @GetMapping("setting")
    public List<SettingVo> getDashboardSetting(@RequestHeader("Authorization") String token) {
        try {
            List<SettingVo> settingVo = service.getDashboardSetting(token);
            return settingVo;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DASHBOARD - GET DASHBOARD SETTING FAIL..");
        }
    }

    @PostMapping("setting")
    public void editDashboardSetting(@RequestBody List<SettingVo> settings, @RequestHeader("Authorization") String token) {
        try {
            service.editDashboardSetting(settings);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DASHBOARD - EDIT DASHBOARD SETTING FAIL..");
        }
    }
}
