package com.kh.healthcare.OpenAI;

import com.kh.healthcare.alc.report.AlcReportVo;
import com.kh.healthcare.exercise.aerobic.AerobicHistoryVo;
import com.kh.healthcare.exercise.anAerobic.AnAerobicHistoryVo;
import com.kh.healthcare.livingHealth.sleep.SleepVo;
import lombok.Data;

import java.util.List;

@Data
public class UserHealthVo {
    private List<SleepVo> sleep;
    private List<AlcReportVo> alcohol;
    private List<AerobicHistoryVo> aerobicHistory;
    private List<AnAerobicHistoryVo> anAerobicHistory;
}
