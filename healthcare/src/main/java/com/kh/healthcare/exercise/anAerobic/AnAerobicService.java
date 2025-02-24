package com.kh.healthcare.exercise.anAerobic;

import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AnAerobicService {

    private final AnAerobicMapper mapper;
    private final JwtUtil jwtUtil;

    //일반 리스트
    public List<AnAerobicVo> getList(String token) {
        token = token.replace("Bearer ", "");
        String no = jwtUtil.getNo(token);
        return mapper.getList(no);
    }

    //북마크 리스트
    public List<AnAerobicVo> getBookmarkList(String token) {
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
        List<AnAerobicVo> voList = getBookmarkList(token);
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);

        if(voList.size()<5){
            mapper.mark(userNo,no);
            return "성공";
        }else{
            return "실패";
        }
    }
}
