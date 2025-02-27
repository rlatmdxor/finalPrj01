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

    public void waterIntakeEnroll(WaterVo vo) {
        String amount = getWaterIntakeByDate(vo);

        if(amount == null) {
            mapper.waterIntakeEnroll(vo);
        }
        else {
            mapper.waterIntakeUpdate(vo);
        }
    }

    public String getWaterIntakeByDate(WaterVo vo) {
        try {
            String amount = mapper.getWaterIntakeByDate(vo);
            if (amount == null) {
                return null;
            }
            return amount;
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
