package com.kh.healthcare.diet;

import com.kh.healthcare.dashboard.DashboardVo;
import com.kh.healthcare.diet.meal.TotalKcalVo;
import com.kh.healthcare.diet.water.WaterVo;
import com.kh.healthcare.diet.weight.WeightVo;
import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DietService {

    private final DietMapper mapper;
    private final JwtUtil jwtUtil;

    public DietReportVo getDietCalendarData(String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);

        List<WaterVo> waterVo = mapper.getWaterList(memberNo);
        List<WeightVo> weightVo = mapper.getWeightList(memberNo);
        List<TotalKcalVo> totalKcalVo = mapper.getKcalList(memberNo);

        DietReportVo dietReportVo = new DietReportVo();
        dietReportVo.setWater(waterVo);
        dietReportVo.setWeight(weightVo);
        dietReportVo.setKcal(totalKcalVo);

        return dietReportVo;
    }

    public DietReportVo getDietDayReport(String month, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);

        List<WaterVo> waterVo = mapper.getDayWater(memberNo, month);
        List<WeightVo> weightVo = mapper.getDayWeight(memberNo, month);
        List<TotalKcalVo> totalKcalVo = mapper.getDayKcal(memberNo, month);

        DietReportVo dietReportVo = new DietReportVo();
        dietReportVo.setWater(waterVo);
        dietReportVo.setWeight(weightVo);
        dietReportVo.setKcal(totalKcalVo);

        return dietReportVo;
    }

    public DietReportVo getDietWeekReport(String year, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);

        List<WaterVo> waterVo = mapper.getWeekWater(memberNo, year);
        List<WeightVo> weightVo = mapper.getWeekWeight(memberNo, year);
        List<TotalKcalVo> totalKcalVo = mapper.getWeekKcal(memberNo, year);

        DietReportVo dietReportVo = new DietReportVo();
        dietReportVo.setWater(waterVo);
        dietReportVo.setWeight(weightVo);
        dietReportVo.setKcal(totalKcalVo);

        return dietReportVo;
    }

    public DietReportVo getDietMonthReport(String year, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);

        List<WaterVo> waterVo = mapper.getMonthWater(memberNo, year);
        List<WeightVo> weightVo = mapper.getMonthWeight(memberNo, year);
        List<TotalKcalVo> totalKcalVo = mapper.getMonthKcal(memberNo, year);

        DietReportVo dietReportVo = new DietReportVo();
        dietReportVo.setWater(waterVo);
        dietReportVo.setWeight(weightVo);
        dietReportVo.setKcal(totalKcalVo);

        return dietReportVo;
    }

}
