package com.kh.healthcare.exercise.anAerobic;

import com.kh.healthcare.exercise.aerobic.AerobicVo;
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

        if(voList.size()<3){
            mapper.mark(userNo,no);
            return "성공";
        }else{
            return "실패";
        }
    }

    //운동 상세정보 가져오기
    public AnAerobicVo findExByName(String name) {
        return mapper.findExByName(name);
    }

    //운동 번호 가져오기
    public AnAerobicVo findExNoByName(String name) { return mapper.findExNoByName(name); }

    //운동 내역 기록
    public String record(String token, AnAerobicHistoryVo vo) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);

        //이름으로 운동번호 가져오기
        String exName = vo.getExName();
        AnAerobicVo anaerobicVo = findExNoByName(exName);
        String exNo = anaerobicVo.getNo();

        // 운동 중복 여부 체크
        int existingRecords = mapper.countOverlappingRecords(userNo, vo, exNo);
        if (existingRecords > 0) {
            return "해당 일자에 이미 운동 내역이 존재합니다.";
        } else{
            // 중복이 없을 경우 기록 저장
            mapper.record(userNo, exNo, vo);
            return "운동 내역이 등록되었습니다.";
        }
    }

    //운동 내역 업데이트
    public String updateAnAerobic(String token, AnAerobicHistoryVo vo) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);

        //이름으로 운동번호 가져오기
        String exName = vo.getExName();
        AnAerobicVo anaerobicVo = findExNoByName(exName);
        String exNo = anaerobicVo.getNo();

        //수정하려는 내역의 날짜 가져오기
        String historyDate = mapper.getDate(userNo, vo);

        //날짜 동일하면 중복체크 안함
        if(historyDate.equals(vo.getExDate())){
            mapper.updateAnAerobic(userNo, vo);
            return "운동 내역이 수정되었습니다..";
        } else {
            // 운동 중복 여부 체크
            int existingRecords = mapper.countOverlappingRecords(userNo, vo, exNo);
            if (existingRecords > 0) {
                return "해당 일자에 이미 운동 내역이 존재합니다.";
            } else{
                // 중복이 없을 경우 기록 저장
                mapper.updateAnAerobic(userNo, vo);
                return "운동 내역이 수정되었습니다.";
            }
        }
    }

    //운동 내역 삭제
    public String deleteAnAerobic(String token, AnAerobicHistoryVo vo) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);

        if(mapper.deleteAnAerobic(userNo, vo)){
            return "운동 내역이 삭제되었습니다.";
        } else {
            return "삭제 실패...";
        }
    }


}
