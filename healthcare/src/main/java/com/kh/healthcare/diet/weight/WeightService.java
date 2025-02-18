package com.kh.healthcare.diet.weight;

import com.kh.healthcare.diet.water.WaterMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class WeightService {

    private final WeightMapper mapper;

    public void weightEnroll(WeightVo vo) {
        String amount = getWeightByDate(vo);

        if(amount == null) {
            mapper.weightEnroll(vo);
        }
        else {
            mapper.weightUpdate(vo);
        }
    }

    public String getWeightByDate(WeightVo vo) {
        try {
            String amount = mapper.getWeightByDate(vo);
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
