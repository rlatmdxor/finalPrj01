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

    //운동 번호 가져오기
    public AerobicVo findExNoByName(String name) { return mapper.findExNoByName(name); }

    //운동 내역 기록
    public String record(String token, AerobicHistoryVo vo) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);

        //이름으로 운동번호 가져오기
        String exName = vo.getExName();
        AerobicVo aerobicVo = findExNoByName(exName);
        String exNo = aerobicVo.getNo();

        // 운동 중복 여부 체크
        int existingRecords = mapper.countOverlappingRecords(userNo, vo);
        if (existingRecords > 0) {
            return "해당 시간에 이미 운동 내역이 존재합니다.";
        } else{
            // 중복이 없을 경우 기록 저장
            mapper.record(userNo, exNo, vo);
            return "운동 내역이 등록되었습니다.";
        }

    }
}
