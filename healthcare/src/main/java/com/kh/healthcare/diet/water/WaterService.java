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
}
