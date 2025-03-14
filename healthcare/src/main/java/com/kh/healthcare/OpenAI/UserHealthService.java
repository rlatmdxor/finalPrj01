package com.kh.healthcare.OpenAI;

import com.kh.healthcare.alc.report.AlcReportVo;
import com.kh.healthcare.cardiovascularManagement.bloodPressure.BloodPressureVo;
import com.kh.healthcare.cardiovascularManagement.bloodSugar.BloodSugarVo;
import com.kh.healthcare.diet.DietReportVo;
import com.kh.healthcare.diet.meal.TotalKcalVo;
import com.kh.healthcare.diet.water.WaterVo;
import com.kh.healthcare.diet.weight.WeightVo;
import com.kh.healthcare.exercise.aerobic.AerobicHistoryVo;
import com.kh.healthcare.exercise.anAerobic.AnAerobicHistoryVo;
import com.kh.healthcare.jwt.JwtUtil;
import com.kh.healthcare.livingHealth.drug.DrugVo;
import com.kh.healthcare.livingHealth.sleep.SleepVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserHealthService {

    private final UserHealthMapper mapper;
    private final JwtUtil jwtUtil;

    public UserHealthVo getUserHealthData(String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Calendar calendar = Calendar.getInstance();
        String endDate = simpleDateFormat.format(calendar.getTime());  // 오늘 날짜
        calendar.add(calendar.DATE, -30);
        String startDate = simpleDateFormat.format(calendar.getTime());  // 30일 전 날짜
        
        List<SleepVo> sleepList = mapper.getSleepList(memberNo, startDate, endDate);
        List<AlcReportVo> alcoholList = mapper.getAlcList(memberNo, startDate, endDate);
        List<AerobicHistoryVo> AerobicHistoryList = mapper.getAerobicHistoryList(memberNo, startDate, endDate);
        List<AnAerobicHistoryVo> AnAerobicHistoryList = mapper.getAnAerobicHistoryList(memberNo, startDate, endDate);
        List<DrugVo> drugList = mapper.getDrugList(memberNo);
        List<BloodPressureVo> bloodPressureList = mapper.getbloodPressureList(memberNo, startDate, endDate);
        List<BloodSugarVo> bloodSugarList = mapper.getbloodSugarList(memberNo, startDate, endDate);

        UserHealthVo userHealthVo = new UserHealthVo();
        userHealthVo.setSleep(sleepList);
        userHealthVo.setAlcohol(alcoholList);
        userHealthVo.setAerobicHistory(AerobicHistoryList);
        userHealthVo.setAnAerobicHistory(AnAerobicHistoryList);
        userHealthVo.setDrug(drugList);
        userHealthVo.setBloodPressure(bloodPressureList);
        userHealthVo.setBloodSugar(bloodSugarList);

        return userHealthVo;
    }
}
