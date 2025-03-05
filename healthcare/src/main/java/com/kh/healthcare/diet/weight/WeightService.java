package com.kh.healthcare.diet.weight;

import com.kh.healthcare.diet.water.WaterMapper;
import com.kh.healthcare.diet.water.WaterVo;
import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class WeightService {

    private final WeightMapper mapper;
    private final JwtUtil jwtUtil;

    public void weightEnroll(WeightVo vo, String token) {
        WeightVo weightVo = getWeightByDate(vo, token);
        token = token.replace("Bearer ", "");
        String no = jwtUtil.getNo(token);
        vo.setMemberNo(no);

        if(weightVo == null) {
            mapper.weightEnroll(vo);
        }
        else {
            mapper.weightUpdate(vo);
        }
    }

    public WeightVo getWeightByDate(WeightVo vo, String token) {
        token = token.replace("Bearer ", "");
        String no = jwtUtil.getNo(token);
        vo.setMemberNo(no);

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

}
