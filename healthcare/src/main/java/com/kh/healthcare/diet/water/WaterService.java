package com.kh.healthcare.diet.water;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class WaterService {

    private final WaterMapper mapper;

    public void waterEnroll(WaterVo vo) {
        WaterVo waterVo = getWaterByDate(vo);

        if(waterVo == null) {
            mapper.waterEnroll(vo);
        }
        else {
            mapper.waterUpdate(vo);
        }
    }

    public WaterVo getWaterByDate(WaterVo vo) {
        try {
            WaterVo waterVo = mapper.getWaterByDate(vo);
            if (waterVo == null) {
                return null;
            }
            return waterVo;
        } catch (Exception e) {
            e.getMessage();
            return null;
        }
    }

    public List<WaterVo> getDayWater(int memberNo, String month) {
        return mapper.getDayWater(memberNo, month);
    }

    public List<WaterVo> getMonthAvgWater(int memberNo, String year) {
        return mapper.getMonthAvgWater(memberNo, year);
    }

    public List<WaterVo> getYearAvgWater(int memberNo) {
        return mapper.getYearAvgWater(memberNo);
    }

    //오늘 물내역 체크하고 메시지 반환
    public String checkTodayWater(String userNo) {
        int isEnabled = mapper.isWaterPushEnabled(userNo);

        if(isEnabled>=1){
            int count = mapper.checkTodayWater(userNo);
            if (count == 0) {
                // 기록이 없으면
                return "오늘 물을 마시지 않았어요. 건강을 위해 충분한 물을 섭취해주세요!";
            } else {
                // 하나라도 기록이 있으면
                return "물 기록이 존재합니다.";
            }
        } else {
            return "푸시 설정 OFF";
        }

    }
}
