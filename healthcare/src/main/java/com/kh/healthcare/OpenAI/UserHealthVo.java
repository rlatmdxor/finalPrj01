package com.kh.healthcare.OpenAI;

import com.kh.healthcare.alc.report.AlcReportVo;
import com.kh.healthcare.livingHealth.sleep.SleepVo;
import lombok.Data;

import java.util.List;

@Data
public class UserHealthVo {
    private List<SleepVo> sleep;
    private List<AlcReportVo> alcohol;
}
