package com.kh.healthcare.cardiovascularManagement.bloodSugar;

import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Slf4j
@RequiredArgsConstructor
@Service
public class BloodSugarService {

    private final BloodSugarMapper mapper;
    private final JwtUtil jwtUtil;

    public List<BloodSugarVo> list(String token) {
        token = token.replace("Bearer ", "");
        boolean ableToken = jwtUtil.checkToken(token);
        if(ableToken == false){
            throw new IllegalStateException("CODE [ BLOODSUGAR / LIST / DISABLE_TOKEN ]");
        }
        String memberNo = jwtUtil.getNo(token);
        return mapper.list(memberNo);
    }

    public int bsWrite(BloodSugarVo vo, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);
        String day = vo.getDay();
        String time = vo.getTime();
        vo.setEnrollDate(day+time);

        if(vo.getSugar() == ""){
            throw new IllegalStateException("CODE [BLOODSUGAR / WRITE / NULL SUGAR]");
        }

        double sugar = Double.parseDouble(vo.getSugar());

        if(sugar < 40 || sugar > 500){
            throw new IllegalStateException("CODE [BLOODSUGAR / WRITE / IMPOSSIBLE SUGAR]");
        }
        return mapper.bsWrite(vo);
    }

    public int bsEdit(BloodSugarVo vo, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);
        String day = vo.getDay();
        String time = vo.getTime();
        vo.setEnrollDate(day+time);
        if(vo.getSugar() == ""){
            throw new IllegalStateException("CODE [BLOODSUGAR / EDIT / NULL SUGAR]");
        }

        double sugar = Double.parseDouble(vo.getSugar());

        if(sugar < 40 || sugar > 500){
            throw new IllegalStateException("CODE [BLOODSUGAR / EDIT / IMPOSSIBLE SUGAR]");
        }
        return mapper.bsEdit(vo);
    }

    public int bsDel(BloodSugarVo vo, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);

        int result = mapper.bsDel(vo);
        if(result != 1){
            throw new IllegalStateException("CODE [ BLOODSUGAR / DELETE / FAIL ]");
        }
        return result;

    }

    //혈당 체크했는지
    public String checkTodayBloodSugar(String userNo) {
        int isEnabled = mapper.isBloodSugarPushEnabled(userNo);

        if(isEnabled>=1){
            int count = mapper.checkTodayBloodSugar(userNo);
            if (count == 0) {
                return "오늘 혈당 측정 내역이 없습니다. 혈당 측정 내역을 기록해주세요!";
            } else {
                return "측정 내역 있음";
            }
        } else {
            return "푸시 설정 OFF";
        }

    }
}
