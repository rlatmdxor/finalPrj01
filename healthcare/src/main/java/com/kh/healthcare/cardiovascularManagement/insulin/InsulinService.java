package com.kh.healthcare.cardiovascularManagement.insulin;

import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class InsulinService {

    private final InsulinMapper mapper;
    private final JwtUtil jwtUtil;

    public HashMap insulinList(String token) {
        token = token.replace("Bearer ", "");
        boolean ableToken = jwtUtil.checkToken(token);
        if(ableToken == false){
            throw new IllegalStateException("CODE [ INSULIN / LIST / DISABLE_TOKEN ]");
        }
        String memberNo = jwtUtil.getNo(token);

        HashMap map = new HashMap<>();

        String[] disablePointList = mapper.findDisablePointList(memberNo);
        map.put("disablePointList" , disablePointList);
        map.put("insulinList" , mapper.insulinList(memberNo));

        return map;
    }

    public int insulinInsert(InsulinVo vo, String token) {

        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);
        vo.setMemberNo(memberNo);
        String isAblePoint = vo.getPoint();
        if(vo.getNote() == null || vo.getNote().equals("")){
            vo.setNote("없음");
        }

        List<InsulinVo> ableTest = mapper.checkAbleDate(isAblePoint , memberNo);
        if(ableTest.size() > 0){
            throw new IllegalStateException("CODE [INSULIN / WRITE / CD]");
        }

        return mapper.insulinInsert(vo);
    }

    public int insulinDel(String[] numList, String token) {
        token = token.replace("Bearer ", "");
        String memberNo = jwtUtil.getNo(token);

        if(numList.length < 1){
            throw new IllegalStateException("CODE [INSULIN / DELETE ]");
        }

        int result = 0;
        for (String no : numList) {
            mapper.insulinDel(no , memberNo);
            result++;
        }
        return result;

    }


    //오늘 인슐린 투약 내역 체크하고 메시지 반환
    public String checkTodayInsulin(String userNo) {
        int isEnabled = mapper.isInsulinPushEnabled(userNo);

        if(isEnabled>=1){
            int count = mapper.checkTodayInsulin(userNo);
            if (count == 0) {
                return "오늘 등록된 투약 내역이 없습니다. 인슐린 투약 내역을 등록해주세요!";
            } else if(count < 3){
                return "오늘 투약할 인슐린이 남아 있습니다. 인슐린 투약 내역을 등록해주세요!";
            } else {
                return "투약 완료";
            }
        } else {
            return "푸시 설정 OFF";
        }

    }
    
}
