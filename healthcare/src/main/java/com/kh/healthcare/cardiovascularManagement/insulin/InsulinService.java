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


}
