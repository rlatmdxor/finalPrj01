package com.kh.healthcare.exercise.aerobic;

import com.kh.healthcare.exercise.anAerobic.AnAerobicVo;
import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AerobicService {

    private final AerobicMapper mapper;
    private final JwtUtil jwtUtil;

    //일반 리스트
    public List<AerobicVo> getList(String token) {
        token = token.replace("Bearer ", "");
        String no = jwtUtil.getNo(token);
        return mapper.getList(no);
    }

    //북마크 리스트
    public List<AerobicVo> getBookmarkList(String token) {
        token = token.replace("Bearer ", "");
        String no = jwtUtil.getNo(token);
        return mapper.getBookmarkList(no);
    }

    //북마크 해제
    public void unmark(String token, String no) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        mapper.unmark(userNo,no);
    }

    //북마크 등록
    public String mark(String token, String no) {
        List<AerobicVo> voList = getBookmarkList(token);
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);

        if(voList.size()<3){
            mapper.mark(userNo,no);
            return "성공";
        }else{
            return "실패";
        }
    }

    //운동 상세정보 가져오기
    public AerobicVo findExByName(String name) {
        return mapper.findExByName(name);
    }
}
