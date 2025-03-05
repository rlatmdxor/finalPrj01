package com.kh.healthcare.cardiovascularManagement.insulin;

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

    public HashMap insulinList(InsulinVo vo) {

        HashMap map = new HashMap<>();

        String[] disablePointList = mapper.findDisablePointList(vo);
        map.put("disablePointList" , disablePointList);
        map.put("insulinList" , mapper.insulinList(vo));

        return map;
    }

    public int insulinInsert(InsulinVo vo) {

        String isAblePoint = vo.getPoint();
        String memberNo = vo.getMemberNo();

        List<InsulinVo> ableTest = mapper.checkAbleDate(isAblePoint , memberNo);
        System.out.println("ableTest = " + ableTest);
        if(ableTest.size() > 0){
            throw new IllegalStateException("CODE [INSULIN / WRITE / CD]");
        }

        return mapper.insulinInsert(vo);
    }

    public int insulinDel(String[] numList) {

        if(numList.length < 1){
            throw new IllegalStateException("CODE [INSULIN / DELETE ]");
        }

        int result = 0;
        for (String no : numList) {
            mapper.insulinDel(no);
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
