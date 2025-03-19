package com.kh.healthcare.livingHealth.drug;

import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class DrugService {

    private final DrugMapper mapper;
    private final JwtUtil jwtUtil;

    public List<DrugVo> list(String token) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.list(userNo) ;
    }


    public List<DrugVo> delList(String token) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.delList(userNo);
    }


    public List<DrugVo> find(DrugVo vo) {

        return mapper.find(vo);
    }

    public int write(String token, DrugVo vo) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.write(userNo, vo);
    }

    public List<DrugColorCategoryVo> color() {
        return mapper.color();
    }

    public List<DrugFormCategoryVo> form() {
        return mapper.form();
    }

    public void del(String token, List<String>  vo) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        mapper.del(userNo, vo);
    }

    public void removeDrug(String token, List<String> vo) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        mapper.removeDrug(userNo, vo);
    }

    public String name(String token) {
        token = token.replace("Bearer ", "");
        String userNo = jwtUtil.getNo(token);
        return mapper.name(userNo);

    }
}
