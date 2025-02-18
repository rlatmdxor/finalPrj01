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


}
