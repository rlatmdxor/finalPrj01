package com.kh.healthcare.admin.login;


import com.amazonaws.services.s3.AmazonS3;
import com.kh.healthcare.jwt.JwtUtil;
import com.kh.healthcare.member.MemberVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AdminLoginService {

    private final AdminLoginMapper mapper;
    private final AmazonS3 s3;
    private final BCryptPasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public String login(AdminLoginVo vo) {
        //계정 조회
        AdminLoginVo dbVo = findAdminById(vo.getId());

        //일치하는지 확인 (평문, 암호문)
        boolean isMatch = encoder.matches(vo.getPwd(), dbVo.getPwd());

        if(!isMatch){
            throw new IllegalStateException("로그인 실패");
        }


        //jwt 토큰 생성 (ADMIN 값 넘김)
        return jwtUtil.createJwtToken(dbVo.getNo(), dbVo.getId(), dbVo.getNick(), "ROLE_ADMIN");
    }

    // 계정 조회(로그인 할 때 사용)
    public AdminLoginVo findAdminById(String id) {
        return mapper.findAdminById(id);
    }
}
