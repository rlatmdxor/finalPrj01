package com.kh.healthcare.cardiovascularManagement.bloodPressure;

import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class BloodPressureService {

    private final BloodPressureDao dao;
    private final JwtUtil jwtUtil;

    public int bloodPressureWrite(BloodPressureVo vo, String token) {

        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);

        int pulse = 0;
        if(vo.getSystole() == "" || vo.getDiastole() == ""){
            throw new IllegalStateException("CODE [BLOODPRESSURE / WRITE / NULL PRESSURE]");
        }
        if( vo.getPulse() != "" ){
            pulse = Integer.parseInt(vo.getPulse());
        }
        if(vo.getNote() == null || vo.getNote().equals("")){
            vo.setNote("없음");
        }

        double systole = Double.parseDouble(vo.getSystole());
        double diastole = Double.parseDouble(vo.getDiastole());

        String day = vo.getDay();
        String time = vo.getTime();
        vo.setEnrollDate(day+time);

        if(systole < 10 || systole > 300){
            throw new IllegalStateException("CODE [BLOODPRESSURE / WRITE / IMPOSSIBLE SYSTOlE]");
        }else if (diastole < 9 || diastole > 200){
            throw new IllegalStateException("CODE [BLOODPRESSURE / WRITE / IMPOSSIBLE DIASTOLE]");
        } else if (pulse > 300) {
            throw new IllegalStateException("CODE [BLOODPRESSURE / WRITE / IMPOSSIBLE PULSE]");
        } else if (systole < diastole) {
            throw new IllegalStateException("CODE [BLOODPRESSURE / WRITE / IMPOSSIBLE DATA]");
        }

        return dao.bloodPressureWrite(vo);
    }

    public List<BloodPressureVo> bloodPressureList(String token) {
        token = token.replace("Bearer ", "");
        boolean ableToken = jwtUtil.checkToken(token);
        if(ableToken == false){
            throw new IllegalStateException("CODE [ BLOODPRESSURE / LIST / DISABLE_TOKEN ]");
        }
        String memberNo = jwtUtil.getNo(token);
        return dao.bloodPressureList(memberNo);
    }

    public int bloodPressureEdit(BloodPressureVo vo, String token) {

        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);
        String day = vo.getDay();
        String time = vo.getTime();
        vo.setEnrollDate(day+time);

        int pulse = 0;
        if(vo.getSystole() == "" || vo.getDiastole() == ""){
            throw new IllegalStateException("CODE [BLOODPRESSURE / EDIT / NULL PRESSURE]");
        }
        if(vo.getPulse() != null){
            pulse = Integer.parseInt(vo.getPulse());
        }
        double systole = Double.parseDouble(vo.getSystole());
        double diastole = Double.parseDouble(vo.getDiastole());

        if(systole < 10 || systole > 300){
            throw new IllegalStateException("CODE [BLOODPRESSURE / EDIT / IMPOSSIBLE SYSTOlE]");
        }else if (diastole < 9 || diastole > 200){
            throw new IllegalStateException("CODE [BLOODPRESSURE / EDIT / IMPOSSIBLE DIASTOLE]");
        } else if (pulse > 300) {
            throw new IllegalStateException("CODE [BLOODPRESSURE / EDIT / IMPOSSIBLE PULSE]");
        } else if (systole < diastole) {
            throw new IllegalStateException("CODE [BLOODPRESSURE / WRITE / IMPOSSIBLE DATA]");
        }
        return dao.bloodPressureEdit(vo);
    }

    public int bloodPressureDelete(BloodPressureVo vo, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);
        int result = dao.bloodPressureDelete(vo);
        if(result != 1){
            throw new IllegalStateException("CODE [ BLOODPRESSURE / DELETE / FAIL ]");
        }
        return result;

    }

    // 오늘 혈압 체크했는지
    public String checkTodayBloodPressure(String userNo) {
        int isEnabled = dao.isBloodPressurePushEnabled(userNo);

        if(isEnabled>=1){
            int count = dao.checkTodayBloodPressure(userNo);
            if (count == 0) {
                return "오늘 혈압 측정 내역이 없습니다. 혈압 측정 내역을 기록해주세요!";
            } else {
                return "측정 내역 있음";
            }
        } else {
            return "푸시 설정 OFF";
        }

    }
}
