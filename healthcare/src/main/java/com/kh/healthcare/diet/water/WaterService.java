package com.kh.healthcare.diet.water;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

}
