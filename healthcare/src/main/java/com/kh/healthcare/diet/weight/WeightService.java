package com.kh.healthcare.diet.weight;

import com.kh.healthcare.diet.water.WaterMapper;
import com.kh.healthcare.diet.water.WaterVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class WeightService {

    private final WeightMapper mapper;

    public void weightEnroll(WeightVo vo) {
        WeightVo weightVo = getWeightByDate(vo);

        if(weightVo == null) {
            mapper.weightEnroll(vo);
        }
        else {
            mapper.weightUpdate(vo);
        }
    }

    public WeightVo getWeightByDate(WeightVo vo) {
        try {
            WeightVo weightVo = mapper.getWeightByDate(vo);
            if (weightVo == null) {
                return null;
            }
            return weightVo;
        } catch (Exception e) {
            e.getMessage();
            return null;
        }
    }

    public List<WeightVo> getDayWeight(int memberNo, String month) {
        return mapper.getDayWeight(memberNo, month);
    }

    public List<WeightVo> getMonthAvgWeight(int memberNo, String year) {
        return mapper.getMonthAvgWeight(memberNo, year);
    }

    public List<WeightVo> getYearAvgWeight(int memberNo) {
        return mapper.getYearAvgWeight(memberNo);

    }
}
