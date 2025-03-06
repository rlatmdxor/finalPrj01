package com.kh.healthcare.diet.water;

import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class WaterService {

    private final WaterMapper mapper;
    private final JwtUtil jwtUtil;

    public void waterEnroll(WaterVo vo, String token) {
        WaterVo waterVo = getWaterByDate(vo, token);
        token = token.replace("Bearer ", "");
        String no = jwtUtil.getNo(token);
        vo.setMemberNo(no);

        if(waterVo == null) {
            mapper.waterEnroll(vo);
        }
        else {
            mapper.waterUpdate(vo);
        }
    }

    public WaterVo getWaterByDate(WaterVo vo, String token) {
        token = token.replace("Bearer ", "");
        String no = jwtUtil.getNo(token);
        vo.setMemberNo(no);

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
