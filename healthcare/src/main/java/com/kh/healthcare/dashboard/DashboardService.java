package com.kh.healthcare.dashboard;

import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class DashboardService {

    private final DashboardMapper mapper;
    private final JwtUtil jwtUtil;

    public DashboardVo getDashboardData(String currentMonday, String currentSunday, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);

        // 이번주 데이터
        WeeklyDataVo currentWeek = mapper.getDashboardData(currentMonday, currentSunday, memberNo);

        // 저번주 날짜 계산
        LocalDate prevMonday = LocalDate.parse(currentMonday).minusDays(7);
        LocalDate prevSunday = LocalDate.parse(currentSunday).minusDays(7);

        // 저번주 데이터
        WeeklyDataVo previousWeek = mapper.getDashboardData(prevMonday.toString(), prevSunday.toString(), memberNo);

        // 증감값 데이터
        WeeklyDifferenceVo difference = calculateDifference(currentWeek, previousWeek);

        DashboardVo dashboardVo = new DashboardVo();
        dashboardVo.setCurrentWeek(currentWeek);
        dashboardVo.setPreviousWeek(previousWeek);
        dashboardVo.setDifference(difference);

        return dashboardVo;

    }

    // 증감값 계산
    public WeeklyDifferenceVo calculateDifference(WeeklyDataVo current, WeeklyDataVo previous) {
        WeeklyDifferenceVo difference = new WeeklyDifferenceVo();
        difference.setMaxBloodPressure(formatDifference(current.getMaxBloodPressure(), previous.getMaxBloodPressure(), "mmHg"));
        difference.setMinBloodPressure(formatDifference(current.getMinBloodPressure(), previous.getMinBloodPressure(), "mmHg"));
        difference.setMaxBloodSugar(formatDifference(current.getMaxBloodSugar(), previous.getMaxBloodSugar(), "mg/dL"));
        difference.setMinBloodSugar(formatDifference(current.getMinBloodSugar(), previous.getMinBloodSugar(), "mg/dL"));
        difference.setAvgSleep(formatTimeDifference(current.getAvgSleep(), previous.getAvgSleep()));
        difference.setCountCigarette(formatDifference(current.getCountCigarette(), previous.getCountCigarette(), "갑"));
        difference.setSumAlc(formatDifference(current.getSumAlc(), previous.getSumAlc(), "ml"));
        difference.setAvgWeight(formatDifference(current.getAvgWeight(), previous.getAvgWeight(), "kg"));
        difference.setAvgKcal(formatDifference(current.getAvgKcal(), previous.getAvgKcal(), "Kcal"));
        difference.setAvgWater(formatDifference(current.getAvgWater(), previous.getAvgWater(), "ml"));
        difference.setSumAerobic(formatTimeDifference(current.getSumAerobic(), previous.getSumAerobic()));
        difference.setCountAnaerobic(formatDifference(current.getCountAnaerobic(), previous.getCountAnaerobic(), "일"));
        difference.setSumCalConsume(formatDifference(current.getSumCalConsume(), previous.getSumCalConsume(), "Kcal"));

        return difference;
    }

    // 숫자 증감값 변환
    public String formatDifference(double currentValue, double previousValue, String unit) {
        double diff = currentValue - previousValue;
        if (diff == 0) {
            return "0 " + unit;
        }
        return String.format("%+.1f %s", diff, unit);
    }

    // 시간 증감값 변환
    public String formatTimeDifference(double currentMinutes, double previousMinutes) {
        if (currentMinutes == 0 && previousMinutes == 0) {
            return "0시간 0분";
        }

        int diff = (int) (currentMinutes - previousMinutes);

        if (diff == 0) {
            return "0시간 0분";
        }

        int hours = diff / 60;
        int minutes = diff % 60;

        if(minutes < 0) {
            minutes *= -1;
        }

        if (hours == 0) {
            return String.format("%+d분", minutes);
        } else if (minutes == 0) {
            return String.format("%+d시간", hours);
        } else {
            return String.format("%+d시간 %02d분", hours, minutes);
        }

    }

    public List<SettingVo> getDashboardSetting(String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);

        return mapper.getDashboardSetting(memberNo);
    }

    public void editDashboardSetting(List<SettingVo> settings) {
        for (SettingVo setting : settings) {
            mapper.editDashboardSetting(setting);
        }
    }
}
